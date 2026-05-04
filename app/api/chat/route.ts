import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { ChatErrorCode } from "@/lib/chat-api";
import { localeFromRequest } from "@/lib/i18n/locale-from-request";
import type { Locale } from "@/lib/i18n/constants";
import { assertWithinRate, clientIpFromHeaders } from "@/lib/rate-limit";
import { getSiteSettings, summarizeSiteSettingsForAi } from "@/lib/site-data";

export const runtime = "nodejs";

const Message = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const Body = z.object({
  messages: z.array(Message).min(1).max(60),
  locale: z.enum(["en", "ar"]).optional(),
});

const bannedKeywords = [/porn/i, /\bterror\b/i];

const BANNED_REPLY_EN =
  "Peace and mercy be upon us. Let's keep conversations rooted in adab. How may I lovingly assist regarding masjid etiquette or newcomer resources?";

const BANNED_REPLY_AR =
  "السلام عليكم ورحمة الله. لنحافظ على الحوار بأدب إسلامي محترم. كيف يمكنني مساعدتك بخصوص آداب المسجد أو موارد المسلمين الجدد؟";

function bannedReply(locale: Locale): string {
  return locale === "ar" ? BANNED_REPLY_AR : BANNED_REPLY_EN;
}

function islamicSafetySystemPrompt(contextPack: string, locale: Locale) {
  const languageBlock =
    locale === "ar"
      ? `OUTPUT LANGUAGE
- The visitor selected Arabic for the site interface. Write your entire reply in Modern Standard Arabic (فصحى مُعاصرة), clear and respectful, unless the user's last message is clearly and predominantly in another language—in that case mirror their language politely.
- Prefer concise paragraphs (≤ 120 words unless the user asks for more).`
      : `OUTPUT LANGUAGE
- Write in clear English unless the user's last message is predominantly Arabic or another language—in that case mirror their language respectfully.
- Prefer concise paragraphs (≤ 120 words unless the user asks for more).`;

  return `You are Dar El Salam's multilingual Islamic etiquette concierge for visitors of darelsalam.org.

PRIMARY VALUES
- Exhibit reverence for Allah, His Messenger ﷺ, the Qur'an, salah, fasting, Hajj/Umrah concepts, adab, mosque conduct, inclusivity toward diverse madhāhib studied by qualified scholars, and neighborly compassion.
- Refuse vulgarity, mockery of Islam or other faith traditions, geopolitical campaigning, gossip about individuals, conspiracy theories unrelated to mosque programs, encouragement of hatred, harassment, illicit behavior, suicide/self harm instructions, firearms/political violence, or misuse of Qur'an for mock purposes.
- If content veers abusive, politely offer to continue only with respectful adab.

CONTENT BOUNDARIES
- Ground factual answers about mosque programs, timings, etiquette, newcomer welcome, donating links, volunteering, classrooms, Fatwa workflows, accessibility, hygiene, salah basics, dua etiquettes ONLY when supported by CONTEXT below.
- CONTEXT is authoritative ONLY for factual masjid particulars. If CONTEXT lacks an answer say you do not have that datum and suggest contacting the Imam (info forms on darelsalam.org/contact). Never invent Imam decisions.
- Theological fiqh rulings touching personal hardship (divorce, business contracts, salah makeup, doubtful foods, zakāh calculations, etc.) must decline personal ruling language. Encourage dua, patience, Quran reflection, scholarly verification, contacting local Imam/scholarship, Fatwa submissions, referencing trusted curricula (without naming sectarian labels negatively).
- If asked speculative questions unrelated to mosque or adab, politely redirect to adab/masjid focus.

${languageBlock}

Masjid CONTEXT (canonical snapshot):
${contextPack}`;
}

function jsonError(code: ChatErrorCode, status: number) {
  return NextResponse.json({ errorCode: code }, { status });
}

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  if (!assertWithinRate(`${ip}:chat`, 30, 60 * 60 * 1000)) {
    return jsonError("RATE_LIMIT", 429);
  }

  const apiKey = process.env.XAI_API_KEY;

  let body: ReturnType<(typeof Body)["parse"]>;
  const cookieHeader = request.headers.get("cookie");

  try {
    const json = await request.json();
    body = Body.parse(json);
  } catch {
    return jsonError("INVALID_PAYLOAD", 400);
  }

  const locale = localeFromRequest(cookieHeader, body.locale);

  if (body.messages.length > 14) {
    return jsonError("CONVERSATION_TOO_LONG", 400);
  }

  const lastTurn = body.messages[body.messages.length - 1];
  if (bannedKeywords.some((regex) => regex.test(lastTurn.content))) {
    return NextResponse.json({ reply: bannedReply(locale) }, { status: 200 });
  }

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      const settings = await getSiteSettings();
      const prefix =
        locale === "ar"
          ? "(وضع التطوير) أضف XAI_API_KEY. مؤقتًا: "
          : "(Dev fallback) Configure XAI_API_KEY. Meanwhile: ";
      return NextResponse.json({
        reply: `${prefix}${summarizeSiteSettingsForAi(settings).slice(0, 800)}`,
      });
    }
    return jsonError("ASSISTANT_UNAVAILABLE", 503);
  }

  const settings = await getSiteSettings();
  const contextPack = summarizeSiteSettingsForAi(settings);

  const modelId = process.env.XAI_MODEL ?? "grok-2-latest";
  const gateway = createOpenAI({
    baseURL: "https://api.x.ai/v1",
    apiKey,
  });

  try {
    const { text } = await generateText({
      model: gateway.chat(modelId),
      system: islamicSafetySystemPrompt(contextPack, locale),
      messages: body.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      maxOutputTokens: 600,
      temperature: 0.25,
    });

    return NextResponse.json({ reply: text.trim() });
  } catch (error) {
    console.error("[chat]", error);
    return jsonError("UPSTREAM_ERROR", 502);
  }
}

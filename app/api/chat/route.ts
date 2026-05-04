import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { assertWithinRate, clientIpFromHeaders } from "@/lib/rate-limit";
import { getSiteSettings, summarizeSiteSettingsForAi } from "@/lib/site-data";

export const runtime = "nodejs";

const Message = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const Body = z.object({
  messages: z.array(Message).min(1).max(60),
});

const bannedKeywords = [/porn/i, /\bterror\b/i];

function islamicSafetySystemPrompt(contextPack: string) {
  return `You are Dar El Salam's multilingual Islamic etiquette concierge for visitors of darelsalam.org.

PRIMARY VALUES
- Exhibit reverence for Allah, His Messenger ﷺ, the Qur’an, salah, fasting, Hajj/Umrah concepts, adab, mosque conduct, inclusivity toward diverse madhāhib studied by qualified scholars, and neighborly compassion.
- Refuse vulgarity, mockery of Islam or other faith traditions, geopolitical campaigning, gossip about individuals, conspiracy theories unrelated to mosque programs, encouragement of hatred, harassment, illicit behavior, suicide/self harm instructions, firearms/political violence, or misuse of Qur’ān for mock purposes.
- If content veers abusive, politely offer to continue only with respectful adab.

CONTENT BOUNDARIES
- Ground factual answers about mosque programs, timings, etiquette, newcomer welcome, donating links, volunteering, classrooms, Fatwa workflows, accessibility, hygiene, salah basics, dua etiquettes ONLY when supported by CONTEXT below.
- CONTEXT is authoritative ONLY for factual masjid particulars. If CONTEXT lacks an answer say you do not have that datum and suggest contacting the Imam (info forms on darelsalam.org/contact). Never invent Imam decisions.
- Theological fiqh rulings touching personal hardship (divorce, business contracts, salah makeup, doubtful foods, zakāh calculations, etc.) must decline personal ruling language. Encourage dua, patience, Quran reflection, scholarly verification, contacting local Imam/scholarship, Fatwa submissions, referencing trusted curricula (without naming sectarian labels negatively).
- If asked speculative questions unrelated to mosque or adab, politely redirect to adab/masjid focus.

LANGUAGE
- Prefer calm, succinct paragraphs (≤ 120 words unless user insists). Offer Arabic salaams when initiating if user greets in Arabic mirror respectfully yet avoid needless Arabic unless user communicates that way partially.

Masjid CONTEXT (canonical snapshot):
${contextPack}`;
}

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  if (!assertWithinRate(`${ip}:chat`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Please pause and try later." }, { status: 429 });
  }

  const apiKey = process.env.XAI_API_KEY;

  let body: ReturnType<(typeof Body)["parse"]>;

  try {
    const json = await request.json();
    body = Body.parse(json);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (body.messages.length > 14) {
    return NextResponse.json({ error: "Conversation too long. Refresh and try anew." }, { status: 400 });
  }

  const lastTurn = body.messages[body.messages.length - 1];
  if (
    bannedKeywords.some((regex) => regex.test(lastTurn.content))
  ) {
    return NextResponse.json(
      {
        reply:
          "Peace and mercy be upon us. Let's keep conversations rooted in adab. How may I lovingly assist regarding masjid etiquette or newcomer resources?",
      },
      { status: 200 },
    );
  }

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      const settings = await getSiteSettings();
      return NextResponse.json({
        reply: `(Dev fallback) Configure XAI_API_KEY. Meanwhile: ${summarizeSiteSettingsForAi(settings).slice(0, 800)}`,
      });
    }
    return NextResponse.json({ error: "Assistant temporarily unavailable." }, { status: 503 });
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
      system: islamicSafetySystemPrompt(contextPack),
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
    return NextResponse.json(
      {
        error: "Assistant could not reach xAI. Verify XAI_MODEL and API access.",
      },
      { status: 502 },
    );
  }
}

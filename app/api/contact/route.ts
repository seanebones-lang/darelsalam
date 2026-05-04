import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { assertWithinRate, clientIpFromHeaders } from "@/lib/rate-limit";
import { getSiteSettings } from "@/lib/site-data";

export const runtime = "nodejs";

const Payload = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(15).max(4000),
  topic: z.enum(["fatwa", "contact"]).default("fatwa"),
});

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  if (!assertWithinRate(`${ip}:contact`, 8, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Try later." }, { status: 429 });
  }

  let parsed: ReturnType<(typeof Payload)["parse"]>;

  try {
    const bodyUnknown = await request.json();
    parsed = Payload.parse(bodyUnknown);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const settings = await getSiteSettings();

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL ?? settings.email ?? "";

  const subjectPrefix =
    parsed.topic === "fatwa"
      ? "Fatwa request"
      : "Website contact";

  const fullName = `${parsed.firstName} ${parsed.lastName}`.trim();

  const textBody = `
${subjectPrefix}

Name: ${fullName}
Email: ${parsed.email}
Phone: ${parsed.phone ?? "-"}

---
${parsed.message}
`.trim();

  if (!to) {
    /* Dev-only escape hatch allows testing without transactional email wired. */
    if (process.env.NODE_ENV !== "production") {
      console.info("[forms] missing FORMS_TO_EMAIL — logging payload instead\n", textBody);
      return NextResponse.json({
        ok: true,
        message:
          "(Dev) Message logged locally. Configure FORMS_TO_EMAIL / RESEND_API_KEY for outbound email.",
      });
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Mailbox not configured.",
      },
      { status: 503 },
    );
  }

  if (!resendApiKey && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { ok: false, error: "Email relay not configured (RESEND_API_KEY)." },
      { status: 503 },
    );
  }

  if (resendApiKey) {
    const client = new Resend(resendApiKey);
    const from = process.env.FORMS_FROM_EMAIL ?? `forms@resend.dev`;
    const submit = await client.emails.send({
      from,
      to: [to],
      replyTo: parsed.email,
      subject: `[darelsalam.org] ${subjectPrefix} — ${fullName}`,
      text: textBody,
    });

    if (submit.error) {
      return NextResponse.json(
        { ok: false, error: submit.error.message ?? "Email failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({
      ok: true,
      message: "Thanks for filling out the form!",
    });
  }

  console.info("[forms] RESEND bypass in non-prod fallback\n", textBody);
  return NextResponse.json({
    ok: true,
    message: `Thanks ${fullName}! The office will respond with adab as soon as possible.`,
  });
}

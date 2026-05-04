"use client";

import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

interface FatwaFormProps {
  heading?: string | null;
  intro?: string | null;
  disclaimer?: string | null;
  variant?: "default" | "compact";
  topic?: "fatwa" | "contact" | string;
}

export function FatwaForm({
  heading,
  intro,
  disclaimer,
  variant = "default",
  topic = "fatwa",
}: FatwaFormProps) {
  const { t } = useLocale();
  const resolvedHeading = heading ?? t("fatwa.defaultHeading");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState<string>("");

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          topic: formData.get("topic") ?? "fatwa",
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Unable to submit");
      }
      setStatus("success");
      setFeedback(data.message ?? t("fatwa.successDefault"));
      evt.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : t("fatwa.errorGeneric"),
      );
    }
  }

  return (
    <section
      className={
        variant === "compact"
          ? ""
          : "rounded-[32px] border border-emerald-900/10 bg-white px-4 py-8 shadow-lg sm:px-8 sm:py-10 dark:border-emerald-600/35 dark:bg-emerald-900"
      }
    >
      <div className="space-y-2">
        <h2 className="font-serif text-2xl text-emerald-950 sm:text-3xl dark:text-emerald-50">
          {resolvedHeading}
        </h2>
        {intro && (
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{intro}</p>
        )}
        {disclaimer && (
          <p className="text-xs italic text-emerald-800/70 dark:text-emerald-100/70">{disclaimer}</p>
        )}
      </div>
      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <input type="hidden" name="topic" value={topic} />
        <div className="md:col-span-1">
          <label htmlFor="firstName" className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
            {t("fatwa.firstName")}
          </label>
          <input
            required
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            className="mt-2 min-h-12 w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-3.5 text-base outline-none ring-emerald-500/60 focus-visible:ring sm:text-sm dark:border-emerald-600/35 dark:bg-emerald-950 dark:text-emerald-50"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="lastName" className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
            {t("fatwa.lastName")}
          </label>
          <input
            required
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            className="mt-2 min-h-12 w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-3.5 text-base outline-none ring-emerald-500/60 focus-visible:ring sm:text-sm dark:border-emerald-600/35 dark:bg-emerald-950 dark:text-emerald-50"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="email" className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
            {t("fatwa.email")}
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="mt-2 min-h-12 w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-3.5 text-base outline-none ring-emerald-500/60 focus-visible:ring sm:text-sm dark:border-emerald-600/35 dark:bg-emerald-950 dark:text-emerald-50"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="phone" className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
            {t("fatwa.phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="mt-2 min-h-12 w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-3.5 text-base outline-none ring-emerald-500/60 focus-visible:ring sm:text-sm dark:border-emerald-600/35 dark:bg-emerald-950 dark:text-emerald-50"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
            {t("fatwa.message")}
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={5}
            minLength={20}
            className="mt-2 w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-3.5 text-base outline-none ring-emerald-500/60 focus-visible:ring sm:text-sm dark:border-emerald-600/35 dark:bg-emerald-950 dark:text-emerald-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="md:col-span-2 inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-full bg-emerald-900 px-10 py-3.5 text-base font-semibold uppercase tracking-wide text-white hover:bg-emerald-800 disabled:opacity-60 sm:text-sm dark:bg-emerald-200 dark:text-emerald-950"
        >
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {t("fatwa.send")}
        </button>
      </form>
      {status === "success" && feedback && (
        <p className="mt-4 text-center text-sm text-emerald-800 dark:text-emerald-50">{feedback}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-center text-xs text-red-600">{feedback}</p>
      )}
    </section>
  );
}

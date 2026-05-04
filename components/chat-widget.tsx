"use client";

import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ChatErrorCode } from "@/lib/chat-api";
import { isChatErrorCode } from "@/lib/chat-api";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";

interface ChatWidgetProps {
  disclaimer: string | null | undefined;
  suggestedPromptsRaw: string | null | undefined;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

const CHAT_ERROR_TO_MESSAGE: Record<ChatErrorCode, MessageKey> = {
  RATE_LIMIT: "chat.error.rateLimit",
  INVALID_PAYLOAD: "chat.error.invalidPayload",
  CONVERSATION_TOO_LONG: "chat.error.conversationTooLong",
  ASSISTANT_UNAVAILABLE: "chat.error.assistantUnavailable",
  UPSTREAM_ERROR: "chat.error.upstreamError",
  UNKNOWN: "chat.error.unknown",
};

function parsePrompts(raw?: string | null) {
  if (!raw) return [];
  return raw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function ChatWidget({ disclaimer, suggestedPromptsRaw }: ChatWidgetProps) {
  const { locale, t } = useLocale();
  const disclaimerText =
    locale === "ar"
      ? t("chat.disclaimerAr")
      : (disclaimer?.trim() ? disclaimer : t("chat.disclaimerDefault"));
  const suggestions =
    locale === "ar"
      ? parsePrompts(t("chat.suggestedPromptsAr"))
      : parsePrompts(suggestedPromptsRaw);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setError(null);
    const nextHistory: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextHistory);
    setInput("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory, locale }),
      });
      let payload: { reply?: string; errorCode?: string; error?: string };
      try {
        payload = await response.json();
      } catch {
        setError(t("chat.error.unknown"));
        setMessages((hist) => hist.slice(0, -1));
        return;
      }
      if (!response.ok || !payload.reply) {
        const code = isChatErrorCode(payload.errorCode) ? payload.errorCode : "UNKNOWN";
        setError(t(CHAT_ERROR_TO_MESSAGE[code]));
        setMessages((hist) => hist.slice(0, -1));
        return;
      }
      const reply = String(payload.reply ?? "").trim();
      if (!reply) {
        setError(t("chat.error.unknown"));
        setMessages((hist) => hist.slice(0, -1));
        return;
      }
      setMessages((hist) => [...hist, { role: "assistant", content: reply }]);
    } catch {
      setError(t("chat.error.unknown"));
      setMessages((hist) => hist.slice(0, -1));
    } finally {
      setBusy(false);
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="fixed z-40 flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-emerald-700 text-white shadow-xl ring-4 ring-emerald-100 hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-emerald-300 dark:text-emerald-950 dark:hover:bg-emerald-200 bottom-[max(6.5rem,calc(env(safe-area-inset-bottom,0px)+5.5rem))] end-[max(0.75rem,env(safe-area-inset-right,0px))] md:bottom-8 md:end-4"
          aria-label={t("chat.openAria")}
        >
          <MessageCircle className="h-7 w-7" aria-hidden />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-emerald-950/40 backdrop-blur-sm dark:bg-black/70" />
        <DialogPrimitive.Content className="fixed z-50 flex max-h-[min(560px,calc(100dvh-2rem))] w-[min(calc(100vw-1.5rem),400px)] flex-col rounded-[28px] border border-emerald-900/20 bg-white p-4 shadow-[0_35px_80px_rgba(5,61,53,0.35)] outline-none max-md:inset-x-0 max-md:bottom-0 max-md:end-auto max-md:start-auto max-md:top-auto max-md:mx-0 max-md:max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-bottom,0px)-0.5rem))] max-md:w-full max-md:max-w-none max-md:rounded-b-none max-md:rounded-t-[28px] max-md:border-x-0 max-md:border-b-0 max-md:p-4 max-md:pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:p-6 bottom-[max(5.5rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))] end-[max(0.75rem,env(safe-area-inset-right,0px))] top-[max(1rem,env(safe-area-inset-top,0px))] md:bottom-8 md:end-4 md:top-auto md:h-[560px] md:max-h-[560px] dark:border-emerald-500/35 dark:bg-emerald-900">
          <header className="mb-4 flex shrink-0 items-start justify-between gap-3">
            <div>
              <DialogPrimitive.Title className="font-serif text-xl text-emerald-950 dark:text-emerald-50">
                {t("chat.title")}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-emerald-200">
                {disclaimerText}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close className="min-h-11 min-w-11 touch-manipulation rounded-full p-2 text-emerald-800 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:bg-emerald-900/70">
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </header>
          <div className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-hidden rounded-2xl border border-emerald-900/15 bg-emerald-50/50 p-3 max-md:min-h-[12rem] dark:border-emerald-600/35 dark:bg-emerald-950">
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pe-2 text-sm">
              {!messages.length && (
                <>
                  <p className="text-xs text-emerald-900 dark:text-emerald-100">
                    {t("chat.askPrompt")}
                  </p>
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-900/70 dark:text-emerald-200/80">
                      {t("chat.suggestions")}
                    </p>
                    {suggestions.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        className="block w-full touch-manipulation rounded-xl border border-emerald-900/10 bg-white px-3 py-3 text-start text-sm text-emerald-900 hover:border-emerald-600 dark:border-emerald-600/40 dark:bg-emerald-800 dark:text-emerald-50"
                        onClick={() => void submit(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {messages.map((msg, idx) => (
                <article
                  key={`${idx}-${msg.role}`}
                  className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "ms-6 bg-emerald-700 text-white dark:bg-emerald-200 dark:text-emerald-950"
                      : "me-6 bg-white text-emerald-950 shadow-sm dark:bg-emerald-800 dark:text-emerald-50"
                  }`}
                >
                  {msg.content}
                </article>
              ))}
              {busy && (
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("chat.reflecting")}
                </div>
              )}
              {error && <p className="text-xs text-red-600">{error}</p>}
            </div>
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void submit(input);
              }}
            >
              <label className="sr-only" htmlFor="chat-input">
                {t("chat.inputLabel")}
              </label>
              <input
                id="chat-input"
                className="min-h-11 flex-1 rounded-full border border-emerald-900/20 bg-white px-4 py-2 text-base text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-emerald-600/40 dark:bg-emerald-950 dark:text-emerald-50 dark:placeholder:text-emerald-500"
                placeholder={t("chat.inputPlaceholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={busy}
                className="min-h-11 min-w-11 shrink-0 touch-manipulation rounded-full bg-emerald-800 p-3 text-white disabled:opacity-40 dark:bg-emerald-200 dark:text-emerald-950"
                aria-label={t("chat.sendAria")}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

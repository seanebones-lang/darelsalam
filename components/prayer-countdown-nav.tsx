"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CanonicalPrayer } from "@/lib/prayer-times";
import { useLocale } from "@/lib/i18n/locale-provider";
import { prayerLabel } from "@/lib/i18n/prayer-label";
import { cn } from "@/lib/utils";

type NextPayload = { prayer: CanonicalPrayer; target: string };

function formatRemaining(ms: number): string {
  if (ms <= 0) return "0:00";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PrayerCountdownNav({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const [next, setNext] = useState<NextPayload | null>(null);
  const [ready, setReady] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const refetchAfterZeroRef = useRef(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/next-iqamah", { cache: "no-store" });
      const data = (await res.json()) as { next: NextPayload | null };
      if (!res.ok) {
        setNext(null);
      } else {
        setNext(data.next);
      }
    } catch {
      setNext(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
    const id = window.setInterval(() => void load(), 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [load]);

  useEffect(() => {
    if (!next) return;
    const update = () => {
      setRemainingMs(
        Math.max(0, new Date(next.target).getTime() - Date.now()),
      );
    };
    queueMicrotask(update);
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [next]);

  useEffect(() => {
    if (!next || remainingMs > 0) return;
    if (refetchAfterZeroRef.current) return;
    refetchAfterZeroRef.current = true;
    const t = window.setTimeout(() => {
      void load();
      refetchAfterZeroRef.current = false;
    }, 1200);
    return () => {
      window.clearTimeout(t);
      refetchAfterZeroRef.current = false;
    };
  }, [next, remainingMs, load]);

  if (!ready) {
    return (
      <span
        className={cn(
          "text-xs text-emerald-700/70 tabular-nums dark:text-emerald-300/70 sm:text-sm",
          className,
        )}
        aria-hidden
      >
        …
      </span>
    );
  }

  if (!next) {
    return (
      <Link
        href="/prayer-times"
        className={cn(
          "touch-manipulation shrink-0 rounded-full border border-emerald-900/15 px-3 py-2.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60 sm:py-1 sm:text-sm",
          className,
        )}
      >
        {t("prayerCount.times")}
      </Link>
    );
  }

  return (
    <Link
      href="/prayer-times"
      title={t("prayerCount.scheduleTitle")}
      className={cn(
        "inline-flex min-h-[44px] max-w-full shrink-0 touch-manipulation flex-col items-center justify-center gap-0.5 whitespace-nowrap rounded-full border border-emerald-900/15 px-2 py-2 text-emerald-950 hover:bg-emerald-50 sm:min-h-0 sm:flex-row sm:items-baseline sm:justify-center sm:gap-2 sm:px-3 sm:py-1.5 dark:border-emerald-500/40 dark:text-emerald-50 dark:hover:bg-emerald-900/60",
        className,
      )}
    >
      <span className="text-[10px] font-medium leading-tight text-emerald-800 sm:text-[11px] md:text-xs dark:text-emerald-200">
        {prayerLabel(locale, next.prayer)} · {t("prayerCount.iqamah")}
      </span>
      <span className="font-mono text-[10px] tabular-nums leading-none text-emerald-950 sm:text-[11px] md:text-xs dark:text-emerald-100">
        {formatRemaining(remainingMs)}
      </span>
    </Link>
  );
}

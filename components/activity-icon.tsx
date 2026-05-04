"use client";

import { Building2, BookOpen, Compass } from "lucide-react";

export function ActivityIcon({ keyName }: { keyName?: string | null }) {
  const name = keyName ?? "mosque";
  const className = "h-8 w-8 text-emerald-700 dark:text-emerald-200";
  if (name === "book") return <BookOpen className={className} aria-hidden />;
  if (name === "compass") return <Compass className={className} aria-hidden />;
  return <Building2 className={className} aria-hidden />;
}

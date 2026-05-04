"use client";

import Image from "next/image";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import type { CarouselSlideSanity } from "@/lib/types/sanity";
import { cn } from "@/lib/utils";
import { sanityImageUrl } from "@/lib/sanity/image";
import { PortableBody } from "@/components/portable-body";
import { useLocale } from "@/lib/i18n/locale-provider";
import { useMemo, useState } from "react";

interface NewMuslimsCarouselProps {
  slides: CarouselSlideSanity[];
  sectionTitle?: string | null;
}

export function NewMuslimsCarousel({ slides, sectionTitle }: NewMuslimsCarouselProps) {
  const { t } = useLocale();
  const sanitized = useMemo(
    () => slides.filter(Boolean),
    [slides],
  );

  const [index, setIndex] = useState(0);

  if (!sanitized.length) {
    return null;
  }

  const active = sanitized[index];

  function next() {
    setIndex((i) => (i + 1) % sanitized.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + sanitized.length) % sanitized.length);
  }

  const imageSrc = active.image
    ? sanityImageUrl(active.image).width(900).quality(82).fit("crop").format("webp").url()
    : null;

  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center md:text-start">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-800 dark:text-emerald-200">
          {sectionTitle ?? "New Muslims"}
        </p>
        <h2 className="font-serif text-2xl text-emerald-950 sm:text-3xl dark:text-emerald-50">
          {active.title ?? t("carousel.supporting")}
        </h2>
      </div>
      <div className="rounded-[36px] border border-emerald-900/15 bg-emerald-50/40 px-4 py-6 shadow-inner sm:px-8 sm:py-10 dark:border-emerald-600/35 dark:bg-emerald-900">
        <div
          className={cn(
            "grid gap-8",
            imageSrc ? "md:grid-cols-[1.05fr_minmax(0,0.95fr)]" : "",
          )}
        >
          {imageSrc ? (
            <div className="relative aspect-video overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white dark:border-emerald-100/20">
              <Image
                src={imageSrc}
                alt={active.subtitle ?? active.title ?? "Illustration"}
                fill
                sizes="(min-width: 768px) 500px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="space-y-4 text-start">
            {active.subtitle && (
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                {active.subtitle}
              </p>
            )}
            <PortableBody value={active.body ?? []} />
            {active.linkHref && (
              <a
                href={active.linkHref}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-900/30 px-5 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-900 hover:text-white dark:border-emerald-100/40 dark:text-emerald-50"
              >
                {active.linkLabel ?? t("carousel.learnMore")}
              </a>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-emerald-900 sm:mt-8 sm:gap-8 dark:text-emerald-100">
          <button
            type="button"
            onClick={prev}
            aria-label={t("carousel.prev")}
            className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-white p-2 shadow-sm hover:bg-emerald-50 active:bg-emerald-100 dark:bg-emerald-800 dark:hover:bg-emerald-700"
          >
            <ArrowLeftCircle className="h-8 w-8" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={t("carousel.next")}
            className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-white p-2 shadow-sm hover:bg-emerald-50 active:bg-emerald-100 dark:bg-emerald-800 dark:hover:bg-emerald-700"
          >
            <ArrowRightCircle className="h-8 w-8" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

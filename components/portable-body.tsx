import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { sanityImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl font-semibold text-emerald-950 dark:text-emerald-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl font-semibold text-emerald-900 dark:text-emerald-50">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500/80 pl-5 text-lg italic text-zinc-700 dark:text-zinc-200">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-zinc-800 dark:text-emerald-100">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      return (
        <a
          href={href}
          className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-600 dark:text-emerald-300"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-emerald-950 dark:text-white">{children}</strong>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = sanityImageUrl(value).width(960).url();
      const alt = typeof value?.alt === "string" ? value.alt : "Illustration";
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={alt}
            width={960}
            height={540}
            className="rounded-2xl border border-emerald-900/10 shadow-sm"
          />
        </figure>
      );
    },
  },
};

interface PortableBodyProps {
  value: PortableTextBlock[] | undefined | null;
  className?: string;
}

export function PortableBody({ value, className }: PortableBodyProps) {
  if (!value?.length) return null;
  return (
    <div className={cn("space-y-5", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}

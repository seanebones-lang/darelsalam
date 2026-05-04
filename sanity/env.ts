/** API version pinned for GROQ + CDN stability — bump deliberately when Sanity docs recommend. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-06-06";

/**
 * Sanity requires project + dataset IDs for Studio and fetches.
 * Use `.env.local` with real IDs; placeholders allow Next build without secrets.
 */
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "offline-placeholder";

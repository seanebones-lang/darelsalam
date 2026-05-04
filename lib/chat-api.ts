/** Stable codes returned by POST /api/chat for client-side i18n. */
export const CHAT_ERROR_CODES = [
  "RATE_LIMIT",
  "INVALID_PAYLOAD",
  "CONVERSATION_TOO_LONG",
  "ASSISTANT_UNAVAILABLE",
  "UPSTREAM_ERROR",
  "UNKNOWN",
] as const;

export type ChatErrorCode = (typeof CHAT_ERROR_CODES)[number];

export function isChatErrorCode(value: unknown): value is ChatErrorCode {
  return typeof value === "string" && (CHAT_ERROR_CODES as readonly string[]).includes(value);
}

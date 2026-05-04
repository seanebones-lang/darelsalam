# Dar El Salam — Website

Public website and content tools for **Dar El Salam Islamic Center** (Arlington, TX). Built as a **Next.js (App Router)** application with **Sanity** for structured content, optional **Resend** for transactional email, **xAI** for the on-site etiquette assistant, and **Aladhan** for congregational prayer times.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Repository layout](#repository-layout)
3. [Prerequisites](#prerequisites)
4. [Local development](#local-development)
5. [Environment variables](#environment-variables)
6. [Content management (Sanity)](#content-management-sanity)
7. [API routes](#api-routes)
8. [Deployment (Vercel)](#deployment-vercel)
9. [Internationalization & theming](#internationalization--theming)
10. [Operations & limitations](#operations--limitations)
11. [Scripts](#scripts)

---

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 16** (App Router, React 19) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** |
| CMS | **Sanity v5** (`@sanity/client`, embedded Studio at `/studio`) |
| Portable text | `@portabletext/react` |
| Email | **Resend** (`/api/contact`) |
| Chat / LLM | **Vercel AI SDK** + **xAI**-compatible OpenAI base URL (`/api/chat`) |
| Prayer math | **Aladhan** REST API (`lib/prayer-times.ts`, `/api/next-iqamah`) |
| Validation | **Zod** |
| UI primitives | **Radix** (dialog), **Lucide** icons |

---

## Repository layout

```
app/
  (site)/           # Public pages (home, donate, prayer-times, legal, etc.)
  api/              # Route handlers (contact, chat, next-iqamah)
  studio/           # Sanity Studio shell (loads config from sanity.config.ts)
  layout.tsx        # Root layout: fonts, locale cookie, LocaleProvider
components/         # React UI (header, footer, forms, chat widget, etc.)
lib/
  i18n/             # Messages, locale cookie, server locale, RTL helpers
  sanity/           # Image URL helper
  site-data.ts      # Sanity fetch helpers + ISR revalidate windows
  prayer-times.ts   # Aladhan fetch + iqāmah clock math
  next-iqamah.ts    # Next iqāmah instant (masjid timezone)
  rate-limit.ts     # In-memory rate limits (see limitations)
  fallback-site.ts  # Static fallback when Sanity is offline / misconfigured
sanity/             # Schema types, desk structure, env
```

Legacy **Mobirise** HTML paths are redirected in `next.config.ts` (e.g. `/index.html` → `/`).

---

## Prerequisites

- **Node.js** 20.x or newer (LTS recommended)
- **npm** (lockfile: `package-lock.json`)
- Accounts (production): **Vercel**, **Sanity**, **Resend** (if using email), **xAI** (if using chat)

---

## Local development

```bash
git clone <repository-url>
cd darelsalam
npm install
```

Create **`.env.local`** in the project root (this repo does not ship a committed `.env.example`). Populate at least the `NEXT_PUBLIC_SANITY_*` variables so the site pulls real content—see [Environment variables](#environment-variables).

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)  
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

```bash
npm run lint
npm run build
```

`npm run build` must succeed before deploying; CI should run the same.

---

## Environment variables

Create **`.env.local`** for development and configure the same keys in **Vercel → Project → Settings → Environment Variables** for Preview and Production.

### Required for real CMS content

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (commonly `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional. Default `2024-06-06` in `sanity/env.ts` |

If `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing or set to `offline-placeholder`, the app serves **`lib/fallback-site.ts`** so builds and demos still run.

### Forms (`POST /api/contact`)

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key (required in **production** for outbound mail) |
| `FORMS_TO_EMAIL` | Recipient inbox for contact + fatwa submissions |
| `FORMS_FROM_EMAIL` | Sender address verified in Resend (defaults to `forms@resend.dev` in code if unset) |

In **development**, missing `RESEND_API_KEY` / `FORMS_TO_EMAIL` may log the payload and return success for local testing—see `app/api/contact/route.ts`.

### Chat assistant (`POST /api/chat`)

| Variable | Description |
|----------|-------------|
| `XAI_API_KEY` | xAI API key (required in **production** for live replies) |
| `XAI_MODEL` | Optional. Default `grok-2-latest` |

The route uses `@ai-sdk/openai` with `baseURL: https://api.x.ai/v1` (OpenAI-compatible).

### Sanity CORS

In **Sanity Manage → API → CORS origins**, add:

- `http://localhost:3000` (development)
- `https://<your-vercel-domain>.vercel.app`
- Production custom domain(s) when applicable

---

## Content management (Sanity)

- **Studio URL:** `/studio` (same origin as the site when deployed).
- **Schemas:** `sanity/schemaTypes/` (site settings, pages, legal docs, prayer overrides, donation tiers, carousel, etc.).
- **Client:** `lib/sanity/client.ts` — read-only, `useCdn: true`, `perspective: "published"`.
- **Draft / preview:** not wired in this repo; editors publish to the dataset the app reads.

**Deploying schema changes:** run Sanity CLI migrations / schema deploy per your org’s workflow (`sanity schema deploy` etc.) if you use separate Studio hosting; with embedded Studio, schema ships with the Next app.

---

## API routes

| Route | Method | Runtime | Purpose |
|-------|--------|---------|---------|
| `/api/contact` | `POST` | `nodejs` | Validates payload (Zod), rate-limits, sends email via Resend |
| `/api/chat` | `POST` | `nodejs` | Rate-limited chat; streams policy + Sanity context to xAI |
| `/api/next-iqamah` | `GET` | default | Next congregational iqāmah using Aladhan + Sanity overrides + site settings |

**Rate limiting** (`lib/rate-limit.ts`): in-memory counters keyed by client IP derived from `x-forwarded-for`, `x-real-ip`, or `cf-connecting-ip`. **Suitable for a single Node instance**; on **Vercel serverless**, each isolate has its own memory—limits are best-effort per instance. For strict global limits, migrate to **Vercel KV**, **Upstash Redis**, or edge middleware with a shared store.

---

## Deployment (Vercel)

1. Connect the Git repository to a **Vercel** project (or use `vercel link` + `vercel --prod`).
2. **Framework preset:** Next.js (auto-detected).
3. **Root directory:** repository root (this app is not a monorepo sub-app).
4. Set all [environment variables](#environment-variables) for **Production** (and **Preview** if needed).
5. **Sanity CORS** must include the Vercel URL(s).
6. **Image domains:** `cdn.sanity.io` is already allowed in `next.config.ts` under `images.remotePatterns`.

Production builds use `next build`; Node runtime is used for the API routes that declare `export const runtime = "nodejs"`.

---

## Internationalization & theming

- **Locales:** English (`en`) and Arabic (`ar`), toggled via UI; preference stored in cookie `des_locale` (see `lib/i18n/constants.ts`).
- **Root layout** reads the cookie and sets `<html lang>` and `<html dir>` (RTL for Arabic). **Noto Sans Arabic** is loaded for RTL body text.
- **Static UI copy** lives in `lib/i18n/messages.ts`. **Sanity-authored body copy** remains in the language stored in the CMS unless you extend schemas for bilingual fields.
- **Theme:** class-based dark mode on `<html>` (see `lib/theme.ts`, `components/theme-toggle.tsx`).

---

## Operations & limitations

- **Prayer times:** Aladhan is the upstream calculator; Sanity can override per-day adhān times; iqāmah offsets come from site settings. `/prayer-times` is `force-dynamic`; other pages may use ISR where `next: { revalidate: … }` is set in `lib/site-data.ts`.
- **No first-party database** in this repo; persistence is Sanity + optional email provider logs.
- **Chat:** instructs users toward Imam / forms for personal fiqh; operators should review xAI usage and retention policies independently.
- **Security headers / CSP:** add at platform (Vercel) or `next.config` if your security team requires a strict CSP.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server locally (after `build`) |
| `npm run lint` | ESLint (Next.js config) |

---

## Support & ownership

| Area | Owner / action |
|------|----------------|
| Domain & DNS | Congregation / registrar → point to Vercel |
| Vercel billing & env | Tech lead / treasurer per org policy |
| Sanity project & roles | Content / Imam office + technical admin |
| Resend domain & from-address | Verify sending domain for production deliverability |
| Legal copy in CMS | `legalPage` documents (`privacy`, `terms`) |

For questions about this codebase, contact the team maintaining the Git repository.

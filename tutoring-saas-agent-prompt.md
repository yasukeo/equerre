# Build brief — a tutoring SaaS for a private math tutor

> Paste everything below into Claude Code (or any coding agent) as the opening message of a fresh project.
>
> **Revision 2 — 2026-09-15.** Every version in §2 was checked against the npm registry on this date. What changed from v1 is listed at the end.

---

## Fill these in before you start

- Tutor name: `[NAME]` — if empty, use an obvious placeholder in one config file (`src/config/site.ts`) and log it
- Brand / product name: `[BRAND]` (if empty, propose 3 options and pick one, explain why)
- Domain: `[domain.com]` — if empty, read it from `NEXT_PUBLIC_SITE_URL` and use the Vercel preview URL
- Levels she teaches: `[e.g. 3AC → 2BAC SM]` — if empty, seed every level in §4.2; levels are data, never hardcoded in components
- Interface language: French (primary). Build i18n-ready with Arabic/RTL support planned.
- Country context: Morocco — currency MAD, timezone `Africa/Casablanca`, students mostly on mid-range Android.
- Supabase project: ref `sharzrtzesqofwpogvii`, region `eu-west-1` (already created, empty)

## 0. How to work on this

Read the whole brief before writing code. Make reasonable decisions on your own and log each one in `DECISIONS.md` instead of stopping to ask — only stop if something genuinely blocks you (missing credentials, a choice that would be expensive to reverse, anything that costs money).

Use every skill and tool you have available: design guidance before writing UI, accessibility checks, testing, screenshots to review your own work. If you have a frontend-design skill, load it before you touch a component. If a Supabase MCP is connected, use it for docs and run its security and performance advisors after every migration.

**Your training data is older than this stack.** Before using a framework API, read the version-matched docs: Next.js 16.3 ships its docs inside `node_modules/next/dist/docs/` and writes an `AGENTS.md` pointer the first time `next dev` runs. Do not write Next 14/15-era patterns from memory. In particular: no `middleware.ts`, no `next lint`, no synchronous `params` / `searchParams` / `cookies()`, no legacy `anon` / `service_role` keys, no `unstable_cache`.

## 1. What we're building

A single-tutor SaaS for a private math teacher. She currently runs everything through WhatsApp, paper worksheets and a notebook. This replaces all of it.

**Two audiences:**

- **The tutor** (one admin account): publishes lessons, exercises and tips; manages her students; schedules and logs sessions; corrects homework; chats; tracks who has paid.
- **Students** (and later a read-only parent view): read lessons, do assigned exercises, book sessions, chat with her, see their own progress.

**Definition of success:** she can run her entire week from the dashboard with no spreadsheet, and a 14-year-old on a weak 4G connection can find tonight's homework in under 10 seconds.

## 2. Stack — non-negotiable

Pin exact versions at scaffold time (`pnpm add -E`). If the registry shows a newer **major** than listed here when you start, read its migration guide and log the decision in `DECISIONS.md` before adopting it. Never downgrade to match what you remember.

| Layer | Package | Version | Notes |
|---|---|---|---|
| Runtime | Node.js | 24 LTS | `engines.node: ">=22.12"` (Vitest 5 floor). Set the Vercel project to 24.x. |
| Package manager | pnpm | 12.4.1 | Pinned via `packageManager` + Corepack. Vercel needs `ENABLE_EXPERIMENTAL_COREPACK=1`; pnpm 11/12 support only reached its build image on 2026-09-08 — if a deploy fails on it, fall back to pnpm 10 and log why. |
| Framework | `next` | 16.3.5 | App Router, Turbopack (default for dev and build). |
| UI runtime | `react`, `react-dom` | 19.3.0 | React Compiler on (`reactCompiler: true`, `babel-plugin-react-compiler` 1.0.0) — don't hand-write `useMemo`/`useCallback`. |
| Language | TypeScript | 7.0.2 | Strict. See the TypeScript note below. |
| Styling | `tailwindcss`, `@tailwindcss/postcss` | 4.3.3 | CSS-first `@theme` tokens, no `tailwind.config.js`. |
| Components | `shadcn` CLI | 4.21.0 | `shadcn init` with the Next template and Radix primitives; `tw-animate-css`; `lucide-react` icons. |
| Backend | `@supabase/supabase-js` / `@supabase/ssr` / `supabase` CLI | 2.116.0 / 0.12.7 / 2.117.0 | Postgres, Auth, Storage, Realtime. CLI as a devDependency. |
| Validation | `zod` | 4.6.5 | Every server action and route handler. |
| Client cache | `@tanstack/react-query` | 5.102.8 | Only where client-side caching genuinely earns its place (chat inbox, live counts). |
| Rich content | `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-mathematics` | 3.31.3 | Authoring. Render stored JSON on the server for readers. |
| Math | `katex` | 0.18.7 | Inline `$…$` and block `$$…$$`. |
| Dates | `date-fns` + `@date-fns/tz` | 4.4.0 + 1.5.0 | Use `TZDate`. Replaces `date-fns-tz` from v1 (older third-party companion; `@date-fns/tz` is the official one for v4). |
| i18n | `next-intl` | 4.14.5 | Every string through a dictionary. |
| Email | `resend` | 6.28.0 | React Email for templates. No-op with a console log when `RESEND_API_KEY` is absent. |
| PDF receipts | `@react-pdf/renderer` | 4.9.0 | Server-side only. |
| Lint / format | `eslint` + `eslint-config-next` / `prettier` + `prettier-plugin-tailwindcss` | 9.39.5 + 16.3.5 / 3.9.6 + 0.8.1 | Flat config. **Not ESLint 10**: `eslint-plugin-react`, `-import` and `-jsx-a11y` (bundled in `eslint-config-next`) don't accept it yet. The lint script is `eslint .` — `next lint` was removed in Next 16. |
| Unit tests | `vitest` | 5.0.0 | Logic, zod schemas, timezone maths, RLS via real sessions. |
| E2E | `@playwright/test` + `@next/playwright` | 1.63.0 + 16.3.5 | The three critical flows. Use `instant()` to lock in the "homework in under 10 seconds" navigation. |
| DB tests | pgTAP via `supabase test db` | — | RLS assertions in SQL. |
| Deploy | Vercel | — | Function region `dub1` (next to Supabase `eu-west-1`). |

**TypeScript note.** TypeScript 7 has no JavaScript API yet (planned for 7.1), and `typescript-eslint` still requires TypeScript < 6.1. Run both side by side:

```json
"typescript": "npm:@typescript/typescript6@6.0.2",
"@typescript/native": "npm:typescript@7.0.2"
```

`tsc` then resolves to 7 (use it for `pnpm typecheck`) and anything importing `typescript` gets 6. Since 16.3.5, `next build` type-checks with the project's `tsc` binary by default (`experimental.useTypeScriptCli`), so it picks up 7 with no extra config. TypeScript 7 rejects `baseUrl` and classic/node10 resolution — use `moduleResolution: "bundler"` and `paths`. Remove this workaround as soon as `typescript-eslint` supports 7.

**Next.js 16.3 configuration to use from day one:**

- `proxy.ts` at the project root refreshes the Supabase session (this replaced `middleware.ts`).
- `cacheComponents: true` — cache public lessons and posts with `"use cache"`, `cacheLife` and `cacheTag`; call `updateTag()` from server actions for read-your-own-writes and `revalidatePath` when a whole route changes.
- `partialPrefetching: true` so a student's tap renders an instant shell on a slow connection.
- `experimental.useOffline: true` plus the `useOffline()` hook for the "you're offline, retrying" banner (§8).
- `catchError` from `next/error` for error boundaries that can retry server components.
- `params`, `searchParams`, `cookies()` and `headers()` are all async. Use the generated `PageProps<'/route'>` types.

**Supabase keys and auth.** Use the publishable key (`sb_publishable_…`) in the browser and the secret key (`sb_secret_…`) only on the server. The legacy `anon` and `service_role` keys stop working at the end of 2026 — don't use them anywhere. Verify identity with `supabase.auth.getClaims()`; never make an authorisation decision from `getSession()`.

**Scheduled jobs** (reminders, message digests) run on **Supabase Cron** (`pg_cron` + `pg_net`) calling a route handler guarded by `CRON_SECRET`. Vercel Hobby cron runs at most once a day, which cannot send a 2-hour reminder.

Do not add a state library, a CMS, a second UI kit, a second ORM (the Supabase client plus generated types *is* the data layer — no Prisma or Drizzle), or Redis/Upstash (rate limits live in Postgres).

## 3. Roles

`tutor` (exactly one, seeded — never self-signup), `student`, `parent` (read-only, phase 4), and anonymous visitors for the public pages.

Enforce roles in Postgres with a `is_tutor()` helper used by policies, not just in the UI. Helpers are `security definer`, `stable`, with `set search_path = ''`, and policies call `(select auth.uid())` rather than `auth.uid()` so Postgres evaluates it once per statement.

## 4. Modules

### 4.1 Auth and onboarding

Email + password and magic link. Phone number is stored for WhatsApp contact but email is the identity. Students can either self-register with an invite code or be created directly by the tutor — both paths must work. A `profiles` row is created on signup (a trigger on `auth.users`) with role, level, school, and guardian contact. The client can never choose its own role.

**Done when:** a student invited by the tutor can set a password and land on their dashboard, and a signed-out visitor hitting a private route is redirected cleanly.

### 4.2 Lessons library

Content hierarchy: **Niveau → Chapitre → Leçon**. Use real Moroccan levels: 1AC, 2AC, 3AC, Tronc Commun, 1BAC (SM / SE / SVT / Éco), 2BAC (SM-A, SM-B, PC, SVT, Éco).

The editor needs: headings, lists, images, inline and block LaTeX, PDF attachments, and styled callout blocks for *définition*, *théorème*, *propriété*, *exemple*, *attention*. Lessons have draft/published states and a visibility setting: public, enrolled students only, or specific students.

Published public lessons are prerendered (`generateStaticParams` + `"use cache"`), indexable, and have OG images (`opengraph-image.tsx` with `next/og`). KaTeX is rendered on the server so readers don't download the editor.

**Done when:** she can write a lesson with a displayed equation and a downloadable PDF, publish it to one level, and a student in that level sees it while others don't.

### 4.3 Exercises and assignments

An exercise belongs to a chapter and has a difficulty (1–5), tags, a statement with LaTeX, an optional figure, and a solution hidden until the student submits or explicitly reveals it. Record when the solution was revealed — a grade after a reveal means something different.

Three answer types: **upload** (a photo of handwritten work — the most common case, so make the mobile camera path excellent), **numeric** with tolerance, and **MCQ**. The last two grade themselves, on the server.

Camera path specifics: `accept="image/*" capture="environment"`, several pages per submission, downscale and re-encode on the device before upload (Android photos are 4–8 MB; aim for well under 1 MB per page), a visible per-page progress bar, and automatic retry so a dropped connection never loses a photo.

Assignments bundle exercises for a student or a group with a due date. The student sees three states: à faire, rendu, corrigé. The tutor's correction view shows the submission, lets her annotate with comments, give a grade out of 20, and mark it corrected — which notifies the student.

**Done when:** a student photographs an exercise from a phone, it uploads, she grades it, and the grade appears on the student's progress view.

### 4.4 Tips and blog

Short public posts — method tips, exam preparation, common mistakes. Categories, reading time, SEO metadata. This is the top of her funnel, so it lives on the public site.

### 4.5 Students (light CRM)

A searchable list filtered by level, status (actif / en pause / arrêté), next session, and remaining hour balance.

Each student page holds: profile, guardian contact, level, objectives, **private tutor-only notes**, session history, assignment history, grade average, attendance rate, and payment record.

Private notes live in their own `student_notes` table. RLS works per row, not per column — a note stored on `profiles` would be readable by the student who owns that row.

Groups (e.g. "2BAC SM — mardi 18h") are used for group sessions and bulk assignments. A student can be in several.

### 4.6 Bookings and sessions

She sets weekly recurring availability, plus date-specific exceptions for holidays and blocked slots.

Session types carry a duration, a mode (en ligne / à domicile / chez le professeur), and a price in MAD. A student requests a free slot, which lands as pending until she confirms or declines — with a setting to auto-confirm for trusted students. Weekly recurring sessions are supported, with individual occurrences editable without breaking the series. Two confirmed sessions can never overlap: enforce it with an exclusion constraint in Postgres, not a check in the UI.

Lifecycle: planifiée → terminée / annulée / absent. Group sessions record attendance per student. On completion she logs what was covered (linked to a chapter), the homework given, and a short note.

A cancellation window (default 24h) is enforced server-side, not just hidden in the UI.

Views: month, week and agenda for her; a "prochaine séance" card plus a list for students. Export as ICS and an add-to-Google-Calendar link. Email reminders 24h and 2h before, sent by a Supabase Cron job every 15 minutes that is idempotent (a `reminder_24h_sent_at` / `reminder_2h_sent_at` stamp per session, so a retry never sends twice).

**Timezone rule:** store every timestamp in UTC (`timestamptz`) and render through the IANA zone `Africa/Casablanca` with `TZDate`. Never hardcode an offset — Morocco shifts its clocks during Ramadan and a hardcoded +1 will silently break every booking for a month. Weekly availability is stored as local wall-clock times and converted per date, so a Tuesday 18:00 slot stays 18:00 across the Ramadan change. Cover the change-over dates with unit tests.

**Done when:** she blocks a week for holidays, a student tries to book inside it and can't, books the following week instead, and both get the right local time in their email.

### 4.7 Chat

One-to-one conversations between tutor and student, plus one conversation per group. Built on Supabase Realtime with RLS so only participants can read a thread.

Messages support attachments (images, PDFs, 10MB cap) through private Storage with signed URLs, and inline LaTeX with `$...$` — a student asking "why is this step wrong" needs to type math.

Unread counts, read receipts, and an ordered inbox for her with a one-click jump to the student's profile. Typing indicators are optional. Voice notes and calls are out of scope.

Messages get a client-generated UUID so a retry after a dropped connection can't create a duplicate, and an unsent draft is kept per conversation on the device until it's delivered. Rate-limit sending in Postgres.

**Done when:** two browsers exchange messages live with no refresh, and a third account can't read the thread through the API.

### 4.8 Payments — tracking, not processing

Hour packs and monthly subscriptions priced in MAD. Payments are recorded manually with a method (espèces, virement, chèque, transfert), the balance computes itself, and overdue accounts are flagged on her dashboard. Generate a simple PDF receipt.

No payment gateway in v1 — but keep the payment logic behind an interface so CMI, YouCan Pay or PayZone can slot in later.

### 4.9 Dashboards and notifications

Her home screen: today's sessions, pending booking requests, submissions waiting for correction, unread messages, unpaid balances, and the two or three actions she takes most often.

The student's home: next session, assignments due, newest lessons, unread messages, progress.

In-app notification centre plus email for booking confirmed or declined, session reminders, new assignment, correction ready, and new messages — messages as a digest (built by the same cron job), never one email per message.

## 5. Data model

Start from this and extend where needed:

```
profiles        id(→auth.users), role, full_name, phone, level, school,
                guardian_name, guardian_phone, status, avatar_url
student_notes   id, student_id, body, created_at, updated_at   -- tutor-only
student_settings student_id, auto_confirm_bookings, objectives
invite_codes    code, level, group_id?, max_uses, used_count, expires_at
guardian_links  parent_id, student_id                          -- phase 4
groups          id, name, level, schedule_label
group_members   group_id, student_id
chapters        id, level, title, position, description
lessons         id, chapter_id, title, slug, content(jsonb), status,
                visibility, published_at, updated_at
lesson_access   lesson_id, student_id            -- for targeted visibility
exercises       id, chapter_id, title, statement(jsonb), solution(jsonb),
                difficulty, answer_type, correct_answer, tolerance, tags[]
assignments     id, title, due_at, student_id?, group_id?, created_by
assignment_items assignment_id, exercise_id, position
submissions     id, assignment_item_id, student_id, answer, file_paths[],
                status, grade numeric(4,2) 0–20, feedback,
                solution_revealed_at, submitted_at, corrected_at
submission_comments id, submission_id, author_id, body, anchor(jsonb),
                created_at
availability    id, weekday, start_time, end_time, session_type_id
availability_exceptions id, date, is_blocked, start_time, end_time
session_types   id, name, duration_min, mode, price_mad
booking_settings id(singleton), cancellation_window_hours, min_notice_hours
session_series  id, rule, starts_on, ends_on     -- weekly recurrence
sessions        id, student_id?, group_id?, session_type_id, starts_at,
                ends_at, status, mode, location, meeting_url,
                series_id, covered_chapter_id, homework, notes,
                reminder_24h_sent_at, reminder_2h_sent_at
session_attendance session_id, student_id, status   -- group sessions
conversations   id, type, group_id?
conversation_participants conversation_id, profile_id, last_read_at
messages        id(client-generated), conversation_id, sender_id, body,
                attachments(jsonb), created_at
plans           id, kind(hour_pack|subscription), name, hours, price_mad,
                period_months
payments        id, student_id, plan_id?, amount_mad, method, covers_from,
                covers_to, hours_credited, note, paid_at
notifications   id, profile_id, type, payload(jsonb), read_at
posts           id, title, slug, excerpt, content(jsonb), category,
                published_at
rate_limits     key, window_start, count
```

Index what you query: sessions by `starts_at`, messages by `conversation_id, created_at`, submissions by `student_id, status`, and every foreign key that a policy joins on.

## 6. Security

- RLS enabled on every single table, deny by default, policies written explicitly per operation.
- Policies built on `(select auth.uid())` with SQL helpers `is_tutor()` and `is_participant(conversation_id)`.
- Storage buckets: `lesson-assets` (public read once published), `submissions` (private, signed URLs only), `chat-attachments` (private). Storage policies are written in SQL alongside the table policies.
- The secret key never reaches the client (`import 'server-only'` in every module that reads it). Every server-side use of it is listed in `DECISIONS.md` with a justification.
- Every server action validates its input with zod. Never trust an ID sent from the client that points at another user's row.
- Rate-limit auth attempts (configure Supabase Auth's limits) and message sending (Postgres).
- Write tests that assert student A cannot read student B's submissions, messages, grades, or private notes — through the API, not just the UI.
- Run the Supabase security and performance advisors after every migration and fix what they report.

## 7. Design brief

**Audience:** Moroccan teenagers aged 12–18 on mid-range Android phones, plus one adult power user on a laptop who lives in this app daily, plus parents who visit once and decide whether to trust her.

**Two surfaces, one identity.** The public site has to earn a parent's trust in fifteen seconds and should breathe. The workspace is dense, fast, and built for repetition. Same palette and typefaces, very different density. Don't apply marketing-page spacing to a table she scans forty times a day.

**Before writing any component**, produce a `DESIGN.md` with: 4–6 named colour tokens as hex, the typefaces and their roles, a type scale, a layout concept with a rough wireframe, and one sentence per choice explaining why it fits *this* brief. Then review it — if a choice is what you'd produce for any generic SaaS, replace it and say what changed. Typefaces must cover French accents and have an Arabic companion planned; load them with `next/font` and keep the total font payload small.

**Ground it in the subject.** Mathematics has its own visual language: grid and graph paper, construction lines, compass arcs, the discipline of a proof laid out in steps, chalk on slate. Take structure from it, not clip art. Spend your boldness in exactly one place and keep everything around it quiet.

**Avoid** — these read as machine-generated: warm cream background with a high-contrast serif and a terracotta accent; identical rounded cards with the same soft shadow under everything; tracked-out ALL-CAPS eyebrow labels; arrows glued onto button text; gradient washes as decoration; scroll-triggered fade-up on every section.

**Motion** only where it shows what changed — a solution revealing, a message landing, a session confirming. Nothing decorative.

**Copy** is French, sentence case, plain verbs, written from the user's side. Buttons name the outcome: "Réserver la séance", not "Valider". An action keeps the same word through the whole flow. Empty screens say what to do next. Errors say what went wrong and how to fix it, without apologising.

**Mobile-first for students** — bottom navigation, thumb-reachable primary actions, the camera-upload path for homework polished to the point of being pleasant. **Desktop-first density for the tutor**, but every screen still has to work on her phone between sessions.

Dark mode is tokenised from the start, not bolted on.

## 8. Quality floor

- WCAG 2.2 AA: 4.5:1 contrast, a visible focus ring on every interactive element, full keyboard operation, correct labels and `aria-live` on async results.
- Never signal state by colour alone — grades, session status and payment status each need a shape, icon or word too.
- Respect `prefers-reduced-motion`. Hit targets at least 44px. Layout survives 200% zoom and an enlarged OS font.
- Lighthouse 90+ on public pages; LCP under 2.5s on throttled 4G on a low-end Android. Server components by default, client JS only where it's needed.
- Tolerate a dropped connection: show it clearly (`useOffline`), retry, and never lose a message or a photo the student already produced.
- Every string goes through a dictionary (next-intl) and layouts use CSS logical properties, so Arabic and RTL are a config change and not a rewrite — even though only `fr` ships in v1.

## 9. Build order

Ship each phase working and deployed before starting the next. Don't scaffold empty routes ahead of time.

0. Scaffold, Supabase project, auth and roles, app shell, design tokens, `DESIGN.md`, and a seed script: 1 tutor, 8 students, 3 groups, 12 lessons, 30 exercises, 40 sessions across past and future. Develop against the hosted Supabase project; `supabase start` (local, needs Docker) is optional. The seed creates auth users through the admin API with the secret key, so it only ever runs from a developer machine.
1. Lessons, exercises, assignments, submissions, corrections.
2. Students CRM, availability, bookings, sessions, calendar, reminders.
3. Chat and notifications.
4. Payment tracking, public marketing site and blog, parent view.

## 10. Working rules

- Strict TypeScript, no `any`, no `@ts-ignore`. Generate database types from Supabase (`pnpm db:types`) and use them everywhere.
- Server components by default; `"use client"` only where interactivity requires it.
- Every mutation is a server action with a zod schema, a typed result, and the right `updateTag` / `revalidatePath`.
- Small commits, conventional messages.
- No secrets in the repo. `.env.example` documents every key.
- Tell me and wait before any destructive migration, and before anything that costs money.
- Run `pnpm lint`, `pnpm typecheck` and `pnpm test` before calling a phase done. Fix problems rather than suppressing them.
- Keep `DECISIONS.md` current with every assumption and why you made it.
- At the end of each phase, give me a short report: what works, what's stubbed, how to test it by hand, and the three things you'd do next.

## 11. Deliverables

A README that takes someone from a clean machine to a running app, a schema diagram, a deployed Vercel preview, seed data, `DESIGN.md`, and `DECISIONS.md`.

---

## Changes from v1

- **Versions.** Next.js 15 → 16.3.5, React 19 → 19.3, TypeScript → 7.0.2 (with TypeScript 6 kept for linting), Tailwind → 4.3, shadcn CLI → 4, Zod → 4, Tiptap → 3, Vitest → 5, Playwright → 1.63, pnpm → 12, Node 24 LTS. All pinned exactly.
- **ESLint stays on 9.** ESLint 10 exists, but the plugins inside `eslint-config-next` don't accept it yet.
- **`date-fns-tz` → `@date-fns/tz`**, the official timezone package for date-fns 4.
- **Supabase keys.** `service_role`/`anon` → secret/publishable keys (the legacy ones stop working at the end of 2026); `getClaims()` for auth checks.
- **Next.js 16 conventions spelled out:** `proxy.ts`, Cache Components, `updateTag`, partial prefetching, offline support, React Compiler, no `next lint`.
- **Reminders use Supabase Cron**, because Vercel Hobby cron can't run more than once a day.
- **Data model fixes:** private notes moved to their own table (per-row RLS would have leaked them); added invite codes, group attendance, recurrence series, submission comments, plans, booking settings, idempotent reminder stamps, and a Postgres rate-limit table.
- **Safety details:** overlap exclusion constraint for bookings, client-generated message IDs, on-device photo compression with retry, Ramadan clock-change tests, `server-only` guard on the secret key.

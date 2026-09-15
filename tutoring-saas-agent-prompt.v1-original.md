# Build brief — a tutoring SaaS for a private math tutor

> Paste everything below into Claude Code (or any coding agent) as the opening message of a fresh project.

---

## Fill these in before you start

- Tutor name: `[NAME]`
- Brand / product name: `[BRAND]` (if empty, propose 3 options and pick one, explain why)
- Domain: `[domain.com]`
- Levels she teaches: `[e.g. 3AC → 2BAC SM]`
- Interface language: French (primary). Build i18n-ready with Arabic/RTL support planned.
- Country context: Morocco — currency MAD, timezone `Africa/Casablanca`, students mostly on mid-range Android.

## 0. How to work on this

Read the whole brief before writing code. Make reasonable decisions on your own and log each one in `DECISIONS.md` instead of stopping to ask — only stop if something genuinely blocks you (missing credentials, a choice that would be expensive to reverse).

Use every skill and tool you have available: design guidance before writing UI, accessibility checks, testing, screenshots to review your own work. If you have a frontend-design skill, load it before you touch a component.

## 1. What we're building

A single-tutor SaaS for a private math teacher. She currently runs everything through WhatsApp, paper worksheets and a notebook. This replaces all of it.

**Two audiences:**

- **The tutor** (one admin account): publishes lessons, exercises and tips; manages her students; schedules and logs sessions; corrects homework; chats; tracks who has paid.
- **Students** (and later a read-only parent view): read lessons, do assigned exercises, book sessions, chat with her, see their own progress.

**Definition of success:** she can run her entire week from the dashboard with no spreadsheet, and a 14-year-old on a weak 4G connection can find tonight's homework in under 10 seconds.

## 2. Stack — non-negotiable

- Next.js 15 (App Router), React 19, TypeScript in strict mode
- Tailwind CSS v4 + shadcn/ui
- Supabase: Postgres, Auth, Storage, Realtime — RLS on every table
- Migrations via the Supabase CLI, checked into `supabase/migrations/`
- Server Actions for all mutations, validated with zod. TanStack Query only where client-side caching genuinely earns its place
- KaTeX for math rendering, Tiptap for rich content authoring
- `date-fns` + `date-fns-tz` for all date handling
- Resend for transactional email (no-op with a console log when the key is absent)
- pnpm, ESLint, Prettier, Vitest for logic, Playwright for the three critical flows (book a session, submit an exercise, send a message)
- Deploy to Vercel

Do not add a state library, a CMS, a second UI kit, or a second ORM.

## 3. Roles

`tutor` (exactly one, seeded — never self-signup), `student`, `parent` (read-only, phase 4), and anonymous visitors for the public pages.

Enforce roles in Postgres with a `is_tutor()` helper used by policies, not just in the UI.

## 4. Modules

### 4.1 Auth and onboarding

Email + password and magic link. Phone number is stored for WhatsApp contact but email is the identity. Students can either self-register with an invite code or be created directly by the tutor — both paths must work. A `profiles` row is created on signup with role, level, school, and guardian contact.

**Done when:** a student invited by the tutor can set a password and land on their dashboard, and a signed-out visitor hitting a private route is redirected cleanly.

### 4.2 Lessons library

Content hierarchy: **Niveau → Chapitre → Leçon**. Use real Moroccan levels: 1AC, 2AC, 3AC, Tronc Commun, 1BAC (SM / SE / SVT / Éco), 2BAC (SM-A, SM-B, PC, SVT, Éco).

The editor needs: headings, lists, images, inline and block LaTeX, PDF attachments, and styled callout blocks for *définition*, *théorème*, *propriété*, *exemple*, *attention*. Lessons have draft/published states and a visibility setting: public, enrolled students only, or specific students.

Published public lessons are statically rendered, indexable, and have OG images.

**Done when:** she can write a lesson with a displayed equation and a downloadable PDF, publish it to one level, and a student in that level sees it while others don't.

### 4.3 Exercises and assignments

An exercise belongs to a chapter and has a difficulty (1–5), tags, a statement with LaTeX, an optional figure, and a solution hidden until the student submits or explicitly reveals it.

Three answer types: **upload** (a photo of handwritten work — the most common case, so make the mobile camera path excellent), **numeric** with tolerance, and **MCQ**. The last two grade themselves.

Assignments bundle exercises for a student or a group with a due date. The student sees three states: à faire, rendu, corrigé. The tutor's correction view shows the submission, lets her annotate with comments, give a grade out of 20, and mark it corrected — which notifies the student.

**Done when:** a student photographs an exercise from a phone, it uploads, she grades it, and the grade appears on the student's progress view.

### 4.4 Tips and blog

Short public posts — method tips, exam preparation, common mistakes. Categories, reading time, SEO metadata. This is the top of her funnel, so it lives on the public site.

### 4.5 Students (light CRM)

A searchable list filtered by level, status (actif / en pause / arrêté), next session, and remaining hour balance.

Each student page holds: profile, guardian contact, level, objectives, **private tutor-only notes**, session history, assignment history, grade average, attendance rate, and payment record.

Groups (e.g. "2BAC SM — mardi 18h") are used for group sessions and bulk assignments. A student can be in several.

### 4.6 Bookings and sessions

She sets weekly recurring availability, plus date-specific exceptions for holidays and blocked slots.

Session types carry a duration, a mode (en ligne / à domicile / chez le professeur), and a price in MAD. A student requests a free slot, which lands as pending until she confirms or declines — with a setting to auto-confirm for trusted students. Weekly recurring sessions are supported, with individual occurrences editable without breaking the series.

Lifecycle: planifiée → terminée / annulée / absent. On completion she logs what was covered (linked to a chapter), the homework given, and a short note.

A cancellation window (default 24h) is enforced server-side, not just hidden in the UI.

Views: month, week and agenda for her; a "prochaine séance" card plus a list for students. Export as ICS and an add-to-Google-Calendar link. Email reminders 24h and 2h before, via a scheduled job.

**Timezone rule:** store every timestamp in UTC and render through the IANA zone `Africa/Casablanca`. Never hardcode an offset — Morocco shifts its clocks during Ramadan and a hardcoded +1 will silently break every booking for a month.

**Done when:** she blocks a week for holidays, a student tries to book inside it and can't, books the following week instead, and both get the right local time in their email.

### 4.7 Chat

One-to-one conversations between tutor and student, plus one conversation per group. Built on Supabase Realtime with RLS so only participants can read a thread.

Messages support attachments (images, PDFs, 10MB cap) through private Storage with signed URLs, and inline LaTeX with `$...$` — a student asking "why is this step wrong" needs to type math.

Unread counts, read receipts, and an ordered inbox for her with a one-click jump to the student's profile. Typing indicators are optional. Voice notes and calls are out of scope.

**Done when:** two browsers exchange messages live with no refresh, and a third account can't read the thread through the API.

### 4.8 Payments — tracking, not processing

Hour packs and monthly subscriptions priced in MAD. Payments are recorded manually with a method (espèces, virement, chèque, transfert), the balance computes itself, and overdue accounts are flagged on her dashboard. Generate a simple PDF receipt.

No payment gateway in v1 — but keep the payment logic behind an interface so CMI, YouCan Pay or PayZone can slot in later.

### 4.9 Dashboards and notifications

Her home screen: today's sessions, pending booking requests, submissions waiting for correction, unread messages, unpaid balances, and the two or three actions she takes most often.

The student's home: next session, assignments due, newest lessons, unread messages, progress.

In-app notification centre plus email for booking confirmed or declined, session reminders, new assignment, correction ready, and new messages — messages as a digest, never one email per message.

## 5. Data model

Start from this and extend where needed:

```
profiles        id(→auth.users), role, full_name, phone, level, school,
                guardian_name, guardian_phone, status, avatar_url
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
submissions     id, assignment_item_id, student_id, answer, file_path,
                status, grade, feedback, submitted_at, corrected_at
availability    id, weekday, start_time, end_time, session_type_id
availability_exceptions id, date, is_blocked, start_time, end_time
session_types   id, name, duration_min, mode, price_mad
sessions        id, student_id?, group_id?, session_type_id, starts_at,
                ends_at, status, mode, location, meeting_url,
                recurrence_id, covered_chapter_id, homework, notes
conversations   id, type, group_id?
conversation_participants conversation_id, profile_id, last_read_at
messages        id, conversation_id, sender_id, body, attachments(jsonb),
                created_at
payments        id, student_id, amount_mad, method, covers_from, covers_to,
                hours_credited, note, paid_at
notifications   id, profile_id, type, payload(jsonb), read_at
posts           id, title, slug, excerpt, content(jsonb), category,
                published_at
```

Index what you query: sessions by `starts_at`, messages by `conversation_id, created_at`, submissions by `student_id, status`.

## 6. Security

- RLS enabled on every single table, deny by default, policies written explicitly per operation.
- Policies built on `auth.uid()` with SQL helpers `is_tutor()` and `is_participant(conversation_id)`.
- Storage buckets: `lesson-assets` (public read once published), `submissions` (private, signed URLs only), `chat-attachments` (private).
- The service-role key never reaches the client. Every server-side use of it is listed in `DECISIONS.md` with a justification.
- Every server action validates its input with zod. Never trust an ID sent from the client that points at another user's row.
- Rate-limit auth attempts and message sending.
- Write tests that assert student A cannot read student B's submissions, messages, grades, or private notes — through the API, not just the UI.

## 7. Design brief

**Audience:** Moroccan teenagers aged 12–18 on mid-range Android phones, plus one adult power user on a laptop who lives in this app daily, plus parents who visit once and decide whether to trust her.

**Two surfaces, one identity.** The public site has to earn a parent's trust in fifteen seconds and should breathe. The workspace is dense, fast, and built for repetition. Same palette and typefaces, very different density. Don't apply marketing-page spacing to a table she scans forty times a day.

**Before writing any component**, produce a `DESIGN.md` with: 4–6 named colour tokens as hex, the typefaces and their roles, a type scale, a layout concept with a rough wireframe, and one sentence per choice explaining why it fits *this* brief. Then review it — if a choice is what you'd produce for any generic SaaS, replace it and say what changed.

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
- Tolerate a dropped connection: show it clearly, retry, and never lose a message the student already typed.
- Every string goes through a dictionary (next-intl) and layouts use CSS logical properties, so Arabic and RTL are a config change and not a rewrite — even though only `fr` ships in v1.

## 9. Build order

Ship each phase working and deployed before starting the next. Don't scaffold empty routes ahead of time.

0. Scaffold, Supabase project, auth and roles, app shell, design tokens, `DESIGN.md`, and a seed script: 1 tutor, 8 students, 3 groups, 12 lessons, 30 exercises, 40 sessions across past and future.
1. Lessons, exercises, assignments, submissions, corrections.
2. Students CRM, availability, bookings, sessions, calendar, reminders.
3. Chat and notifications.
4. Payment tracking, public marketing site and blog, parent view.

## 10. Working rules

- Strict TypeScript, no `any`, no `@ts-ignore`. Generate database types from Supabase and use them everywhere.
- Server components by default; `"use client"` only where interactivity requires it.
- Every mutation is a server action with a zod schema, a typed result, and the right `revalidatePath`.
- Small commits, conventional messages.
- No secrets in the repo. `.env.example` documents every key.
- Tell me and wait before any destructive migration.
- Run lint, typecheck and tests before calling a phase done. Fix problems rather than suppressing them.
- Keep `DECISIONS.md` current with every assumption and why you made it.
- At the end of each phase, give me a short report: what works, what's stubbed, how to test it by hand, and the three things you'd do next.

## 11. Deliverables

A README that takes someone from a clean machine to a running app, a schema diagram, a deployed Vercel preview, seed data, `DESIGN.md`, and `DECISIONS.md`.

# DECISIONS.md

Every assumption and non-obvious choice, with the reason. Newest entries at the bottom of each section.

## Project and brief

**D-001 — Project lives in `Desktop/Tutoring`, brief kept alongside.**
The brief (`tutoring-saas-agent-prompt.md`, revision 2) sits at the repo root, with the original kept as `tutoring-saas-agent-prompt.v1-original.md`. Why: the brief is the source of truth for scope, and it was updated in place (versions, data-model fixes) before any code was written.

**D-002 — Brand: Équerre.**
The brief left the brand empty. Three options:

1. **Équerre** (set square) — every Moroccan student owns one from primary school on; it stands for construction, precision and right angles; short; works in French and reads cleanly in Arabic transliteration.
2. **Quadrillé** (squared paper) — ties directly to the exercise book she's replacing, but it's an adjective and weaker as a name.
3. **Pas à pas** (step by step) — describes the teaching well, but it's a generic phrase already used by many tutoring services and hard to own.

Picked **Équerre**: the most ownable, the most concrete object, and it anchors the design language (construction, rulers, graduated scales). Domain suggestion: `equerre.ma`. Rename by changing `siteConfig.brand`.

**D-003 — Levels: all of them, as data.**
The brief's "levels she teaches" was empty. Every level in §4.2 is seeded into a `levels` table rather than an enum, so she can add or retire a track without a migration. 1BAC SVT is kept separate from SE because the brief lists it.

**D-004 — The tutor's name; the city is still a placeholder.**
The tutor is Keltoum Gharbaoui (given on 2026-09-26). The name lives in `siteConfig.tutorName` and in the seed's tutor account. It shows in the app's header and on the share pictures (D-048). No city is invented; public copy that needs one waits for phase 4.

## Stack and tooling

**D-010 — Versions pinned on 2026-09-15.**
Exact versions in `package.json`, verified against the npm registry the same day. See the brief §2 for the table.

**D-011 — TypeScript 7 for type-checking, TypeScript 6 for linting.**
TypeScript 7.0 ships no JavaScript API, and `typescript-eslint` requires TypeScript < 6.1. `typescript` is aliased to `@typescript/typescript6` (what ESLint and editors import) and `@typescript/native` to `typescript@7.0.2` (whose `tsc` binary runs `pnpm typecheck` and `next build`). Remove the alias once `typescript-eslint` supports TypeScript 7.

**D-012 — ESLint 9, not 10.**
ESLint 10 is out, but `eslint-plugin-react`, `eslint-plugin-import` and `eslint-plugin-jsx-a11y` (all inside `eslint-config-next` 16.3.5) cap their peer range at 9.

**D-013 — pnpm 12 through `npx pnpm@12.4.1` locally.**
The Corepack bundled with Node 22.21 (0.34) looks for `bin/pnpm.cjs`, which pnpm 12 no longer ships, so `corepack pnpm@12` fails. `packageManager` still pins 12.4.1. On Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1`; if that build image's Corepack has the same problem, pin pnpm 10 for deploys and log it here.

**D-014 — `@parcel/watcher` and `@swc/core` build scripts disabled.**
pnpm 12 blocks install scripts by default. Both come from `next-intl`'s optional message extractor, which we don't use, and both ship prebuilt binaries as optional dependencies.

**D-015 — shadcn/ui on Base UI, with RTL.**
`shadcn init --base base --rtl`. Base UI is the CLI v4 default and the actively developed primitive library; the `--rtl` flag makes generated components use logical classes, which the brief requires. (The brief said "Radix primitives"; updated to match.)

**D-016 — Next.js flags.**
`cacheComponents`, `partialPrefetching`, `reactCompiler`, and `experimental.useOffline` are on from day one (brief §2). `useTypeScriptCli` is already the default in 16.3.5.

**D-017 — next-intl without `setRequestLocale`.**
next-intl only reads request headers when the request config asks for `requestLocale`, and it exposes that as a lazy getter. `src/i18n/request.ts` returns a fixed `fr` and never touches it, so pages stay prerenderable under Cache Components with no per-page calls. When Arabic arrives with a `[locale]` segment, switch to `next/root-params` or `setRequestLocale`.

**D-018 — Versions resolved by tooling are pinned as installed.**
`shadcn init` added `@base-ui/react`, `class-variance-authority`, `cn` (shadcn's own clsx + tailwind-merge replacement, published from the shadcn-ui organisation) and `lucide-react` with caret ranges. They're pinned to the versions pnpm resolved: `lucide-react` stays at 1.45.0 rather than 1.46.0, respecting pnpm 12's minimum-release-age policy. `shadcn` moved to devDependencies — only its CSS is imported, at build time.

**D-019 — Seed and test scripts are `.mts`.**
`package.json` has no `"type": "module"`, so ESM scripts and configs use the `.mts` extension (`scripts/seed.mts`, `vitest.config.mts`) and `tsconfig.json` includes them.

## Data and security

**D-020 — Develop against the hosted Supabase project.**
Docker Desktop isn't running on this machine, so `supabase start` isn't available. Migrations are applied to project `sharzrtzesqofwpogvii` (eu-west-1) and kept in `supabase/migrations/` with the versions the server recorded.

**D-021 — Policy helpers live in a `private` schema.**
`private.is_tutor()`, `private.my_level()`, `private.is_group_member()` are `security definer`, `stable`, `search_path = ''`. Supabase exposes `public` over the Data API; keeping helpers in `private` means they can't be called as RPCs. The brief's `is_tutor()` is this function.

**D-022 — Column-level secrets get their own tables.**
RLS filters rows, not columns. Anything a row's reader must not see is split out:

- tutor-only notes → `student_notes` (not a column on `profiles`);
- answers and worked solutions → `exercise_solutions` (not columns on `exercises`);
- the shared session recap stays on `sessions.recap`; her private remarks about a session go to `student_notes.session_id`.

**D-023 — Nobody picks their own role; every account needs an invite code.**
The `auth.users` insert trigger always creates a `student` profile, and refuses the insert unless it carries a valid invite code (`user_metadata.invite_code`). The tutor's own "Créer le compte" also goes through a code (D-025). The only exception is the seed, which writes `auth.users` directly with `app_metadata.provisioned_by = 'seed'`. Magic-link sign-in passes `shouldCreateUser: false`. A trigger also blocks students from changing their own role, status, level or email.

**D-024 — Bootstrapping the real tutor.**
There's no self-signup for the tutor. On a fresh project: create a one-use invite code in SQL, sign up with it, then `update public.profiles set role = 'tutor', level_code = null where email = '…'`. A partial unique index guarantees there is only ever one tutor. Steps are in the README.

**D-025 — Tutor-created students: a one-use code, then a set-password link we send ourselves.**
"Créer le compte" first inserts a one-use invite code as the tutor (through RLS), carrying the chosen level and group. It then calls `auth.admin.createUser` with that code in `user_metadata`, and the trigger consumes it, setting the level and group atomically. It can't use `app_metadata` instead: Supabase Auth's admin API writes `app_metadata` in a separate UPDATE after the INSERT, so the trigger never sees it. That was the original design, and it made every tutor-created account fail; the phase 0 review caught it. The code is deleted if account creation fails.

The action then calls `auth.admin.generateLink({ type: 'recovery' })` and emails the link through Resend in French. Supabase's built-in SMTP is rate-limited to a few emails an hour, only reaches team members, and its templates aren't ours. Inviting an address again re-sends a link, provided that account has never signed in. `tests/rls/provisioning.test.ts` runs this path against the real Auth server when `SUPABASE_SECRET_KEY` is set.

**D-026 — Session statuses.**
`en_attente` (requested), `planifiee`, `terminee`, `annulee`, `absent`, `refusee` (declined). The brief's lifecycle plus the two states a request needs.

**D-027 — Overlaps are impossible in the database.**
An exclusion constraint on `tstzrange(starts_at, ends_at)` covers `planifiee`, `terminee` and `absent` sessions. Pending requests don't block a slot. Confirming one that now overlaps fails with a constraint error the action turns into a sentence.

**D-028 — Seed accounts use the `.test` domain and a password from `.env.local`.**
The seed inserts users directly into `auth.users` (the approach Supabase documents for seed files), so it needs no secret key. The password comes from `SEED_PASSWORD` in `.env.local`, never from the repo, because the hosted project is reachable from the internet and a committed password would be a committed tutor login. `.test` addresses can't receive mail, so seed accounts sign in with a password only.

Because the raw file holds a `{{SEED_PASSWORD}}` placeholder, `[db.seed]` is disabled in `supabase/config.toml` and `seed.sql` raises an error if the placeholder was not substituted. `supabase db reset` therefore never creates accounts whose password is the placeholder. Re-seeding is idempotent: it re-applies the current password to seed accounts and resets the trial invite code `BACPC2K7` (usage count, level, group, expiry) that the tests rely on.

**D-029 — What the Supabase advisors reported after phase 0, and what was done.**

- _`public.invite_code_is_valid` is a security-definer function callable by anon._ Intentional: it's how the sign-up form checks a code without exposing `invite_codes`. It returns a boolean only, and 32⁸ codes make guessing impractical. The auth trigger re-checks the code atomically.
- _`public.rls_auto_enable()` is callable by anon._ Not created by this project; it came with the Supabase project and is left untouched.
- _Leaked password protection is disabled._ An Auth setting, not a migration — turn it on in the dashboard (Authentication › Providers › Email) before real students sign up.
- _22 unused indexes (info)._ Expected on a new database; they back the queries in the brief (§5) and the foreign keys policies join on.

**D-030 — Email links work on any device and point only at this site.**
`/auth/confirm` accepts both the PKCE `code` parameter and the `token_hash` parameter. PKCE links only work in the browser that asked for them, which fails when a student requests a link on a laptop and opens it on a phone. The README therefore switches the Supabase templates to `token_hash` links.

Those links are built from `{{ .SiteURL }}`, not `{{ .RedirectTo }}`. Anyone can call the Auth API with a `redirect_to` of their choosing. Templates built on it would let a caller pick the scheme, host or port a victim's token travels to, and would break emails sent from the Supabase dashboard, whose RedirectTo is the bare Site URL. A review of the phase 0 fixes caught this in an earlier draft.

The trade-off: a link opened from such an email lands on the person's own home (or the set-password page for a reset) rather than on the page they were trying to reach. The route also refuses a repeated `code`, `token_hash`, `type` or `suite` parameter, and still passes `suite` through `safeRedirectPath` for the PKCE flow. The tutor's set-password links already use `token_hash`.

**D-031 — When email can't go out, the tutor gets the set-password link on screen.**
Without `RESEND_API_KEY`, or when Resend rejects a message, "Créer le compte" shows the link with a copy button instead of failing. That matches how she works today (WhatsApp). The link is shown only to the tutor and never logged: outside local development, `sendEmail` logs only the subject of an unsent email, since anyone reading deployed logs could otherwise take over the account.

**D-032 — RLS is tested through the real API.**
`pnpm test:rls` signs in as seed accounts with the publishable key and asserts what each role can and can't read or write, on the hosted project. A pgTAP suite (`supabase test db`) is the next step once a local Supabase (Docker) is available; the API tests already cover the brief's requirement of testing "through the API, not just the UI".

**D-033 — Redirects are parsed, not prefix-matched.**
`safeRedirectPath` rejects any value with a control character or a backslash, then parses it against a fixed origin and keeps only path, query and fragment. A prefix check alone let `/\t/evil.test` through: browsers strip the tab and read it as `//evil.test`. The same helper guards `?suite=` on sign-in, magic links and `/auth/confirm`.

**D-034 — Contact details are collected at sign-up.**
Brief §4.1 asks for phone, school and guardian contact on the new profile. Both sign-up and the tutor's form have optional fields for them, validated by one zod schema (`src/lib/contact.ts`) that matches the database check constraints. The trigger copies them from `user_metadata`. Since a student controls that metadata, the trigger drops a malformed phone number instead of letting a check constraint fail the whole sign-up. Editing them afterwards arrives with the student CRM (phase 2). Until then the database refuses every student edit to her own profile, not only role, status, level and email: the guard used to let her replace her guardian's phone — the number the tutor will use to reach parents — with her own, rename herself or backdate `created_at` over the API. It compares the whole row, so a column added later is protected without being listed (`20260924010600`).

**D-035 — French error and not-found pages.**
`app/not-found.tsx`, `app/error.tsx` and `app/global-error.tsx` replace Next's English defaults. The workspaces have their own `error.tsx`, so the navigation stays on screen when a page fails. `global-error.tsx` replaces the root layout and has no translation provider, so it imports the dictionary file directly.

**D-036 — The trial invite code is development data.**
The seed's `BACPC2K7` (5 uses, 30 days) exists for trying self sign-up. The sign-up hint no longer quotes it, and the README says to delete it before real students use the project.

**D-037 — Automatic correction runs in Postgres, never in the browser or the server action.**
A student must never read the expected answer, and must never be able to write her own grade. Both follow from one move: `public.submit_exercise_answer` is a `security definer` RPC that reads `exercise_solutions` — a table students cannot select — compares, and writes the grade itself. Numeric answers are compared with `numeric` arithmetic, so a tolerance of zero means what it says and the comparison never passes through a JavaScript double, where `parseFloat("4,8")` silently returns 4. The expected answer never reaches a variable the browser could observe.

**D-038 — A corrected submission is final.**
The upsert in `submit_exercise_answer` carries `where s.status = 'rendu'`, so a second send after a correction changes nothing and the function raises `submission_already_corrected`. Without it a student could send a wrong numeric answer, read her 0/20, and immediately send the right one. Photographed pages stay `rendu` until the tutor grades them, so a student can still replace a blurred page. The solution opens once the work is corrected, or when the student asks for it — which records a row in `exercise_reveals` and forfeits the exercise (`solution_already_revealed`), since anything she sent afterwards could only copy the answer. An exercise whose expected answer was never written refuses the submission (`exercise_not_ready`) rather than stamp a machine-made 0/20 that she could never replace. The forfeit also covers a correction in another assignment holding the same exercise (`exercise_done_elsewhere`): the solution policy is keyed by exercise, so failing one assignment on purpose would otherwise hand over the answer for the other. And nothing may fail once the grade is computed. A NULL page list used to fail the INSERT at that point, and Postgres's error detail printed the would-be row, grade included, before rolling back — an unlimited, invisible oracle. The inputs are now made whole first, and the write is wrapped so no error can carry the row (`20260923200502`).

**D-039 — The REST API exposes only what each role has to call.**
A student writes a submission through `submit_exercise_answer` and nowhere else: `submissions` has no insert or update policy for her, and `private.guard_submission_write()` refuses every write that is neither the grading function's — which steps past it through a transaction-scoped `set_config('equerre.grading', …)` — nor the tutor's. The first version let her write her own rows directly, and an adversarial review showed what that cost: a bare insert counted as having answered, which opened the solution, and the RPC then replaced the still-`rendu` row with the answer she had just read, for 20/20 with no reveal on record. The same door let a direct update point `file_paths` at another student's objects. Both closed in `20260923151501`, and `tests/rls/phase-1.test.ts` attacks them through the API. On top of that, `20260916124117_function_grants.sql` revokes `execute` on `submit_exercise_answer` from `anon`, and on Supabase's `rls_auto_enable` event trigger from everyone — event triggers fire on DDL whatever the grants say, so that safety net is untouched. Two advisor warnings survive on purpose: a signed-in student must be able to submit, and `invite_code_is_valid` must answer before the account exists.

## Content

**D-040 — Tiptap JSON vocabulary.**
Lessons, exercise statements and solutions use Tiptap's JSON with these node types: `doc`, `paragraph`, `heading` (levels 2–3), `bulletList`, `orderedList`, `listItem`, `text` (marks `bold`, `italic`), `inlineMath` and `blockMath` (attr `latex`, from `@tiptap/extension-mathematics`), `callout` (attr `kind`: `definition` · `theoreme` · `propriete` · `exemple` · `attention`), `image` (attrs `src`, `alt`) and `fileAttachment` (attrs `path`, `name`, `size`). The server renderer (phase 1) handles exactly this set. The zod schema in `src/lib/lesson/document.ts` enforces this vocabulary on the way in, where refusing a node can tell the tutor what to change. It is never used on the way out: an all-or-nothing parse at read time meant one node or mark outside the vocabulary replaced the whole lesson with nothing, silently, for as long as the cache kept it — and the pinned image extension writes every unset attribute as `null`, so the first image would have done it. `readStoredLesson` checks only the envelope; the renderer draws what it knows, unwraps what it does not so the words inside survive, and drops a link's destination while keeping its text. Optional attributes are `nullish` for the same reason. The vocabulary gained `hardBreak` (Maj+Entrée) and lists inside list items, because the editor offers both and a tutor uses both. The editor is built from `lessonExtensions()` in `src/lib/lesson/editor-schema.ts`, which switches off everything StarterKit adds beyond it (links, underline, strike, code, code blocks, blockquotes, horizontal rules) and replaces StarterKit's list item, which accepts any block, with one that holds a paragraph and lists. `editor-schema.test.ts` checks that the editor's schema holds exactly these nodes and marks, and that whatever it builds passes the strict schema. A list item holds a paragraph followed by paragraphs and lists: with room for only one paragraph, ProseMirror could not make a list from a selection spanning two blocks, and Tiptap's fallback then lifted the blocks out of their encadré. A numbered list keeps its `start`, because a numbered procedure broken by a displayed formula carries on with « 2. ».

**D-041 — The lesson editor.**
`/prof/lecons/nouvelle` creates a draft visible to its level's students — nothing reaches the public site by accident — with a slug taken once from the title (`src/lib/slug.ts`), so a shared link keeps working when the title changes. `/prof/lecons/[id]` edits it with the configured Tiptap editor, KaTeX formulas included. Typing `$$x$$` makes an inline formula and `$$$x$$$` alone on a line a displayed one — the extension's own input rules, read from its source; a formula is edited by clicking it, in a native `<dialog>` with a live preview under the same KaTeX options as the page. The form submits by hand rather than through its `action` prop: React resets a form once its action succeeds, and the reset put the controlled visibility `<select>` back on its first option, so the next save would quietly have sent the old visibility and taken a published lesson off the public site. An adversarial review then reproduced six defects in the editor, all fixed and covered. With Cache Components, Next keeps a page it navigates away from hidden instead of unmounting it; Tiptap destroys its editor then and rebuilt it from the stored lesson on return, so text the tutor had typed vanished from the screen and her next keystroke overwrote it — the editor is now rebuilt from what she had typed. The saved baseline is taken from the editor itself, since the stored JSON comes back from jsonb with its keys reordered and never compared equal, and StarterKit's trailing empty paragraph is neither saved nor counted as a change, so opening a lesson no longer marks it unsaved. The encadré commands act on the encadré rather than the innermost range, so choosing « Sans encadré » inside a list no longer cuts the list in two. Headings are disabled inside lists and encadrés, where pressing one used to lift their content out. And a title with no Latin letter or digit — one in Arabic — gets a random slug suffix instead of sharing a fallback that ran out after twenty lessons.

**D-042 — Saving a lesson refreshes the public site at once.**
`saveLesson` calls `updateTag` for the lesson and for the course index, so publishing, withdrawing, restricting or editing a lesson shows immediately, even on a page prerendered at build — checked end to end against the production build. A lesson that is withdrawn or made private then answers with the not-found content and `<meta name="robots" content="noindex">`, but with a 200 status: the page streams its static shell before the lesson is read, and a status cannot change once streaming has started. Next documents this trade-off; a real 404 would mean checking the lesson in `proxy` before the response starts, which is not worth a database query on every lesson page today.

**D-043 — A signed-in student reads lessons through her own session.**
`/eleve/cours` lists every published lesson she may read and `/eleve/cours/[slug]` shows one, both through the cookie-bound client in `src/lib/lesson/readable.ts`, so the lessons select policy alone decides what she sees (D-050, D-060) and nothing is cached across students — the cached, anonymous client of D-042 stays for public pages only. Her level's lessons and those shared with her come first, other levels' public lessons after, under « Ouverts à tous ». The public page and hers render through one `LessonArticle`, so what the tutor checks on one is what the other shows. Checked in the browser as a seed student, active and then stopped: a stopped student is left with the public lessons, and the address of a lesson shared with her answers « Page introuvable ».

**D-044 — The exercise bank and its editor.**
The tutor keeps her exercises in `/prof/exercices`, grouped by level and chapter. Each shows how the student answers, its difficulty and an « Incomplet » mark while it cannot be given: an empty statement, or a numeric or multiple-choice exercise with no expected answer, which `submit_exercise_answer` would refuse (`exercise_not_ready`). The editor holds two rich-text fields, the statement and the worked solution, built from the lesson editor, which became `src/components/editor/document-editor.tsx`. That is the lesson vocabulary without attached PDFs (`exerciseDocumentSchema`), because the lesson-files bucket opens a document only to readers of the lesson named by its folder, and an exercise is not a lesson. Its images go to `lesson-assets` under the exercise's id. The editor's dialogs are portalled under `<body>` and stop their submit event: they are forms rendered from inside the page's form, and React bubbles a submit through the component tree even across a portal, so confirming a formula would otherwise have saved the page. An exercise is saved by one call, `public.save_exercise` (`20260924150716`). It is `security invoker`, so it grants the tutor nothing her policies do not, and it writes the exercise and its answer key in one transaction. It also enforces three rules the two tables cannot state across each other: the right choices are choices of the question, radio buttons have at most one right choice, and once a student has answered or asked for the solution the kind of answer is fixed (`answer_type_locked`). A numeric answer stored against a multiple-choice question could be neither shown nor corrected, so a change of mind means a new exercise, and the editor says so. The wording and the expected answer stay editable, and the editor warns that grades already given do not change. Numbers stay decimal text from the keyboard to the `numeric` column (`src/lib/decimal.ts`): « 4,8 », « 1 500 », « 3e8 » and « 3×10^8 » are read, anything else is refused rather than guessed, and the editor reads them back with `::text` casts because PostgREST hands `numeric` over as a double. A relative tolerance is typed in percent and stored as the fraction the grading function multiplies by, and the editor spells out the accepted range (« Acceptée entre 4,752 et 4,848 »). A multiple-choice label is one line of text with formulas between dollars, as the seed writes them, drawn by `renderMathText`. The tutor chooses between radio buttons and checkboxes herself, since the control must not reveal how many answers are right. A new choice gets a random id rather than the next letter: a student's answer names choices by id, and a letter freed by a deleted choice would point an old answer at new words. An exercise given as homework cannot be deleted (`assignment_items` restricts it), and the editor explains why instead of offering the button. Checked in the browser as the seed tutor: a multiple-choice question was created, filled in and saved, then turned into a numeric one with « 4,8 » ± 1 %. The stored values came back as exactly `4.8` and `0.01`, and reopening the page showed nothing unsaved. The exercise was then deleted from the editor. The lesson editor still inserted a formula without saving on its own. An adversarial review of the exercise editor confirmed eleven defects and left three unverified. All fourteen were fixed.

- **The lock could be raced.** `save_exercise` locked the exercise FOR UPDATE, but `submit_exercise_answer` read the answer type with a plain SELECT, which no lock blocks. A student handing in a multiple-choice answer at the moment the tutor made the exercise numeric was graded 20/20 against the old key, and her submission slipped past the lock. The grading function now reads the type FOR KEY SHARE (`20260924210454`, the live definition with that one statement changed), so whichever comes second waits. On two real connections, the student's answer then waits for the tutor's save and is refused as not a number, or the tutor's save waits for the answer and is refused with `answer_type_locked`.
- **Numbers and the accepted range.** « 7×100 » was read as 7 × 10⁰; the caret is now required. The accepted range was computed in doubles and could name a bound the grading refuses (299 792 458 ± 0,01 % showed 299 822 437,246), so it is now exact decimal arithmetic on BigInt.
- **Typing in the tolerance and the expected answer.** « 1 % » is read in percent mode. The expected answer no longer opens the phone's decimal pad, which has no minus sign.
- **The right answers and the lock message.** Switching to radio buttons keeps only the right answer ticked last. The lock counts students rather than rows, and its message names a revealed solution as well as an answer.
- **The editor itself.** A save that fails with an exception returns an error rather than reaching the error boundary with the tutor's text. The save buttons stay disabled until the editors exist, instead of dropping a click. The chapter line follows a saved change of chapter.
- **Keyboard and screen readers.** Each « Bonne réponse » control names its choice, the choice errors are tied to their fields, and focus is kept when a choice is moved, when one is removed, and when the delete confirmation opens or closes.

**D-045 — The tutor gives homework from the bank.**
`/prof/devoirs/nouveau` sets the homework up: a title, one student or one group, a due date typed as Casablanca wall-clock time (`localDateTimeToUtc`, so Ramadan's change of offset is Intl's business) and exercises from the bank, in the order the student will meet them. The picker narrows the bank to the recipient's level until the tutor picks a level herself, and offers only exercises that can be given now, the same test as the bank's « Incomplet » mark. « Donner en devoir » on an exercise's page opens the form with that exercise already chosen. The homework and its exercises are written by one call, `public.create_assignment` (`20260925004042`, `security invoker` like `save_exercise`). It checks what the tables cannot: the recipient is a student whose account is active (a paused or stopped one could hand nothing in, D-060) or an existing group, every exercise appears once and has its expected answer, and the due date is still to come. `/prof/devoirs` lists what is still due and what is past, with how many students have handed something in. A homework's page shows its exercises and a grid of each student's progress (to correct, graded, solution opened), and lets the tutor change its title, instructions and due date; who it is for and its exercises stay as given. The due date is informative: nothing refuses an answer handed in after it, and the form says so. A homework can be deleted only while nobody has answered it or opened a solution in it, because deleting cascades to submissions and reveals. `public.delete_assignment` locks the homework and its items FOR UPDATE before checking, so an answer being handed in at that moment (whose foreign keys hold KEY SHARE on those rows) is waited for rather than deleted a moment later. Checked in the browser as the seed tutor: a homework for Salma with three exercises was created, renamed and moved to 18:30, and showed « Corrigé vu » and refused deletion once a reveal was recorded. It was deleted once the reveal was gone. An adversarial review of these pages confirmed fourteen defects, several of them duplicates, and every one is fixed.

- **Assigned exercises lost their answer.** Readiness was checked only when homework was made, so the tutor could then clear an assigned exercise's expected answer, and every hand-in on it failed with `exercise_not_ready`. `save_exercise` now refuses that (`exercise_assigned_needs_answer`, `20260925015846`), and the editor says an assigned exercise keeps its answer. `create_assignment` locks the exercises in a statement of its own before checking them, so a racing save is waited for.
- **Hand-in counts.** They were built from every submission row, which PostgREST caps at 1,000; a `security_invoker` view, `assignment_hand_in_counts`, now counts per homework.
- **Work done in another homework.** The grid marks « Déjà fait ailleurs » for an exercise corrected, or whose solution was opened, in another homework, since the grading refuses it here for good.
- **Dates.** The default due date counts seven calendar days in Casablanca rather than 168 hours. A time the clocks skip at the end of Ramadan is refused rather than moved an hour, and a date that does not exist is refused rather than rolled over.
- **Smaller fixes.** The deletion message names an opened solution as well as an answer. At 375 px the chosen titles no longer collapse under their chips. The time field carries the due-date error. Reaching thirty exercises is announced.

Three refuted findings are worth recording. Deleting a group, or a homework without `delete_assignment`, still cascades to students' work, but no screen does either. An exercise a student has already done elsewhere can be given to her again; the grid now says so. A group's stopped members are counted among its recipients, but no screen moves students between groups yet.

**D-046 — The student does her homework.**
`/eleve/devoirs` lists her homework in two parts: « À faire », by due date, and « Terminés ». Anything still left after its due date is marked « En retard ». A homework's page shows its instructions, then each exercise and where she stands on it. `src/lib/homework/work.ts` decides that in one order. Her own submission here comes first: « Rendu » while it waits for the tutor, and the grade once corrected. Then a solution she opened here, « Corrigé consulté ». Then work corrected, or a solution opened, in another homework, « Déjà fait ailleurs », because the grading refuses the exercise here for good. Otherwise it is « À faire ». An exercise's page draws the statement as a lesson is drawn, then takes the answer in the form the tutor chose:

- **A number** is typed on the full keyboard, since a phone's decimal pad has no minus sign. It is read in the browser by the same `parseDecimal` as the grading, so a typo is caught before it costs a grade.
- **A multiple-choice answer** uses radio buttons or checkboxes, as the tutor set them.
- **Both are graded at once** by `submit_exercise_answer`, and there is no second attempt. She then sees what she gave, whether it was right, the expected number or the right choices, and the worked solution, which `exercise_solutions` opens only after a correction or a reveal.
- **Opening the solution** before answering takes two steps, because it forfeits the exercise in this homework and in any other.
- **A paused student** keeps reading and hands nothing in (D-060).

**Photographed pages.** A page is taken with the camera or chosen from the gallery.

- _Formats._ `accept` names JPEG, PNG and WebP, so an iPhone hands over a JPEG rather than a HEIC.
- _Preparation._ Each photo is brought down to 2,000 px and always re-encoded (`keepUnder: 0`), even when it is already small. A photo sent untouched would keep its EXIF, and with it the GPS position of a minor's home. Photos are prepared one at a time, because a phone decoding several twelve-megapixel photos at once runs out of memory.
- _Upload._ Pages go under her own session to `<student_id>/<ref>/<uuid>.<ext>`. That differs from the signed upload URL D-051 first planned: the storage policies then judge every upload as it happens, the 40-page cap on waiting pages included, and the browser client renews the session by itself. The `ref` is derived from the homework and the exercise, as a sha-256 shaped like a uuid, so a page uploaded and left behind is found in the same folder at the next visit.
- _Editing._ She may keep up to 20 pages, and reorder or remove them. Removing a page that was never handed in deletes it. A page already handed in cannot be deleted (D-052), so it is only left out of the next list.
- _After handing in._ The pages show read-only with « Modifier ma copie ». Handing in again replaces the list, but only while the copy waits: `submit_exercise_answer` updates a submission only in the state `rendu`.

Checked in the browser at 375 px as Salma, on a homework with four exercises:

- a right number: 20/20;
- a wrong multiple-choice answer: 0/20, with the right choice shown;
- two photographed pages handed in: « Rendu »;
- a solution opened: « Corrigé consulté ».

The homework then showed nothing left to do. The tutor's grid for the same homework showed 20/20, 0/20, « À corriger » and « Corrigé vu ». The homework and the two pages were deleted afterwards. `tests/rls/phase-1.test.ts` now also checks that her draft folder is listed and signed for her, and neither listed, signed nor read for another student.

An adversarial review by three reviewers — security, React and the phone, and the status logic — found nothing that shows a student another's work or a solution too early. It confirmed the defects below, and all of them are fixed:

- **The copy shown as handed in was not always the one handed in.** The read-only view drew the component's working list, drafts included, and « Annuler les modifications » only closed the editor. A page left out of a new list, or added and then cancelled, showed as handed in although the tutor never received it. The view now shows only the pages the submission holds. « Annuler » puts that list back and deletes the pages added meanwhile.
- **Pages nobody holds filled the 40-page cap for good.** After a successful hand-in, the server now deletes whatever else waits in that exercise's folder. It does the same when she opens the solution. A refusal from storage now says the cap is reached, instead of « Cette page n'a pas pu être envoyée ».
- **« Modifier ma copie » offered a list the grading would refuse.** A copy still waiting here stays open to change only while no solution of the exercise was opened anywhere and it was corrected in no other homework (`changeable` in `work.ts`). Otherwise the copy shows read-only and says why.
- **A correction without a grade.** The table and the tutor's policy allowed `corrige` with no grade. That read as « Rendu » while `submit_exercise_answer` refused every new list with `submission_already_corrected`. Submissions now carry `submissions_corrected_has_grade` (`20260925150938`), and the tutor's correction screen will always give one.
- **Reads.** A failed read, or a student past PostgREST's 1,000 rows, showed her work as « À faire ». Reads now throw on error and fetch page by page. The list reads all her work without naming exercises, so no URL outgrows its limit.
- **The photo screen.** Adding, moving and removing pages is locked while a list is being handed in. A page removed at that moment could have been deleted between the grading's check and its insert. A page that failed to upload now blocks the hand-in, where it used to be left out without a word. Handing in the same list again closes the editor. Previews are no longer revoked when the component goes, because Next only hides the route and shows it again with its state. The full-size photo's preview gives way to the reduced one. More than 20 pages gets its own message.
- **Smaller fixes.** The « Annuler » button after « Oui, voir le corrigé » is disabled once the request is sent. A stopped student sees nothing « En retard » or « À faire » and gets her own message. The right/wrong line no longer carries « 20/20 » or « 0/20 », so it never contradicts a grade the tutor changes. A number or a choice is answered inside a polite live region, so a screen reader hears the error or the verdict.

Checked again in the browser at 375 px as Salma:

- three pages were handed in, the first was removed and the list handed in again: the view showed two pages and storage held exactly those two;
- a page was added and cancelled: it was gone from storage;
- a draft was left in a second homework and the solution opened there: the draft was deleted, and the copy still waiting in the first homework showed read-only with its reason.

Two limits are accepted:

- **What she sees next to her verdict is today's answer key.** If the tutor changes the expected answer or a choice after a correction, the verdict still comes from the grade given then. Her editor already warns that grades do not change. A choice deleted since then no longer shows her pick.
- **Which homework reaches her follows her current group.** A student moved to another group loses the old group's homework from her list, and one who joins sees the new group's past homework as late. No screen moves students between groups yet. The fix belongs with that screen, in `assignment_reaches_me`.

Drafts can still be left behind in three ways: a copy corrected while she was editing it, a homework the tutor deletes, and a tab closed mid-edit. The cap message tells her so. A sweep of the `submissions` bucket, like D-054's, is the remedy once it matters.

**D-047 — The tutor corrects a copy.**
`/prof/devoirs/corrections` is the queue: the photographed copies waiting for her, the longest-waiting first, with the student, the exercise, the homework, the number of pages, when it was handed in, and « En retard » when that was after the due date. It lives under « Devoirs » rather than as a sixth tab, which the phone's bottom bar cannot hold. Her home, the homework list and the « À corriger » cells of a homework's grid all lead to it.

A copy opens at `/prof/devoirs/corrections/[id]`, with the pages on one side and a panel on the other: the grade, a word for the student, the statement and the worked solution folded away. The header says if the copy came late, and when the student opened the solution of that exercise, since the brief says a grade after a reveal means something different.

**Remarks.** A click on a page places a numbered remark at that point. It is stored in `submission_comments.anchor` as the page's storage path and the point as a share of the page's width and height, so it stays on its page and its spot at any size. A button under each page adds a remark with no point: the keyboard's way in, since a click on an image is not. Remarks are numbered as they are read (`arrangeRemarks`): page by page in the copy's order, down each page, those with no point last. A remark whose page left the copy is kept at the end, never lost. Each remark is saved as soon as she writes it, and can be changed or deleted.

**Grade and comment.** The grade is typed as she would write it — « 15 », « 15,5 », « 15,5/20 » — read by `readGrade`, and refused rather than rounded beyond two decimals, since `numeric(4,2)` would round in silence. « Marquer comme corrigée » writes the grade, the comment, `corrigé`, `corrected_at` and `corrected_by` in one update. That update is conditioned on the copy still being `rendu` and on the `submitted_at` she was looking at. A student who hands in a new list meanwhile makes the save refuse and the page reload: the grade goes to the pages it was given for. A corrected copy can be corrected again, since the student cannot change it any more (D-038). A number or a choice, already graded by the database, opens the same way, with her answer and the expected one, if the tutor wants to change the grade or add a word.

**What the student sees.** Her remarks stay hidden until the copy is corrected. The policy on `submission_comments` first showed them to her as soon as they were written, a correction still in progress and without its grade, and it now requires `corrige` (`20260926151924`). Her corrected exercise then shows the grade, each page with its numbered marks, the remarks under their page, the tutor's comment and the solution. Her home gains « Devoirs à rendre », the three due soonest, and « Mes notes »: her average over every corrected exercise, and the last five grades. That is the progress view the brief's « done when » names.

The marks are drawn in `--correction`, a red that is not redefined for the dark theme: they sit on the photographed paper, which is white in both themes.

Telling the student that her copy is corrected belongs to the notifications of phase 3. Until then she finds it on her home and in her homework.

An adversarial review by three reviewers — security, React and the phone, and the logic — found no way for a student to read remarks, a grade or a comment early, to read another student's, or to write any of them. It confirmed the defects below, all fixed:

- **The version guard gave way as soon as she annotated.** Each remark reloads the page, and the form read the copy's version from the page, so a new hand-in during the correction slipped through: the grade landed on pages she had not seen. The form now keeps the version she is correcting. When a newer one arrives it says so, « L'élève a rendu une nouvelle version… », and saving is refused until she presses « J'ai relu la nouvelle version ». Saving a copy already corrected is held to its version too, and when a save changes nothing she is told why: the copy is gone, was handed in again, or was corrected in another tab.
- **A grade she changes is hers.** Changing a grade the database gave clears `auto_graded` and moves `corrected_at`. The student's page shows right or wrong only for a grade the database gave and nobody changed. Otherwise it shows the grade, which the verdict used to contradict: « faux » above her 18/20.
- **« Copie suivante » went back to the oldest copy.** From the second copy it led back to the first, so a skipped copy trapped her between two. It now follows the queue, and wraps around at the end.
- **The remark being written.** A click on another page moves the mark and keeps the words, where it used to drop them. A save that comes back closes only the form that sent it. Deleting asks first. After an addition or a deletion, focus goes to the page's « Ajouter une remarque », or failing that to the page's title, never to the top of the document.
- **Photographs downloaded again at every remark.** Signing a page gives it a new address each time; the first address of each page is now kept for the rest of the visit.
- **Smaller fixes.**
  - Marks near the edge of a page stay whole.
  - The side panel scrolls on its own when the statement and the solution are both open.
  - An error disappears with « Annuler ».
  - A text just saved no longer flashes its old wording.
  - An edit box opens on the latest text.
  - Returning to a copy seen earlier no longer moves focus.
  - The form around a new remark uses the theme's red, so it shows in the dark theme.
  - The reveal line says the solution was opened after the copy was handed in, which the grading makes always true: the copy could not profit from it.
  - A page named twice in a copy is drawn once.
  - An exercise that no longer reaches the student is left out of her grades instead of breaking her home page.

Accepted as they are:

- **A remark's anchor.** It is checked against the copy's pages by the server action, not by the database. A hand-in landing between the check and the insert leaves the remark under « pages retirées », shown and not lost.
- **Re-correcting a copy already corrected.** The student sees each change at once. That is a correction being amended, not one in progress.
- **Handing in again after the due date.** The copy becomes late, and moves to the back of the queue. It is judged by the version the tutor corrects.
- **The average counts two copies of one exercise.** They are two corrections, one in each homework.
- **A paused student's home lists what is due.** She will hand it in when she is back, as `/eleve/devoirs` already shows her (D-060).

**D-048 — Share pictures for the site and every public lesson.**
A shared link shows a sheet of squared paper, 1200 × 630, drawn by `next/og` (`src/lib/og/share-image.tsx`). It carries the red margin of a French copybook, the title in Readex Pro, what it is (« 2e bac Sciences physiques · Limites et continuité »), and `Équerre` with the tutor's name. There is one for the whole site (`src/app/opengraph-image.tsx`) and one per public lesson, drawn at build time from the same cached reads as the lesson's page. The grid is DESIGN.md's carreau, doubled; the colours are its light palette, written out, since an image has no CSS variables and is shown inside someone else's app.

`next/og` reads TrueType, not the woff2 that `next/font` serves to browsers. So Readex Pro 400 and 600 are kept in `assets/fonts` as static `.ttf` files from Google Fonts, about 92 KB each, downloaded with the owner's agreement, with the SIL Open Font License that must travel with them. `outputFileTracingIncludes` ships them with the functions, for a lesson published after the build, whose picture is drawn on the server.

**D-049 — La note au stylo rouge.**
DESIGN.md's signature: a grade the tutor wrote appears in Kalam 700, in the theme's red, on the corrected copy. A hand-drawn circle traces around it once, in 450 ms (`src/components/grade-mark.tsx`), and with reduced motion the circle is simply there. The home's list of grades uses the same hand without the circle, which stays with the moment she opens her copy. The notification that the brief names as the mark's third place comes in phase 3. A number or a choice graded by the database, and left as it was, keeps its right-or-wrong line instead: that grade was not written by her. Kalam is declared in the component, so only the pages that show a grade load it.

## Files and storage

**D-050 — Lesson images are public; lesson files follow the lesson.**
`lesson-assets` is a public bucket, because a published public lesson has to prerender and be indexable and a signed URL cannot live in a static page. A bucket is public for everything in it, so an image inside an `enrolled` or `specific` lesson is protected only by an unguessable path. That is the price of prerendering, and it is why attachments go to a separate private `lesson-files` bucket where `private.can_read_lesson_file()` applies the lesson's own visibility rule. The rule itself moved into `private.can_read_lesson()`, which the `lessons` select policy now calls, so a file and a lesson can never drift apart. SVG is allowed in neither bucket: it can carry script, and a figure does not need it. The select policy on `lesson-files` includes `anon`: a public lesson's attachments are for the visitors it was published to, and `private.can_read_lesson()` already answers correctly for them. The rule is `private.lesson_visible_to_me`, which reads the row it is given. The first version of the policy called `private.can_read_lesson(id)`, which looks the lesson up again by id; a row being inserted is invisible to that lookup, so `INSERT … RETURNING` failed the select check even for the tutor, whose branch sat inside the lookup — no lesson could be created from the app until `20260924042143`. The lookup by id remains only for storage, where a folder name is all there is.

**D-051 — A photographed page never passes through the server.**
The browser resizes the photo itself and sends the bytes straight to Storage. A server action would cap the request at 1 MB, report no progress to show the student, and pay for the same bytes twice. The first plan asked a server action for a signed upload URL; the pages now go up under the student's own session, so the storage policies judge each upload (D-046). Resizing uses `createImageBitmap` and a canvas rather than a library: `createImageBitmap` already applies the EXIF rotation, and re-encoding drops EXIF altogether, which also removes the GPS tag from a photo taken by a minor. Supabase's own image transformations would make the thumbnail server-side, but they need the Pro plan and this project is on Free.

**D-052 — Object names are ids, never titles.**
Storage does not accept accented characters in an object name, so `Séance 1 — corrigé.pdf` cannot be a path. Every object is named with a uuid and the readable name lives in a column. A submission page is `<student_id>/<submission_ref>/<page_id>.webp`, where the middle segment is generated by the browser: the submission row does not exist yet when the photo is uploaded. The first segment is checked by the storage policy and again by `submit_exercise_answer`, because the tutor's correction view signs whatever path the row holds. A handed-in page is immutable. Students have no update policy on the bucket and may delete only pages that no submission holds, and `submit_exercise_answer` refuses a path whose object does not exist yet (`page_not_uploaded`), so bytes cannot be filled in or swapped after a reveal or a grade. Replacing a blurred page means uploading a new one and handing the new list in. A handed-in path is never written again either, even when its object is gone: the existence check in the grading function and the delete policy do not lock each other, so a delete racing a submission could leave a handed-in path empty, and the insert policy used to let her fill it after a reveal. The race can now lose a page of her own, never put new bytes behind one (`20260923204832`). Names are also checked for shape, in the database and again before anything is signed (`src/lib/storage-paths.ts`). Next decodes each segment of a catch-all route after splitting the path on `/`, and storage-js puts the name into a URL unencoded, so `/cours/fichiers/..%2F..%2F..%2F..%2F..%2Fauth%2Fv1%2Flogout%3Fscope%3Dglobal` made the server POST to Supabase Auth with the visitor's token. A submission page can now only be stored and handed in as `<student_id>/<submission_ref>/<page_id>.<ext>`, so the correction view, which will sign those names with the tutor's token, inherits nothing. A student may also keep at most 40 pages that no submission holds: nothing bounded uploads, and about 125 pages of 8 MiB fill the Free plan's 1 GB for everyone. That count runs in a `security definer` function because a policy on `storage.objects` may not query `storage.objects` — the first version did, and every upload failed until `20260924010652`.

**D-053 — The tutor adds images and PDFs from the editor, straight to storage.**
The toolbar's « Ajouter une image » and « Joindre un PDF » send the file from the tutor's browser under her own session (only the tutor may write to either lesson bucket), named `<lesson_id>/<uuid>.<ext>` (D-052). The name she gives a PDF is stored in the lesson. Nothing is sent before she confirms, so closing the dialog leaves nothing in storage. An image is reduced in the browser first (`src/lib/images/prepare-image.ts`, which the homework photos will reuse, D-051). Its longest side is brought down to 2,000 px, and it is written as WebP, or as JPEG in Safari, which cannot write WebP. An image that is already a JPEG, PNG or WebP under 1.5 MB and within that size is sent untouched, so a line drawing stays sharp. Its drawn size is stored so the page does not jump while it loads. A description is required, and images are drawn on white because a transparent figure vanished on the dark theme. Saving accepts an image only from the `lesson-assets` bucket and a document only under the name the editor gives it. An image pasted from a website is dropped as it is pasted, since every reader's browser would otherwise fetch it from that site. A document never goes inside a list or an encadré, and an image inside an encadré stays there (`src/lib/lesson/insert-block.ts`). Taking an image or a PDF out of a lesson does not delete its object: undo can bring it back, and the lesson may not be saved yet. The sweep of D-054 removes the objects nothing refers to any more. Checked in the browser as the seed tutor: an 8.4 MB PNG went up as an 824 KB WebP, a small PNG went up untouched inside an encadré, and a PDF was attached, renamed, published, opened by a student of the level and refused to a visitor who was not signed in.

**D-054 — A sweep deletes the lesson files nothing refers to, by hand and after a week.**
`pnpm storage:sweep` lists every object in `lesson-assets` and `lesson-files`, then reads with the secret key every lesson, drafts included, every exercise statement and every worked solution, and collects what they point to: the `src` of `image` nodes and the `path` of `fileAttachment` nodes (`src/lib/storage-sweep.ts`, tested over the JSON the editor writes). The whole JSON is walked, not only the vocabulary's nesting, since a stored lesson is trusted only in its envelope (D-040), and an image address counts whatever its host. Exercise figures live in `lesson-assets` under the exercise's id, so a folder counts as abandoned only when its id is neither a lesson nor an exercise. A reference counts across folders: an image copied from one lesson and pasted into another keeps the first lesson's folder in its address. An object is deleted only when nothing refers to it, it has been in storage for seven days, and its lesson or exercise has not been saved for seven days either. The first condition protects an upload whose lesson was never saved. The second protects an image taken out, saved, and brought back by undo, since an object's upload date says nothing about when it stopped being used. A name the app never writes (D-052) is listed and left alone. Without `--delete` it prints what it would delete and stops. Deleting goes through the Storage API: a row removed from `storage.objects` in SQL would leave the bytes in the bucket. The buckets are listed before the documents are read, so a file uploaded meanwhile is not considered and a save made before the reading is seen. What is left, and accepted: a save in the seconds between reading and deleting, which matters only for an editing session over a week old undoing the removal of a file over a week old. It runs by hand rather than on a schedule. Lesson files weigh little beside the photographed pages that fill the Free plan (D-063), and a job that deletes without anyone reading its list is not worth it yet; once phase 2 brings Supabase Cron calling `/api/cron/*`, the same module can run there. Anything that comes to store objects in these buckets, or to refer to them from another column, has to be added to the sweep first, or its files will look abandoned. The first dry run, on 2026-09-24, read 12 lessons, 30 exercises and 30 solutions and found one object to delete: a 1 KB test image in the folder of « Limite d'une suite » that nothing referred to. `--delete` removed it the same day, and a second dry run found both buckets empty.

## Accounts over time

**D-060 — What a paused or stopped student keeps.**
Decided with the tutor. A paused student (`en_pause`) keeps reading her lessons, her past sessions and all her assignments, but sees no session still to come — nor its meeting link — and can no longer hand in, reveal a solution or upload a page. A stopped student (`arrete`) keeps only her own past work — her submissions, grades and corrigés, with the assignments she handed something in for — plus the public lessons. Until `20260924024112` only `private.my_level()` looked at the status, so a stopped student kept her group's meeting links, her shared lessons and her assignments, and could still hand in. The rule lives in `private.my_student_status()` and the helpers built on it; `tests/rls/phase-1.test.ts` pauses and stops a seeded student no other test uses, so an interrupted run cannot strand one the rest of the suite depends on.

**D-061 — The tutor's form describes the student.**
Decided with the tutor. Anyone holding a class code can sign up with a real student's address before the tutor invites her, choosing the level, the group and the guardian's number; the sign-up trigger runs at `auth.signUp`, before any confirmation. Inviting that address used to re-send a link and silently ignore the level and group the tutor had typed. Now an account nobody has signed in to takes everything she typed — name, level, group, contact details — and is marked confirmed, as an account she creates is (`adoptNeverUsedAccount` in `src/lib/provisioning.ts`, kept out of the server actions file because every export there is callable). An account someone has already used is still refused. Left as it is: an unconfirmed sign-up still consumes one use of the class code.

**D-062 — An email link is spent by a click, not by opening it.**
Decided with the tutor. `/auth/confirm` no longer verifies a `token_hash` on GET: it sends the link on to `/connexion/confirmer`, whose « Continuer » button posts it to `confirmEmailLink`. Mail scanners open every link with a GET to inspect it, and a one-use token spent by a scanner leaves the student facing « lien invalide ». Replayed against the running app: two scanner-style GETs left the token usable, and the click signed the student in. D-030's cross-device links are kept, and with them an accepted risk: nothing ties a `token_hash` to the browser that asked for it, so a student can forward her own magic link to a classmate, who is then signed in as her. Every page shows the signed-in name, which makes such a swap visible. Links that only work in the browser that requested them were declined, because students ask for a link on a laptop and open it on a phone.

**D-063 — The Free plan, for now.**
The Free plan's 1 GB of storage holds roughly 2,500 photographed pages at about 400 KB each: some five months for eight students handing in fifteen pages a week. The tutor chose to stay on Free for now and move to Pro (about $25 a month for 100 GB, with no code change) in the coming months. The 40-page cap on pages not yet handed in (D-052) keeps a single account from filling the project early.

**D-064 — The domain and the Pro plan wait for the end.**
The owner chose to buy the domain and move to Pro only when the app is finished. Until then:

- **Emails do not reach students.** Resend sends only from a verified domain, and Supabase's built-in mail server delivers only to the project's team (sign-up confirmations, sign-in links, password resets). The Resend key sits in `.env.local`, and an email it cannot send is caught. An invitation then gives the tutor its link to pass on herself (`src/app/prof/eleves/inviter/actions.ts`).
- **Leaked-password protection stays off.** Supabase offers it on Pro only.
- **The site runs at `equerre.vercel.app`, for the owner to try on a phone** (deployed on 2026-09-26 at the owner's request). Vercel holds only the three public variables. The secret key and the Resend key are for the owner to add in Vercel's settings, so inviting a student and sending mail do not work there yet. Its functions run in `dub1`, beside the Supabase project in `eu-west-1`. `.vercelignore` keeps `.env*` out of every upload, and deploys go through `npx vercel deploy --prod` from the repository, which has no remote yet.

When the domain is bought, the work is:

1. Verify the domain in Resend: its DNS records, then set `EMAIL_FROM` to an address on the domain.
2. Point Supabase Auth's custom SMTP at `smtp.resend.com`, port 465, user `resend`, with the Resend key as password, and raise the hourly email limit.
3. On Pro, turn on leaked-password protection.
4. Point the domain at the Vercel project and set `NEXT_PUBLIC_SITE_URL` to it. Give Vercel the secret keys, and use a fresh Resend key, since the first one was pasted in a conversation. Add the domain to Supabase Auth's site URL and redirect list.

**D-065 — Images stay in Supabase Storage; Cloudinary is not needed yet.**
Asked about Cloudinary on 2026-09-26. What it would bring is already done another way:

- **Photos are reduced before they leave the device.** Every photographed page and every lesson image is brought down to 2,000 px and re-encoded (WebP or JPEG) on the phone or the laptop (D-051, D-053), so what is stored is already light.
- **Share pictures are drawn by `next/og`** at build time (D-048), with no service and no key.

What it would cost:

- **A third party holding minors' homework.** The photographed pages are children's work, kept in a private bucket that only the student and the tutor can read through Row Level Security (D-052). Cloudinary cannot apply those rules. Every page would have to be signed by our own server after our own checks, a second copy of the access rules to keep right.
- **One more account and one more secret** to configure.

Its free plan would still relieve the Free plan's 1 GB (D-063), and it could make thumbnails, which Supabase makes only on Pro. So it is worth another look if storage runs short before the move to Pro, or if lists of copies ever need thumbnails. Then only for public images (lesson figures, the blog), where there is nothing private to protect.

## Students and groups (phase 2)

**D-070 — A group membership is a period.**
What reached a student through a group followed only her membership on the day. That did no harm while nobody could move a student between groups; once the tutor can, it cuts both ways. A student who left a group lost its homework, the graded copies included, and its past sessions. A newcomer got the group's old homework, overdue.

A membership now runs from `joined_at` to `left_at` (`20260926165943`, then `20260927003341`). Removing a student stamps `left_at` instead of deleting the row. Adding her back clears it, so a removal made by mistake undoes itself, history and all.

- **Homework.** A group's homework reaches a member if it fell due while she was in the group. Homework she handed in or opened a solution in stays hers whenever she left (`private.assignment_reaches_me`). The grading function goes through the same test. She can finish what reached her, but cannot hand in what fell due before she arrived or after she left.
- **Sessions.** A group's session reaches her if it starts while she is in the group (`private.group_session_reaches_me`, used by the sessions policy). A leaver keeps the group's past sessions whether or not attendance was taken.
- **The present.** Everything that reads « her groups today » reads `left_at is null`: her profile, the groups policy, recipients of new homework, member counts, the group's page. The tutor's grid counts the members of the day the homework fell due.
- **Deletion.** Deleting a group used to take its sessions and its homework with it, in cascade, the copies handed in included. `assignments.group_id` and `sessions.group_id` are now `on delete restrict`. A group with a history can be renamed or emptied, not deleted, and the screen says so.

The seed's memberships dated from seeding day, while its group sessions go back three weeks. They are now dated 60 days back, in `seed.sql` and in the project's data, so the seeded students keep their past sessions. `tests/rls/phase-2.test.ts` checks the newcomer, the leaver who keeps the group's past, the student added back, and the refused deletion, through the API. Both migrations were rehearsed first in rolled-back transactions.

**D-071 — The student's file.**
`/prof/eleves` lists every student. Each row gives:

- her level;
- her standing, when her follow-up is not « en cours »;
- her groups;
- her next session;
- her average.

The list filters by name (accents ignored), level and standing, active and paused by default, and to those with no session to come. The filters live in the address, so a filtered list is a link she can keep. A level the address names but the database does not know lists everyone. Each row shows the student's balance of hours, and the list filters on accounts in arrears (D-087).

`/prof/eleves/[id]` is the file:

- **At the top.** Level, standing, and « Appeler l'élève » / « Appeler {parent} » as `tel:` links. On a phone, the contacts sit under the history.
- **Figures.** Her average over every corrected exercise, and her attendance. Attendance counts sessions she was expected at (`src/lib/students/stats.ts`, tested). One of her own is present when `terminée`, absent when `absent`. A group's is read from the attendance the tutor took, at a session that took place. Sessions cancelled, refused or still to come count for nothing, and neither does an excused absence.
- **History.** Her sessions to come and past, with the chapter covered and the recap, and her homework with where she stands on each exercise. Both follow D-070 and D-060, so the tutor sees what the student sees:
  - « À venir » holds sessions planned or requested and not yet over — the same rule as the list's « prochaine séance ».
  - A paused or stopped student is expected at no group session to come, so none is listed for her.
  - A stopped student keeps only the homework she worked on.

  The eight most recent are shown and the rest fold away. Everything is read by her id and her groups' ids, never by lists of sessions or homework, so no address outgrows its limit as the years pass.

- **Private notes.** They live in `student_notes`, which no policy opens to a student (the brief's reason: RLS works by row). They are written, changed and deleted from the file, the latest first.
- **The file itself.** A form folded under « Fiche »: name, level (which may stay open, as a class code allows), standing (with what each leaves her, D-060), phone, school, parent, and objectives, which the student can read (`student_settings`). Her email is shown, not edited: it belongs to her sign-in. The « confirm her bookings at once » setting waits for the bookings.

The standings read « Suivi en cours », « En pause », « Suivi arrêté », and an absence reads « Absence »: words that fit a girl as well as a boy. « Élèves » replaces « Inviter un élève » in the tutor's navigation. The invitation moves to the list, and stays on her home page.

**D-072 — Groups.**
`/prof/eleves/groupes` lists the groups with their level (or « Plusieurs niveaux »), their hours and their size, and creates one. A group's page:

- changes its name, level and hours;
- lists its members with the date each joined;
- adds any student who is not stopped — the action checks it, not only the list;
- removes a member after asking, saying what she keeps and that adding her back restores it (D-070);
- offers deletion only while the group has neither homework nor sessions, and otherwise explains why not. The deletion warning adds that invitation codes leading to the group stay valid, without a group.

An adversarial review by three reviewers — security, React and the phone, logic — found no way for a student into homework, exercises, solutions, sessions or groups she was not given. It confirmed the defects the text above now answers:

- **Leaving lost the past.** The first rule kept a leaver's past sessions only through attendance, which nothing writes yet. Removing then adding back reset her date and hid the group's overdue homework. This is why membership became a period.
- **Addresses outgrowing their limit.** The file read her sessions and homework by lists of ids that grow with the years.
- **Figures and consistency.** The list and the file disagreed on « prochaine séance »; a paused student was shown group sessions she will not see; attendance at a session later cancelled still counted; a student without a level could not be saved.
- **The screens.**
  - A filter select kept its old value when Next showed the list again.
  - Slow answers pulled focus away from what she had moved on to (`src/lib/focus.ts` now hands focus on only if it was lost).
  - The add-member select emptied before its answer.
  - Deletion confirmations had no focus handling.
  - An error came back after « Annuler ».
  - A plural and a few tap targets under 44 px.

## Availability, bookings and sessions (phase 2)

**D-073 — Hours, exceptions and booking rules.**
`/prof/seances/disponibilites` holds the tutor's weekly hours, her exceptions and three rules (`20260927024059`).

- **Weekly hours** (`availability`). A weekday and a range of Casablanca wall-clock time, for every individual type or for one (Saturday afternoons at the student's home). They are stored as local times and turned into instants date by date, so a Tuesday 18:00 range stays at 18:00 on both sides of Ramadan's change of offset. `src/lib/booking/slots.test.ts` checks both change-overs of 2027 and the Sunday the clocks move.
- **Exceptions** (`availability_exceptions`). A blocked period (whole days, for holidays), the same hours blocked on each day of a range, or an opening that adds hours on one date, optionally for one type. Her note is hers: no policy opens the table to students. Blocking a period tells her how many sessions already planned in it are left to cancel or move. Nothing is cancelled for her.
- **Rules** (`booking_settings`, one row). The notice a request needs (12 hours), how far ahead students see (28 days) and until when a student may cancel a confirmed session (24 hours before, the brief's default).

A student never reads these tables, nor anyone else's sessions. `public.booking_calendar` gives an active student the rules, the hours, the exceptions without their notes, and the times already taken, with nothing about whose they are. The page turns them into slots on the half hour (`openSlots`), and marks each day free, full (« Complet ») or closed (« Fermé »).

**D-074 — Session types, planning and the tutor's calendar.**
`/prof/seances/types` sets each type's name, length, place and price in MAD. A type is individual or for a group once and for all, and one that sessions point to is withdrawn rather than deleted. `/prof/seances/nouvelle` plans a session for an active student or a group, once or every week until a date (52 at most). The dates are computed on the Casablanca calendar and converted one by one. `public.plan_sessions` writes the series and its sessions in one transaction. When a date overlaps a confirmed session it names every such date in local time, and writes nothing. Each occurrence is its own row, moved, cancelled or closed on its own. Cancelling one can take the rest of its series with it.

`/prof/seances` opens on the requests to answer and the sessions to close, then a week, month or list view, one address per view and date. The home page links there, counts the sessions to close and offers « Planifier une séance ». A session's page answers a request, moves or cancels a planned session, and closes one that has started through `public.close_session`. Closing records the chapter covered, the homework and the recap the student reads. For a group, it also records each member of that day as present, absent or excused (D-070). A group session is never « absent » as a whole. Closing again corrects it.

**D-075 — Requests, confirmation and cancellation.**
An active student books from `/eleve/seances/reserver`: a type, a day, a time, and a word for the tutor if she likes. `public.request_session` (`security definer`) checks everything the page shows:

- the notice and the horizon;
- a slot inside her hours and outside every blocked period;
- no overlap with a session that holds its time: planned, done, missed, or requested first. Requests are taken one at a time under an advisory lock, so two students cannot both get the last slot.
- a start on the half-hour grid of her hours, as the page offers it;
- at most three requests waiting at once, six self-booked sessions to come, and ten requests a day;
- an individual type still offered.

The request waits for the tutor (« En attente »), or is confirmed at once when her file says to trust her (`student_settings.auto_confirm_bookings`, set by the tutor only). Confirming a request that now overlaps a confirmed session fails on the exclusion constraint (D-027), and the page says to decline it or move the other one.

Like `submit_exercise_answer`, the two functions are `security definer` on purpose, and signed-in accounts only may call them; the security advisor lists them for that reason. `public.cancel_my_session` lets her withdraw a request any time before it starts. It lets her cancel a confirmed individual session only while more than the window is left. The window is enforced there, and the page shows the deadline. A group's session stays the group's. A paused or stopped student neither books nor cancels (D-060). `tests/rls/bookings.test.ts` walks the brief's case through the API: a week blocked, a request inside it refused, the week after accepted. It also checks that another student can neither take that slot, see it nor cancel it, and every refusal.

Checked in the browser as the seed accounts, on a phone-sized screen:

1. The tutor blocked 5 to 11 October.
2. Omar found those days closed and requested Tuesday 13 October at 18:00.
3. The tutor confirmed it from her list.

The two emails read « mardi 13 octobre à 18:00 », stored as 17:00 UTC. A weekly series across the 13th was refused with that date named; moved to 16:00, it made five Tuesdays at 16:00 local. A group session was closed with one member absent.

**D-076 — Sessions in a calendar.**
Every planned session downloads as an `.ics` file (`/agenda/[id]`), and all those to come in one file (`/agenda/a-venir`). Both routes read the session through the viewer's own session, so the policies decide what exists. Times are written in UTC and each calendar shows them in its own zone. There is also a Google Calendar link. A subscription feed (`webcal://`) would need a secret per person in the address, and waits until it is asked for.

**D-077 — Emails about sessions.**
`src/lib/sessions/notify.ts` writes each email with its time as Casablanca wall-clock time, in words (« mardi 13 octobre, de 18:00 à 19:30 »):

- to the tutor: a request, a booking confirmed at once, a cancellation by a student;
- to the student, or to each member of the group that day: a confirmation, a refusal with its reason, a session planned, moved or cancelled.

An email that cannot go never undoes the action. The tutor's address comes through the secret key, because a student cannot read her profile. Until `RESEND_API_KEY` and `SUPABASE_SECRET_KEY` are set on Vercel (D-064), nothing is sent from the deployed site, and the actions work the same. In-app notifications come in phase 3.

**D-078 — Reminders.**
`POST /api/cron/rappels`, authenticated by `CRON_SECRET`, sends a reminder about 24 hours and about 2 hours before each planned session, to the student or to that day's members. It words the day from the Casablanca calendar (« aujourd’hui », « demain »). Each reminder is stamped before it is sent (`reminder_24h_sent_at`, `reminder_2h_sent_at`) by a conditional update. Two runs or a retry therefore never send it twice. If no email at all could leave, or anything failed on the way, the stamp is taken back for the next run.

When a session is booked, confirmed, planned or moved, the database stamps each reminder already due as sent (`private.stamp_session_reminders`, `20260927160524`), because the email that goes with the change says as much. So a session moved to this afternoon gets its « moved » email and, later, its 2-hour reminder, not a « demain » on top. Without the email key the route claims nothing.

Supabase Cron is to call it every 15 minutes (`pg_cron` + `pg_net`, with the secret in Vault). That is switched on with the other end-of-project settings (D-064), once email can leave at all.

**D-079 — What the review of bookings changed.**
Three reviewers (security, logic and time, screens and phone) found no way for a student to read the tutor's hours or notes, anyone else's session, or to book outside the rules. A probe offered every slot the page shows to the database's own check, across both Ramadan changes of 2026 and 2027: 354 of 354 were accepted. They confirmed these defects, all fixed:

- **In the database** (`20260927160524`):
  - `booking_calendar` let in a signed-in account with no student status, since `null or false` raises nothing; it now also gives a student only times to come.
  - A start off the half-hour grid (17:15, or 17:00 and a microsecond) was accepted, and took two or three of the page's slots. The grid is now checked, to the second.
  - A trusted student had no ceiling: six self-booked sessions to come at most. Ten requests a day at most, since each one emails the tutor.
  - `cancel_my_session` returns what it cancelled. The page used a status read before the call, so a request confirmed meanwhile was cancelled without the tutor hearing of it.
  - Closing a group session again no longer drops a line recorded for someone whose membership has since left the group's history.
- **Time and state.**
  - A date that does not exist (30 February) rolled over to 2 March; `localDateTimeToUtc` and the forms now refuse it, and an address cannot send the calendar to the year 9999.
  - A request could still be offered for confirmation after it had started. A session under way could still be moved.
  - Blocking a period counted sessions already held that week.
  - A day blocked hour by hour, or emptied by the notice, read « Complet » rather than « Fermé ».
  - A cancelled or declined session to come vanished from the student's list until its date; it stays under « À venir », marked so.
  - A change of place or link sent no email.
  - A calendar re-importing a moved or cancelled session kept the old one: the file now carries `SEQUENCE` and `STATUS`.
  - A bare carriage return in a name could start a property of its own in that file.
  - Deployed logs printed email subjects, which now carry names; they say only that an email was not sent.
- **The screens.**
  - The day strip widened the whole booking page on a phone instead of scrolling.
  - Today's mark in the month view was chalk on highlighter in the dark theme.
  - An answer given on a session's page lost the focus and said nothing; it now returns with the answer at the top, and the list says what was done under its heading.
  - « La page est à jour » was said of pages that were not; they are now drawn again.
  - A paused student read « trop tard » for a session days away.
  - Sessions to close past the first five could not be reached.
  - Day chips were named differently from what they show.
  - Several sentences did not say how to fix what they reported.
  - « Aujourd’hui » in the tutor's navigation became « Accueil », as DESIGN.md has it, so that six items fit a phone's bottom bar.
- **Open concerns.** A paused student's pending requests keep their slots until the tutor answers them. An email Resend accepted but reported as failed would be sent again on the next run.

## Chat and notifications (phase 3)

**D-080 — Conversations, and who reads them.**
Every student has one conversation with the tutor, and every group has one (`20260927202233`). Triggers create them with the student or the group, so no page ever creates one when it is opened, and a link to a conversation always has somewhere to go. `private.conversation_access` says from when a person reads a conversation, or that she does not:

- the tutor reads them all;
- a student reads her own while her follow-up is active or paused (D-060); a stopped student reads none, and nobody can write to her;
- a group's current member reads its conversation from the day she joined (D-070). What was said before she came, about other students, is not hers, and leaving the group closes it to her.

The conversations, messages and read marks policies, the storage policies of attached files and Realtime all go through that one function, so the three ways in agree. A message keeps its author's name as it was when sent: in a group, students cannot read one another's profiles, and a name is all the thread needs. Read marks of a group are the tutor's to see; a student sees her own, and the tutor's on her own conversation, which is what « Lu » shows. `tests/rls/chat.test.ts` checks this through the API: a third student reads and writes nothing in someone else's conversation, a newcomer does not read the group's past, a leaver reads nothing more, a stopped student is closed both ways, and a file is given only with the message that holds it.

A group whose conversation holds messages has a history, like its homework and sessions: it can be emptied or renamed, not deleted, and an empty one is deleted with its conversation.

**D-081 — Sending, on a weak connection.**
A message's id is made on the phone (`crypto.randomUUID`) and kept by the database. `public.send_message` returns the first answer again when the same id comes back from the same person, so a retry after a dropped connection never makes two messages. Before it leaves, a message goes into an outbox kept on the device (`localStorage`, per person and per conversation, and in memory when the device refuses to keep it), and shows at once. The outbox is sent in order by one tab at a time (Web Locks), when the page opens, when it is shown again, when the network returns, every 15 seconds while the line fails, and on « Réessayer ». Each send gives up after 20 seconds, and a message that reached the server anyway is found again by its id. The browser calls `send_message` and `mark_conversation_read` itself, with her session, rather than through server actions: the database checks everything, and Next runs server actions one after another, so a send would wait behind a slow read mark. A refusal that will not change (the conversation closed, a file gone, a text too long) takes the message out of the outbox, puts its text back in the field, and says so, with « Supprimer ». Checked in the browser: a message sent with the network cut stayed in the outbox through a reload, left once the page was back, and was stored once.

`send_message` also checks what a table cannot:

- The text is 4,000 characters at most. A message holds five files at most.
- Twenty messages a minute and two hundred an hour, counted in `private.rate_limits` (the brief's rate-limit table). The table lives in the `private` schema, which no role can read, rather than in `public` with policies that would all say no.
- Each file is in the sender's own folder of that conversation (`<conversation>/<sender>/<id>.<ext>`, D-052), exists in storage, and is held by no other message. Its type and size are read from storage, not from the page.

Photos are drawn again on the phone before they leave, as homework pages are (D-051); a PDF goes as it is, up to 10 MB. Files live in the private `message-files` bucket and are shown through signed addresses valid for an hour. A sender may leave at most twenty files that no message holds, and removes those she gives up. Formulas between dollars are drawn by KaTeX, with its `trust` option off (D-040), and the rest of the text by React.

Messages arrive live through Supabase Realtime (`postgres_changes`), which applies the messages policy to each subscriber. When the channel opens again after a break, what was said meanwhile is fetched. The thread marks the conversation read while it is on screen. The inbox and the home pages count what is unread from `public.my_inbox`, a `security invoker` function, so the policies decide every row. Checked with two sessions: a message sent by the tutor through the API appeared in Salma's open thread without a reload, with « Lu » under her last message.

**D-082 — Six places on a phone.**
With « Messages », the tutor has seven places. The phone's bottom bar keeps the five she uses away from her desk: « Accueil », « Séances », « Messages », « Élèves » and « Devoirs ». « Plus » (`/prof/plus`) leads to lessons, exercises, availability, session types, groups and the invitation. The desktop rail shows every place and no « Plus ». The student's bar has six places, « Messages » included.

**D-083 — What the review of the chat changed.**
Three reviewers (security, logic and reliability, screens) found no way into a conversation, its files or its read marks from outside. They confirmed these defects, all fixed (`20260927205242`):

- **In the database.**
  - A sender could delete a file she had attached once she lost sight of its message, then write other content under its name if she came back. The "held" check read messages with her own rights; it now uses the function's, and a held name is never written again.
  - A student added back to a group read what was said while she was away. The chat now reads a group from `group_members.chat_from`, reset when she comes back. The homework and sessions of her first period stay hers (D-070).
  - The read mark was the moment she opened the page, and Realtime told the other side each time. It is now the newest message of the others on her screen, and moves only forward. Sending no longer marks as read what arrived meanwhile.
  - Files had no weight limit: 60 MB a day for a student, 300 for the tutor, and sends of one person are serialized. Files given up count against her for a day only, and the scheduled job removes them.
  - Realtime published deletions, whose keys reach every subscriber whatever the policies: only inserts and updates are published. A message of line breaks alone is empty. Two sends of one id at once agree.
- **Formulas.** A few thousand nested braces made KaTeX overflow its stack, which `throwOnError` does not catch: one message would have broken its conversation for everyone, for good. A formula in a message is now bounded (300 characters, 12 levels, small sizes and expansions). Past the bounds, or on any error, it stays as typed. It is drawn inside its own box, so it cannot paint over the thread. `renderMath` catches everything too.
- **The thread.**
  - A second message sent while the first was on its way was neither shown nor sent. Offline, only the first queued message showed.
  - A device refusing storage lost what was sent.
  - A reconnection fetched only from her own last reply, 50 messages at most.
  - Group conversations showed « Lu » from any member.
  - Signed addresses expired after an hour. A failed one was asked for again in a loop.
  - The thread did not open on the latest message.
  - Sending closed the phone's keyboard. Nothing was announced to a screen reader.
  - A long word or formula widened the page.
  - Every conversation had the same title, so moving between them was not announced.
  - Drafts stayed on a shared phone after signing out; signing out now clears them.
  - Counts shown on a page she came back to were those of before.
  - « Plus » was not marked on the pages it stands for.
- **Open concerns.** A signed address can be made to last long by someone who may read the file. The phone's on-screen keyboard and the sticky composer are to be checked on a real Android phone.

**D-084 — The notification centre.**
Notifications are written by the database when what they tell happens (`20260927210745`), so no page can forget one:

- **To the tutor:** a booking asked for, a booking confirmed at once, a booking a student cancelled.
- **To the student, or each member of the group that day who still follows lessons:**
  - her request confirmed or declined;
  - sessions planned, cancelled or moved;
  - new homework;
  - a correction ready.

The session triggers run once per statement, so a weekly series planned or cancelled in one go is one notification per person (« 5 séances planifiées… »), not five. Corrections of one homework made one after another are one notification that counts them, as long as it is neither read nor emailed. Answers the database grades at once are seen at once, and tell nothing. The job adds the day-before reminder to the centre when it claims it (D-086).

Each person reads her own notifications, and only marks them read, through `mark_notifications_read`; nobody writes or deletes one. What a notification says is written when it is shown, from its type and payload, in French and Casablanca time: « Rayane Amrani demande une séance le mercredi 14 octobre à 17:00. » A ready correction carries its grade in red pen, the third of DESIGN.md's three places.

A bell in the header of both workspaces counts what is unread. The page lists the fifty newest and marks them read as soon as it is on screen (D-086). `tests/rls/notifications.test.ts` checks through the API:

- a series makes one notification;
- nobody reads, forges or changes another person's notifications;
- the job's functions answer the secret key only.

The seed accounts' notifications made during an RLS run are removed at its end (`tests/rls/global-setup.ts`).

**D-085 — Emails from the notification centre.**
The scheduled job (`/api/cron/rappels`, D-078) also sends:

- **New homework and corrections ready**, ten minutes after they happen, so corrections made in a row go in one email. One already read in the app is stamped without an email.
- **A digest of messages** unread for a quarter of an hour, one email per person listing each conversation and how many messages wait, never one email per message. It follows the chat's reading rules (D-080, D-083), and `message_digests` remembers up to which message each person was told.

Each email is claimed by a stamp before it is sent and the stamp is taken back if it could not leave, as reminders are (claims in D-086). Booking and session emails still go at once from the actions that cause them (D-077); the centre repeats them in the app. Like reminders, these emails wait for the end-of-project settings: the Resend key, the secret key, `CRON_SECRET` and the Supabase Cron schedule (D-064).

**D-086 — What the review of the notification centre changed.**
Three adversarial reviews (screens, security, logic) of D-084 and D-085. The fixes are in `20260928023434` and the app.

- **One notification per cancelled series.** « Aussi les suivantes » took two statements, so the students had two notifications. `cancel_sessions` cancels the session and the rest of its series in one statement. It runs under the tutor's own policies; a student gets nothing back.
- **Marking read.** The page marks everything up to the newest notification it shows, so more than fifty unread no longer leave the bell stuck. It marks as soon as the page is on screen, or when she comes back to a background tab, rather than after 2.5 seconds. The page keeps its « Nouvelle » marks while she reads, and for ten minutes after, when it is drawn again.
- **A live bell.** `notifications` joins the Realtime publication, and the bell counts again when a notification of hers arrives or is read. The header stays on screen from one page to the next, and was never drawn again. The bell is `aria-current` on its page.
- **Emails claimed by the database.** `claim_notification_email` stamps one email and reads the homework as it is now. It sends nothing when:
  - the homework is gone;
  - the notification was read in time;
  - it is more than two days old, which covers the backlog that builds up before the end-of-project settings (D-064);
  - the student has stopped, or is paused and the email is about new homework.

  The title, due date and number of corrections are those at the claim.

- **The digest.** It is claimed by compare-and-set (`claim_message_digest`), so two runs never both send it. A failed send puts the previous mark back (`release_message_digest`). It counts every unread message, waits three hours between two digests to the same person, and looks at the last two days only.
- **Corrections.** Two first corrections of one homework at once wait for each other (an advisory lock), so they make one notification. A stopped student is told of none (D-060).
- **Place or link changed.** Such a session is in the centre too, with its own sentence. A moved session says from when it moved.
- **The reminder in the centre.** The job adds it when it claims the day-before reminder, before sending, and keeps it whatever the email does. There is one per person and session (`notifications_reminder_once`), so a session moved after its reminder is not reminded twice; the move itself is a notification.
- **The job.** Each stage (reminders, emails, digests, file sweep) runs on its own, so one that fails is logged and the next still runs. After three failed emails in a row, a stage stops until the next run, because the provider is likely down. The email builders never throw.
- **Screens.**
  - Below 640 px the header keeps only the door icon for signing out, so it fits a 360 px phone.
  - The grade shows only for a single correction.
  - The text reads « à rendre le … » in the app and in the email.
  - The tutor and a student each get their own empty page.
- **Tests.** The RLS run removes only the seed accounts' notifications that were not there when it began. Before, it removed every notification made since it started, anyone's.

Kept as they are:

- A job stopped between its claim and the email loses that email, as a reminder would.
- The first run sends what is less than two days old.

**D-087 — Payments: tracking, not processing.**
The tutor sells hour packs and subscriptions priced in MAD, and records by hand what she received: espèces, virement, chèque or transfert d'argent (`20260928041147`). No money moves through the app.

- **Plans.** `/prof/paiements/formules`.
  - A pack credits hours.
  - A subscription covers 1 to 12 months of the student's group sessions, individual sessions, or both.
  - The kind is fixed once created. A plan is withdrawn, never deleted, because payments name it.
  - Plans on offer can be read by anyone, so the public site can show her prices (phase 4b).
- **A payment is a receipt.** `public.record_payment` gives each one the next number of the year it is recorded (« 2026-0007 »), through a counter row, so there is never a gap or a repeat. It copies what was bought: the plan's name, its hours or the period it covers.
  - A payment without a plan says in her words what it was for, and may credit hours.
  - Nothing writes, changes or deletes a payment directly, not even the tutor: a mistake is voided with a reason (`public.void_payment`) and recorded again. The voided receipt stays, marked « Annulé » with the reason.
  - A student with payments cannot be deleted.
- **The balance counts time, and the database computes it** (`public.student_accounts`, `public.account_statement`), in exact minutes shown as hours (D-088), so every screen and the receipt agree.
  - Credits: each payment's hours, from the start of the day it was paid.
  - Charges: each session's length, unless a subscription covers its Casablanca day and its kind. An individual session counts when done, or missed without cancelling (`absent`). A group session counts for each member present or absent; excused costs nothing.
  - Below zero she owes hours. The account is late from the session that took it below zero and kept it there, so « En retard de 20 jours » (DESIGN.md) counts from the first unpaid session.
  - There is no amount owed in MAD: packs and subscriptions price an hour differently, and a guessed sum would be wrong. The tutor reads the hours and the dates.
- **Who reads what.** The tutor reads every account. A student reads her own balance, statement, payments and receipts (`/eleve/profil`), and nobody else's. The parent view will read her children's through the same check (`private.can_see_account`).
- **Screens.**
  - `/prof/paiements`: accounts in arrears, the longest overdue first, then the latest payments.
  - `/prof/paiements/nouveau`: records a payment. A subscription starts the day after the current one ends, and the form says when it ends.
  - The student file has a « Paiements » section (balance, statement, payments, receipts, voiding) and the balance in its figures.
  - The student list shows each balance and filters on arrears. The dashboard counts accounts in arrears.
  - Payment status is never colour alone: ✓ À jour, △ En retard de _n_ jours.
- **The receipt** is an A5 PDF built on the server with pdf-lib (`/recus/[id]`, `src/lib/payments/receipt.ts`), for whoever may read the payment. It uses the standard Helvetica faces, which need no font file and carry every French letter; a character they cannot draw (Arabic) prints as « ? » until an Arabic font is embedded with the RTL work. pdf-lib was chosen over PDFKit because it needs no font files read from disk, which serverless bundling loses.
- **A gateway later.** Recording goes through a `PaymentProvider` (`src/lib/payments/provider.ts`), whose only implementation today is `manualPayments`. CMI, YouCan Pay or PayZone would add a provider: start a checkout, and on the gateway's confirmed webhook record the payment through the same function, so numbering, receipts and balances keep one path.
- **Tests.** `tests/rls/payments.test.ts` checks, through the API:
  - only the tutor records or voids a payment;
  - receipts follow each other;
  - nobody writes a payment directly;
  - a student reads only her own account;
  - voiding gives back the balance;
  - a withdrawn plan, a future date or a subscription with no start is refused.

  The secret key removes the test payments and puts the counter back. The seed adds four plans and nine payments that show each kind of account.

**D-088 — What the review of payments changed.**
Three adversarial reviews (security, logic, screens) of D-087. None found a way to read or write another student's account. The fixes are in `20260928150101` and the app.

- **Accounts count in minutes, exactly.** Each session used to be rounded to a hundredth of an hour, so three 40-minute sessions made 2,01 h and a student who had paid two hours showed as late.
  - The database now counts minutes without rounding, and whether she owes is decided on them (`Account.owes`).
  - Hours are only how the balance is shown.
- **The statement is numbered in the order it is added up** and shown in exactly the reverse, so lines of the same instant no longer contradict each other. It is read in pages past PostgREST's 1000 rows.
- **Coverage says what and when.**
  - Accounts list the subscriptions still running or to come, with what they cover: « Séances de groupe couvertes jusqu'au 23 novembre ». An October subscription recorded in September no longer reads as covering September.
  - A new subscription starts the day after the one covering the same sessions ends. With none, it starts on the 1st of this month, or of the next from the 20th on. A date she typed herself is kept.
- **Recording.**
  - The form starts with no plan chosen, and « Autre paiement » starts with no amount, so a payment is never recorded under the cheapest pack by default.
  - The label and hours of « Autre » are read only when it is chosen.
  - The hours hint says what they are for: the sessions a payment settles.
- **Voiding** sends her back to the file with a banner that takes the focus, as recording does. The banners carry a check mark, and a payment recorded then voided no longer reads as recorded.
- **The receipt** (« Reçu de paiement n° … »):
  - A voided one says « annulé » in its title and « ANNULÉ » with the reason above the amount, which it greys.
  - It adds the amount in words, the payer (the parent on the file, « pour » the student) and a signature line.
  - Every row has a number of lines it may take, ended by « … », and nothing is drawn below the signature: the longest note and reason still fit.
  - Line breaks in a note are kept.
  - It opens in the browser's viewer instead of downloading.
  - Its address must be a UUID.
- **What a student sees.** Her balance and receipts in ink, « À régler : 6 h » without a count of days, and « Vos parents peuvent voir le détail avec votre professeure ». Arrears in red, with days, are the tutor's view.
- **Dates and copy.**
  - The first of the month reads « 1er » across payments and on the receipt.
  - « n° » holds to its number, and a voided amount is struck through.
  - Each overdue row's button has its own accessible name. The student list says « en retard » in words.
  - Errors say what is missing.
  - The plans page no longer promises the public site, until it shows them.
- **Group sessions.** Closing one pre-marked every member of the day present, so a paused or stopped member was charged unless the tutor noticed. She is now pre-marked excused (`session-forms.tsx`).
- **Database hardening.**
  - A 10 000th receipt keeps five digits.
  - A payment's hours are checked before being rounded.
  - A subscription starts within a year of today.
  - A plan's kind cannot change (`plans_keep_kind`).
  - `private.account_lines` checks access itself, not only through its callers.
- **Tests and seed.**
  - The RLS tests give their receipt numbers back through `public.remove_test_payments`, with the secret key only, under the counter's lock. They check its errors, and find notifications by the session they are about rather than by this machine's clock, which ran a second ahead of the database's.
  - The seed no longer rewrites plans that already exist, and adds its payments only to books that hold none.

Kept as they are:

- The RLS suite runs against the one hosted project, which is also the deployed one. Its payments can leave gaps in a year's receipt numbers if a real payment is recorded during a run. Before real payments are recorded, the suite moves to a Supabase branch, with the other end-of-project settings (D-064).
- The receipt still lacks the tutor's phone and city: they arrive with the public site's profile.

**D-089 — The public site and its blog.**
The front door for parents, and the top of the tutor's funnel (`20260928152441`).

- **What a visitor sees.** Everything comes from the tutor's own data; nothing is invented about results or reviews.
  - `/`: who teaches and where, and how it goes (a real sequence, so numbered: first message, regular sessions, follow-up between them). Then the levels by cycle, where sessions take place, the plans on offer with their prices, her presentation if she wrote one, the latest posts and public lessons, and how to start.
  - `/cours`: the public lessons by level and chapter. The lesson pages themselves already existed (D-048).
  - `/conseils` and `/conseils/[slug]`: the blog, by theme, with reading time.
- **Its look is DESIGN.md's public surface.** The page sits on the squared grid with wide headings (HEXP 100).
  - Its one bold element is a limit worked on a copybook page, each step with its reason. It has the red margin of the share images (D-048) and her remark underneath: what parents pay for is method.
  - A phone gets the same page in one column. The header's links take a second line rather than a menu to open.
- **Her presentation.** `site_profile`, one public row that only the tutor writes, holds the text that is not data elsewhere: a tagline, a presentation, her city, the areas she travels to, and a WhatsApp number. She edits it at `/prof/site` (« Site public »).
  - The WhatsApp number becomes the page's main button (`wa.me`, with the Moroccan prefix added). Without one, the page sends visitors to sign in.
  - The demo leaves it empty rather than make up a city or a number for a real person.
- **Posts.** `posts` holds a title, a slug set once, an excerpt, a theme (méthode, examens, erreurs fréquentes, orientation), a draft or published status and a body.
  - The body is written in the lesson editor without images or files. Both buckets are keyed by lesson (D-052), so the editor hides those buttons and the save refuses such nodes (`postDocumentSchema`).
  - Published posts are public; drafts are hers. She creates, saves, publishes, withdraws and deletes them at `/prof/conseils`. Reading time is counted from the text when the page is drawn: 200 words a minute, a formula as three words.
  - The seed publishes three posts, written as examples for her to keep, change or delete.
- **Caching.** Every public page is prerendered from `"use cache"` reads made anonymously, so a cache can only hold public rows. Each is tagged, and the tutor's saves refresh it (`updateTag`): a post, her presentation, her plans, a lesson. Checked in the browser: a post published or deleted, and a city saved, showed at once on the home page and the blog.
- **The build reads the database afresh.** Next keeps `"use cache"` results in `.next/cache/fetch-cache` from one build to the next, and Vercel restores that folder. A post added since the last build was prerendered as missing: the home page showed no posts until the folder was removed. `pnpm build` now removes it first (`scripts/fresh-data-cache.mjs`). It holds data, not compiled code.
- **Search engines.**
  - Each page has its title, description and canonical address.
  - The home page carries JSON-LD for her as a `Person`, and each post as an `Article`.
  - Posts get the same share image as lessons.
  - `sitemap.xml` lists the public pages. `robots.txt` keeps crawlers out of everything behind the sign-in.
- **French typography.** Titles and excerpts typed by hand get a non-breaking space before « : ; ! ? » and inside « » (`frenchSpaces`), so no line starts with a colon.
- **Tests.** `tests/rls/site.test.ts` checks that a visitor and a student read published posts but never a draft, that only the tutor writes a post or the profile, that the profile stays one row, and that a WhatsApp number must look like a phone number.

**D-090 — What the review of the public site changed.**
Three adversarial reviews (security and caching, logic, screens and search) of D-089.

- **No leak found.** Every cached read goes through the anonymous client. Every public read has a save that refreshes it: the profile, plans, lessons, posts and, now, the places sessions take place.
- **A failed read throws.** It used to fall back to an empty answer, and a timeout during a build or right after a save would have kept a home page with no prices, posts or courses for a month. Errors are not cached, so a build fails loudly instead. This covers the profile, plans, levels, places, posts and public lessons, including the older lesson reads.
- **WhatsApp numbers.**
  - « 00212 … », « +212 06 … » and a number without its 0 all built broken links. Every usual way of writing a Moroccan number now gives the same `wa.me/212…` link (`whatsappNumber`, with tests).
  - The profile form refuses a number the site cannot turn into a link, rather than save it and drop the button.
- **A parent always has a next step.**
  - Without a WhatsApp number, `/prof/site` warns the tutor that parents cannot write to her from the site, and the home page says that registration goes through the tutor.
  - « Tarifs » in the header always leads to a section: with no plan on offer, it says prices are given at the first message.
  - `/cours` with no lesson links back home.
- **Only her data.** The places of sessions come from the modes of her active session types (`listOfferedModes`, refreshed when she saves a type), not from fixed text. The copy no longer promises « les mêmes prix pour tous » or « le même jour chaque semaine ».
- **The home page has its own metadata.** The title is her name and her city (« {tutor}, cours de mathématiques à {city} »), the description her tagline, and it has a canonical address. Posts get an Open Graph title, description and address, and their JSON-LD gets `mainEntityOfPage`. The sitemap dates a post by its last change.
- **The maths is written as rigorously as the page claims.**
  - The hero's steps factorise « au numérateur et au dénominateur », simplify « pour x ≠ 0 », and conclude from both 1/x² and 3/x².
  - The example post writes the final line it tells students to justify.
  - The exam post's example uses a square root, which is on the régional syllabus, rather than a logarithm, which is not.
- **Accessibility.**
  - The home page's regions are `<section>`s with their headings. Step numbers are hidden from screen readers, since the list already numbers them.
  - Links underline in the controls' colour, not the grid's, and a list of links is 44 px tall.
  - The post editor has a heading, and its title is the post's.
  - « Voir le site » says it opens a new tab.
- **One name for one place.** Every way to the sign-in page reads « Se connecter ».
- **French typography.**
  - Non-breaking spaces before « : ; ! ? » and inside « » in the strings of the payments and the public site.
  - `frenchSpaces` runs on everything she types that the home page shows: tagline, presentation, city, areas, plan names.
  - Dates read « 1er » on the post page too.
- **Lighter pages.** KaTeX's stylesheet comes only with the pages that set maths (the home page and a post), not with every public page.
- **Posts.** Saving a post deleted in another tab says so rather than « enregistré », and deleting one already gone no longer reports it deleted. The slug keeps up to 100 characters, as intended.
- **The seed** writes its three posts only into an empty blog, so a post she deleted does not come back and a slug she reused does not break the seed.

Kept as they are:

- A post's body can still hold, through the API and her own session, an image her editor would refuse. Only the tutor can write posts, so this is a check on herself.
- An unknown post address answers 200 with the « page introuvable » content, like lesson pages (D-048).
- The grid does not yet line up with the page's columns.

**D-091 — The parent view.**
A parent follows a child without changing anything (`20260928203553`, reviewed in `20260929011435`).

- **The tutor gives the access, from the student's file** (« Parents »). She types the parent's name and address.
  - The tutor's session writes a one-use invitation (`parent_invites`) for that student and that address. It says only who and for which student: the database makes the token (64 random hex characters) and the dates, and an invitation never lasts more than a day.
  - The account is created with the secret key and the token in its metadata. The sign-up trigger makes it a parent linked to that student only when the invitation is unused, unexpired and made for that very address. Otherwise the student rules apply unchanged: nobody chooses their own role (D-025). The token is then taken out of the account's metadata.
  - The parent then gets a link to choose a password, by email, or on the tutor's screen when no email can leave, as for students (D-030).
  - An address already used by a parent links that parent to one more child, but only once the tutor has confirmed, having read whose account it is and which children it already follows: a mistyped address would otherwise hand this child's file to another family. A fresh link goes out if the account was never used. An address used by a student or the tutor is refused.
  - She can take a parent off a student, after a confirmation; the account stays.
- **What a parent reads: their linked children, and them only, never more than each child reads about themselves.**
  - `/parent` lists them, or opens the only one.
  - A child's page opens on the next session, the homework late and the balance. Then come the sessions to come and past, split as in the child's own list (four months either side, with attendance, the chapter worked and the homework given), the homework (what is left to do first, where the child stands on each exercise, late or not, and the average of corrected exercises), and the account (balance, statement, payments and receipts, D-087).
  - The child's standing (D-060) applies: a paused child's sessions to come are hidden, and once stopped, their sessions and the homework they handed nothing in for, as in their own space. No meeting link is returned.
  - The grade in red pen stays in its three places (DESIGN.md): a parent reads the average in ink. Parents have no notification centre and no bell.
- **Through checked functions rather than wider policies.** Every student policy says « the signed-in person is the student ». Instead of doubling each one, the parent reads through `my_children`, `child_sessions` and `child_homework`. Each checks the link first (`private.is_guardian_of`) and returns what the page shows. For homework, the same rules as the student's own list (D-046) run in `src/lib/homework/work.ts`.
  - Accounts and payments open to them through the same check (`private.can_see_account`, and the payments policy), so the receipt route serves their child's receipts and no one else's.
  - A policy lets them read their children's profiles, which the receipt's payer line needs.
  - The statement now says what each line was from the database (`account_statement.label`). A parent cannot read the sessions table, and a student no longer reads a group's sessions once she has left the group.
- **Nothing to write.** No policy lets a parent insert, change or delete anything. The links and invitations are the tutor's, and the trigger's.
- **Tests.** `tests/rls/parents.test.ts` makes a parent through the real invitation, with a password made for the run, then deletes it with the secret key. It checks:
  - the invitation is used up, and a used, expired or made-up one creates no account, even at its own address; the tutor's session cannot choose the token or the dates;
  - the parent reads their child's sessions, homework, account and payments, none the child cannot read, and another child's none;
  - a paused child's sessions to come, and a stopped child's sessions and untouched homework, are hidden;
  - the parent can write nothing;
  - unlinking the parent hides the child at once.
- **Seed.** A parent, Karim Alaoui, follows Salma (`karim.alaoui@equerre.test`).

**D-092 — The page carries only what the browser needs (end-of-project pass).**
Lighthouse on the public pages (mobile, simulated 4G, 2026-09-29) scored 90 or more everywhere, but the largest paint came at 2.6 to 3.0 s against the brief's 2.5 s, and three things weighed on every page:

- **The whole dictionary.** `NextIntlClientProvider` in the root layout handed all of `fr.json` (103 KB) to every page, four fifths of `/conseils`. Each part of the app now hands over only the namespaces its client components use (`src/i18n/client-namespaces.ts`): the public site, the lessons and the parent view get `common` and `errors.generic`, the sign-in pages add `auth` and `contact`, and the tutor's and the student's workspaces add theirs. `client-namespaces.test.ts` reads every client component and fails when one asks for a namespace its part of the app does not hand over, or for one built at run time. Server components still read the whole dictionary, on the server. `/conseils` went from 125 KB to 30 KB (31 KB to 5 KB compressed).
- **A second font file.** Readex Pro preloaded both its `latin` and `latin-ext` files (48 + 41 KB). French needs only `latin`, so only that one is preloaded; the others stay declared and load on the page that uses one of their characters.
- **A missing icon.** Every page asked for `/favicon.ico` and got a 404, logged as an error. The set square is now `app/icon.svg`, with its colours for dark mode, and `app/apple-icon.tsx` draws the PNG a phone's home screen needs.

KaTeX keeps `font-display: block` on the lesson and blog pages: formulas drawn in a fallback font come out misaligned, which is worse than waiting for them.

Two more weights came from modules loaded with every page:

- **The dictionary, again, inside the scripts.** `global-error.tsx` imported all of `fr.json` for its three sentences, so the whole dictionary (25 KB compressed) rode in a script on every page. The error screens' strings now live in `messages/fr.errors.json`, which the request config merges with the rest and `global-error.tsx` imports alone.
- **Base UI's button on pages without one.** A link styled as a button imported `buttonVariants` from `ui/button`, which also imports the Base UI primitive, so every public page shipped it. The classes now live in `ui/button-variants.ts`; `ErrorView`, loaded with every page as the error boundary, uses a native button.

The public pages went from 238 KB to 192 KB of compressed script.

**What the measurements say.** Lighthouse's default mode simulates a slow phone from a trace taken at full speed. From this laptop, that trace is unreliable against production: headless Chrome waited about 2 s before painting any page served by Vercel, nextjs.org (2.3 s) and vercel.com (2.3 s) included, while example.com painted in 0.15 to 0.3 s, and the same build served locally painted in 60 to 140 ms. The simulation also charges the largest paint with every request started before it, so a page that paints early, before its scripts arrive, reads worse than it is: the local build scored 94 to 99 with a simulated largest paint of 2.0 to 3.4 s, though the title painted at 76 ms. With real throttling instead (DevTools: 150 ms round trips, 1.6 Mbps, a CPU four times slower), on the local build, the largest paint came at 1.8 to 1.9 s on the lessons and the blog and 2.1 s on the home page, the same on two runs. Production adds the connection (DNS, TCP, TLS: about 0.45 s at that latency) but serves over HTTP/2, which sends the stylesheet before the scripts. PageSpeed Insights, from Google's machines, gives the measure of record; its free quota was spent the day this was written.

The Supabase advisors were run again. The one warning to act on, two select policies on `profiles` that each ran for every row, became one (`20260929025819`). The others are deliberate: the `security definer` functions are the app's API and each checks its caller, `invite_code_is_valid` is open to the sign-up page, two tables are written only by functions, the unused indexes cover the foreign keys the policies join on, and leaked-password protection waits for the Pro plan (D-064).

**D-093 — An accessibility audit of every screen (end-of-project pass).**
axe-core ran the WCAG 2.2 A and AA rules, and its best practices, on 50 screens: the public site, the sign-in pages, the tutor's 29 screens and the student's 12, each in the light and dark themes on a laptop and in the light theme on a phone (150 runs). The student's screens had nothing to report. What it found, all fixed:

- **A formula too wide for its box could not be scrolled from the keyboard (WCAG 2.1.1).** In the lessons, the blog and the exercises, a displayed formula is now a small client component (`ScrollableMath`) that takes the focus only when it overflows, so the arrow keys scroll it and a formula that fits adds no stop to the tab order. In the editor, the sheet itself scrolls sideways; it already has the focus.
- **A formula, an image or a document could only be opened with the mouse** in the editor. The arrow keys select one; Enter now opens it, as a click or a double click does, and the editor's tip says so.
- **Encadrés were `<aside>`s**, which tells a screen reader « complementary content » and made one landmark per definition. A definition or a theorem is the lesson itself: they are `<div>`s with their visible title, and a pasted `<aside>` is still read as one.
- **Two side columns were `<aside>`s inside `<main>`** (a student's file, a group), and the lesson and exercise editors had no page heading, their title being a field. The columns are plain blocks, and each editor has a heading for screen readers.
- **The logo on the sign-in pages and the 404 page stood outside any landmark**; it is in a `<header>` now.

After the fixes the 150 runs report nothing. The audit script is not part of the repository: it needs axe-core, which the project does not install, and the end-to-end tests cover the flows.

**D-094 — The whole Moroccan programme, by stream and programme.**
Asked on 2026-09-30: a course as complete as the sites students already use (AlloSchool), every stream of the Moroccan school, PDFs to download, and the past national exams. The owner chose: maths only; Claude writes the courses and exercises, which the tutor reads before anything is published; the tutor uploads the national exams herself.

- **Streams and programmes.** A student is in a stream (« filière »): 2e bac PC, SVT, STE… A programme is the maths syllabus several streams share. `programmes` holds 13 of them, and each of the 24 streams in `levels` points to one:

  | Programme                                         | Streams                                             |
  | ------------------------------------------------- | --------------------------------------------------- |
  | 1re, 2e, 3e année collège                         | one each                                            |
  | Tronc commun scientifique et technologique        | Sciences, Technologique                             |
  | Tronc commun Lettres et sciences humaines         | the same                                            |
  | 1re bac Sciences mathématiques                    | the same                                            |
  | 1re bac Sciences expérimentales et technologiques | Sciences expérimentales, SVT, STE, STM              |
  | 1re bac Sciences économiques et gestion           | the same                                            |
  | 1re bac Lettres et sciences humaines              | the same                                            |
  | 2e bac Sciences mathématiques                     | A, B                                                |
  | 2e bac Sciences expérimentales et technologiques  | PC, SVT, Sciences agronomiques, STE, STM            |
  | 2e bac Sciences économiques et gestion            | Sciences économiques, Sciences de gestion comptable |
  | 2e bac Lettres et sciences humaines               | Lettres, Sciences humaines                          |

  Chapters, and so lessons and exercises, belong to the programme: a course is written once, and a student reads her stream's programme (`private.my_programme()` in the lesson rule, `20260930031104`). The brief's « 1re bac SVT » is kept, following 1re bac Sciences expérimentales: no student uses it, and the official system has no such stream in 1re bac.

- **Every chapter of the official programmes**, 166 in all, by semester, in `supabase/curriculum/maths.json`. `scripts/curriculum-sql.mjs` turns that file into upserts keyed on codes and slugs, so a correction is a new migration that keeps every chapter's id, lessons and exercises. The ministry's own documents (2007 guidelines for the lycée, 2009 for the collège) are no longer online; the lists come from the usual progressions, which agree with each other, and the tutor is to check them. The split into semesters of 1re bac Sciences économiques is a guess. The nine demo chapters were each an official chapter already and keep their content.
- **`chapters.level_code` is no longer read**, and nullable. Dropping it is a destructive migration, left until the owner agrees.
- **A chapter's documents have a kind** (`lessons.kind`, `20260930031252`): the course, its summary, series of exercises with their corrections, practice tests. They are lessons in every other way: one editor, one rule of who reads what, one page, one PDF.
- **Addresses.** The course is `/cours/{programme}/{chapitre}/{document}`: the programme's page lists every chapter by semester, written or « En préparation », and a chapter's page its documents by kind. An old address that named a stream (`/cours/2bac-pc/…`) redirects permanently to its programme's (`next.config.ts`, from the same curriculum file).
- **A student's list** is her programme's documents and those shared with her by name. The other programmes' public documents are the public course's, one link away, rather than hundreds of lines in her space.
- **What comes next**, in order: exercises and their corrections inside a document, and the kind in the editor; PDFs; the national exams; then the content itself, 2e bac first, written as files in the repository and imported as drafts for the tutor to read and publish.
- **What the three reviews changed.**
  - A lesson open to enrolled students was open to one stream; it is now open to every stream of its programme (a 2e bac SVT student reads what was written for PC). That is the point of programmes, and the tutor should know it: moving a stream to another programme, which only a migration does, moves its students to that programme's lessons.
  - The pages looked a stream's old address up in the database when nothing else matched. Under the collège programmes, whose slugs are their streams' codes, that sent a missing page to itself forever. The lookup is gone: `next.config.ts` already redirects every stream.
  - Streams are shown by the names students use, set in the curriculum file (`name`): « Sciences physiques (PC) », « Sciences (TCS) » under « Tronc commun ». The brief's 1re bac SVT has `null` there, so visitors never see it; it stays in `levels` for any student already in it. A stream the file no longer lists is not shown either: the file decides what visitors see, and the script keeps a dropped stream only for its students.
  - A programme's lesson counts are counted by the database (`lessons(count)`), and the lesson pages to prerender are read page by page: the API answers 1000 rows at most, and the course will outgrow that.
  - `scripts/curriculum-sql.mjs` can be run as often as the file changes. A stream the file drops keeps its students and moves after the others; a chapter renamed says so (`renamedFrom`) and keeps its id; a chapter the file drops is deleted if nothing uses it, and stops the migration, naming it, if a lesson, an exercise or a session still does, since deleting it would take them along.
  - A student sees a lesson shared from another programme under that programme's name, and her list ends with a link to her programme's full table of contents.
  - The public pages: chapters are headings with their number and « En préparation » beside the title, a document alone of its kind is named by its kind and two of a kind by their titles (a screen reader also hears the chapter), the chapter and lesson pages have a real breadcrumb (« Cours › programme › chapitre »), every link there is a 44 px target, and titles go through the French spacing rule. Streams are joined by « · » after a no-break space, so no line starts with one.

**D-095 — Exercises and their corrections inside a document.**
A series or a test is a document like a course, written in the same editor: an exercise is a block (`exercise`, with an optional title) holding its statement, and its correction is a last, single block inside it (`solution`). The schema (`src/lib/lesson/document.ts`) refuses a correction that is not the last block of an exercise, or a second one. Exercises are numbered by their place on the page when drawn, so moving one renumbers them all; an exercise under one of the tutor's own headings is a level below it.

- **On a page, a correction is folded** under « Voir le corrigé », a full-width 44 px handle with a chevron that turns; opened, it says « Masquer le corrigé », and a screen reader hears « de l’exercice 3 » after either. It is drawn in the tutor's red, as every correction is (DESIGN.md), and opens in 180 ms, or at once for a reader who asks for less motion. Printed from the browser, a folded one is left out and an open one is headed « Corrigé »; the site's and the workspace's navigation, the breadcrumb and the PDF links are not printed. After one of the tutor's headings, an exercise is one level below it (h3 under h2, h4 under h3).
- **In the editor**, « Exercice » is a toggle like bold (pressed where the cursor is in an exercise; pressing it again takes the exercise away and keeps its text), and « Corrigé » adds the correction or goes to the one there is. A heading cannot go inside an exercise.
- The exercises of homework (`exercises`, D-044) are another thing: one question each, with an answer a student submits. A series is for reading and for printing.

**D-096 — Every document as a PDF.**
A document's PDF is its print page (`/imprimer/[id]`) printed by a headless Chrome (`/pdf/[id]`): the formulas come out as KaTeX draws them on the page, not as a second renderer would. On Vercel it is `@sparticuz/chromium`, whose binary the route carries (`outputFileTracingIncludes`); locally, the machine's Chrome.

- **What is printed.** A course or a summary whole; a series or a test either as its statements alone or with each correction after its exercise (`?corriges=1`). The sheet is A4, black on white whatever the reader's theme, with the brand, the programme and the chapter at the top and the site and page numbers at the foot, and nothing split where it would stop making sense.
- **Who may print what.** Whoever may read the document, through her own session: the route reads it as she does, and gives the headless browser her cookies only for a document that is not public. The browser is sent to the site's own address (`NEXT_PUBLIC_SITE_URL`), never to the request's host. The tutor prints her drafts from the editor, to read them over as a student will.
- **Cost.** A public document's PDF has an address that names its version (`?v=`: the last change to the document or to its chapter, whose title heads the sheet, and a few characters that follow the programme's name, which a migration may correct without touching either) and is cached for a year by the CDN and the browser; any other address for it (another version, a query added to miss the cache) is redirected to that one (a relative redirect: the Host header has no say). That is not enough on its own: Next drops query parameters named `nxtP…` and `nxtI…` before the route sees the address, so a loop of such addresses would each miss the cache and start a Chrome. Every print of a public document is therefore counted too, forty an hour per document and thirty a minute for the whole site, then « try again in a minute » (`public.take_public_print_quota`, `20260930193147`). A document that is not public is printed for the one reader and never cached, and a signed-in reader may print six a minute and sixty an hour (`public.take_print_quota`, `20260930145514`).
- **The reader's session in the print browser.** Her cookies are given to the headless browser as the site's own cookies (`browser.setCookie` on the site's host), so they go to the site and nowhere else: not to the storage host the images come from, not wherever a redirect might lead. The print page must not renew her session either: the new refresh token would stay in the throwaway browser and hers, now spent, would sign her out at its next use. A session with less than five minutes left is renewed by the route before printing, and her response carries the new cookies.
- **When printing fails.** The route answers every failure itself (« Le PDF n’a pas pu être préparé »), never by throwing: Next adds the cookies of a renewed session only to a response the handler returns. The print page answers 200 even for a document it could not read, its « not found » streamed into the page, so the route checks that the sheet is there before printing. Only the session's cookies (`sb-…`) go to the print browser: one odd cookie from another app on the same host would make Chrome refuse them all.
- **While it prints.** A PDF takes about two seconds, more on a cold start. The link shows a spinner and « Préparation du PDF… » in a live region, ignores a second tap, saves the file when it comes, and says what went wrong otherwise (« Vous avez demandé plusieurs PDF d’affilée… », « Le PDF n’a pas pu être préparé… ») rather than leaving a failed download in the browser's list; the site-wide ceiling has its own words (« Beaucoup de PDF sont demandés en ce moment… »). Without script, or with a modifier key, it is a plain download link.
- A public PDF already cached stays reachable at its old address if the document is later withdrawn: the page links no longer point to it, but someone who kept the link still has it, as she would a copy she downloaded.
- Links to a PDF are plain links, not `<Link>`: a prefetch would print it for nobody. `/pdf` and `/imprimer` are kept out of search engines.

**D-097 — The past national exams.**
The owner asked for a section of past national exams as PDFs, and chose that the tutor uploads the official papers and corrections she has the right to share; nothing is copied from elsewhere.

- **A paper** (`national_exams`, `20260930195252`) is one session (normale or rattrapage) of one year for one programme, or for the part of its streams that sat it (`track`, free text: « STE et STM »), with its subject and, when there is one, its correction. One paper per programme, year, session and track. A draft stays in the tutor's list only.
- **Files.** The PDFs go from the tutor's browser straight to the public `national-exams` bucket (20 MB, PDF only), into the paper's own folder: `<paper id>/<file id>.pdf`, which the table checks. The paper is recorded only after its files are there, with their sizes as storage reports them; a replaced or removed file is deleted when the paper is saved. The papers are public documents, so the bucket is public and served from the CDN, cached for a day: a deleted paper does not linger for long.
- **Sending a paper.** Everything that can be checked is checked before a byte is sent: the year, and whether that paper already exists (`checkPaper`, asked again by the database). The upload is the storage request written out (`src/lib/exams/upload.ts`), so the form can say « Envoi du sujet (1 sur 2) : 8,4 Mo sur 18 Mo… » in a live region, with « Gardez cette page ouverte… »; the fields are disabled meanwhile and leaving the page asks first. A file already sent is not sent again when the form is corrected; one the form no longer names is taken back. A new paper's id is the form's own and changes once the paper is recorded, so a form shown again by the back button never writes into it. A PDF Windows gives no type is still taken for one when its name ends in `.pdf`.
- **Taking a paper off the site.** A published paper made a draft has its files copied to new names and the old ones deleted, so a link someone kept stops working; a draft's files are reachable only by their unguessable addresses, like a lesson image (D-050). Files of a form abandoned after its upload stay in the paper's folder until a sweep: rare, since the checks come first.
- **Pages.** `/examens` lists the programmes that have papers; `/examens/[programme]` lists them by year, newest first, each with « Sujet » and « Corrigé » and their sizes, downloaded under a readable name (`examen-2024-normale-2bac-sciences-maths-sujet.pdf`). The site's header links to it, and a programme's course page says how many papers it has. The tutor manages them at `/prof/examens`.
- Checked in a headless Chrome as the seed tutor: a paper with its correction added, shown on the public pages and the programme's page, made a draft without its correction (the file deleted, the public pages without it), then deleted with its last file. RLS tests cover who reads and writes the table and the bucket.

**D-098 — Course documents written as files.**
The owner chose that Claude writes the courses, summaries and series from the official programme, and that the tutor reads them before anything is published. They are written as Markdown files in the repository (`content/<programme>/<chapitre>/<slug>.md`, syntax in `content/README.md`) and imported as drafts.

- **The format** is the lesson vocabulary and nothing more: `##`/`###` headings, `$…$` and `$$…$$` formulas, bold and italic, lists, the five encadrés as `:::definition … :::`, exercises as `:::exercice Titre … :::` with at most one `:::corrige … :::` at their end. `src/lib/content/markdown.ts` turns a file into the stored document and refuses, with its line, anything a lesson cannot hold (a table, an image, a heading inside an encadré, a formula centred inside a list…). Prettier leaves these files alone: it would indent a `:::` after a list and escape the stars of a formula.
- **The import** (`pnpm content:import`) checks every file first: the syntax, the front matter (an unknown field is an error, at its line), the lesson schema, every formula through KaTeX with errors refused, the chapter named by the path, slugs unique. One problem stops everything. It then lists, file by file, what it would do; `--write` creates the documents that do not exist yet, as drafts.
- **Whose document it is.** An imported document records its file (`lessons.source`) and a hash of what was imported (`source_hash`, `20260930201426`, `20260930202145`). An address already used by a document the tutor wrote stops the import (« renommez le fichier »); a file moved to another chapter keeps its document. `--update` rewrites a draft from its file only while the draft is still what the import made: once the tutor has corrected it, or published it, it is hers, and the import names it and leaves it alone.
- **The connection.** The scripts reach the database as its owner through `SUPABASE_DB_URL`, so the link is always encrypted, and checked against Supabase's certificate when `SUPABASE_DB_CA` names it (`scripts/database.mts`); the seed goes the same way. Turning on « Enforce SSL » in the Supabase dashboard is the owner's to do.
- **Reading them over.** `/prof/lecons` has « À relire » (the drafts, with their number), « Publiés » and a programme filter, in the address so a link keeps them; each row shows the document's kind. The PDF of a draft is one click from the editor (D-096).
- The first files are the 2e bac Sciences expérimentales courses, chapter by chapter, with a summary and a series for the first chapters. The two demonstration lessons of the seed in « Limites et continuité » stay until the tutor decides what to keep.

## Secret key usage

Every server-side use of `SUPABASE_SECRET_KEY`, and why the publishable key plus RLS isn't enough.

| Where                                       | What for                                                                                                          | Why it needs the secret key                                                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tutor "add a student" action (phase 0/1)    | `auth.admin.createUser`, `auth.admin.getUserById`, `auth.admin.generateLink`                                      | Creating another person's account, checking whether it was ever used, and issuing its set-password link are admin operations by definition.            |
| `/api/cron/*` route handlers (phase 2)      | Read upcoming sessions and stamp `reminder_*_sent_at` for everyone                                                | A cron job has no signed-in user, so no RLS identity.                                                                                                  |
| `/api/cron/rappels`, emails (D-085)         | Read notifications and unread messages of everyone, stamp what was emailed                                        | A job has no session, and it writes to others' rows.                                                                                                   |
| `/api/cron/rappels`, file sweep (D-083)     | Remove message files no message holds, a day after upload                                                         | A job has no session, and the files belong to others.                                                                                                  |
| Session emails to the tutor (D-077)         | Read the tutor's email address when a student requests, books or cancels                                          | A student may not read the tutor's profile, and the address should not travel through her session.                                                     |
| `pnpm storage:sweep` (D-054)                | Read every lesson, exercise and solution; delete the lesson files none of them refers to                          | A script has no session. It must read drafts and worked solutions, which only the tutor may, and a reference it cannot read is a file it would delete. |
| Parent access from a student's file (D-091) | `auth.admin.createUser` with a one-use invitation, `auth.admin.getUserById`, `auth.admin.generateLink`            | Creating another person's account and issuing its set-password link are admin operations, as for students.                                             |
| RLS tests' cleanup (D-086, D-088)           | Remove the notifications and payments the run made, and give receipt numbers back (`public.remove_test_payments`) | Nobody signed in may delete a notification or a payment, and the counter has no policy at all.                                                         |

The seed script does not use it (D-028).

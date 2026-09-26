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

## Secret key usage

Every server-side use of `SUPABASE_SECRET_KEY`, and why the publishable key plus RLS isn't enough.

| Where                                    | What for                                                                                 | Why it needs the secret key                                                                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tutor "add a student" action (phase 0/1) | `auth.admin.createUser`, `auth.admin.getUserById`, `auth.admin.generateLink`             | Creating another person's account, checking whether it was ever used, and issuing its set-password link are admin operations by definition.            |
| `/api/cron/*` route handlers (phase 2)   | Read upcoming sessions and stamp `reminder_*_sent_at` for everyone                       | A cron job has no signed-in user, so no RLS identity.                                                                                                  |
| `pnpm storage:sweep` (D-054)             | Read every lesson, exercise and solution; delete the lesson files none of them refers to | A script has no session. It must read drafts and worked solutions, which only the tutor may, and a reference it cannot read is a file it would delete. |

The seed script does not use it (D-028).

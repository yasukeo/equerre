# DESIGN.md — Équerre

## What we're designing for

**Subject.** A private maths tutor's notebook, board and red pen, moved into one app.

**Three people, three jobs:**

| Who                                              | Where       | The one job                                                                                            |
| ------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| A 12–18-year-old on a mid-range Android, weak 4G | Student app | Find tonight's homework in under 10 seconds, and send a photo of it                                    |
| The tutor, on a laptop, all day                  | Workspace   | Run the week — sessions, corrections, messages, payments — scanning the same screens forty times a day |
| A parent, once                                   | Public site | Decide in fifteen seconds that she's serious                                                           |

## Concept — _le cahier et le tableau_

The light theme is the squared exercise book every Moroccan student carries (_cahier à petits carreaux_). The dark theme is the slate board (_tableau noir_). Both themes use the same token names with different values.

**Colour says who wrote it**, the way it does on paper in every classroom:

- the interface is written in **ink**;
- the student's own work is in **blue pen**;
- the tutor's corrections are in **red pen**;
- the **highlighter** marks where you are.

A student learns this system without being told, because it's the one they already use.

## Colour tokens

| Token                | Light (_cahier_) | Dark (_tableau_) | Role                                                                                                                | Why it fits this brief                                                                                                          |
| -------------------- | ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `papier` / `tableau` | `#F5F8FB`        | `#141E20`        | Page background                                                                                                     | A cool squared-paper white, not cream; the dark value is green-black slate, so chalk-white text doesn't vibrate on OLED phones. |
| `encre` / `craie`    | `#132033`        | `#E7ECE8`        | Text, primary buttons                                                                                               | Fountain-pen ink and chalk: the interface's own voice, quiet and very high contrast (15.4:1 / 14.2:1).                          |
| `quadrillage`        | `#D3DEEA`        | `#2B3A3D`        | Hairline rules, table lines, the squared grid                                                                       | Graph-paper lines give structure without boxes. Decorative only — never the sole edge of a control.                             |
| `stylo-bleu`         | `#1F4FB5`        | `#9BB6FF`        | Anything the student produced: answers, uploaded pages, the _rendu_ state                                           | Students write in blue; seeing their work in blue says "this is yours" (6.9:1 / 8.5:1).                                         |
| `stylo-rouge`        | `#BE2F26`        | `#FF9A8B`        | Anything the tutor marked: corrections, grades, annotations, _corrigé_; also errors (always with an icon and words) | Corrections are red on every copy they've ever had back, so meaning is instant (5.4:1 / 8.3:1).                                 |
| `surligneur`         | `#E6EE62`        | `#E3DA6E`        | Focus halo, current nav item, today in the calendar, search matches                                                 | A highlighter marks _where you are_. Never used as text; always paired with an ink edge so focus still meets 3:1.               |

**Support tokens** — derived values, not new colours:

| Token                         | Light     | Dark                 | Use                                          | Measured              |
| ----------------------------- | --------- | -------------------- | -------------------------------------------- | --------------------- |
| `encre-douce` / `craie-douce` | `#4E5D73` | `#A9B6B1`            | Secondary text                               | 6.3:1 / 8.1:1         |
| `surface`                     | `#FFFFFF` | `#1B2729`            | Inputs, sheets, table body                   | —                     |
| `trait`                       | `#6B7E94` | `#66797C`            | Borders of inputs and controls (WCAG 1.4.11) | 3.9:1 / 3.7:1         |
| `lavis-bleu`                  | `#E8EEFB` | `stylo-bleu` at 16%  | Tint behind a _rendu_ chip                   | blue text on it 6.4:1 |
| `lavis-rouge`                 | `#FCEDEA` | `stylo-rouge` at 16% | Tint behind a _corrigé_ chip or an error     | red text on it 5.1:1  |

There is no green "success" colour. Success is written in ink, with a check mark and a sentence.

## Typefaces

| Face                                                                    | Role                                                  | Why                                                                                                                                                                                                            |
| ----------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Readex Pro** (variable: `wght` 160–700, `HEXP` 0–100; Latin + Arabic) | Everything: UI, body, headings                        | Built on Lexend, which was designed around reading fluency — the right base for a 12-year-old reading a lesson on a phone. It carries Arabic in the same family, so RTL later doesn't bring in a second voice. |
| **KaTeX's Computer Modern faces**                                       | Mathematics only, loaded only where maths is rendered | Maths should look like the maths in their textbooks and on the board. We don't restyle it.                                                                                                                     |
| **Kalam 700** (Latin subset)                                            | The red-pen grade mark, and nothing else              | A felt-tip hand for the one personal moment: the grade she wrote. Never used for sentences.                                                                                                                    |

**One family, two densities.** Readex Pro's `HEXP` (expansion) axis is how the two surfaces differ. The workspace sets `HEXP 0`: compact, for dense tables. Public-site headings set `HEXP 100`: wide and calm. This is the brief's "same identity, very different density", applied literally to the type.

Times, grades and MAD amounts use `tabular-nums` so columns line up.

## Type scale

**Workspace and student app** (`HEXP 0`):

| Step   | Size / line-height | Weight  | Use                              |
| ------ | ------------------ | ------- | -------------------------------- |
| `xs`   | 12 / 16            | 400     | Meta and captions only           |
| `sm`   | 14 / 20            | 400–500 | Tutor tables, secondary text     |
| `base` | 16 / 24            | 400     | Student body text, form fields   |
| `lg`   | 18 / 26            | 500     | Section titles, list item titles |
| `xl`   | 22 / 28            | 600     | Page titles                      |
| `2xl`  | 28 / 34            | 600     | The one key figure on a screen   |

**Lesson reading:** 17 / 28, max 68ch, `HEXP 10`.

**Public site** — headings wide, body unchanged:

| Step    | Size                                            | Weight / HEXP |
| ------- | ----------------------------------------------- | ------------- |
| Display | `clamp(2.25rem, 1.6rem + 3vw, 3.75rem)` / 1.05  | 600 / 100     |
| H2      | `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)` / 1.15 | 600 / 70      |
| Lead    | 18 / 30                                         | 400 / 20      |

## Space, shape, elevation

- **Spacing** steps of 4px: 4 · 8 · 12 · 16 · 24 · 32 · 48. The _carreau_ (one square of the grid) is 20px, close to the 5mm of real squared paper.
- **Radius:** 6px on controls, 12px on the top of mobile bottom sheets. No pill-shaped buttons.
- **No drop shadows** except for things that genuinely float (menus, dialogs, bottom sheets). Surfaces separate with a `quadrillage` rule or a change of surface. Paper doesn't float, and identical soft-shadow cards are the most generic look there is.
- **Hit targets** at least 44px. Tutor table rows are 44px, student list rows 64px.

## Layout

**Student app** — mobile first, bottom navigation, tonight's work above everything.

```
┌────────────────────────────────┐
│ Bonsoir Salma          2BAC PC │
├────────────────────────────────┤
│ À rendre                       │
│ ○ Suites — série 3             │
│   pour demain, 18:00           │
│ ○ Limites — exercices 4 et 7   │
│   jeudi                        │
├────────────────────────────────┤
│ Prochaine séance               │
│ mar. 17 sept. · 18:00 – 19:30  │
│ Chez le professeur             │
├────────────────────────────────┤
│ Nouveaux cours                 │
│ Dérivation — 2BAC PC           │
├────────────────────────────────┤
│ Accueil  Devoirs  Séances  Messages │
└────────────────────────────────┘
```

**Tutor workspace** — desktop density, a rail that collapses to icons at 1024–1279px and becomes the same bottom bar under 768px.

```
┌──────────┬──────────────────────────────────────────────────┐
│ Équerre  │ Aujourd'hui — mardi 16 septembre                 │
│          ├──────────────────────────────┬───────────────────┤
│ Accueil  │ 14:00 ┬ Yassine B.   1BAC SM │ 3 demandes        │
│ Élèves   │       │ chez le professeur   │ 5 copies à        │
│ Séances  │ 16:00 ┼ 2BAC PC — mardi 16h  │   corriger        │
│ Cours    │       │ 6 élèves             │ 2 soldes en       │
│ Messages │ 18:00 ┴ Salma A.     2BAC PC │   retard          │
│          │  ↑ a graduated ruler, not a  │                   │
│          │    list of cards             │                   │
└──────────┴──────────────────────────────┴───────────────────┘
```

The day is drawn as a **graduated ruler**: time runs down a scale with tick marks, and sessions hang off it at their real length. A 2-hour group session takes up twice the space of a 1-hour one, so she reads the shape of her day at a glance.

**Public site** (phase 4) — the squared grid appears here, as the page's structure: the headline sits on the grid and the columns snap to it. It stays out of the workspace, where it would only be noise.

## Signature — _la note au stylo rouge_

When a student opens a corrected assignment, the grade (for example _15,5/20_) appears in Kalam, in red pen, and a hand-drawn circle traces around it once (450ms stroke). With `prefers-reduced-motion`, the circle is simply there.

The mark appears in exactly three places: the corrected assignment, the progress view and the _correction prête_ notification. Everything else stays quiet so this moment lands.

## Motion

Motion is used only to show what changed:

- a solution revealing: height and fade, 180ms;
- a message landing: 8px rise and fade, 160ms;
- a session confirmed: the status chip swaps and its check mark draws, 200ms;
- the red-pen circle: 450ms.

All motion is disabled under `prefers-reduced-motion: reduce`.

## State is never colour alone

| Thing      | States (icon + word)                                                       |
| ---------- | -------------------------------------------------------------------------- |
| Assignment | ○ À faire · ◐ Rendu (blue) · ✓ Corrigé (red)                               |
| Session    | ⧗ En attente · ▢ Planifiée · ✓ Terminée · ✕ Annulée · ⊘ Absent · — Refusée |
| Payment    | ✓ À jour · △ En retard de _n_ jours                                        |

## Dark mode and RTL

- Every colour is a CSS variable. `:root` holds the _cahier_ values; `[data-theme="dark"]` and `prefers-color-scheme: dark` hold the _tableau_ values. No component references a hex value.
- Layout uses logical properties only (`ms-*`, `pe-*`, `start-*`, `inset-inline`). Icons that imply direction flip under `dir="rtl"`.

## Review — what changed after the first draft

1. **Primary buttons were blue.** Blue buttons are the default of every SaaS product. Primary actions are now ink, and blue is reserved for the student's own work, so the colour carries meaning instead of decoration.
2. **Public headings used a separate display serif.** A high-contrast serif on a pale background is one of the looks the brief rules out. Readex Pro's width axis now does that job inside a single family.
3. **A faint graph-paper grid sat behind the whole app.** On a dense workspace it was noise. The grid now appears only where it is structure: the public page, and the upload frame when photographing homework.
4. **Corrections in green** (the "kinder pen" some schools have adopted) were considered. Red stays, because it's what students' school copies use and the meaning is immediate. Kindness is carried by the words of the feedback, not the ink.

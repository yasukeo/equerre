// Colour that says what something is (DECISIONS.md, D-100): a level has the colour of its
// notebook cover, a kind of document its own. The class names are written out whole so
// Tailwind sees them.

import type { DocumentKind } from "@/lib/lesson/kinds";

export type Hue = "bleu" | "vert" | "orange" | "violet" | "jaune" | "rouge";

export type HueClasses = {
  /** A band that carries white text: a programme's header, a chapter's number. */
  band: string;
  /** A tinted chip or card, with its text. */
  chip: string;
  /** The hue as text on the page: its dark shade, readable at any size. */
  text: string;
  /** The hue as a small mark: a dot, a progress bar. */
  dot: string;
  /** The hue as a card's leading edge. */
  edge: string;
  /** The hue as a border, for something opened or chosen. */
  ring: string;
  /** The hue as a card's top edge. */
  top: string;
};

const HUES: Record<Hue, HueClasses> = {
  bleu: {
    band: "bg-bleu-bande text-white",
    chip: "bg-bleu-fond text-bleu-texte",
    text: "text-bleu-texte",
    dot: "bg-bleu",
    edge: "border-s-bleu",
    ring: "border-bleu",
    top: "border-t-bleu",
  },
  vert: {
    band: "bg-vert-bande text-white",
    chip: "bg-vert-fond text-vert-texte",
    text: "text-vert-texte",
    dot: "bg-vert",
    edge: "border-s-vert",
    ring: "border-vert",
    top: "border-t-vert",
  },
  orange: {
    band: "bg-orange-bande text-white",
    chip: "bg-orange-fond text-orange-texte",
    text: "text-orange-texte",
    dot: "bg-orange",
    edge: "border-s-orange",
    ring: "border-orange",
    top: "border-t-orange",
  },
  violet: {
    band: "bg-violet-bande text-white",
    chip: "bg-violet-fond text-violet-texte",
    text: "text-violet-texte",
    dot: "bg-violet",
    edge: "border-s-violet",
    ring: "border-violet",
    top: "border-t-violet",
  },
  jaune: {
    band: "bg-jaune-bande text-white",
    chip: "bg-jaune-fond text-jaune-texte",
    text: "text-jaune-texte",
    dot: "bg-jaune",
    edge: "border-s-jaune",
    ring: "border-jaune",
    top: "border-t-jaune",
  },
  rouge: {
    band: "bg-rouge-bande text-white",
    chip: "bg-rouge-fond text-rouge-texte",
    text: "text-rouge-texte",
    dot: "bg-rouge",
    edge: "border-s-rouge",
    ring: "border-rouge",
    top: "border-t-rouge",
  },
};

export type Cycle = "college" | "tronc_commun" | "1bac" | "2bac";

/** Collège vert, tronc commun orange, 1re bac violet, 2e bac bleu. */
const CYCLE_HUE: Record<Cycle, Hue> = {
  college: "vert",
  tronc_commun: "orange",
  "1bac": "violet",
  "2bac": "bleu",
};

/** Cours bleu, résumé jaune, série verte, devoir rouge. */
const KIND_HUE: Record<DocumentKind, Hue> = {
  cours: "bleu",
  resume: "jaune",
  serie: "vert",
  devoir: "rouge",
};

/** The national exams: violet. */
export const EXAM_HUE: Hue = "violet";

export function hue(name: Hue): HueClasses {
  return HUES[name];
}

export function cycleHue(cycle: string): HueClasses {
  return HUES[CYCLE_HUE[cycle as Cycle] ?? "bleu"];
}

export function kindHue(kind: DocumentKind): HueClasses {
  return HUES[KIND_HUE[kind] ?? "bleu"];
}

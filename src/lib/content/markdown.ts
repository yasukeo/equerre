// Course documents written as files (D-098): a small Markdown with LaTeX, turned into the lesson
// vocabulary of src/lib/lesson/document.ts. It knows exactly what a lesson can hold and says
// where a file asks for anything else, so a document either imports whole or not at all.
//
//   ## Titre, ### Sous-titre
//   Un paragraphe, avec $x^2$ en ligne, du **gras** et de l'*italique*. \$ est un dollar.
//   $$ … $$                       une formule centrée (sur une ou plusieurs lignes)
//   - puce / 1. numéro             des listes, imbriquées par deux espaces
//   :::definition … :::            un encadré : definition, theoreme, propriete, exemple, attention
//   :::exercice Titre … :::        un exercice, avec au plus un :::corrige … ::: à la fin

import { CALLOUT_KINDS, type CalloutKind } from "@/lib/lesson/document";

type Inline =
  | { type: "text"; text: string; marks?: { type: "bold" | "italic" }[] }
  | { type: "inlineMath"; attrs: { latex: string } };

type Block = Record<string, unknown> & { type: string };

export type ContentError = { line: number; message: string };

export class ContentSyntaxError extends Error {
  constructor(readonly errors: ContentError[]) {
    super(errors.map((error) => `ligne ${error.line} : ${error.message}`).join("\n"));
  }
}

const CALLOUT_NAMES: Record<string, CalloutKind> = {
  definition: "definition",
  définition: "definition",
  theoreme: "theoreme",
  théorème: "theoreme",
  propriete: "propriete",
  propriété: "propriete",
  exemple: "exemple",
  attention: "attention",
};

// ───────────────────────────────────────────────────────────── inline

/** A line of text with its `$…$`, `**…**` and `*…*`. */
export function parseInline(source: string, line: number, errors: ContentError[]): Inline[] {
  const out: Inline[] = [];
  let text = "";
  let bold = false;
  let italic = false;
  const flush = () => {
    if (text === "") return;
    const marks = [
      ...(bold ? [{ type: "bold" as const }] : []),
      ...(italic ? [{ type: "italic" as const }] : []),
    ];
    const last = out.at(-1);
    // Neighbouring runs with the same marks are one text node, as the editor writes them.
    if (last?.type === "text" && JSON.stringify(last.marks ?? []) === JSON.stringify(marks)) {
      last.text += text;
    } else {
      out.push(marks.length > 0 ? { type: "text", text, marks } : { type: "text", text });
    }
    text = "";
  };

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (char === "\\" && (source[i + 1] === "$" || source[i + 1] === "*")) {
      text += source[i + 1];
      i += 1;
    } else if (char === "$") {
      const end = findClosingDollar(source, i + 1);
      if (end === -1) {
        errors.push({ line, message: "un « $ » ouvre une formule qui n’est pas refermée" });
        text += source.slice(i);
        break;
      }
      const latex = source.slice(i + 1, end).trim();
      if (latex === "") errors.push({ line, message: "formule vide « $$ » dans le texte" });
      flush();
      out.push({ type: "inlineMath", attrs: { latex } });
      i = end;
    } else if (char === "*" && source[i + 1] === "*") {
      flush();
      bold = !bold;
      i += 1;
    } else if (char === "*") {
      flush();
      italic = !italic;
    } else {
      text += char;
    }
  }
  flush();
  if (bold) errors.push({ line, message: "« ** » ouvre du gras qui n’est pas refermé" });
  if (italic) errors.push({ line, message: "« * » ouvre de l’italique qui n’est pas refermé" });
  return out;
}

/** The `$` that closes a formula, skipping `\$` inside it. */
function findClosingDollar(source: string, from: number): number {
  for (let i = from; i < source.length; i += 1) {
    if (source[i] === "\\") i += 1;
    else if (source[i] === "$") return i;
  }
  return -1;
}

// ───────────────────────────────────────────────────────────── blocks

type Line = { text: string; number: number };

type Frame =
  | { kind: "doc"; blocks: Block[] }
  | { kind: "callout"; blocks: Block[]; callout: CalloutKind; line: number }
  | {
      kind: "exercise";
      blocks: Block[];
      title: string | null;
      solution: Block[] | null;
      /** How many statement blocks there were when the correction closed. */
      solutionAt: number;
      line: number;
    }
  | { kind: "solution"; blocks: Block[]; line: number };

const LIST_ITEM = /^( *)([-*]|\d+[.)]) +(.*)$/;

/** The body of a document, after its front matter. */
export function parseBody(source: string, firstLine = 1): Block[] {
  const lines: Line[] = source
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((text, index) => ({ text: text.replace(/\s+$/, ""), number: firstLine + index }));
  const errors: ContentError[] = [];
  const stack: Frame[] = [{ kind: "doc", blocks: [] }];
  const top = () => stack[stack.length - 1]!;
  let paragraph: Line[] = [];

  const closeParagraph = () => {
    if (paragraph.length === 0) return;
    const joined = paragraph.map((line) => line.text.trim()).join(" ");
    const content = parseInline(joined, paragraph[0]!.number, errors);
    top().blocks.push(content.length > 0 ? { type: "paragraph", content } : { type: "paragraph" });
    paragraph = [];
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    const trimmed = line.text.trim();

    if (trimmed === "") {
      closeParagraph();
      i += 1;
      continue;
    }

    // ::: closes the innermost block; :::name opens one.
    if (trimmed.startsWith(":::")) {
      closeParagraph();
      const opener = trimmed.slice(3).trim();
      if (opener === "") {
        closeFrame(stack, line.number, errors);
      } else {
        openFrame(stack, opener, line.number, errors);
      }
      i += 1;
      continue;
    }

    // What a lesson cannot hold would otherwise come out as a paragraph of pipes and brackets.
    if (trimmed.startsWith("|") || trimmed.startsWith("![") || trimmed.startsWith(">")) {
      errors.push({
        line: line.number,
        message: trimmed.startsWith("|")
          ? "les tableaux n’existent pas dans une leçon : écrivez une liste"
          : trimmed.startsWith("![")
            ? "une image s’ajoute dans l’éditeur, après l’import"
            : "les citations « > » n’existent pas dans une leçon : utilisez un encadré",
      });
      i += 1;
      continue;
    }

    const heading = /^(#{2,3}) +(.+)$/.exec(trimmed);
    if (heading) {
      closeParagraph();
      if (top().kind !== "doc") {
        errors.push({
          line: line.number,
          message: "un titre ne va pas dans un encadré ou un exercice",
        });
      } else {
        const content = parseInline(heading[2]!, line.number, errors);
        top().blocks.push({ type: "heading", attrs: { level: heading[1]!.length }, content });
      }
      i += 1;
      continue;
    }
    if (/^#{2,3}$/.test(trimmed)) {
      errors.push({ line: line.number, message: "titre vide" });
      i += 1;
      continue;
    }
    if (/^#( |$)/.test(trimmed) || /^#{4,}/.test(trimmed)) {
      errors.push({
        line: line.number,
        message: "seuls « ## » et « ### » existent : le titre du document est dans son en-tête",
      });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("$$")) {
      closeParagraph();
      const rest = trimmed.slice(2);
      // A displayed formula has its line to itself: text after its closing « $$ » would be
      // swallowed into it, and the next lines with it.
      const closing = rest.indexOf("$$");
      if (closing !== -1 && rest.slice(closing + 2).trim() !== "") {
        errors.push({
          line: line.number,
          message:
            "rien ne suit « $$ » sur sa ligne : passez à la ligne, ou écrivez la formule en ligne avec $…$",
        });
        i += 1;
        continue;
      }
      let latex: string;
      if (rest.trim().endsWith("$$") && rest.trim().length > 2) {
        latex = rest.trim().slice(0, -2);
        i += 1;
      } else {
        const body: string[] = rest.trim() === "" ? [] : [rest];
        let j = i + 1;
        while (j < lines.length && !lines[j]!.text.trim().endsWith("$$")) {
          body.push(lines[j]!.text);
          j += 1;
        }
        if (j === lines.length) {
          errors.push({
            line: line.number,
            message: "« $$ » ouvre une formule qui n’est pas refermée",
          });
          break;
        }
        const last = lines[j]!.text.trim().slice(0, -2);
        if (last.trim() !== "") body.push(last);
        latex = body.join("\n");
        i = j + 1;
      }
      if (latex.trim() === "") errors.push({ line: line.number, message: "formule centrée vide" });
      top().blocks.push({ type: "blockMath", attrs: { latex: latex.trim() } });
      continue;
    }

    if (LIST_ITEM.test(line.text)) {
      closeParagraph();
      // An indented item with no list to belong to: a blank line cut it from its list.
      if (/^ +/.test(line.text)) {
        errors.push({
          line: line.number,
          message:
            "élément de liste en retrait hors de toute liste : retirez la ligne vide qui le sépare de sa liste",
        });
      }
      const { list, next } = parseList(lines, i, errors);
      top().blocks.push(list);
      i = next;
      continue;
    }

    paragraph.push(line);
    i += 1;
  }
  closeParagraph();

  while (stack.length > 1) {
    const open = stack.pop()!;
    if (open.kind !== "doc") {
      errors.push({ line: open.line, message: "« ::: » ouvert ici n’est jamais refermé" });
    }
  }
  if (errors.length > 0) throw new ContentSyntaxError(errors);
  return stack[0]!.blocks;
}

function openFrame(stack: Frame[], opener: string, line: number, errors: ContentError[]) {
  const [name = "", ...rest] = opener.split(/\s+/);
  const lower = name.toLowerCase();
  const top = stack[stack.length - 1]!;

  if (lower === "exercice") {
    if (top.kind !== "doc") {
      errors.push({ line, message: "un exercice ne va que dans le corps du document" });
      return;
    }
    const title = rest.join(" ").trim();
    stack.push({
      kind: "exercise",
      blocks: [],
      title: title || null,
      solution: null,
      solutionAt: 0,
      line,
    });
    return;
  }
  if (lower === "corrige" || lower === "corrigé") {
    if (top.kind !== "exercise") {
      errors.push({ line, message: "un corrigé va dans un exercice, après son énoncé" });
      return;
    }
    if (top.solution !== null) {
      errors.push({ line, message: "un exercice n’a qu’un corrigé" });
      return;
    }
    stack.push({ kind: "solution", blocks: [], line });
    return;
  }
  const callout = CALLOUT_NAMES[lower];
  if (callout) {
    if (top.kind === "callout") {
      errors.push({ line, message: "un encadré ne va pas dans un autre" });
      return;
    }
    stack.push({ kind: "callout", blocks: [], callout, line });
    return;
  }
  errors.push({
    line,
    message: `« :::${name} » inconnu : ${[...CALLOUT_KINDS, "exercice", "corrige"].join(", ")}`,
  });
}

function closeFrame(stack: Frame[], line: number, errors: ContentError[]) {
  const frame = stack.pop()!;
  const parent = stack[stack.length - 1];
  if (frame.kind === "doc" || !parent) {
    stack.push(frame);
    errors.push({ line, message: "« ::: » ne ferme rien" });
    return;
  }
  if (frame.blocks.length === 0) {
    errors.push({ line: frame.line, message: "bloc vide" });
    return;
  }
  if (frame.kind === "callout") {
    const allowed = new Set(["paragraph", "blockMath", "bulletList", "orderedList"]);
    const bad = frame.blocks.find((block) => !allowed.has(block.type));
    if (bad)
      errors.push({ line: frame.line, message: `un encadré ne contient pas de « ${bad.type} »` });
    parent.blocks.push({ type: "callout", attrs: { kind: frame.callout }, content: frame.blocks });
  } else if (frame.kind === "solution") {
    if (parent.kind === "exercise") {
      parent.solution = frame.blocks;
      parent.solutionAt = parent.blocks.length;
    }
  } else if (frame.kind === "exercise") {
    const content = [
      ...frame.blocks,
      ...(frame.solution ? [{ type: "solution", content: frame.solution }] : []),
    ];
    if (frame.solution !== null && frame.blocks.length > frame.solutionAt) {
      errors.push({ line: frame.line, message: "rien ne vient après le corrigé d’un exercice" });
    }
    parent.blocks.push({
      type: "exercise",
      attrs: { title: frame.title },
      content,
    });
  }
}

/** A list and the lists inside it, from line `start`. */
function parseList(
  lines: Line[],
  start: number,
  errors: ContentError[],
): { list: Block; next: number } {
  const first = LIST_ITEM.exec(lines[start]!.text)!;
  const indent = first[1]!.length;
  const ordered = /\d/.test(first[2]!);
  const items: Block[] = [];
  let i = start;

  while (i < lines.length) {
    const match = LIST_ITEM.exec(lines[i]!.text);
    if (!match || match[1]!.length !== indent) break;
    if (/\d/.test(match[2]!) !== ordered) break;
    const number = lines[i]!.number;
    const text: string[] = [match[3]!];
    const children: Block[] = [];
    i += 1;
    while (i < lines.length) {
      const line = lines[i]!;
      if (line.text.trim() === "") break;
      const nested = LIST_ITEM.exec(line.text);
      const lineIndent = line.text.length - line.text.trimStart().length;
      if (nested && nested[1]!.length > indent) {
        const { list, next } = parseList(lines, i, errors);
        children.push(list);
        i = next;
        continue;
      }
      // A fence ends the list, however it is indented: an editor may have pushed it in.
      if (nested || lineIndent <= indent || line.text.trim().startsWith(":::")) break;
      if (line.text.trim().startsWith("$$")) {
        errors.push({
          line: line.number,
          message: "une formule centrée ne va pas dans une liste : mettez-la en ligne avec $…$",
        });
      }
      // The item's own text comes first: a line after its sub-list would be moved before it.
      if (children.length > 0) {
        errors.push({
          line: line.number,
          message: "le texte d’un élément de liste va avant sa sous-liste",
        });
      }
      text.push(line.text.trim());
      i += 1;
    }
    const content = parseInline(text.join(" "), number, errors);
    items.push({
      type: "listItem",
      content: [
        content.length > 0 ? { type: "paragraph", content } : { type: "paragraph" },
        ...children,
      ],
    });
  }

  const startAt = ordered ? Number.parseInt(first[2]!, 10) : 1;
  return {
    list: ordered
      ? { type: "orderedList", attrs: { start: startAt }, content: items }
      : { type: "bulletList", content: items },
    next: i,
  };
}

// ───────────────────────────────────────────────────────────── front matter

export type ContentMeta = {
  title: string;
  kind: "cours" | "resume" | "serie" | "devoir";
  summary: string | null;
  position: number;
  visibility: "public" | "enrolled";
};

const FIELDS = new Set(["title", "kind", "summary", "position", "visibility"]);

/** A whole file: its front matter between `---` lines, then its body. */
export function parseDocument(source: string): { meta: ContentMeta; content: Block[] } {
  const text = source.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) throw new ContentSyntaxError([{ line: 1, message: "l’en-tête « --- » manque" }]);

  // Each field with its line, so an error points at it. A value may be quoted, as YAML allows.
  const fields = new Map<string, { value: string; line: number }>();
  const errors: ContentError[] = [];
  match[1]!.split("\n").forEach((raw, index) => {
    const line = index + 2;
    if (raw.trim() === "") return;
    const field = /^([a-z]+):\s*(.*)$/.exec(raw.trim());
    if (!field || !FIELDS.has(field[1]!)) {
      errors.push({ line, message: `champ inconnu : ${[...FIELDS].join(", ")}` });
      return;
    }
    const value = field[2]!
      .trim()
      .replace(/^"(.*)"$/, "$1")
      .replace(/^'(.*)'$/, "$1");
    fields.set(field[1]!, { value, line });
  });
  const lineOf = (name: string) => fields.get(name)?.line ?? 1;
  const title = fields.get("title")?.value ?? "";
  if (title === "" || title.length > 160) {
    errors.push({ line: lineOf("title"), message: "« title » manque ou dépasse 160 caractères" });
  }
  const kind = fields.get("kind")?.value ?? "cours";
  if (!["cours", "resume", "serie", "devoir"].includes(kind)) {
    errors.push({ line: lineOf("kind"), message: "« kind » : cours, resume, serie ou devoir" });
  }
  const summary = fields.get("summary")?.value ?? null;
  if (summary !== null && summary.length > 300) {
    errors.push({ line: lineOf("summary"), message: "« summary » dépasse 300 caractères" });
  }
  const positionText = fields.get("position")?.value ?? "0";
  const position = Number.parseInt(positionText, 10);
  if (!/^\d{1,4}$/.test(positionText)) {
    errors.push({ line: lineOf("position"), message: "« position » : un nombre entier" });
  }
  const visibility = fields.get("visibility")?.value ?? "public";
  if (visibility !== "public" && visibility !== "enrolled") {
    errors.push({ line: lineOf("visibility"), message: "« visibility » : public ou enrolled" });
  }
  if (errors.length > 0) throw new ContentSyntaxError(errors);

  const bodyStart = match[0].split("\n").length;
  return {
    meta: {
      title,
      kind: kind as ContentMeta["kind"],
      summary: summary || null,
      position: Number.isFinite(position) ? position : 0,
      visibility: visibility as ContentMeta["visibility"],
    },
    content: parseBody(text.slice(match[0].length), bodyStart),
  };
}

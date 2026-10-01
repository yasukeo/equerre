import { describe, expect, it } from "vitest";
import { lessonDocumentSchema } from "@/lib/lesson/document";
import { ContentSyntaxError, parseBody, parseDocument, parseInline } from "./markdown";

const valid = (blocks: unknown[]) =>
  lessonDocumentSchema.safeParse({ type: "doc", content: blocks }).error?.issues ?? [];

describe("inline text", () => {
  it("reads formulas, bold and italic", () => {
    const errors: never[] = [];
    expect(parseInline("Si $f(x) = x^2$, **alors** *f* est paire.", 1, errors)).toEqual([
      { type: "text", text: "Si " },
      { type: "inlineMath", attrs: { latex: "f(x) = x^2" } },
      { type: "text", text: ", " },
      { type: "text", text: "alors", marks: [{ type: "bold" }] },
      { type: "text", text: " " },
      { type: "text", text: "f", marks: [{ type: "italic" }] },
      { type: "text", text: " est paire." },
    ]);
    expect(errors).toEqual([]);
  });

  it("keeps an escaped dollar and a dollar inside a formula", () => {
    const errors: never[] = [];
    expect(parseInline("Prix : 5 \\$ et $a \\$ b$", 1, errors)).toEqual([
      { type: "text", text: "Prix : 5 $ et " },
      { type: "inlineMath", attrs: { latex: "a \\$ b" } },
    ]);
  });

  it("says where a formula or a mark is left open", () => {
    expect(() => parseBody("Une $formule sans fin.", 4)).toThrow(/ligne 4/);
    expect(() => parseBody("Du **gras sans fin.")).toThrow(ContentSyntaxError);
  });
});

describe("blocks", () => {
  it("reads headings, paragraphs, displayed formulas and lists into a valid lesson", () => {
    const blocks = parseBody(
      [
        "## Définition",
        "",
        "Une ligne",
        "qui continue.",
        "",
        "$$",
        "\\lim_{x \\to a} f(x) = f(a)",
        "$$",
        "",
        "$$ e^{i\\pi} + 1 = 0 $$",
        "",
        "- premier",
        "  - dedans",
        "- second",
        "",
        "3. trois",
        "4. quatre",
      ].join("\n"),
    );
    expect(valid(blocks)).toEqual([]);
    expect(blocks.map((block) => block.type)).toEqual([
      "heading",
      "paragraph",
      "blockMath",
      "blockMath",
      "bulletList",
      "orderedList",
    ]);
    expect(blocks[1]).toEqual({
      type: "paragraph",
      content: [{ type: "text", text: "Une ligne qui continue." }],
    });
    expect(blocks[2]).toEqual({
      type: "blockMath",
      attrs: { latex: "\\lim_{x \\to a} f(x) = f(a)" },
    });
    expect(blocks[5]).toMatchObject({ type: "orderedList", attrs: { start: 3 } });
  });

  it("reads encadrés, exercises and their corrections", () => {
    const blocks = parseBody(
      [
        ":::théorème",
        "Si $f$ est continue sur $[a;b]$…",
        ":::",
        "",
        ":::exercice Limites",
        "Calculer $\\lim_{x\\to 0} \\frac{\\sin x}{x}$.",
        "",
        ":::definition",
        "Un rappel.",
        ":::",
        ":::corrige",
        "La limite vaut $1$.",
        ":::",
        ":::",
      ].join("\n"),
    );
    expect(valid(blocks)).toEqual([]);
    expect(blocks[0]).toMatchObject({ type: "callout", attrs: { kind: "theoreme" } });
    expect(blocks[1]).toMatchObject({
      type: "exercise",
      attrs: { title: "Limites" },
      content: [{ type: "paragraph" }, { type: "callout" }, { type: "solution" }],
    });
  });

  it("ends a list at a fence, even an indented one", () => {
    const blocks = parseBody(
      [":::exercice", "1. Un.", "2. Deux.", "   :::corrige", "   Oui.", "   :::", ":::"].join("\n"),
    );
    expect(valid(blocks)).toEqual([]);
    expect(blocks[0]).toMatchObject({
      type: "exercise",
      content: [{ type: "orderedList" }, { type: "solution" }],
    });
  });

  it("refuses what a lesson cannot hold, naming the line", () => {
    const cases: [string, RegExp][] = [
      ["# Titre", /ligne 1 .*##/],
      [":::exercice\nÉnoncé.\n:::corrige\nA.\n:::\nAprès.\n:::", /après le corrigé/],
      [":::exercice\nÉnoncé.\n:::corrige\nA.\n:::\n:::corrige\nB.\n:::\n:::", /qu’un corrigé/],
      [":::corrige\nA.\n:::", /un corrigé va dans un exercice/],
      [":::definition\n:::attention\nA.\n:::\n:::", /un encadré ne va pas dans un autre/],
      [":::definition\n## Titre\n:::", /un titre ne va pas/],
      [":::encadre\nA.\n:::", /inconnu/],
      [":::definition\nA.", /jamais refermé/],
      ["- item\n  $$x$$", /formule centrée ne va pas dans une liste/],
      ["$$\nx", /pas refermée/],
      ["| a | b |", /tableaux/],
      ["![figure](f.png)", /image/],
      ["> citation", /citations/],
      ["1. a\n\n   - sous\n2. b", /ligne vide/],
      ["- a\n  - b\n  suite", /avant sa sous-liste/],
      ["$$x$$ pour tout x", /rien ne suit/],
      ["##   ", /titre vide/],
    ];
    for (const [source, message] of cases) {
      expect(() => parseBody(source), source).toThrow(message);
    }
  });
});

describe("a whole file", () => {
  it("reads its front matter and numbers the body's lines from the file's", () => {
    const file = [
      "---",
      "title: Continuité",
      "kind: serie",
      "summary: Des exercices.",
      "position: 20",
      "visibility: enrolled",
      "---",
      "",
      "Un $x$ ouvert: $y",
    ].join("\n");
    expect(() => parseDocument(file)).toThrow(/ligne 9/);

    const { meta, content } = parseDocument(file.replace("$y", "fin."));
    expect(meta).toEqual({
      title: "Continuité",
      kind: "serie",
      summary: "Des exercices.",
      position: 20,
      visibility: "enrolled",
    });
    expect(valid(content)).toEqual([]);
  });

  it("refuses a file without its title or with an unknown kind", () => {
    expect(() => parseDocument("Pas d’en-tête")).toThrow(/en-tête/);
    expect(() => parseDocument("---\nkind: cours\n---\n")).toThrow(/title/);
    expect(() => parseDocument("---\ntitle: T\nkind: fiche\n---\n")).toThrow(/ligne 3 .*kind/);
  });

  it("names a mistyped field at its line, and takes a quoted value as it is", () => {
    expect(() => parseDocument("---\ntitle: T\npositon: 3\n---\n")).toThrow(
      /ligne 3 : champ inconnu/,
    );
    expect(() => parseDocument("---\ntitle: T\nposition: trois\n---\n")).toThrow(/position/);
    expect(parseDocument('---\ntitle: "Série 1 : limites"\n---\n').meta.title).toBe(
      "Série 1 : limites",
    );
  });
});

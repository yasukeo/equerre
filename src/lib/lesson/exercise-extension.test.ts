import { getSchema } from "@tiptap/core";
import { EditorState, TextSelection } from "@tiptap/pm/state";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { lessonDocumentSchema, type StoredLesson } from "./document";
import { lessonExtensions } from "./editor-schema";
import { liftOutOfExercise, openSolution, wrapInExercise } from "./exercise-extension";
import { renderLesson } from "./render";

// Exercises and their corrections inside a document (D-095): what the editor offers, what
// saving accepts, and how a page and the two PDFs draw them.

const labels = { exercise: "Exercice", solution: "Corrigé" };
const schema = getSchema(lessonExtensions({ exercises: labels }));
const plain = getSchema(lessonExtensions());

const text = (value: string) => ({ type: "text", text: value });
const paragraph = (value: string) => ({ type: "paragraph", content: [text(value)] });

function fromEditor(json: object): unknown {
  const node = schema.nodeFromJSON(json);
  node.check();
  return node.toJSON();
}

function stateOf(json: object, from: string, to = from) {
  const doc = schema.nodeFromJSON(json);
  const position = (needle: string) => {
    let found = -1;
    doc.descendants((node, pos) => {
      if (found === -1 && node.isText && node.text?.includes(needle)) {
        found = pos + (node.text?.indexOf(needle) ?? 0);
      }
    });
    if (found === -1) throw new Error(`text not found: ${needle}`);
    return found;
  };
  return EditorState.create({
    schema,
    doc,
    selection: TextSelection.create(doc, position(from), position(to) + to.length),
  });
}

function apply(
  state: EditorState,
  command: (state: EditorState, tr: EditorState["tr"], apply: boolean) => boolean,
) {
  const tr = state.tr;
  expect(command(state, tr, true)).toBe(true);
  return state.apply(tr);
}

const series = {
  type: "doc",
  content: [
    paragraph("Série 1 : limites."),
    {
      type: "exercise",
      attrs: { title: "Formes indéterminées" },
      content: [
        paragraph("Calculer la limite."),
        { type: "blockMath", attrs: { latex: "\\lim_{x \\to +\\infty} \\frac{2x+1}{x-3}" } },
        { type: "solution", content: [paragraph("On factorise par x : la limite vaut 2.")] },
      ],
    },
    { type: "exercise", content: [paragraph("Étudier la continuité en 0.")] },
  ],
};

describe("the lesson editor with exercises", () => {
  it("offers exercises and corrections only where they are asked for", () => {
    expect(Object.keys(schema.nodes)).toEqual(expect.arrayContaining(["exercise", "solution"]));
    expect(Object.keys(plain.nodes)).not.toContain("exercise");
    expect(Object.keys(plain.nodes)).not.toContain("solution");
  });

  it("produces only documents that saving accepts", () => {
    const result = lessonDocumentSchema.safeParse(fromEditor(series));
    expect(result.error?.issues ?? []).toEqual([]);
  });

  it("keeps a correction last, single and inside its exercise", () => {
    expect(() =>
      fromEditor({
        type: "doc",
        content: [
          {
            type: "exercise",
            content: [{ type: "solution", content: [paragraph("r")] }, paragraph("énoncé")],
          },
        ],
      }),
    ).toThrow();
    expect(() =>
      fromEditor({ type: "doc", content: [{ type: "solution", content: [paragraph("r")] }] }),
    ).toThrow();
    expect(() =>
      fromEditor({
        type: "doc",
        content: [
          {
            type: "exercise",
            content: [
              paragraph("énoncé"),
              { type: "solution", content: [paragraph("r1")] },
              { type: "solution", content: [paragraph("r2")] },
            ],
          },
        ],
      }),
    ).toThrow();
  });

  it("refuses on saving what the editor could not have written", () => {
    const solutionFirst = {
      type: "doc",
      content: [
        {
          type: "exercise",
          content: [{ type: "solution", content: [paragraph("r")] }, paragraph("énoncé")],
        },
      ],
    };
    expect(lessonDocumentSchema.safeParse(solutionFirst).success).toBe(false);
    const headingInside = {
      type: "doc",
      content: [
        {
          type: "exercise",
          content: [{ type: "heading", attrs: { level: 2 }, content: [text("t")] }],
        },
      ],
    };
    expect(lessonDocumentSchema.safeParse(headingInside).success).toBe(false);
  });
});

describe("the exercise tools", () => {
  it("wraps the paragraphs the selection touches in an exercise", () => {
    const state = stateOf(
      { type: "doc", content: [paragraph("premier"), paragraph("second")] },
      "premier",
      "second",
    );
    const next = apply(state, (s, tr, run) => wrapInExercise(s, tr, schema.nodes.exercise!, run));
    const json = next.doc.toJSON() as StoredLesson;
    expect(json.content?.map((block) => block.type)).toEqual(["exercise"]);
    expect(lessonDocumentSchema.safeParse(json).success).toBe(true);
  });

  it("adds a correction at the end of the exercise, and opens the one it has", () => {
    const state = stateOf(
      { type: "doc", content: [{ type: "exercise", content: [paragraph("énoncé")] }] },
      "énoncé",
    );
    const added = apply(state, (s, tr, run) =>
      openSolution(s, tr, schema.nodes.exercise!, schema.nodes.solution!, run),
    );
    const exercise = added.doc.firstChild!;
    expect(exercise.lastChild?.type.name).toBe("solution");
    expect(added.selection.$from.parent.type.name).toBe("paragraph");
    expect(added.selection.$from.node(2).type.name).toBe("solution");

    // Asked again, it goes to the correction rather than adding a second one.
    const again = apply(added, (s, tr, run) =>
      openSolution(s, tr, schema.nodes.exercise!, schema.nodes.solution!, run),
    );
    let solutions = 0;
    again.doc.descendants((node) => {
      if (node.type.name === "solution") solutions += 1;
    });
    expect(solutions).toBe(1);
  });

  it("takes an exercise apart without losing its statement or its correction", () => {
    const state = stateOf(series, "Calculer");
    const next = apply(state, (s, tr, run) =>
      liftOutOfExercise(s, tr, schema.nodes.exercise!, schema.nodes.solution!, run),
    );
    const words = next.doc.textContent;
    expect(words).toContain("Calculer la limite.");
    expect(words).toContain("la limite vaut 2");
    expect(next.doc.child(1).type.name).toBe("paragraph");
    expect(lessonDocumentSchema.safeParse(next.doc.toJSON()).success).toBe(true);
  });
});

describe("exercises on a page and in the PDFs", () => {
  const options = {
    calloutLabel: (kind: string) => kind,
    fileHref: (path: string) => `/cours/fichiers/${path}`,
    exerciseLabels: {
      exercise: (number: number) => `Exercice ${number}`,
      solution: "Corrigé",
      show: "Voir le corrigé",
    },
  };
  const draw = (solutions?: "fold" | "hide" | "show") =>
    renderToStaticMarkup(renderLesson(series as StoredLesson, { ...options, solutions }));

  it("numbers the exercises in order, with their titles", () => {
    const output = draw();
    expect(output).toContain("Exercice 1");
    expect(output).toContain("Formes indéterminées");
    expect(output).toContain("Exercice 2");
    expect(output.indexOf("Exercice 1")).toBeLessThan(output.indexOf("Exercice 2"));
  });

  it("folds a correction on a page", () => {
    const output = draw("fold");
    expect(output).toMatch(
      /<details class="lecon-corrige"><summary[^>]*>Voir le corrigé<\/summary>/,
    );
    expect(output).toContain("la limite vaut 2");
  });

  it("leaves corrections out of the statements' PDF", () => {
    const output = draw("hide");
    expect(output).not.toContain("la limite vaut 2");
    expect(output).not.toContain("Corrigé");
    expect(output).toContain("Calculer la limite.");
  });

  it("prints each correction after its exercise in the PDF with corrections", () => {
    const output = draw("show");
    expect(output).not.toContain("<details");
    expect(output).toContain(">Corrigé<");
    expect(output.indexOf("la limite vaut 2")).toBeLessThan(output.indexOf("Exercice 2"));
  });
});

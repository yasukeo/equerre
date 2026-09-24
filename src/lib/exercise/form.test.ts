import { describe, expect, it } from "vitest";
import {
  acceptedRange,
  CHOICE_ID,
  isDocumentEmpty,
  isReady,
  newChoiceId,
  parseTags,
  readChoices,
  readiness,
  readTolerance,
} from "./exercise";
import { parseExerciseForm, type ExerciseFormValues } from "./form";

const EMPTY_DOC = JSON.stringify({ type: "doc", content: [] });
const STATEMENT = JSON.stringify({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text: "Calculer." }] }],
});

const base: ExerciseFormValues = {
  id: "40000000-0000-4000-8000-000000000001",
  chapterId: "20000000-0000-4000-8000-000000000001",
  title: "  Limite à l’infini ",
  difficulty: "2",
  tags: "limites, infini",
  answerType: "upload",
  statement: STATEMENT,
  solution: EMPTY_DOC,
  correctNumeric: "",
  tolerance: "",
  toleranceKind: "absolue",
  choiceMode: "unique",
  choices: "[]",
  correctChoiceIds: "[]",
};

const choices = JSON.stringify([
  { id: "a", label: "$a = 0$" },
  { id: "b", label: "$a = 1$" },
  { id: "c", label: "$a = 2$" },
]);

function args(values: Partial<ExerciseFormValues>) {
  const result = parseExerciseForm({ ...base, ...values });
  if (!result.ok) throw new Error(JSON.stringify(result.errors));
  return result.args;
}

function errors(values: Partial<ExerciseFormValues>) {
  const result = parseExerciseForm({ ...base, ...values });
  if (result.ok) throw new Error("expected errors");
  return result.errors;
}

describe("parseExerciseForm", () => {
  it("reads a photographed-answer exercise", () => {
    expect(args({})).toMatchObject({
      p_title: "Limite à l’infini",
      p_difficulty: 2,
      p_tags: ["limites", "infini"],
      p_answer_type: "upload",
      p_correct_numeric: "",
      p_correct_choice_ids: [],
    });
  });

  it("keeps a numeric answer as exact decimal text", () => {
    expect(args({ answerType: "numeric", correctNumeric: "4,8", tolerance: "0,05" })).toMatchObject(
      { p_correct_numeric: "4.8", p_tolerance: "0.05", p_tolerance_kind: "absolue" },
    );
  });

  it("stores a relative tolerance typed in percent as a fraction", () => {
    expect(
      args({
        answerType: "numeric",
        correctNumeric: "3e8",
        tolerance: "1,5",
        toleranceKind: "relative",
      }),
    ).toMatchObject({
      p_correct_numeric: "300000000",
      p_tolerance: "0.015",
      p_tolerance_kind: "relative",
    });
  });

  it("reads an empty tolerance as an exact answer, and an empty answer as not written yet", () => {
    expect(args({ answerType: "numeric", correctNumeric: "2" })).toMatchObject({
      p_tolerance: "0",
    });
    expect(args({ answerType: "numeric" })).toMatchObject({ p_correct_numeric: "" });
  });

  it("refuses a number it cannot read, and a negative or oversized tolerance", () => {
    expect(errors({ answerType: "numeric", correctNumeric: "1/2" })).toEqual({
      correctNumeric: "number",
    });
    expect(errors({ answerType: "numeric", correctNumeric: "2", tolerance: "-1" })).toEqual({
      tolerance: "tolerance",
    });
    expect(
      errors({
        answerType: "numeric",
        correctNumeric: "2",
        tolerance: "150",
        toleranceKind: "relative",
      }),
    ).toEqual({ tolerance: "toleranceTooLarge" });
  });

  it("ignores the numeric fields of an exercise that is not numeric", () => {
    expect(args({ answerType: "upload", correctNumeric: "n’importe quoi" })).toMatchObject({
      p_correct_numeric: "",
      p_tolerance: "",
    });
  });

  it("reads a multiple-choice question and its right answers", () => {
    expect(
      args({
        answerType: "mcq",
        choices,
        choiceMode: "multiple",
        correctChoiceIds: '["c","a","a"]',
      }),
    ).toMatchObject({ p_choice_mode: "multiple", p_correct_choice_ids: ["c", "a"] });
  });

  it("drops a right answer that is no longer a choice", () => {
    expect(args({ answerType: "mcq", choices, correctChoiceIds: '["b","z"]' })).toMatchObject({
      p_correct_choice_ids: ["b"],
    });
  });

  it("refuses two right answers behind radio buttons", () => {
    expect(errors({ answerType: "mcq", choices, correctChoiceIds: '["a","b"]' })).toEqual({
      correctChoiceIds: "oneRight",
    });
  });

  it("refuses too few choices, an empty one, or two with the same id", () => {
    for (const bad of [
      JSON.stringify([{ id: "a", label: "Seul" }]),
      JSON.stringify([
        { id: "a", label: "Oui" },
        { id: "b", label: "  " },
      ]),
      JSON.stringify([
        { id: "a", label: "Oui" },
        { id: "a", label: "Non" },
      ]),
      JSON.stringify([
        { id: "A B", label: "Oui" },
        { id: "b", label: "Non" },
      ]),
      "pas du JSON",
    ]) {
      expect(errors({ answerType: "mcq", choices: bad }).choices, bad).toBe("choices");
    }
  });

  it("refuses a document outside the exercise vocabulary", () => {
    const withFile = JSON.stringify({
      type: "doc",
      content: [
        {
          type: "fileAttachment",
          attrs: {
            path: "0b6f1c3e-8d2a-4f7b-9c1e-5a4d3b2c1f00/2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f.pdf",
            name: "Fiche",
          },
        },
      ],
    });
    expect(errors({ statement: withFile })).toEqual({ statement: "document" });
    expect(errors({ solution: "{" })).toEqual({ solution: "document" });
  });

  it("refuses a bad title, difficulty, answer type or tag list", () => {
    expect(errors({ title: " " })).toEqual({ title: "title" });
    expect(errors({ difficulty: "6" })).toEqual({ difficulty: "difficulty" });
    expect(errors({ answerType: "essay" })).toEqual({ answerType: "answerType" });
    expect(errors({ tags: Array.from({ length: 11 }, (_, i) => `t${i}`).join(",") })).toEqual({
      tags: "tags",
    });
  });
});

describe("the exercise helpers", () => {
  it("gives a new choice an id of its own", () => {
    const ids = new Set(Array.from({ length: 50 }, () => newChoiceId()));
    expect(ids.size).toBe(50);
    for (const id of ids) expect(id).toMatch(CHOICE_ID);
  });

  it("reads tags once each, whatever their case", () => {
    expect(parseTags(" limites ,, TVI, limites , Limites,  forme   indéterminée ")).toEqual([
      "limites",
      "TVI",
      "forme indéterminée",
    ]);
  });

  it("reads only well-formed stored choices", () => {
    expect(readChoices([{ id: "a", label: "Oui" }])).toEqual([{ id: "a", label: "Oui" }]);
    expect(readChoices("oui")).toEqual([]);
    expect(readChoices(null)).toEqual([]);
  });

  it("tells an empty statement from one with only a formula or an image", () => {
    expect(isDocumentEmpty({ type: "doc", content: [{ type: "paragraph" }] })).toBe(true);
    expect(
      isDocumentEmpty({
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "  " }] }],
      }),
    ).toBe(true);
    expect(
      isDocumentEmpty({ type: "doc", content: [{ type: "blockMath", attrs: { latex: "x" } }] }),
    ).toBe(false);
    expect(isDocumentEmpty(null)).toBe(true);
  });

  it("knows when an exercise can be given", () => {
    const ready = (answerType: "upload" | "numeric" | "mcq", extra = {}) =>
      isReady(
        readiness({
          statementEmpty: false,
          answerType,
          correctNumeric: null,
          correctChoiceIds: null,
          ...extra,
        }),
      );
    expect(ready("upload")).toBe(true);
    expect(ready("numeric")).toBe(false);
    expect(ready("numeric", { correctNumeric: "0" })).toBe(true);
    expect(ready("mcq", { correctChoiceIds: [] })).toBe(false);
    expect(ready("mcq", { correctChoiceIds: ["a"] })).toBe(true);
    expect(ready("upload", { statementEmpty: true })).toBe(false);
  });
});

describe("tolerances", () => {
  it("reads a percent typed with or without its sign", () => {
    expect(readTolerance("1", "relative")).toEqual({ value: "0.01" });
    expect(readTolerance("1 %", "relative")).toEqual({ value: "0.01" });
    expect(readTolerance("0,5%", "relative")).toEqual({ value: "0.005" });
    expect(readTolerance("", "absolue")).toEqual({ value: "0" });
  });

  it("refuses a percent sign on an absolute tolerance, and a negative one", () => {
    expect(readTolerance("1 %", "absolue")).toEqual({ error: "tolerancePercent" });
    expect(readTolerance("-1", "absolue")).toEqual({ error: "tolerance" });
    expect(readTolerance("150", "relative")).toEqual({ error: "toleranceTooLarge" });
  });

  it("shows exactly the range the grading accepts", () => {
    expect(acceptedRange("4,8", "1", "relative")).toEqual({
      kind: "range",
      low: "4.752",
      high: "4.848",
    });
    expect(acceptedRange("299792458", "0,01", "relative")).toEqual({
      kind: "range",
      low: "299762478.7542",
      high: "299822437.2458",
    });
    expect(acceptedRange("123456789", "0,0001", "absolue")).toEqual({
      kind: "range",
      low: "123456788.9999",
      high: "123456789.0001",
    });
    expect(acceptedRange("-2", "10", "relative")).toEqual({
      kind: "range",
      low: "-2.2",
      high: "-1.8",
    });
    expect(acceptedRange("4,8", "", "absolue")).toEqual({ kind: "exact", value: "4.8" });
    expect(acceptedRange("4,8", "1 %", "absolue")).toBeNull();
  });
});

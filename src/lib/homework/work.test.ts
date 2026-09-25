import { describe, expect, it } from "vitest";
import { progressOf, workOn, type RevealRow, type SubmissionRow } from "./work";

const A1 = "assignment-1";
const A2 = "assignment-2";
const E = "exercise-e";
const F = "exercise-f";

const corrected = (assignment: string, exercise: string, grade = 20): SubmissionRow => ({
  assignment_id: assignment,
  exercise_id: exercise,
  status: "corrige",
  grade,
});
const handedIn = (assignment: string, exercise: string): SubmissionRow => ({
  assignment_id: assignment,
  exercise_id: exercise,
  status: "rendu",
  grade: null,
});
const reveal = (assignment: string, exercise: string): RevealRow => ({
  assignment_id: assignment,
  exercise_id: exercise,
});

describe("workOn", () => {
  it("is to do while nothing was handed in or opened", () => {
    expect(workOn(A1, E, [], [])).toEqual({ kind: "todo" });
  });

  it("reads her own work in this homework first", () => {
    expect(workOn(A1, E, [corrected(A1, E, 14.5)], [])).toEqual({ kind: "graded", grade: 14.5 });
    expect(workOn(A1, E, [handedIn(A1, E)], [])).toEqual({ kind: "handedIn", changeable: true });
    expect(workOn(A1, E, [], [reveal(A1, E)])).toEqual({ kind: "revealed" });
  });

  it("keeps pages waiting for the tutor, but frozen once the grading would refuse a new list", () => {
    // submit_exercise_answer refuses a reveal anywhere, and a correction in another homework.
    const frozen = { kind: "handedIn", changeable: false };
    expect(workOn(A1, E, [handedIn(A1, E)], [reveal(A1, E)])).toEqual(frozen);
    expect(workOn(A1, E, [handedIn(A1, E)], [reveal(A2, E)])).toEqual(frozen);
    expect(workOn(A1, E, [handedIn(A1, E), corrected(A2, E)], [])).toEqual(frozen);
    expect(workOn(A1, E, [handedIn(A1, E), handedIn(A2, E)], [])).toEqual({
      kind: "handedIn",
      changeable: true,
    });
  });

  it("closes an exercise corrected, or opened, in another homework", () => {
    expect(workOn(A2, E, [corrected(A1, E)], [])).toEqual({ kind: "doneElsewhere" });
    expect(workOn(A2, E, [], [reveal(A1, E)])).toEqual({ kind: "doneElsewhere" });
  });

  it("leaves an exercise merely handed in elsewhere to do here", () => {
    // Photographed pages waiting in another homework do not close it: grading refuses only
    // what was corrected elsewhere.
    expect(workOn(A2, E, [handedIn(A1, E)], [])).toEqual({ kind: "todo" });
  });

  it("does not mix exercises up", () => {
    expect(workOn(A1, F, [corrected(A1, E)], [reveal(A1, E)])).toEqual({ kind: "todo" });
  });
});

describe("progressOf", () => {
  const now = new Date("2026-10-01T12:00:00Z");

  it("counts what is left, and calls it late only once the due date passed", () => {
    const submissions = [corrected(A1, E)];
    expect(progressOf(A1, [E, F], "2026-10-02T19:00:00Z", now, submissions, [])).toEqual({
      total: 2,
      left: 1,
      late: false,
    });
    expect(progressOf(A1, [E, F], "2026-09-30T19:00:00Z", now, submissions, [])).toEqual({
      total: 2,
      left: 1,
      late: true,
    });
  });

  it("is never late once nothing is left", () => {
    expect(progressOf(A1, [E], "2026-09-30T19:00:00Z", now, [], [reveal(A1, E)])).toEqual({
      total: 1,
      left: 0,
      late: false,
    });
  });
});

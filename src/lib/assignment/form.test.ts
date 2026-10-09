import { describe, expect, it } from "vitest";
import { localDateKeyInDays } from "@/lib/dates";
import {
  parseAssignmentDetails,
  parseAssignmentForm,
  parseSubjectAssignmentForm,
  readDue,
  readRecipient,
  type AssignmentFormValues,
} from "./form";

const STUDENT = "00000000-0000-4000-8000-000000000101";
const GROUP = "10000000-0000-4000-8000-000000000001";
const A = "40000000-0000-4000-8000-000000000001";
const B = "40000000-0000-4000-8000-000000000002";

// Thursday 24 September 2026, 12:00 in Casablanca (UTC+1 then).
const NOW = new Date("2026-09-24T11:00:00Z");

const base: AssignmentFormValues = {
  title: "  Devoir — limites ",
  instructions: " Rendez les pages dans l’ordre. ",
  dueDate: "2026-10-01",
  dueTime: "20:00",
  recipient: `student:${STUDENT}`,
  exerciseIds: JSON.stringify([A, B]),
};

function parsed(values: Partial<AssignmentFormValues>) {
  const result = parseAssignmentForm({ ...base, ...values }, NOW);
  if (!result.ok) throw new Error(JSON.stringify(result.errors));
  return result.value;
}

function errors(values: Partial<AssignmentFormValues>) {
  const result = parseAssignmentForm({ ...base, ...values }, NOW);
  if (result.ok) throw new Error("expected errors");
  return result.errors;
}

describe("parseAssignmentForm", () => {
  it("reads the homework, its recipient and its exercises in order", () => {
    expect(parsed({})).toEqual({
      title: "Devoir — limites",
      instructions: "Rendez les pages dans l’ordre.",
      dueAt: new Date("2026-10-01T19:00:00Z"),
      recipient: { kind: "student", id: STUDENT },
      exerciseIds: [A, B],
    });
    expect(
      parsed({ recipient: `group:${GROUP}`, exerciseIds: JSON.stringify([B, A]) }),
    ).toMatchObject({ recipient: { kind: "group", id: GROUP }, exerciseIds: [B, A] });
  });

  it("reads the due date in Casablanca time, Ramadan included", () => {
    // Morocco moves to UTC+0 for Ramadan: 20:00 on 20 February 2027 is 20:00 UTC.
    const ramadan = parseAssignmentForm({ ...base, dueDate: "2027-02-20" }, NOW);
    expect(ramadan.ok && ramadan.value.dueAt.toISOString()).toBe("2027-02-20T20:00:00.000Z");
  });

  it("refuses a due date already past, or malformed", () => {
    expect(errors({ dueDate: "2026-09-24", dueTime: "11:59" })).toEqual({ due: "dueInPast" });
    expect(errors({ dueDate: "01/10/2026" })).toEqual({ due: "due" });
    expect(errors({ dueTime: "24:00" })).toEqual({ due: "due" });
  });

  it("refuses a missing recipient, and a recipient that is not an id", () => {
    expect(errors({ recipient: "" })).toEqual({ recipient: "recipient" });
    expect(errors({ recipient: "student:Salma" })).toEqual({ recipient: "recipient" });
    expect(errors({ recipient: `teacher:${STUDENT}` })).toEqual({ recipient: "recipient" });
  });

  it("refuses no exercise, the same exercise twice, or more than thirty", () => {
    expect(errors({ exerciseIds: "[]" })).toEqual({ exerciseIds: "exercises" });
    expect(errors({ exerciseIds: JSON.stringify([A, A]) })).toEqual({ exerciseIds: "exercises" });
    const many = Array.from(
      { length: 31 },
      (_, i) => `40000000-0000-4000-8000-${String(i).padStart(12, "0")}`,
    );
    expect(errors({ exerciseIds: JSON.stringify(many) })).toEqual({ exerciseIds: "exercises" });
    expect(errors({ exerciseIds: "pas du JSON" })).toEqual({ exerciseIds: "exercises" });
  });

  it("refuses an empty title and overlong instructions", () => {
    expect(errors({ title: "  " })).toEqual({ title: "title" });
    expect(errors({ instructions: "x".repeat(2001) })).toEqual({ instructions: "instructions" });
  });
});

describe("parseAssignmentDetails", () => {
  it("lets a due date move into the past, to set a date right after the fact", () => {
    const result = parseAssignmentDetails({
      title: "Devoir",
      instructions: "",
      dueDate: "2026-09-01",
      dueTime: "08:00",
    });
    expect(result.ok && result.value.dueAt.toISOString()).toBe("2026-09-01T07:00:00.000Z");
  });
});

describe("readRecipient", () => {
  it("reads the picker's value", () => {
    expect(readRecipient(`group:${GROUP}`)).toEqual({ kind: "group", id: GROUP });
    expect(readRecipient("group:")).toBeNull();
  });
});

describe("readDue", () => {
  it("refuses a day that does not exist rather than rolling it over", () => {
    expect(readDue("2027-02-31", "20:00")).toBeNull();
    expect(readDue("2026-13-01", "20:00")).toBeNull();
    expect(readDue("0027-10-01", "20:00")).toBeNull();
    expect(readDue("2400-10-01", "20:00")).toBeNull();
  });

  it("says so when the clocks jump over the time typed", () => {
    // Morocco moves back to UTC+1 at 02:00 on the Sunday after Ramadan 2027: 02:30 never happens.
    const skipped = ["2027-03-14", "2027-03-21"].map((day) => readDue(day, "02:30"));
    expect(skipped).toContain("skipped");
    expect(readDue("2027-03-14", "20:00")).toBeInstanceOf(Date);
  });

  it("maps a skipped hour to its own message", () => {
    const day = ["2027-03-14", "2027-03-21"].find((d) => readDue(d, "02:30") === "skipped");
    const result = parseAssignmentForm({ ...base, dueDate: day ?? "", dueTime: "02:30" }, NOW);
    expect(result.ok ? null : result.errors).toEqual({ due: "dueSkipped" });
  });
});

describe("localDateKeyInDays", () => {
  it("counts calendar days in Casablanca, whatever the hour", () => {
    // 00:30 on 2 February 2027 (UTC+1) and 23:30 on 7 March 2027 (UTC+0).
    expect(localDateKeyInDays(new Date("2027-02-01T23:30:00Z"), 7)).toBe("2027-02-09");
    expect(localDateKeyInDays(new Date("2027-03-07T23:30:00Z"), 7)).toBe("2027-03-14");
  });
});

describe("parseSubjectAssignmentForm", () => {
  const common = {
    title: base.title,
    instructions: base.instructions,
    dueDate: base.dueDate,
    dueTime: base.dueTime,
    recipient: base.recipient,
  };
  const SUBJECT = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa.pdf";

  it("reads the homework and the subject's file in place of exercises", () => {
    const result = parseSubjectAssignmentForm({ ...common, subjectPath: SUBJECT }, NOW);
    expect(result).toEqual({
      ok: true,
      value: {
        title: "Devoir — limites",
        instructions: "Rendez les pages dans l’ordre.",
        dueAt: new Date("2026-10-01T19:00:00Z"),
        recipient: { kind: "student", id: STUDENT },
        subjectPath: SUBJECT,
      },
    });
  });

  it("asks for the file when none was sent, or a name of another shape", () => {
    for (const subjectPath of ["", "sujet.pdf", `../${SUBJECT}`]) {
      const result = parseSubjectAssignmentForm({ ...common, subjectPath }, NOW);
      expect(result.ok ? null : result.errors.subject).toBe("subject");
    }
  });

  it("checks the other fields as for any homework", () => {
    const result = parseSubjectAssignmentForm(
      { ...common, title: " ", dueDate: "2026-09-01", subjectPath: SUBJECT },
      NOW,
    );
    expect(result.ok ? null : result.errors).toEqual({ title: "title", due: "dueInPast" });
  });
});

/** What a student answered, as submit_exercise_answer stored it. */
export type SubmittedAnswer = { raw: string | null; choiceIds: string[] };

/** The answer column, trusted only as far as it reads: her page and the tutor's both show it. */
export function readAnswer(value: unknown): SubmittedAnswer {
  const answer = (typeof value === "object" && value !== null ? value : {}) as Record<
    string,
    unknown
  >;
  return {
    raw:
      typeof answer.raw === "string"
        ? answer.raw
        : typeof answer.value === "string"
          ? answer.value
          : null,
    choiceIds: Array.isArray(answer.choiceIds)
      ? answer.choiceIds.filter((id): id is string => typeof id === "string")
      : [],
  };
}

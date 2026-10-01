// The messages each part of the app hands to the browser (DECISIONS.md, D-092). Server
// components read the whole dictionary on the server; only client components need theirs in
// the page, and sending all of fr.json made up four fifths of every public page.
// `client-namespaces.test.ts` checks that every client component's namespace is listed for
// the part of the app it renders in.

type Messages = { [key: string]: string | Messages };

/** Everywhere: the offline banner, the copy button, the error screens, the PDF links. */
const BASE = ["common", "errors.generic", "pdf"];

/** The signed-in workspaces: the chat and the bell. */
const WORKSPACE = [...BASE, "chat", "notifications"];

export const CLIENT_NAMESPACES = {
  /** The public site, the public lessons, the parent view. */
  base: BASE,
  auth: [...BASE, "auth", "contact"],
  tutor: [
    ...WORKSPACE,
    "account",
    "blog.category",
    "contact",
    "documentKind",
    "editor",
    "parentsAdmin",
    "payments.kind",
    "payments.method",
    "plans",
    "postEditor",
    "postsAdmin",
    "recordPayment",
    "session.mode",
    "siteAdmin",
    "studentStatus",
    "tutor.assignment",
    "tutor.availability",
    "tutor.correction",
    "tutor.exams",
    "tutor.exerciseEditor",
    "tutor.exercises.answerType",
    "tutor.groups",
    "tutor.invite",
    "tutor.lessonEditor",
    "tutor.lessons",
    "tutor.newAssignment",
    "tutor.newExercise",
    "tutor.newLesson",
    "tutor.planSession",
    "tutor.session",
    "tutor.sessionTypes",
    "tutor.sessions",
    "tutor.student",
  ],
  student: [...WORKSPACE, "student.booking", "student.homework", "student.session"],
} as const;

export type ClientArea = keyof typeof CLIENT_NAMESPACES;

/** Whether a namespace a component asks for is inside one of the listed ones. */
export function isCovered(namespace: string, listed: readonly string[]): boolean {
  return listed.some((path) => namespace === path || namespace.startsWith(`${path}.`));
}

/** The listed namespaces of a dictionary, each at its own place, and nothing else. */
export function pickMessages(messages: Messages, paths: readonly string[]): Messages {
  const picked: Messages = {};
  for (const path of paths) {
    const keys = path.split(".");
    let from: string | Messages | undefined = messages;
    let into = picked;
    keys.forEach((key, index) => {
      from = typeof from === "object" ? from[key] : undefined;
      if (from === undefined) return;
      if (index === keys.length - 1) {
        into[key] = from;
      } else {
        const next = into[key];
        into = (typeof next === "object" ? next : (into[key] = {})) as Messages;
      }
    });
  }
  return picked;
}

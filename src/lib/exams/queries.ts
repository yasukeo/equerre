import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { isSlug } from "@/lib/lesson/queries";
import { publicStreams } from "@/lib/lesson/streams";
import { publicClient } from "@/lib/supabase/public";
import { examFileName, type ExamSession } from "./files";

// The past national exams a visitor may download (D-097), read anonymously and cached: the
// select policy narrows the public client to published papers, whatever is asked.

/** Every page listing exams carries it, so a change by the tutor refreshes them all. */
export const EXAMS_TAG = "examens";

export type ExamPaper = {
  id: string;
  year: number;
  session: ExamSession;
  track: string | null;
  /** French, or Arabic where the stream sat its paper in Arabic only. */
  language: "fr" | "ar";
  /** The ministry's own paper and « éléments de réponse », published as they are (D-099). */
  official: boolean;
  subjectUrl: string;
  subjectSize: number;
  solutionUrl: string | null;
  solutionSize: number | null;
};

export type ExamProgramme = {
  code: string;
  slug: string;
  label: string;
  cycle: string;
  /** The streams that follow it, by the names students use. */
  streams: string[];
  paperCount: number;
  /** The first and most recent years with a paper, for the index. */
  firstYear: number;
  latestYear: number;
};

/** The programmes with at least one published paper, in school order. */
export async function listExamProgrammes(): Promise<ExamProgramme[]> {
  "use cache";
  cacheTag(EXAMS_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("programmes")
    .select(
      "code, slug, label, cycle, position, levels(code, label, position), national_exams!inner(year)",
    )
    .order("position");
  if (error) throw new Error("Could not read the exam programmes", { cause: error });

  return data.map((programme) => ({
    code: programme.code,
    slug: programme.slug,
    label: programme.label,
    cycle: programme.cycle,
    streams: publicStreams(programme.levels),
    paperCount: programme.national_exams.length,
    firstYear: Math.min(...programme.national_exams.map((exam) => exam.year)),
    latestYear: Math.max(...programme.national_exams.map((exam) => exam.year)),
  }));
}

export type ProgrammeExams = {
  code: string;
  slug: string;
  label: string;
  /** Newest year first; within a year, the normal session before the resit. */
  years: { year: number; papers: ExamPaper[] }[];
  /** Whether any of them is the ministry's own: the page then says where they come from. */
  official: boolean;
};

/** One programme's papers, by year. Null when the programme does not exist. */
export async function getProgrammeExams(slug: string): Promise<ProgrammeExams | null> {
  return isSlug(slug) ? readProgrammeExams(slug) : null;
}

async function readProgrammeExams(slug: string): Promise<ProgrammeExams | null> {
  "use cache";
  cacheTag(EXAMS_TAG);

  const client = publicClient();
  const { data, error } = await client
    .from("programmes")
    .select(
      "code, slug, label, national_exams(id, year, session, track, language, official, subject_path, subject_size, solution_path, solution_size)",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error("Could not read the programme's exams", { cause: error });
  if (!data) {
    cacheLife("minutes");
    return null;
  }
  cacheLife("max");

  const bucket = client.storage.from("national-exams");
  const url = (path: string, name: string) =>
    bucket.getPublicUrl(path, { download: name }).data.publicUrl;

  const papers = [...data.national_exams].sort(
    (a, b) =>
      b.year - a.year ||
      SESSIONS.indexOf(a.session) - SESSIONS.indexOf(b.session) ||
      (a.track ?? "").localeCompare(b.track ?? "", "fr"),
  );
  const years: ProgrammeExams["years"] = [];
  for (const exam of papers) {
    const paper: ExamPaper = {
      id: exam.id,
      year: exam.year,
      session: exam.session,
      track: exam.track,
      language: exam.language === "ar" ? "ar" : "fr",
      official: exam.official,
      subjectUrl: url(exam.subject_path, examFileName(data.slug, exam, "sujet")),
      subjectSize: exam.subject_size,
      solutionUrl: exam.solution_path
        ? url(
            exam.solution_path,
            examFileName(data.slug, exam, exam.official ? "elements-de-reponse" : "corrige"),
          )
        : null,
      solutionSize: exam.solution_size,
    };
    const last = years.at(-1);
    if (last?.year === exam.year) last.papers.push(paper);
    else years.push({ year: exam.year, papers: [paper] });
  }
  return {
    code: data.code,
    slug: data.slug,
    label: data.label,
    years,
    official: papers.some((exam) => exam.official),
  };
}

const SESSIONS: readonly ExamSession[] = ["normale", "rattrapage"];

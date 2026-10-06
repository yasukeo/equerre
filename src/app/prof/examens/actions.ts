"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { EXAM_SESSIONS, isExamFileName, newExamFileName } from "@/lib/exams/files";
import { EXAMS_TAG } from "@/lib/exams/queries";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { createClient } from "@/lib/supabase/server";

// The tutor's national exams (D-097). Her browser uploads the PDFs straight to the bucket under
// her session; these actions then record the paper. The sizes come from storage, not the form,
// and a file is accepted only from the paper's own folder.

const BUCKET = "national-exams";

const paperSchema = z.object({
  id: z.uuid(),
  programme: z.string().regex(/^[0-9A-Z-]{2,12}$/),
  year: z.coerce
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  session: z.enum(EXAM_SESSIONS as [string, ...string[]]),
  track: z.string().trim().max(80),
  language: z.enum(["fr", "ar"]),
  published: z.enum(["true", "false"]).transform((value) => value === "true"),
  subjectPath: z.string(),
  solutionPath: z.string(),
  removeSolution: z.enum(["true", "false"]).transform((value) => value === "true"),
});

type Read =
  | { ok: false; state: FormState }
  | {
      ok: true;
      paper: z.infer<typeof paperSchema>;
      values: Record<string, string>;
      t: Awaited<ReturnType<typeof getTranslations<"tutor.exams">>>;
    };

async function readPaper(formData: FormData): Promise<Read> {
  const [t, tForms] = await Promise.all([getTranslations("tutor.exams"), getTranslations("forms")]);
  const values = {
    id: textField(formData, "id"),
    programme: textField(formData, "programme"),
    year: textField(formData, "year"),
    session: textField(formData, "session"),
    track: textField(formData, "track"),
    language: textField(formData, "language") || "fr",
    published: textField(formData, "published") || "true",
    subjectPath: textField(formData, "subjectPath"),
    solutionPath: textField(formData, "solutionPath"),
    removeSolution: textField(formData, "removeSolution") || "false",
  };
  const parsed = paperSchema.safeParse({ ...values, year: values.year.trim() || "x" });
  const badFile = (path: string) =>
    path !== "" && !(parsed.success && isExamFileName(parsed.data.id, path));
  if (!parsed.success || badFile(values.subjectPath) || badFile(values.solutionPath)) {
    return {
      ok: false,
      state: {
        status: "error",
        message: tForms("checkFields"),
        fieldErrors: parsed.success
          ? {
              ...(badFile(values.subjectPath) ? { subject: t("errors.file") } : {}),
              ...(badFile(values.solutionPath) ? { solution: t("errors.file") } : {}),
            }
          : fieldErrorsFor(parsed.error, {
              programme: t("errors.programme"),
              year: t("errors.year"),
              session: t("errors.session"),
              track: t("errors.track"),
              language: t("errors.language"),
            }),
        values,
      },
    };
  }
  return { ok: true, paper: parsed.data, values, t };
}

/** The sizes of the files in a paper's folder, as storage has them. */
async function storedSizes(
  supabase: Awaited<ReturnType<typeof createClient>>,
  id: string,
): Promise<Map<string, number>> {
  const { data, error } = await supabase.storage.from(BUCKET).list(id, { limit: 100 });
  if (error) throw new Error("Could not list the paper's files", { cause: error });
  return new Map(
    data.flatMap((object) => {
      const size: unknown = object.metadata?.size;
      return typeof size === "number" ? [[`${id}/${object.name}`, size] as const] : [];
    }),
  );
}

function duplicate(t: Extract<Read, { ok: true }>["t"], values: Record<string, string>): FormState {
  return {
    status: "error",
    message: t("errors.duplicate"),
    fieldErrors: { year: t("errors.duplicate") },
    values,
  };
}

/**
 * Whether a paper with this programme, year, session and streams can be recorded: asked by the
 * form before it sends any file, so a duplicate costs no upload. The database says it again.
 */
export async function checkPaper(paper: {
  id: string;
  programme: string;
  year: number;
  session: string;
  track: string;
}): Promise<boolean> {
  await requireViewer("tutor");
  const supabase = await createClient();
  let query = supabase
    .from("national_exams")
    .select("id")
    .eq("programme_code", paper.programme)
    .eq("year", paper.year)
    .eq("session", paper.session as "normale" | "rattrapage")
    .neq("id", paper.id);
  const track = paper.track.trim();
  query = track ? query.eq("track", track) : query.is("track", null);
  const { data, error } = await query.limit(1);
  return error ? true : data.length === 0;
}

/** Deletes files, and says so in the logs when storage keeps one. */
async function removeFiles(supabase: Awaited<ReturnType<typeof createClient>>, paths: string[]) {
  if (paths.length === 0) return;
  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) console.error("Could not delete national exam files", paths, error);
}

export async function createPaper(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const read = await readPaper(formData);
  if (!read.ok) return read.state;
  const { paper, values, t } = read;
  if (paper.subjectPath === "") {
    return {
      status: "error",
      message: t("errors.subject"),
      fieldErrors: { subject: t("errors.subject") },
      values,
    };
  }

  const supabase = await createClient();
  const sizes = await storedSizes(supabase, paper.id);
  const subjectSize = sizes.get(paper.subjectPath);
  const solutionSize = paper.solutionPath ? sizes.get(paper.solutionPath) : null;
  if (subjectSize === undefined || solutionSize === undefined) {
    return { status: "error", message: t("errors.upload"), values };
  }

  const { error } = await supabase.from("national_exams").insert({
    id: paper.id,
    programme_code: paper.programme,
    year: paper.year,
    session: paper.session as "normale" | "rattrapage",
    track: paper.track || null,
    language: paper.language,
    subject_path: paper.subjectPath,
    subject_size: subjectSize,
    solution_path: paper.solutionPath || null,
    solution_size: solutionSize,
    status: paper.published ? "published" : "draft",
  });
  if (error?.code === "23505") return duplicate(t, values);
  if (error) return { status: "error", message: t("errors.unknown"), values };

  updateTag(EXAMS_TAG);
  // The form goes to the list itself, once it has started afresh for the next paper.
  return { status: "success", message: t("created") };
}

export async function updatePaper(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const read = await readPaper(formData);
  if (!read.ok) return read.state;
  const { paper, values, t } = read;

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("national_exams")
    .select("subject_path, solution_path, status, official")
    .eq("id", paper.id)
    .maybeSingle();
  if (!current) return { status: "error", message: t("errors.gone"), values };

  let sizes = await storedSizes(supabase, paper.id);
  const change: {
    programme_code: string;
    year: number;
    session: "normale" | "rattrapage";
    track: string | null;
    language: "fr" | "ar";
    status: "published" | "draft";
    official?: boolean;
    subject_source_url?: string | null;
    solution_source_url?: string | null;
    subject_path?: string;
    subject_size?: number;
    solution_path?: string | null;
    solution_size?: number | null;
  } = {
    programme_code: paper.programme,
    year: paper.year,
    session: paper.session as "normale" | "rattrapage",
    track: paper.track || null,
    language: paper.language,
    status: paper.published ? "published" : "draft",
  };
  // A file of the ministry's replaced or taken away: the paper is no longer theirs as published.
  if (current.official && (paper.subjectPath || paper.solutionPath || paper.removeSolution)) {
    change.official = false;
    change.subject_source_url = null;
    change.solution_source_url = null;
  }
  if (paper.subjectPath) {
    const size = sizes.get(paper.subjectPath);
    if (size === undefined) return { status: "error", message: t("errors.upload"), values };
    change.subject_path = paper.subjectPath;
    change.subject_size = size;
  }
  if (paper.solutionPath) {
    const size = sizes.get(paper.solutionPath);
    if (size === undefined) return { status: "error", message: t("errors.upload"), values };
    change.solution_path = paper.solutionPath;
    change.solution_size = size;
  } else if (paper.removeSolution) {
    change.solution_path = null;
    change.solution_size = null;
  }

  // A paper taken off the site takes its files off their addresses too: whoever kept a link to
  // the published PDF must not still reach it. Each file it keeps is copied to a new name, and
  // the old one goes with the stale files below.
  const renamed: string[] = [];
  if (current.status === "published" && change.status === "draft") {
    for (const key of ["subject", "solution"] as const) {
      const pathKey = `${key}_path` as const;
      const path = change[pathKey] === undefined ? current[pathKey] : change[pathKey];
      if (!path) continue;
      const copy = newExamFileName(paper.id);
      const { error } = await supabase.storage.from(BUCKET).copy(path, copy);
      if (error) {
        await removeFiles(supabase, renamed);
        return { status: "error", message: t("errors.unknown"), values };
      }
      renamed.push(copy);
      change[pathKey] = copy;
      change[`${key}_size`] = sizes.get(path) ?? undefined;
    }
    sizes = await storedSizes(supabase, paper.id);
  }

  const { error } = await supabase.from("national_exams").update(change).eq("id", paper.id);
  if (error) {
    // The copies made to take the paper off its addresses are of no use now.
    await removeFiles(supabase, renamed);
    return error.code === "23505"
      ? duplicate(t, values)
      : { status: "error", message: t("errors.unknown"), values };
  }

  // The files the paper no longer names go: a replaced PDF is never shown again.
  const kept = new Set(
    [
      change.subject_path ?? current.subject_path,
      change.solution_path === undefined ? current.solution_path : change.solution_path,
    ].filter((path): path is string => typeof path === "string"),
  );
  await removeFiles(
    supabase,
    [...sizes.keys()].filter((path) => !kept.has(path)),
  );

  updateTag(EXAMS_TAG);
  redirect("/prof/examens");
}

export async function deletePaper(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.exams");
  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("national_exams")
    .delete()
    .eq("id", id.data)
    .select("id");
  if (error) return { status: "error", message: t("errors.unknown") };
  if (data.length === 0) return { status: "error", message: t("errors.gone") };

  await removeFiles(supabase, [...(await storedSizes(supabase, id.data)).keys()]);

  updateTag(EXAMS_TAG);
  redirect("/prof/examens?supprime=1");
}

/** Takes back files uploaded for a form that was then refused. */
export async function discardUploads(id: string, paths: string[]): Promise<void> {
  await requireViewer("tutor");
  if (!z.uuid().safeParse(id).success) return;
  const supabase = await createClient();
  // A file a saved paper names stays, whatever the browser asks.
  const { data: saved } = await supabase
    .from("national_exams")
    .select("subject_path, solution_path")
    .eq("id", id)
    .maybeSingle();
  const keep = new Set([saved?.subject_path, saved?.solution_path]);
  await removeFiles(
    supabase,
    paths.filter((path) => isExamFileName(id, path) && !keep.has(path)),
  );
}

/**
 * Takes Équerre's correction of a paper off the site, or puts it back (D-103). It keeps its
 * first publication date, as a lesson does, and the public pages are refreshed at once.
 */
export async function setCorrectionPublished(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.exams.correction");
  const parsed = z
    .object({
      id: z.uuid(),
      published: z.enum(["true", "false"]).transform((value) => value === "true"),
    })
    .safeParse({ id: textField(formData, "id"), published: textField(formData, "published") });
  if (!parsed.success) return { status: "error", message: t("gone") };
  const { id, published } = parsed.data;

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("exam_corrections")
    .select("published_at")
    .eq("exam_id", id)
    .maybeSingle();
  if (!current) return { status: "error", message: t("gone") };

  const { data, error } = await supabase
    .from("exam_corrections")
    .update({
      status: published ? "published" : "draft",
      published_at: published
        ? (current.published_at ?? new Date().toISOString())
        : current.published_at,
    })
    .eq("exam_id", id)
    .select("exam_id");
  if (error) return { status: "error", message: t("failed") };
  if (data.length === 0) return { status: "error", message: t("gone") };

  updateTag(EXAMS_TAG);
  return { status: "success", message: published ? t("published") : t("unpublished") };
}

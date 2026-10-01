"use client";

import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { Label } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form-message";
import { EXAM_FILE_MAX_BYTES, EXAM_SESSIONS, newExamFileName } from "@/lib/exams/files";
import { uploadExamFile } from "@/lib/exams/upload";
import { fieldError, type FormState } from "@/lib/form-state";
import { formatFileSize } from "@/lib/lesson/file-size";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { checkPaper, createPaper, discardUploads, updatePaper } from "./actions";

export type PaperValues = {
  programme: string;
  year: string;
  session: string;
  track: string;
  published: boolean;
};

type Props = {
  /** The paper's id: a new one is chosen before its files are uploaded into its folder. */
  id: string;
  editing: boolean;
  programmes: { code: string; label: string }[];
  initial: PaperValues;
  /** Whether the saved paper has a correction, which the form can take away. */
  hasSolution?: boolean;
};

type Part = "subject" | "solution";
type Progress = { part: Part; index: number; total: number; sent: number; size: number };

const MAX_YEAR = new Date().getFullYear() + 1;

/**
 * A past national exam (D-097): its programme, year, session and, when only some streams sat
 * it, which. What can be checked is checked before anything is sent; the PDFs then go from
 * this browser to storage, with their progress, and the paper is recorded. A file already sent
 * is not sent again when the form is corrected.
 */
export function PaperForm({ id, editing, programmes, initial, hasSolution = false }: Props) {
  const t = useTranslations("tutor.exams");
  const router = useRouter();
  // The paper's id and its folder. Kept by the form: a new paper gets a fresh one once it is
  // recorded, so a form shown again (the back button) never writes into the saved paper.
  const [paperId, setPaperId] = useState(id);
  const [values, setValues] = useState(initial);
  const [files, setFiles] = useState<Record<Part, File | null>>({ subject: null, solution: null });
  const [removeSolution, setRemoveSolution] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [checking, setChecking] = useState(false);
  const [local, setLocal] = useState<FormState | null>(null);
  // Every file this form has put in storage for this paper, by the File it came from.
  const sent = useRef(new Map<File, string>());
  const [state, action, pending] = useFormAction(
    editing ? updatePaper : createPaper,
    t("errors.unknown"),
    () => {
      // A new paper is recorded: the form starts afresh for the next one.
      if (editing) return;
      sent.current.clear();
      setPaperId(crypto.randomUUID());
      setFiles({ subject: null, solution: null });
      router.push("/prof/examens?ajoute=1");
    },
  );

  const uploading = progress !== null;
  const busy = checking || uploading || pending;
  // Leaving mid-upload loses it: the browser asks first.
  useEffect(() => {
    if (!uploading && !pending) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [uploading, pending]);

  const shown = local ?? state;
  const set =
    (key: "programme" | "year" | "session" | "track") => (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));
  const refuse = (message: string, field?: string) =>
    setLocal({
      status: "error",
      message,
      ...(field ? { fieldErrors: { [field]: message } } : {}),
    });

  // A PDF under the bucket's limit. Windows gives a PDF no type when no reader is installed.
  const pick = (part: Part) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setLocal(null);
    const pdf =
      file?.type === "application/pdf" || (file?.type === "" && /\.pdf$/i.test(file.name));
    if (file && (!pdf || file.size > EXAM_FILE_MAX_BYTES)) {
      // The input would otherwise still show the file that was refused.
      event.target.value = "";
      setFiles((current) => ({ ...current, [part]: null }));
      refuse(pdf ? t("errors.tooBig") : t("errors.notPdf"), part);
      return;
    }
    setFiles((current) => ({ ...current, [part]: file }));
  };

  async function send() {
    setLocal(null);
    const year = Number(values.year);
    if (!Number.isInteger(year) || year < 2000 || year > MAX_YEAR) {
      refuse(t("errors.year"), "year");
      return;
    }
    if (!editing && !files.subject) {
      refuse(t("errors.subject"), "subject");
      return;
    }

    // A paper already there is said before a single byte is sent.
    setChecking(true);
    const free = await checkPaper({
      id: paperId,
      programme: values.programme,
      year,
      session: values.session,
      track: values.track,
    }).catch(() => true);
    setChecking(false);
    if (!free) {
      refuse(t("errors.duplicate"), "year");
      return;
    }

    const queue = (
      [
        ["subject", files.subject],
        ["solution", removeSolution ? null : files.solution],
      ] as const
    ).filter(
      (entry): entry is readonly [Part, File] => entry[1] !== null && !sent.current.has(entry[1]),
    );
    try {
      for (const [index, [part, file]] of queue.entries()) {
        const name = newExamFileName(paperId);
        setProgress({ part, index: index + 1, total: queue.length, sent: 0, size: file.size });
        await uploadExamFile(name, file, (bytes) =>
          setProgress((current) => (current ? { ...current, sent: bytes } : current)),
        );
        sent.current.set(file, name);
      }
    } catch {
      setProgress(null);
      refuse(t("errors.upload"));
      return;
    }
    // Files sent for a paper that was then refused stay for the corrected form; files the
    // form no longer names go now.
    const named = new Set([files.subject, removeSolution ? null : files.solution]);
    const dropped = [...sent.current].filter(([file]) => !named.has(file));
    for (const [file] of dropped) sent.current.delete(file);
    if (dropped.length > 0)
      void discardUploads(
        paperId,
        dropped.map(([, path]) => path),
      );
    setProgress(null);

    const path = (file: File | null) => (file ? (sent.current.get(file) ?? "") : "");
    sendFields(action, {
      id: paperId,
      programme: values.programme,
      year: values.year,
      session: values.session,
      track: values.track,
      published: String(values.published),
      subjectPath: path(files.subject),
      solutionPath: removeSolution ? "" : path(files.solution),
      removeSolution: String(removeSolution),
    });
  }

  return (
    <form
      className="grid max-w-xl gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void send();
      }}
    >
      <fieldset disabled={busy} className="grid gap-5">
        <SelectField
          id="paper-programme"
          label={t("programme")}
          value={values.programme}
          onChange={set("programme")}
          error={fieldError(shown, "programme")}
        >
          {programmes.map((programme) => (
            <option key={programme.code} value={programme.code}>
              {programme.label}
            </option>
          ))}
        </SelectField>
        <div className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Field
            id="paper-year"
            type="number"
            inputMode="numeric"
            min={2000}
            max={MAX_YEAR}
            label={t("year")}
            value={values.year}
            onChange={set("year")}
            error={fieldError(shown, "year")}
          />
          <SelectField
            id="paper-session"
            label={t("session")}
            value={values.session}
            onChange={set("session")}
            error={fieldError(shown, "session")}
          >
            {EXAM_SESSIONS.map((session) => (
              <option key={session} value={session}>
                {t(`sessions.${session}`)}
              </option>
            ))}
          </SelectField>
        </div>
        <Field
          id="paper-track"
          label={t("track")}
          hint={t("trackHint")}
          autoComplete="off"
          maxLength={80}
          value={values.track}
          onChange={set("track")}
          error={fieldError(shown, "track")}
        />
        <FileField
          id="paper-subject"
          label={editing ? t("replaceSubject") : t("subject")}
          hint={editing ? t("replaceHint") : t("fileHint")}
          file={files.subject}
          error={fieldError(shown, "subject")}
          onChange={pick("subject")}
        />
        <FileField
          id="paper-solution"
          label={editing && hasSolution ? t("replaceSolution") : t("solution")}
          hint={editing && hasSolution ? t("replaceHint") : t("fileHint")}
          file={files.solution}
          error={fieldError(shown, "solution")}
          onChange={pick("solution")}
          disabled={removeSolution}
        />
        {editing && hasSolution ? (
          <label className="flex min-h-11 items-start gap-3">
            <input
              type="checkbox"
              checked={removeSolution}
              onChange={(event) => setRemoveSolution(event.target.checked)}
              className="mt-1 size-5 accent-encre"
            />
            <span>{t("removeSolution")}</span>
          </label>
        ) : null}
        <label className="flex min-h-11 items-start gap-3">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(event) =>
              setValues((current) => ({ ...current, published: event.target.checked }))
            }
            className="mt-1 size-5 accent-encre"
          />
          <span className="grid gap-0.5">
            <span>{t("published")}</span>
            <span className="text-sm text-encre-douce">{t("publishedHint")}</span>
          </span>
        </label>
      </fieldset>

      {/* Always in the page, so a screen reader hears each step of a long upload. */}
      <div aria-live="polite" className="grid gap-1 text-sm">
        {progress ? (
          <>
            <p>
              {t("progress", {
                part: progress.part,
                index: progress.index,
                total: progress.total,
                sent: formatFileSize(progress.sent),
                size: formatFileSize(progress.size),
              })}
            </p>
            <progress
              max={progress.size}
              value={progress.sent}
              aria-hidden="true"
              className="h-2 w-full accent-encre"
            />
            <p className="text-encre-douce">{t("keepOpen")}</p>
          </>
        ) : checking ? (
          <p>{t("checking")}</p>
        ) : null}
      </div>

      <FormMessage state={shown} />
      <Button type="submit" disabled={busy} className="justify-self-start">
        {uploading ? t("uploading") : pending ? t("saving") : editing ? t("save") : t("create")}
      </Button>
    </form>
  );
}

function FileField({
  id,
  label,
  hint,
  file,
  error,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  hint: string;
  file: File | null;
  error: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid content-start gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <p id={`${id}-hint`} className="text-sm text-encre-douce">
        {hint}
      </p>
      <input
        id={id}
        type="file"
        accept="application/pdf,.pdf"
        aria-describedby={error ? `${id}-hint ${id}-error` : `${id}-hint`}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        onChange={onChange}
        className="min-h-11 w-full rounded-md border border-trait bg-surface px-3 py-2 text-base text-encre file:me-3 file:rounded file:border-0 file:bg-sunken file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-encre disabled:opacity-60"
      />
      {file ? <p className="text-sm text-encre-douce">{formatFileSize(file.size)}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm text-stylo-rouge">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

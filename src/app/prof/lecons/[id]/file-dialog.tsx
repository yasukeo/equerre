"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/input";
import { formatFileSize } from "@/lib/lesson/file-size";
import { LESSON_FILE_MAX_BYTES, uploadLessonFile } from "./uploads";

export type FileTarget = {
  /** Where the document already sits, or null to attach a new one. */
  pos: number | null;
  name: string;
};

export type InsertedFile = { path: string; name: string; size: number };

type Props = {
  lessonId: string;
  target: FileTarget;
  onInsert: (file: InsertedFile) => void;
  onUpdate: (name: string) => void;
  onRemove: () => void;
  onClose: () => void;
};

/** « Fiche 3 — corrigé.pdf » becomes « Fiche 3 — corrigé »: the page shows the size beside it. */
function readableName(fileName: string): string {
  return fileName
    .replace(/\.pdf$/i, "")
    .trim()
    .slice(0, 200);
}

/**
 * Attaches a PDF, or renames one already in the lesson. The document goes to the private
 * bucket, where only those who may read the lesson can open it (DECISIONS.md, D-050).
 */
export function FileDialog({ lessonId, target, onInsert, onUpdate, onRemove, onClose }: Props) {
  const t = useTranslations("tutor.lessonEditor.file");
  const ref = useRef<HTMLDialogElement>(null);
  const closed = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState(target.name);
  const [error, setError] = useState<{ field: "file" | "name"; message: string } | null>(null);
  const [pending, setPending] = useState(false);

  const editing = target.pos !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const submit = async () => {
    const shown = name.trim();
    if (!editing && !file) {
      setError({ field: "file", message: t("errors.missing") });
      return;
    }
    if (shown === "") {
      setError({ field: "name", message: t("errors.name") });
      return;
    }
    if (editing || !file) {
      onUpdate(shown);
      return;
    }

    setError(null);
    setPending(true);
    try {
      const path = await uploadLessonFile(lessonId, file);
      if (closed.current) return;
      onInsert({ path, name: shown, size: file.size });
    } catch {
      setError({ field: "file", message: t("errors.upload") });
    } finally {
      setPending(false);
    }
  };

  return (
    <dialog
      ref={ref}
      onClose={() => {
        closed.current = true;
        onClose();
      }}
      aria-labelledby="file-dialog-title"
      className="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-lg border border-quadrillage bg-surface p-0 text-encre backdrop:bg-encre/40"
    >
      <form
        className="grid gap-4 p-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <h2 id="file-dialog-title" className="text-lg font-semibold">
          {editing ? t("titleEdit") : t("titleNew")}
        </h2>

        {editing ? null : (
          <div className="grid gap-1.5">
            <Label htmlFor="file-file">{t("file")}</Label>
            <p id="file-file-hint" className="text-sm text-encre-douce">
              {t("fileHint")}
            </p>
            <input
              id="file-file"
              type="file"
              accept="application/pdf,.pdf"
              aria-describedby={
                error?.field === "file" ? "file-file-hint file-error" : "file-file-hint"
              }
              aria-invalid={error?.field === "file" ? true : undefined}
              disabled={pending}
              onChange={(event) => {
                const chosen = event.target.files?.[0] ?? null;
                setError(null);
                // Windows reports no type for a PDF when no reader is installed.
                const pdf =
                  chosen?.type === "application/pdf" ||
                  (chosen?.type === "" && /\.pdf$/i.test(chosen.name));
                if (chosen && !pdf) {
                  setFile(null);
                  setError({ field: "file", message: t("errors.type") });
                  return;
                }
                if (chosen && chosen.size > LESSON_FILE_MAX_BYTES) {
                  setFile(null);
                  setError({ field: "file", message: t("errors.tooLarge") });
                  return;
                }
                setFile(chosen);
                if (chosen && name.trim() === "") setName(readableName(chosen.name));
              }}
              className="min-h-11 w-full rounded-md border border-trait bg-surface px-3 py-2 text-base text-encre file:me-3 file:rounded file:border-0 file:bg-sunken file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-encre"
            />
            {file ? <p className="text-sm text-encre-douce">{formatFileSize(file.size)}</p> : null}
          </div>
        )}

        <Field
          id="file-name"
          label={t("name")}
          hint={t("nameHint")}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error?.field === "name") setError(null);
          }}
          maxLength={200}
          disabled={pending}
          error={error?.field === "name" ? error.message : undefined}
        />

        {error?.field === "file" ? (
          <p id="file-error" role="alert" className="text-sm text-stylo-rouge">
            {error.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? t("uploading") : editing ? t("update") : t("insert")}
          </Button>
          <Button type="button" variant="outline" onClick={() => ref.current?.close()}>
            {t("cancel")}
          </Button>
          {editing ? (
            <Button
              type="button"
              variant="ghost"
              className="ms-auto text-stylo-rouge"
              onClick={onRemove}
            >
              {t("remove")}
            </Button>
          ) : null}
        </div>
      </form>
    </dialog>
  );
}

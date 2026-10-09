"use client";

import { FileText, Loader2, Upload, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PDF_MAX_BYTES } from "@/lib/homework/pages";
import { createClient } from "@/lib/supabase/client";

/** The subjects bucket, in step with supabase/migrations (subject_assignments). */
const BUCKET = "assignment-subjects";

export type Subject =
  | { status: "empty" }
  | { status: "uploading"; name: string; size: number }
  | { status: "ready"; name: string; size: number; path: string }
  | { status: "failed"; name: string; size: number; error: string };

/**
 * The PDF a homework is given as (D-106). The file goes straight from the tutor's browser to
 * the private subjects bucket under an id-shaped name; the form then sends only that name.
 * A file replaced or taken out before the homework is given is deleted at once.
 */
export function SubjectPicker({
  subject,
  onChange,
  error,
  disabled,
}: {
  subject: Subject;
  onChange: (subject: Subject) => void;
  error?: string;
  disabled?: boolean;
}) {
  const t = useTranslations("tutor.newAssignment.subject");
  const input = useRef<HTMLInputElement>(null);
  // Under a megabyte, in kilobytes: a one-page subject is not « 0 Mo ».
  const size = (bytes: number) =>
    bytes < 1024 * 1024
      ? t("sizeKb", { size: Math.max(1, Math.round(bytes / 1024)) })
      : t("size", {
          size: new Intl.NumberFormat("fr", { maximumFractionDigits: 1 }).format(
            bytes / (1024 * 1024),
          ),
        });

  const discard = (current: Subject) => {
    if (current.status === "ready") {
      void createClient().storage.from(BUCKET).remove([current.path]);
    }
  };

  const choose = async (file: File | undefined) => {
    if (!file) return;
    discard(subject);
    const meta = { name: file.name, size: file.size };
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      onChange({ status: "failed", ...meta, error: t("notPdf") });
      return;
    }
    if (file.size > PDF_MAX_BYTES) {
      onChange({ status: "failed", ...meta, error: t("tooLarge") });
      return;
    }
    onChange({ status: "uploading", ...meta });
    const path = `${crypto.randomUUID()}.pdf`;
    const { error: failed } = await createClient()
      .storage.from(BUCKET)
      .upload(path, file, { contentType: "application/pdf", upsert: false });
    onChange(
      failed
        ? { status: "failed", ...meta, error: t("failed") }
        : { status: "ready", ...meta, path },
    );
  };

  return (
    <div className="grid gap-3">
      <input
        ref={input}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          void choose(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {subject.status === "empty" ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => input.current?.click()}
          aria-describedby="subject-hint subject-error"
          className="grid min-h-32 place-content-center justify-items-center gap-2 rounded-2xl border-2 border-dashed border-trait bg-surface px-4 py-6 text-center hover:border-encre disabled:opacity-60"
        >
          <Upload aria-hidden="true" className="size-6" />
          <span className="font-medium">{t("choose")}</span>
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-quadrillage bg-surface p-3">
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rouge-fond text-rouge-texte"
          >
            <FileText className="size-5" />
          </span>
          <span className="grid min-w-0 flex-1 basis-40 gap-0.5">
            <span className="truncate font-medium">{subject.name}</span>
            <span className="text-sm text-encre-douce" role="status">
              {subject.status === "uploading" ? (
                <span className="inline-flex items-center gap-1">
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  {t("uploading")}
                </span>
              ) : subject.status === "ready" ? (
                `${t("ready")} · ${size(subject.size)}`
              ) : (
                <span className="text-stylo-rouge">{subject.error}</span>
              )}
            </span>
          </span>
          <span className="flex flex-wrap gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || subject.status === "uploading"}
              onClick={() => input.current?.click()}
            >
              {t("change")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={t("remove")}
              title={t("remove")}
              disabled={disabled || subject.status === "uploading"}
              onClick={() => {
                discard(subject);
                onChange({ status: "empty" });
              }}
            >
              <X aria-hidden="true" className="size-4" />
            </Button>
          </span>
        </div>
      )}
      <p id="subject-hint" className="text-sm text-encre-douce">
        {t("hint")}
      </p>
      {error ? (
        <p id="subject-error" role="alert" className="text-sm text-stylo-rouge">
          {error}
        </p>
      ) : null}
    </div>
  );
}

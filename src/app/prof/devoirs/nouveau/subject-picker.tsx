"use client";

import { FileText, Loader2, Upload, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PDF_MAX_BYTES } from "@/lib/homework/pages";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

/** The subjects bucket, in step with supabase/migrations (subject_assignments). */
const BUCKET = "assignment-subjects";

export type Subject =
  | { status: "empty" }
  | { status: "uploading"; name: string; size: number }
  | { status: "ready"; name: string; size: number; path: string }
  | { status: "failed"; name: string; size: number; error: string };

/**
 * Takes back a file uploaded for a homework not given. Best effort: the storage policy refuses
 * to remove a file a homework holds, so a slip here can never take a live subject (D-106).
 */
export function discardSubject(path: string) {
  void createClient().storage.from(BUCKET).remove([path]);
}

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
  const chooseButton = useRef<HTMLButtonElement>(null);
  const changeButton = useRef<HTMLButtonElement>(null);
  const [dragging, setDragging] = useState(false);
  // The button pressed is replaced by the other state's: focus follows, rather than falling
  // back to the top of the page.
  const moved = useRef(false);
  const empty = subject.status === "empty";
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    (empty ? chooseButton.current : changeButton.current)?.focus();
  }, [empty]);

  // Under a megabyte, in kilobytes: a one-page subject is not « 0 Mo ».
  const size = (bytes: number) =>
    bytes < 1024 * 1024
      ? t("sizeKb", { size: Math.max(1, Math.round(bytes / 1024)) })
      : t("size", {
          size: new Intl.NumberFormat("fr", { maximumFractionDigits: 1 }).format(
            bytes / (1024 * 1024),
          ),
        });

  const choose = async (file: File | undefined) => {
    if (!file) return;
    moved.current = true;
    if (subject.status === "ready") discardSubject(subject.path);
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

  // What a screen reader hears as the file goes up, from one region that stays in the page.
  const status =
    subject.status === "uploading"
      ? t("uploading")
      : subject.status === "ready"
        ? `${t("ready")} · ${subject.name}`
        : subject.status === "failed"
          ? subject.error
          : "";

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
      {empty ? (
        <button
          ref={chooseButton}
          type="button"
          disabled={disabled}
          onClick={() => input.current?.click()}
          // A PDF dropped here is taken, not opened by the browser in place of the form.
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            if (!disabled) void choose(event.dataTransfer.files[0]);
          }}
          aria-describedby="subject-hint"
          className={cn(
            "grid min-h-32 place-content-center justify-items-center gap-2 rounded-2xl border-2 border-dashed bg-surface px-4 py-6 text-center hover:border-encre disabled:opacity-60",
            dragging ? "border-encre bg-sunken" : "border-trait",
          )}
        >
          <Upload aria-hidden="true" className="size-6" />
          <span className="font-medium">{t("choose")}</span>
          <span className="text-sm text-encre-douce">{t("drop")}</span>
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-trait bg-surface p-3">
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rouge-fond text-rouge-texte"
          >
            <FileText className="size-5" />
          </span>
          <span className="grid min-w-0 flex-1 basis-40 gap-0.5">
            <span className="truncate font-medium">{subject.name}</span>
            <span aria-hidden="true" className="text-sm text-encre-douce">
              {subject.status === "uploading" ? (
                <span className="inline-flex items-center gap-1">
                  <Loader2 className="size-4 animate-spin" />
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
              ref={changeButton}
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
                moved.current = true;
                if (subject.status === "ready") discardSubject(subject.path);
                onChange({ status: "empty" });
              }}
            >
              <X aria-hidden="true" className="size-4" />
            </Button>
          </span>
        </div>
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
      <p id="subject-hint" className="text-sm text-encre-douce">
        {t("hint")}
      </p>
      {error ? (
        <p role="alert" className="text-sm text-stylo-rouge">
          {error}
        </p>
      ) : null}
    </div>
  );
}

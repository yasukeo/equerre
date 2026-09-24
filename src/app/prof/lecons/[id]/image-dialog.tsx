"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/field";
import { Label } from "@/components/ui/input";
import { IMAGE_TYPES, ImagePreparationError, prepareImage } from "@/lib/images/prepare-image";
import { LESSON_IMAGE_PREPARATION, uploadLessonImage } from "./uploads";

export type ImageTarget = {
  /** Where the image already sits, or null to add a new one. */
  pos: number | null;
  src: string;
  alt: string;
};

export type InsertedImage = { src: string; alt: string; width: number; height: number };

type Props = {
  lessonId: string;
  target: ImageTarget;
  onInsert: (image: InsertedImage) => void;
  onUpdate: (alt: string) => void;
  onRemove: () => void;
  onClose: () => void;
};

/**
 * Adds an image, or changes the description of one already in the lesson. The image is
 * reduced in the browser and stored only when the tutor confirms, so closing the dialog
 * leaves nothing behind in storage.
 */
export function ImageDialog({ lessonId, target, onInsert, onUpdate, onRemove, onClose }: Props) {
  const t = useTranslations("tutor.lessonEditor.image");
  const ref = useRef<HTMLDialogElement>(null);
  // Set once the dialog is closed, so an upload finishing afterwards inserts nothing.
  const closed = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState(target.alt);
  const [error, setError] = useState<{ field: "file" | "alt"; message: string } | null>(null);
  const [pending, setPending] = useState(false);

  const editing = target.pos !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const chosen = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => void (chosen && URL.revokeObjectURL(chosen)), [chosen]);
  const preview = editing ? target.src : chosen;

  const submit = async () => {
    const description = alt.trim();
    if (!editing && !file) {
      setError({ field: "file", message: t("errors.missing") });
      return;
    }
    if (description === "") {
      setError({ field: "alt", message: t("errors.alt") });
      return;
    }
    if (editing || !file) {
      onUpdate(description);
      return;
    }

    setError(null);
    setPending(true);
    try {
      const prepared = await prepareImage(file, LESSON_IMAGE_PREPARATION);
      const src = await uploadLessonImage(lessonId, prepared);
      if (closed.current) return;
      onInsert({ src, alt: description, width: prepared.width, height: prepared.height });
    } catch (failure) {
      setError({
        field: "file",
        message:
          failure instanceof ImagePreparationError
            ? t(`errors.${failure.reason}`)
            : t("errors.upload"),
      });
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
      aria-labelledby="image-dialog-title"
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
        <h2 id="image-dialog-title" className="text-lg font-semibold">
          {editing ? t("titleEdit") : t("titleNew")}
        </h2>

        {editing ? null : (
          <div className="grid gap-1.5">
            <Label htmlFor="image-file">{t("file")}</Label>
            <p id="image-file-hint" className="text-sm text-encre-douce">
              {t("fileHint")}
            </p>
            <input
              id="image-file"
              type="file"
              // Named types rather than image/*: an iPhone then hands over a JPEG, not a HEIC.
              accept={IMAGE_TYPES.join(",")}
              aria-describedby={
                error?.field === "file" ? "image-file-hint image-error" : "image-file-hint"
              }
              aria-invalid={error?.field === "file" ? true : undefined}
              disabled={pending}
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError(null);
              }}
              className="min-h-11 w-full rounded-md border border-trait bg-surface px-3 py-2 text-base text-encre file:me-3 file:rounded file:border-0 file:bg-sunken file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-encre"
            />
          </div>
        )}

        {preview ? (
          // A local preview or an image of the lesson library: neither goes through the optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt=""
            className="max-h-56 justify-self-start rounded-md border border-quadrillage object-contain"
          />
        ) : null}

        <TextareaField
          id="image-alt"
          label={t("alt")}
          hint={t("altHint")}
          value={alt}
          onChange={(event) => {
            setAlt(event.target.value);
            if (error?.field === "alt") setError(null);
          }}
          maxLength={500}
          rows={2}
          disabled={pending}
          error={error?.field === "alt" ? error.message : undefined}
        />

        {error?.field === "file" ? (
          <p id="image-error" role="alert" className="text-sm text-stylo-rouge">
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

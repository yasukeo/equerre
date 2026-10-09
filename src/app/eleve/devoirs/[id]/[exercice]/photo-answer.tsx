"use client";

import { ArrowDown, ArrowUp, Camera, FileText, FileUp, ImagePlus, Loader2, X } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { ImagePreparationError, prepareImage } from "@/lib/images/prepare-image";
import { initialFormState, type FormState } from "@/lib/form-state";
import { MAX_PAGES, PAGE_PREPARATION, PDF_MAX_BYTES, pagePath } from "@/lib/homework/pages";
import { isPdfPage } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/client";
import { PageGrid } from "@/components/page-grid";
import { submitAnswer } from "../../actions";

export type InitialPage = { path: string; url: string | null; handedIn: boolean };

type PageState = {
  key: string;
  /** Set once the page is in storage. */
  path: string | null;
  url: string | null;
  /** A page already handed in cannot be deleted, only left out of the next hand-in. */
  handedIn: boolean;
  status: "uploading" | "ready" | "failed";
  error?: string;
  /** A preview made on the phone, to revoke when the page goes. */
  local?: boolean;
  /** A copy handed in as a PDF rather than a photographed page (D-106). */
  pdf: boolean;
};

type Props = {
  assignmentId: string;
  exerciseId: string;
  studentId: string;
  reference: string;
  initialPages: InitialPage[];
  /** True once pages were handed in: the copy then opens read-only, with a « modifier » button. */
  handedIn: boolean;
};

/**
 * The photographed answer (DECISIONS.md, D-051). Each page is reduced on the phone and sent
 * straight to her folder in storage, never through the server; handing in then gives the
 * grading function the list of names, in order.
 */
export function PhotoAnswer({
  assignmentId,
  exerciseId,
  studentId,
  reference,
  initialPages,
  handedIn,
}: Props) {
  const t = useTranslations("student.homework");
  // What the tutor holds: the only pages the read-only copy shows (D-046).
  const handedInPages = initialPages.filter((page) => page.handedIn);
  const [pages, setPages] = useState<PageState[]>(() => initialPages.map(fromStorage));
  const [editing, setEditing] = useState(!handedIn);
  const cameraInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const pdfInput = useRef<HTMLInputElement>(null);

  const [state, action, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        const result = await submitAnswer(previous, formData);
        // Handing in the same list again changes nothing the page is keyed on: close it here.
        if (result.status === "success") setEditing(false);
        return result;
      } catch (error) {
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );

  // Previews are not revoked when the component goes: Next may only hide the route, then show
  // it again with this state. Each one is a reduced copy of a few hundred kilobytes, freed with
  // the tab, and the full-size photo's preview is dropped as soon as the reduced one exists.

  const update = (key: string, patch: Partial<PageState>) =>
    setPages((current) => current.map((page) => (page.key === key ? { ...page, ...patch } : page)));

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_PAGES - pages.length;
    const chosen = [...files].slice(0, Math.max(0, room));
    const added: PageState[] = chosen.map((file) => ({
      key: crypto.randomUUID(),
      path: null,
      url: URL.createObjectURL(file),
      local: true,
      handedIn: false,
      status: "uploading",
      pdf: false,
    }));
    setPages((current) => [...current, ...added]);

    // One at a time: a phone decoding several twelve-megapixel photos at once runs out of memory.
    const bucket = createClient().storage.from("submissions");
    for (const [index, file] of chosen.entries()) {
      const page = added[index];
      if (!page) continue;
      try {
        const prepared = await prepareImage(file, PAGE_PREPARATION);
        const path = pagePath(studentId, reference, prepared.extension);
        const { error } = await bucket.upload(path, prepared.blob, {
          contentType: prepared.type,
          upsert: false,
        });
        if (error) throw error;
        if (page.url) URL.revokeObjectURL(page.url);
        update(page.key, { path, url: URL.createObjectURL(prepared.blob), status: "ready" });
      } catch (error) {
        update(page.key, {
          status: "failed",
          error:
            error instanceof ImagePreparationError
              ? error.reason === "tooLarge"
                ? t("photos.tooLarge")
                : t("photos.unreadable")
              : // Her folder and the page's name are right, so a refusal is the cap on pages
                // waiting to be handed in (D-052).
                error instanceof Error && /row-level security/i.test(error.message)
                ? t("photos.quota")
                : t("photos.failed"),
        });
      }
    }
  };

  /**
   * A copy already written as a PDF goes as it is: it is not drawn again on the phone, only
   * checked to be a PDF the bucket will take (D-106).
   */
  const addPdfs = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_PAGES - pages.length;
    const chosen = [...files].slice(0, Math.max(0, room));
    const added: PageState[] = chosen.map((file) => ({
      key: crypto.randomUUID(),
      path: null,
      url: URL.createObjectURL(file),
      local: true,
      handedIn: false,
      status: "uploading",
      pdf: true,
    }));
    setPages((current) => [...current, ...added]);

    const bucket = createClient().storage.from("submissions");
    for (const [index, file] of chosen.entries()) {
      const page = added[index];
      if (!page) continue;
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        update(page.key, { status: "failed", error: t("photos.notPdf") });
        continue;
      }
      if (file.size > PDF_MAX_BYTES) {
        update(page.key, { status: "failed", error: t("photos.pdfTooLarge") });
        continue;
      }
      try {
        const path = pagePath(studentId, reference, "pdf");
        const { error } = await bucket.upload(path, file, {
          contentType: "application/pdf",
          upsert: false,
        });
        if (error) throw error;
        update(page.key, { path, status: "ready" });
      } catch (error) {
        update(page.key, {
          status: "failed",
          error:
            error instanceof Error && /row-level security/i.test(error.message)
              ? t("photos.quota")
              : t("photos.failed"),
        });
      }
    }
  };

  const remove = (page: PageState) => {
    setPages((current) => current.filter((other) => other.key !== page.key));
    if (page.local && page.url) URL.revokeObjectURL(page.url);
    // A page that was never handed in is deleted; one handed in stays where it is (D-052).
    if (page.path && !page.handedIn) {
      void createClient().storage.from("submissions").remove([page.path]);
    }
  };

  /** « Annuler » puts the copy back as handed in; pages added meanwhile are deleted. */
  const cancel = () => {
    const added = pages.filter((page) => !page.handedIn);
    for (const page of added) if (page.local && page.url) URL.revokeObjectURL(page.url);
    const paths = added.flatMap((page) => (page.path ? [page.path] : []));
    if (paths.length > 0) void createClient().storage.from("submissions").remove(paths);
    setPages(handedInPages.map(fromStorage));
    setEditing(false);
  };

  const move = (index: number, by: -1 | 1) =>
    setPages((current) => {
      const next = [...current];
      const [moved] = next.splice(index, 1);
      if (moved) next.splice(index + by, 0, moved);
      return next;
    });

  const ready = pages.filter((page) => page.status === "ready" && page.path);
  const uploading = pages.some((page) => page.status === "uploading");
  const failed = pages.some((page) => page.status === "failed");
  const full = pages.length >= MAX_PAGES;
  // Nothing moves while the list is being handed in: a page deleted then could leave a hole.
  const locked = pending;

  if (!editing) {
    return (
      <div className="grid gap-4">
        <p className="text-sm">{t("photos.handedIn")}</p>
        <PageGrid
          pages={handedInPages}
          label={(number) => t("photos.page", { number })}
          pdfLabel={(number) => t("photos.pdfItem", { number })}
        />
        <Button
          type="button"
          variant="outline"
          className="justify-self-start"
          onClick={() => setEditing(true)}
        >
          {t("photos.change")}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div>
        <p className="text-sm font-medium">{t("photos.title")}</p>
        <p className="text-sm text-encre-douce">{t("photos.hint")}</p>
      </div>

      {pages.length === 0 ? (
        <p className="text-sm text-encre-douce">{t("photos.empty")}</p>
      ) : (
        <ol className="grid gap-3" aria-label={t("photos.title")}>
          {pages.map((page, index) => {
            const number = index + 1;
            return (
              <li
                key={page.key}
                className="flex items-center gap-3 rounded-md border border-quadrillage p-2"
              >
                <Thumbnail page={page} alt={t("photos.page", { number })} />
                <div className="grid min-w-0 flex-1 gap-1">
                  <span className="text-sm font-medium">
                    {page.pdf ? t("photos.pdfItem", { number }) : t("photos.page", { number })}
                  </span>
                  {page.status === "uploading" ? (
                    <span className="flex items-center gap-1 text-sm text-encre-douce">
                      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                      {t("photos.uploading")}
                    </span>
                  ) : page.status === "failed" ? (
                    <span role="alert" className="text-sm text-stylo-rouge">
                      {page.error}
                    </span>
                  ) : null}
                </div>
                <span className="flex">
                  <IconButton
                    label={t("photos.up", { number })}
                    disabled={locked || index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp aria-hidden="true" className="size-4" />
                  </IconButton>
                  <IconButton
                    label={t("photos.down", { number })}
                    disabled={locked || index === pages.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown aria-hidden="true" className="size-4" />
                  </IconButton>
                  <IconButton
                    label={t("photos.remove", { number })}
                    disabled={locked || page.status === "uploading"}
                    onClick={() => remove(page)}
                  >
                    <X aria-hidden="true" className="size-4" />
                  </IconButton>
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {/* Two ways in: the camera, straight to a new photo, or photos already taken. */}
      <div className="flex flex-wrap gap-2">
        <input
          ref={cameraInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            void addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={pdfInput}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            void addPdfs(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={galleryInput}
          type="file"
          // Named types: an iPhone then hands over a JPEG rather than a HEIC.
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            void addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={locked || full}
          onClick={() => cameraInput.current?.click()}
        >
          <Camera aria-hidden="true" className="size-4" />
          {t("photos.take")}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={locked || full}
          onClick={() => galleryInput.current?.click()}
        >
          <ImagePlus aria-hidden="true" className="size-4" />
          {t("photos.choose")}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={locked || full}
          onClick={() => pdfInput.current?.click()}
        >
          <FileUp aria-hidden="true" className="size-4" />
          {t("photos.addPdf")}
        </Button>
      </div>
      <p aria-live="polite" className="text-sm text-encre-douce">
        {full
          ? t("photos.full")
          : uploading
            ? t("photos.waiting")
            : failed
              ? t("photos.removeFailed")
              : null}
      </p>

      <FormMessage state={state.status === "error" ? state : initialFormState} />

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="lg"
          disabled={
            pending || uploading || failed || ready.length === 0 || ready.length > MAX_PAGES
          }
          onClick={() => {
            const formData = new FormData();
            formData.set("assignmentId", assignmentId);
            formData.set("exerciseId", exerciseId);
            formData.set("kind", "upload");
            formData.set("pages", JSON.stringify(ready.map((page) => page.path)));
            startTransition(() => action(formData));
          }}
        >
          {pending ? t("photos.handingIn") : t("photos.handIn")}
        </Button>
        {handedIn ? (
          <Button type="button" variant="ghost" disabled={locked || uploading} onClick={cancel}>
            {t("photos.cancelChange")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function fromStorage(page: InitialPage): PageState {
  return {
    key: page.path,
    path: page.path,
    url: page.url,
    handedIn: page.handedIn,
    status: "ready",
    pdf: isPdfPage(page.path),
  };
}

function Thumbnail({ page, alt }: { page: PageState; alt: string }) {
  if (page.pdf) {
    return (
      <span
        aria-hidden="true"
        className="flex size-16 shrink-0 items-center justify-center rounded border border-quadrillage bg-rouge-fond text-rouge-texte"
      >
        <FileText className="size-6" />
      </span>
    );
  }
  return page.url ? (
    // A local preview or a signed address in her own folder: neither goes through the optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={page.url}
      alt={alt}
      className="size-16 shrink-0 rounded border border-quadrillage bg-white object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="size-16 shrink-0 rounded border border-quadrillage bg-sunken"
    />
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-grid size-11 place-items-center rounded-md text-encre hover:bg-sunken disabled:opacity-40"
    >
      {children}
    </button>
  );
}

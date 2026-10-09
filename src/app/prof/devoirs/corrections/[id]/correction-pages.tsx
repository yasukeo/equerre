"use client";

import { MapPin } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { AnnotatedPage, RemarkNumber, type Mark } from "@/components/annotated-page";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/input";
import { MAX_REMARK_LENGTH, type NumberedRemark } from "@/lib/correction/correction";
import { isPdfPage } from "@/lib/storage-paths";
import { initialFormState, type FormState } from "@/lib/form-state";
import { addRemark, deleteRemark, updateRemark } from "../actions";

type Point = { path: string; x: number | null; y: number | null };

/**
 * A server action run from a controlled form, whose failure becomes a message rather than the
 * error boundary — the remark she was typing stays on screen.
 */
function useRemarkAction(
  action: (previous: FormState, formData: FormData) => Promise<FormState>,
  failed: string,
  onSuccess?: () => void,
) {
  return useActionState(async (previous: FormState, formData: FormData): Promise<FormState> => {
    try {
      const result = await action(previous, formData);
      if (result.status === "success") onSuccess?.();
      return result;
    } catch (error) {
      unstable_rethrow(error);
      return { status: "error", message: failed };
    }
  }, initialFormState);
}

function send(action: (formData: FormData) => void, fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  startTransition(() => action(formData));
}

/** Focus with the least scrolling: the page she is marking stays in view as far as it can. */
function focusGently(element: HTMLElement | null) {
  element?.focus({ preventScroll: true });
  element?.scrollIntoView({ block: "nearest" });
}

/** The pages of the copy, each with its remarks; a click on a page places a new one there. */
export function CorrectionPages({
  submissionId,
  pages,
  remarks,
  elsewhere,
}: {
  submissionId: string;
  pages: { path: string; url: string | null }[];
  remarks: Record<string, NumberedRemark[]>;
  elsewhere: NumberedRemark[];
}) {
  const t = useTranslations("tutor.correction");
  const [point, setPoint] = useState<Point | null>(null);
  // The remark being written belongs to the copy, not to one page: a click on another page
  // moves the mark and keeps the words.
  const [draft, setDraft] = useState("");
  // Read when a save comes back, after the network: the point as it is then, not as it was.
  const currentPoint = useRef(point);
  useEffect(() => {
    currentPoint.current = point;
  }, [point]);

  // Each save reloads the page, and signing a page again gives it a new address, which the
  // browser would download again. The first address of each page is kept while it is valid.
  const [addresses, setAddresses] = useState(() => new Map(pages.map((p) => [p.path, p.url])));
  if (pages.some((page) => !addresses.has(page.path))) {
    setAddresses(new Map([...pages.map((p) => [p.path, p.url] as const), ...addresses]));
  }

  // A form or a remark that goes takes focus with it: it is handed to the first of these that
  // still stands once the page has drawn again.
  const focusAfter = useRef<string[] | null>(null);
  useEffect(() => {
    const ids = focusAfter.current;
    if (!ids) return;
    focusAfter.current = null;
    const target = ids.map((id) => document.getElementById(id)).find(Boolean) ?? null;
    focusGently(target);
  });
  const backTo = (index: number) => {
    focusAfter.current = [`add-remark-${index}`, `page-heading-${index}`, "copy-heading"];
  };

  return (
    <div className="grid gap-10">
      {pages.map((page, index) => {
        const onPage = remarks[page.path] ?? [];
        const marks: Mark[] = onPage.flatMap((remark) =>
          remark.anchor?.x != null && remark.anchor.y != null
            ? [
                {
                  key: remark.id,
                  label: String(remark.number),
                  x: remark.anchor.x,
                  y: remark.anchor.y,
                },
              ]
            : [],
        );
        if (point?.path === page.path && point.x !== null && point.y !== null) {
          marks.push({ key: "new", label: "+", x: point.x, y: point.y, pending: true });
        }
        // A copy handed in as a PDF takes remarks on the whole document (D-106).
        const pdf = isPdfPage(page.path);
        const label = pdf ? t("pdfCopy", { number: index + 1 }) : t("page", { number: index + 1 });
        return (
          <section key={page.path} aria-label={label} className="grid gap-3">
            <h3 id={`page-heading-${index}`} tabIndex={-1} className="text-sm font-semibold">
              {label}
            </h3>
            <AnnotatedPage
              url={addresses.get(page.path) ?? page.url}
              alt={label}
              marks={marks}
              onPoint={pdf ? undefined : (x, y) => setPoint({ path: page.path, x, y })}
              openLabel={pdf ? t("openPdf") : t("openPage")}
              pdf={pdf}
            />
            {onPage.length > 0 ? (
              <ol className="grid gap-2" aria-label={t("remarksOn", { number: index + 1 })}>
                {onPage.map((remark) => (
                  <RemarkItem key={remark.id} remark={remark} onRemoved={() => backTo(index)} />
                ))}
              </ol>
            ) : null}
            {point?.path === page.path ? (
              <NewRemark
                id={`remark-new-${index}`}
                submissionId={submissionId}
                point={point}
                body={draft}
                onBody={setDraft}
                onDone={(done) => {
                  // Only the form that sent it closes: she may have moved on to another spot
                  // while it was saving.
                  if (currentPoint.current !== done) return;
                  backTo(index);
                  setDraft("");
                  setPoint(null);
                }}
              />
            ) : (
              <div className="grid gap-1">
                <p className="text-sm text-encre-douce">{pdf ? t("pdfHint") : t("pointHint")}</p>
                <Button
                  id={`add-remark-${index}`}
                  type="button"
                  variant="outline"
                  className="justify-self-start"
                  onClick={() => setPoint({ path: page.path, x: null, y: null })}
                >
                  {pdf
                    ? t("addOnPdf", { number: index + 1 })
                    : t("addOnPage", { number: index + 1 })}
                </Button>
              </div>
            )}
          </section>
        );
      })}

      {elsewhere.length > 0 ? (
        <section aria-labelledby="remarks-elsewhere" className="grid gap-2">
          <h3 id="remarks-elsewhere" tabIndex={-1} className="text-sm font-semibold">
            {t("elsewhere")}
          </h3>
          <ol className="grid gap-2">
            {elsewhere.map((remark) => (
              <RemarkItem
                key={remark.id}
                remark={remark}
                onRemoved={() => {
                  focusAfter.current = ["remarks-elsewhere", "copy-heading"];
                }}
              />
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

function NewRemark({
  id,
  submissionId,
  point,
  body,
  onBody,
  onDone,
}: {
  id: string;
  submissionId: string;
  point: Point;
  body: string;
  onBody: (body: string) => void;
  onDone: (point: Point) => void;
}) {
  const t = useTranslations("tutor.correction");
  // The point it was sent from, so the answer closes that form and no newer one.
  const sentFrom = useRef(point);
  const [state, action, pending] = useRemarkAction(addRemark, t("errors.unknown"), () =>
    onDone(sentFrom.current),
  );
  const field = useRef<HTMLTextAreaElement>(null);
  // Opened, or moved, by a click on a page or by the button: either way, straight to typing.
  const placed = useRef<Point | null>(null);
  useEffect(() => {
    if (placed.current === point) return;
    placed.current = point;
    focusGently(field.current);
  }, [point]);

  return (
    <form
      className="grid gap-2 rounded-md border border-stylo-rouge/50 p-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sentFrom.current = point;
        send(action, {
          submissionId,
          path: point.path,
          x: point.x === null ? "" : String(point.x),
          y: point.y === null ? "" : String(point.y),
          body,
        });
      }}
    >
      <Label htmlFor={id} className="flex items-center gap-1.5">
        <MapPin aria-hidden="true" className="size-4 text-stylo-rouge" />
        {point.x === null ? t("newOnPage") : t("newAtPoint")}
      </Label>
      <Textarea
        ref={field}
        id={id}
        rows={3}
        maxLength={MAX_REMARK_LENGTH}
        value={body}
        onChange={(event) => onBody(event.target.value)}
        aria-invalid={state.status === "error" ? true : undefined}
        aria-describedby={state.status === "error" ? `${id}-error` : undefined}
      />
      {state.status === "error" ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-stylo-rouge">
          {state.message}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? t("adding") : t("add")}
        </Button>
        <Button type="button" variant="ghost" disabled={pending} onClick={() => onDone(point)}>
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}

function RemarkItem({ remark, onRemoved }: { remark: NumberedRemark; onRemoved: () => void }) {
  const t = useTranslations("tutor.correction");
  const [mode, setMode] = useState<"read" | "edit" | "confirmDelete">("read");
  const editing = mode === "edit";
  const [body, setBody] = useState(remark.body);
  // A newer text from the server (a save here, or from another device) replaces what the
  // edit box would open with — unless she is typing in it right now.
  const [known, setKnown] = useState(remark.body);
  if (remark.body !== known) {
    setKnown(remark.body);
    if (!editing) setBody(remark.body);
  }
  const [saved, save, saving] = useRemarkAction(updateRemark, t("errors.unknown"), () =>
    toggle("read"),
  );
  const [removed, remove, removing] = useRemarkAction(deleteRemark, t("errors.unknown"), onRemoved);
  // A failed save is shown while she is still editing; « Annuler » puts it away.
  const error =
    editing && saved.status === "error" ? saved : removed.status === "error" ? removed : null;
  const id = `remark-${remark.id}`;

  // The button pressed gives way to a form and back: focus follows, rather than drop to the
  // page. Reset once used, or showing a copy seen earlier would move focus again.
  const moved = useRef(false);
  const field = useRef<HTMLTextAreaElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const confirmButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    focusGently(
      mode === "edit"
        ? field.current
        : mode === "confirmDelete"
          ? confirmButton.current
          : editButton.current,
    );
  }, [mode]);
  function toggle(next: "read" | "edit" | "confirmDelete") {
    moved.current = true;
    setMode(next);
  }

  return (
    <li className="flex items-start gap-3 rounded-md border border-quadrillage bg-surface p-3">
      <RemarkNumber number={remark.number} />
      <div className="grid min-w-0 flex-1 gap-2">
        {editing ? (
          <form
            className="grid gap-2"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              send(save, { id: remark.id, body });
            }}
          >
            <Label htmlFor={id} className="sr-only">
              {t("editLabel", { number: remark.number })}
            </Label>
            <Textarea
              ref={field}
              id={id}
              rows={3}
              maxLength={MAX_REMARK_LENGTH}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" size="sm" disabled={saving}>
                {t("saveRemark")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setBody(remark.body);
                  toggle("read");
                }}
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        ) : (
          <>
            {/* The text just saved, until the page brings it back: no flash of the old one. */}
            <p className="break-words whitespace-pre-line">{body}</p>
            {mode === "confirmDelete" ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm">{t("deleteConfirm", { number: remark.number })}</span>
                <Button
                  ref={confirmButton}
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={removing}
                  onClick={() => send(remove, { id: remark.id })}
                >
                  {t("delete")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={removing}
                  onClick={() => toggle("read")}
                >
                  {t("keep")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button
                  ref={editButton}
                  type="button"
                  size="sm"
                  variant="ghost"
                  aria-label={t("editLabel", { number: remark.number })}
                  onClick={() => toggle("edit")}
                >
                  {t("edit")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  aria-label={t("deleteLabel", { number: remark.number })}
                  onClick={() => toggle("confirmDelete")}
                >
                  {t("delete")}
                </Button>
              </div>
            )}
          </>
        )}
        {error ? (
          <p role="alert" className="text-sm text-stylo-rouge">
            {error.message}
          </p>
        ) : null}
      </div>
    </li>
  );
}

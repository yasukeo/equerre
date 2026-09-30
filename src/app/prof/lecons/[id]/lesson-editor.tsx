"use client";

import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { DocumentEditor } from "@/components/editor/document-editor";
import { PdfLinks } from "@/components/pdf-links";
import {
  PublicationChip,
  type LessonVisibility,
  type PublicationStatus,
} from "@/components/lesson-status";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import type { CalloutKind, StoredLesson } from "@/lib/lesson/document";
import { DOCUMENT_KINDS, type DocumentKind } from "@/lib/lesson/kinds";
import { saveLesson } from "../actions";

const VISIBILITIES: LessonVisibility[] = ["enrolled", "specific", "public"];

function snapshotOf(
  title: string,
  summary: string,
  kind: string,
  visibility: string,
  content: string,
) {
  return [title, summary, kind, visibility, content].join("\u0000");
}

type Props = {
  calloutLabels: Record<CalloutKind, string>;
  lesson: {
    id: string;
    title: string;
    summary: string;
    status: PublicationStatus;
    kind: DocumentKind;
    visibility: LessonVisibility;
    content: StoredLesson;
    context: string;
    publicPath: string;
    /** The version it was opened at, for its PDF's address (D-096). */
    version: string;
  };
};

export function LessonEditor({ calloutLabels, lesson }: Props) {
  const t = useTranslations("tutor.lessonEditor");
  const tLessons = useTranslations("tutor.lessons");
  const tEditor = useTranslations("editor");
  const tKind = useTranslations("documentKind");

  // Controlled on purpose: React resets uncontrolled fields after a form action, which
  // would put the old title back on screen right after it was saved.
  const [title, setTitle] = useState(lesson.title);
  const [summary, setSummary] = useState(lesson.summary);
  const [kind, setKind] = useState(lesson.kind);
  const [visibility, setVisibility] = useState(lesson.visibility);
  const [status, setStatus] = useState(lesson.status);
  // The body as the editor writes it; empty until the editor exists.
  const [content, setContent] = useState("");

  const snapshot = snapshotOf(title, summary, kind, visibility, content);
  // The lesson as last saved, in the editor's own form. Null until the editor exists:
  // the stored JSON comes back from jsonb with its keys reordered, so it never compares
  // equal to what the editor writes and every lesson would open as « unsaved ».
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);
  const submittedSnapshot = useRef(snapshot);
  const dirty = savedSnapshot !== null && snapshot !== savedSnapshot;

  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        const result = await saveLesson(previous, formData);
        if (result.status === "success") {
          setSavedSnapshot(submittedSnapshot.current);
          const intent = formData.get("intent");
          if (intent === "publish") setStatus("published");
          if (intent === "unpublish") setStatus("draft");
        }
        return result;
      } catch (error) {
        // A failed request (a new deployment, the server down) would otherwise reach the
        // error boundary and take everything typed with it. Next's own redirects go through.
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );

  // Leaving with unsaved changes asks first.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  return (
    <form
      onSubmit={(event) => {
        // Dispatched by hand rather than through the form's action prop. React resets a
        // form once its action succeeds, and the reset puts a controlled <select> back on
        // the option it was first rendered with: the next save would then quietly send the
        // old visibility, and a published lesson would drop off the public site.
        event.preventDefault();
        // The buttons stay disabled until the editor has written the body once.
        if (savedSnapshot === null) return;
        submittedSnapshot.current = snapshot;
        const submitter = (event.nativeEvent as SubmitEvent).submitter;
        const formData = new FormData(event.currentTarget, submitter);
        startTransition(() => formAction(formData));
      }}
      className="grid gap-6"
      noValidate
    >
      <input type="hidden" name="id" value={lesson.id} />
      <input type="hidden" name="content" value={content} />

      <div className="grid gap-2">
        <p className="text-sm text-encre-douce">{lesson.context}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <PublicationChip status={status} label={tLessons(`status.${status}`)} />
          {dirty ? (
            <span className="text-sm text-encre-douce">{t("unsaved")}</span>
          ) : (
            <>
              {status === "published" && visibility === "public" ? (
                <Link
                  href={lesson.publicPath}
                  className="text-sm text-stylo-bleu underline underline-offset-2"
                >
                  {tLessons("open")}
                </Link>
              ) : null}
              {/* The PDF of what is saved, drafts included, to read it over as a reader will. */}
              <PdfLinks id={lesson.id} version={lesson.version} kind={kind} />
            </>
          )}
        </div>
      </div>

      <Field
        id="lesson-title"
        name="title"
        label={t("fields.title")}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={160}
        error={fieldError(state, "title")}
        required
      />
      <TextareaField
        id="lesson-summary"
        name="summary"
        label={t("fields.summary")}
        hint={t("fields.summaryHint")}
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
        maxLength={300}
        rows={2}
        error={fieldError(state, "summary")}
      />
      <SelectField
        id="lesson-kind"
        name="kind"
        label={t("fields.kind")}
        value={kind}
        onChange={(event) => setKind(event.target.value as DocumentKind)}
      >
        {DOCUMENT_KINDS.map((value) => (
          <option key={value} value={value}>
            {tKind(`one.${value}`)}
          </option>
        ))}
      </SelectField>
      <SelectField
        id="lesson-visibility"
        name="visibility"
        label={t("fields.visibility")}
        hint={tLessons(`visibilityHint.${visibility}`)}
        value={visibility}
        onChange={(event) => setVisibility(event.target.value as LessonVisibility)}
      >
        {VISIBILITIES.map((value) => (
          <option key={value} value={value}>
            {tLessons(`visibility.${value}`)}
          </option>
        ))}
      </SelectField>

      <div className="grid gap-1.5">
        <span id="lesson-body-label" className="text-sm font-medium">
          {t("fields.body")}
        </span>
        <DocumentEditor
          labelledBy="lesson-body-label"
          label={t("fields.body")}
          initialContent={lesson.content}
          folderId={lesson.id}
          attachments
          calloutLabels={calloutLabels}
          exercises={{ exercise: tEditor("exerciseLabel"), solution: tEditor("solutionLabel") }}
          onReady={(written) => {
            setContent(written);
            setSavedSnapshot(
              snapshotOf(lesson.title, lesson.summary, lesson.kind, lesson.visibility, written),
            );
          }}
          onChange={setContent}
        />
        <p className="text-sm text-encre-douce">{tEditor("mathShortcut")}</p>
      </div>

      <FormMessage state={state} />

      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          name="intent"
          value="save"
          size="lg"
          disabled={pending || savedSnapshot === null}
        >
          {pending ? t("saving") : t("save")}
        </Button>
        {status === "draft" ? (
          <Button
            type="submit"
            name="intent"
            value="publish"
            size="lg"
            variant="outline"
            disabled={pending || savedSnapshot === null}
          >
            {t("publish")}
          </Button>
        ) : (
          <Button
            type="submit"
            name="intent"
            value="unpublish"
            size="lg"
            variant="outline"
            disabled={pending || savedSnapshot === null}
          >
            {t("unpublish")}
          </Button>
        )}
      </div>
    </form>
  );
}

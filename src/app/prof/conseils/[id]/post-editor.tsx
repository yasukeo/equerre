"use client";

import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { DocumentEditor } from "@/components/editor/document-editor";
import { PublicationChip, type PublicationStatus } from "@/components/lesson-status";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import type { CalloutKind, StoredLesson } from "@/lib/lesson/document";
import type { PostCategory } from "@/lib/posts/queries";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { deletePost, savePost } from "../actions";

function snapshotOf(title: string, excerpt: string, category: string, content: string) {
  return [title, excerpt, category, content].join("\u0000");
}

type Props = {
  calloutLabels: Record<CalloutKind, string>;
  categories: PostCategory[];
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: PostCategory;
    status: PublicationStatus;
    content: StoredLesson;
    publicPath: string;
  };
};

/**
 * A blog post, written like a lesson (D-089): the same editor without images or files, saved,
 * published and withdrawn the same way. Controlled fields, for the same reason as the lesson
 * editor: a form action's reset would put the old values back on screen once saved.
 */
export function PostEditor({ calloutLabels, categories, post }: Props) {
  const t = useTranslations("postEditor");
  const tStatus = useTranslations("postsAdmin.status");
  const tCategory = useTranslations("blog.category");
  const tEditor = useTranslations("editor");

  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [category, setCategory] = useState<string>(post.category);
  const [status, setStatus] = useState(post.status);
  const [content, setContent] = useState("");

  const snapshot = snapshotOf(title, excerpt, category, content);
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);
  const submittedSnapshot = useRef(snapshot);
  const dirty = savedSnapshot !== null && snapshot !== savedSnapshot;

  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        const result = await savePost(previous, formData);
        if (result.status === "success") {
          setSavedSnapshot(submittedSnapshot.current);
          const intent = formData.get("intent");
          if (intent === "publish") setStatus("published");
          if (intent === "unpublish") setStatus("draft");
        }
        return result;
      } catch (error) {
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );
  const [deleteState, deleteAction, deleting] = useFormAction(deletePost, t("errors.unknown"));

  // Leaving with unsaved changes asks first.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  return (
    <div className="grid gap-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (savedSnapshot === null) return;
          submittedSnapshot.current = snapshot;
          const submitter = (event.nativeEvent as SubmitEvent).submitter;
          const formData = new FormData(event.currentTarget, submitter);
          startTransition(() => formAction(formData));
        }}
        className="grid gap-6"
        noValidate
      >
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="content" value={content} />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <PublicationChip status={status} label={tStatus(status)} />
          {dirty ? (
            <span className="text-sm text-encre-douce">{t("unsaved")}</span>
          ) : status === "published" ? (
            <Link
              href={post.publicPath}
              className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
            >
              {t("open")}
            </Link>
          ) : null}
        </div>

        <Field
          id="post-title"
          name="title"
          label={t("title")}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={140}
          error={fieldError(state, "title")}
          required
        />
        <TextareaField
          id="post-excerpt"
          name="excerpt"
          label={t("excerpt")}
          hint={t("excerptHint")}
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          maxLength={300}
          rows={2}
          error={fieldError(state, "excerpt")}
        />
        <SelectField
          id="post-category"
          name="category"
          label={t("category")}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          error={fieldError(state, "category")}
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {tCategory(value)}
            </option>
          ))}
        </SelectField>

        <div className="grid gap-1.5">
          <span id="post-body-label" className="text-sm font-medium">
            {t("body")}
          </span>
          <DocumentEditor
            labelledBy="post-body-label"
            label={t("body")}
            initialContent={post.content}
            folderId={post.id}
            attachments={false}
            images={false}
            calloutLabels={calloutLabels}
            onReady={(written) => {
              setContent(written);
              setSavedSnapshot(snapshotOf(post.title, post.excerpt, post.category, written));
            }}
            onChange={setContent}
          />
          <p className="text-sm text-encre-douce">
            {tEditor("mathShortcut")} {t("noImages")}
          </p>
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
          <Button
            type="submit"
            name="intent"
            value={status === "draft" ? "publish" : "unpublish"}
            size="lg"
            variant="outline"
            disabled={pending || savedSnapshot === null}
          >
            {status === "draft" ? t("publish") : t("unpublish")}
          </Button>
        </div>
      </form>

      <details className="rounded-md border border-quadrillage p-4">
        <summary className="cursor-pointer py-2.5 font-medium">{t("deleteHeading")}</summary>
        <div className="mt-2 grid gap-3">
          <p className="text-sm text-encre-douce">{t("deleteHint")}</p>
          <FormMessage state={deleteState} />
          <Button
            type="button"
            variant="outline"
            disabled={deleting}
            className="justify-self-start"
            onClick={() => sendFields(deleteAction, { id: post.id })}
          >
            {deleting ? t("deleting") : t("delete")}
          </Button>
        </div>
      </details>
    </div>
  );
}

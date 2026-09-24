"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { lessonDocumentSchema, type LessonDocument } from "@/lib/lesson/document";
import { COURSE_INDEX_TAG, lessonTag } from "@/lib/lesson/queries";
import { slugify } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";

// ─────────────────────────────────────────────────────────────── create

const newLessonSchema = z.object({
  chapterId: z.uuid(),
  title: z.string().trim().min(1).max(160),
});

// The editor needs a block to put the cursor in.
const FIRST_PARAGRAPH: LessonDocument = { type: "doc", content: [{ type: "paragraph" }] };

export async function createLesson(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.newLesson");

  const values = {
    chapterId: textField(formData, "chapterId"),
    title: textField(formData, "title"),
  };
  const parsed = newLessonSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        chapterId: t("errors.chapter"),
        title: t("errors.title"),
      }),
      values,
    };
  }

  const supabase = await createClient();
  const { data: last } = await supabase
    .from("lessons")
    .select("position")
    .eq("chapter_id", parsed.data.chapterId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  // The slug is the lesson's address and unique across the site: a clash gets the next free
  // number. It is set once, so a link that has been shared keeps working when the title
  // changes. A title with no Latin letter or digit — one in Arabic — slugifies to nothing,
  // and a shared fallback would run out of numbers, so it gets a random suffix instead.
  const base = slugify(parsed.data.title) || `lecon-${crypto.randomUUID().slice(0, 8)}`;
  const { data: taken } = await supabase
    .from("lessons")
    .select("slug")
    .or(`slug.eq.${base},slug.like.${base}-*`);
  const used = new Set((taken ?? []).map((row) => row.slug));
  let number = 1;
  while (used.has(number === 1 ? base : `${base}-${number}`)) number += 1;
  let createdId: string | null = null;

  // A few tries cover another lesson taking the same slug in the meantime.
  for (let attempt = 0; attempt < 5 && createdId === null; attempt += 1) {
    const candidate =
      attempt === 0
        ? number === 1
          ? base
          : `${base}-${number}`
        : `${base}-${crypto.randomUUID().slice(0, 8)}`;
    const { data, error } = await supabase
      .from("lessons")
      .insert({
        chapter_id: parsed.data.chapterId,
        title: parsed.data.title,
        slug: candidate,
        content: FIRST_PARAGRAPH,
        // A draft for her level's students: nothing reaches the public site by accident.
        status: "draft",
        visibility: "enrolled",
        position: (last?.position ?? -1) + 1,
      })
      .select("id")
      .single();

    if (data) {
      createdId = data.id;
    } else if (error?.code !== "23505") {
      break;
    }
  }

  if (createdId === null) {
    return { status: "error", message: t("errors.unknown"), values };
  }

  redirect(`/prof/lecons/${createdId}`);
}

// ─────────────────────────────────────────────────────────────── save, publish, unpublish

const saveLessonSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1).max(160),
  summary: z.string().trim().max(300),
  visibility: z.enum(["public", "enrolled", "specific"]),
  intent: z.enum(["save", "publish", "unpublish"]),
});

/** The editor's document, held to the lesson vocabulary before it is stored. */
function parseContent(raw: string): LessonDocument | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  const result = lessonDocumentSchema.safeParse(value);
  return result.success ? result.data : null;
}

export async function saveLesson(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.lessonEditor");

  const parsed = saveLessonSchema.safeParse({
    id: textField(formData, "id"),
    title: textField(formData, "title"),
    summary: textField(formData, "summary"),
    visibility: textField(formData, "visibility"),
    intent: textField(formData, "intent"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        title: t("errors.title"),
        summary: t("errors.summary"),
      }),
    };
  }

  // The editor cannot produce anything outside the vocabulary; this refuses a tampered
  // request, and says so rather than storing a lesson the page would not draw.
  const content = parseContent(textField(formData, "content"));
  if (content === null) {
    return { status: "error", message: t("errors.content") };
  }

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("lessons")
    .select("slug, status, published_at")
    .eq("id", parsed.data.id)
    .maybeSingle();
  if (!current) {
    return { status: "error", message: t("errors.notFound") };
  }

  const { intent } = parsed.data;
  const status =
    intent === "publish" ? "published" : intent === "unpublish" ? "draft" : current.status;
  // The first publication date stays: it is what the page shows as « Publié le ».
  const publishedAt =
    status === "published"
      ? (current.published_at ?? new Date().toISOString())
      : current.published_at;

  const { error } = await supabase
    .from("lessons")
    .update({
      title: parsed.data.title,
      summary: parsed.data.summary || null,
      visibility: parsed.data.visibility,
      content,
      status,
      published_at: publishedAt,
    })
    .eq("id", parsed.data.id);
  if (error) {
    return { status: "error", message: t("errors.unknown") };
  }

  // A public lesson page is cached for up to a month: the tutor sees her change now, and so
  // does everyone else — including a lesson that was just withdrawn or made private.
  updateTag(lessonTag(current.slug));
  updateTag(COURSE_INDEX_TAG);

  return {
    status: "success",
    message: t(
      intent === "publish" ? "published" : intent === "unpublish" ? "unpublished" : "saved",
    ),
  };
}

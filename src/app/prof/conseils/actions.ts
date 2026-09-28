"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { postDocumentSchema, type PostDocument } from "@/lib/lesson/document";
import { POST_CATEGORIES, POSTS_TAG, postTag } from "@/lib/posts/queries";
import { slugify } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";

// The blog's posts (DECISIONS.md, D-089): created as drafts, written with the lesson editor
// without images or files, published and withdrawn like lessons. Every save refreshes the
// cached public pages, so the site shows what she saved.

const category = z.enum(POST_CATEGORIES as [string, ...string[]]);

const newPostSchema = z.object({
  title: z.string().trim().min(1).max(140),
  category,
});

// The editor needs a block to put the cursor in.
const FIRST_PARAGRAPH: PostDocument = { type: "doc", content: [{ type: "paragraph" }] };

export async function createPost(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("postsAdmin");
  const values = { title: textField(formData, "title"), category: textField(formData, "category") };
  const parsed = newPostSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        title: t("errors.title"),
        category: t("errors.category"),
      }),
      values,
    };
  }

  // The slug is the post's address, set once, like a lesson's (D-041): a clash gets the next
  // free number, and a title with no Latin letter a random suffix.
  const supabase = await createClient();
  const base = slugify(parsed.data.title, 100) || `conseil-${crypto.randomUUID().slice(0, 8)}`;
  const { data: taken } = await supabase
    .from("posts")
    .select("slug")
    .or(`slug.eq.${base},slug.like.${base}-*`);
  const used = new Set((taken ?? []).map((row) => row.slug));
  let number = 1;
  while (used.has(number === 1 ? base : `${base}-${number}`)) number += 1;

  let createdId: string | null = null;
  for (let attempt = 0; attempt < 5 && createdId === null; attempt += 1) {
    const candidate =
      attempt === 0
        ? number === 1
          ? base
          : `${base}-${number}`
        : `${base}-${crypto.randomUUID().slice(0, 8)}`;
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: parsed.data.title,
        slug: candidate,
        category: parsed.data.category as (typeof POST_CATEGORIES)[number],
        content: FIRST_PARAGRAPH,
      })
      .select("id")
      .single();
    if (data) createdId = data.id;
    else if (error?.code !== "23505") break;
  }
  if (createdId === null) return { status: "error", message: t("errors.unknown"), values };
  redirect(`/prof/conseils/${createdId}`);
}

const savePostSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1).max(140),
  excerpt: z.string().trim().max(300),
  category,
  intent: z.enum(["save", "publish", "unpublish"]),
});

function parseContent(raw: string): PostDocument | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  const result = postDocumentSchema.safeParse(value);
  return result.success ? result.data : null;
}

export async function savePost(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("postEditor");
  const parsed = savePostSchema.safeParse({
    id: textField(formData, "id"),
    title: textField(formData, "title"),
    excerpt: textField(formData, "excerpt"),
    category: textField(formData, "category"),
    intent: textField(formData, "intent"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        title: t("errors.title"),
        excerpt: t("errors.excerpt"),
        category: t("errors.category"),
      }),
    };
  }
  // The editor offers nothing outside the vocabulary; this refuses a tampered request, or a
  // paste that brought an image in, and says what to change.
  const content = parseContent(textField(formData, "content"));
  if (content === null) return { status: "error", message: t("errors.content") };

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("posts")
    .select("slug, status, published_at")
    .eq("id", parsed.data.id)
    .maybeSingle();
  if (!current) return { status: "error", message: t("errors.notFound") };

  const { intent } = parsed.data;
  const status =
    intent === "publish" ? "published" : intent === "unpublish" ? "draft" : current.status;
  // The first publication date stays: it is what the page shows as « Publié le ».
  const publishedAt =
    status === "published"
      ? (current.published_at ?? new Date().toISOString())
      : current.published_at;

  const { data: updated, error } = await supabase
    .from("posts")
    .update({
      title: parsed.data.title,
      excerpt: parsed.data.excerpt || null,
      category: parsed.data.category as (typeof POST_CATEGORIES)[number],
      content,
      status,
      published_at: publishedAt,
    })
    .eq("id", parsed.data.id)
    .select("id");
  if (error) return { status: "error", message: t("errors.unknown") };
  // Deleted in another tab meanwhile: nothing was saved, and she is told so.
  if (updated.length === 0) return { status: "error", message: t("errors.notFound") };

  updateTag(postTag(current.slug));
  updateTag(POSTS_TAG);
  return {
    status: "success",
    message: t(
      intent === "publish" ? "published" : intent === "unpublish" ? "unpublished" : "saved",
    ),
  };
}

export async function deletePost(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("postEditor");
  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.notFound") };
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").delete().eq("id", id.data).select("slug");
  if (error) return { status: "error", message: t("errors.unknown") };
  if (data.length === 0) return { status: "error", message: t("errors.notFound") };
  for (const row of data) updateTag(postTag(row.slug));
  updateTag(POSTS_TAG);
  redirect("/prof/conseils?supprime=1");
}

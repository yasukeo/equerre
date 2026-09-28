import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { readStoredLesson, type StoredLesson } from "@/lib/lesson/document";
import { publicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { readingMinutes } from "./reading";

// The blog (DECISIONS.md, D-089, D-090). What visitors read is cached and prerendered, read
// anonymously so a cache can only ever hold published posts; saving a post refreshes its page
// and the listings. A failed read throws: an error is not cached, where an empty answer would
// be kept for a month. The tutor's own lists go through her session, uncached.

export type PostCategory = Database["public"]["Enums"]["post_category"];
export type PostStatus = Database["public"]["Enums"]["publication_status"];

export const POST_CATEGORIES: PostCategory[] = ["methode", "examens", "erreurs", "orientation"];

/** Every public post page and listing carries this, so publishing one refreshes them all. */
export const POSTS_TAG = "conseils:index";
export const postTag = (slug: string) => `conseil:${slug}`;

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: PostCategory;
  publishedAt: string;
  updatedAt: string;
  minutes: number;
};

export type PublicPost = PostSummary & { content: StoredLesson };

/** Published posts, newest first. */
export async function listPublishedPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheTag(POSTS_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("posts")
    .select("slug, title, excerpt, category, published_at, updated_at, content")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error("Could not read the posts", { cause: error });

  return data.flatMap((row) =>
    row.published_at
      ? [
          {
            slug: row.slug,
            title: row.title,
            excerpt: row.excerpt,
            category: row.category,
            publishedAt: row.published_at,
            updatedAt: row.updated_at,
            minutes: readingMinutes(readStoredLesson(row.content)),
          },
        ]
      : [],
  );
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  "use cache";
  cacheTag(postTag(slug), POSTS_TAG);

  const { data, error } = await publicClient()
    .from("posts")
    .select("slug, title, excerpt, category, published_at, updated_at, content")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error("Could not read the post", { cause: error });

  if (!data?.published_at) {
    // A post about to be published must not be remembered as missing for a month.
    cacheLife("minutes");
    return null;
  }
  cacheLife("max");

  const content = readStoredLesson(data.content);
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    minutes: readingMinutes(content),
    content,
  };
}

export type TutorPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: PostCategory;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
};

/** Every post, drafts first then the newest published, for the tutor. */
export async function listPostsForTutor(): Promise<TutorPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, category, status, published_at, updated_at")
    .order("status")
    .order("updated_at", { ascending: false });
  if (error) throw new Error("Could not read the posts", { cause: error });
  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  }));
}

export async function getPostForTutor(
  id: string,
): Promise<(TutorPost & { content: StoredLesson }) | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, category, status, published_at, updated_at, content")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Could not read the post", { cause: error });
  if (!data) return null;
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    status: data.status,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    content: readStoredLesson(data.content),
  };
}

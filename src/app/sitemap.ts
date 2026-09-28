import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { levelSlug, listPublicCourse } from "@/lib/lesson/queries";
import { listPublishedPosts } from "@/lib/posts/queries";

// Every public page a search engine may index (D-089): the front door, the course and its
// lessons, the blog and its posts. Built from the same cached reads as the pages.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const [course, posts] = await Promise.all([listPublicCourse(), listPublishedPosts()]);

  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cours`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/conseils`, changeFrequency: "weekly", priority: 0.8 },
    ...course.flatMap((level) =>
      level.chapters.flatMap((chapter) =>
        chapter.lessons.map((lesson) => ({
          url: `${base}/cours/${levelSlug(level.code)}/${chapter.slug}/${lesson.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ),
    ),
    ...posts.map((post) => ({
      url: `${base}/conseils/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

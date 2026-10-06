import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { listExamCorrections, listExamProgrammes } from "@/lib/exams/queries";
import { getProgrammeCourse, listProgrammes } from "@/lib/lesson/queries";
import { listPublishedPosts } from "@/lib/posts/queries";

// Every public page a search engine may index (D-089, D-094, D-097, D-103): the front door, the
// course by programme, its chapters and their documents, the past exams and Équerre's
// corrections of them, the blog and its posts. A chapter still being written is left out until
// it has something to read. Built from the same cached reads as the pages.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const [programmes, posts, exams, corrections] = await Promise.all([
    listProgrammes(),
    listPublishedPosts(),
    listExamProgrammes(),
    listExamCorrections(),
  ]);
  const courses = await Promise.all(
    programmes.map((programme) => getProgrammeCourse(programme.slug)),
  );

  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cours`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/conseils`, changeFrequency: "weekly", priority: 0.8 },
    ...programmes.map((programme) => ({
      url: `${base}/cours/${programme.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...courses.flatMap((course) =>
      course
        ? course.chapters
            .filter((chapter) => chapter.documents.length > 0)
            .flatMap((chapter) => [
              {
                url: `${base}/cours/${course.slug}/${chapter.slug}`,
                changeFrequency: "weekly" as const,
                priority: 0.6,
              },
              ...chapter.documents.map((document) => ({
                url: `${base}/cours/${course.slug}/${chapter.slug}/${document.slug}`,
                changeFrequency: "monthly" as const,
                priority: 0.6,
              })),
            ])
        : [],
    ),
    { url: `${base}/examens`, changeFrequency: "monthly" as const, priority: 0.7 },
    ...exams.map((programme) => ({
      url: `${base}/examens/${programme.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...corrections.map((correction) => ({
      url: `${base}/examens/${correction.niveau}/${correction.sujet}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${base}/conseils/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

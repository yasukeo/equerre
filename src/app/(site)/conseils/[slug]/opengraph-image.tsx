import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { shareImage, shareImageSize, shareImageType } from "@/lib/og/share-image";
import { getPublishedPost, listPublishedPosts } from "@/lib/posts/queries";

// A post, shared: its title and theme, on the same copybook page as the lessons (D-048).

export const alt = `Conseil de mathématiques · ${siteConfig.brand}`;
export const size = shareImageSize;
export const contentType = shareImageType;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await listPublishedPosts();
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "-" }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const [post, t, tShare] = await Promise.all([
    getPublishedPost((await params).slug),
    getTranslations("blog"),
    getTranslations("share"),
  ]);
  return shareImage(
    post
      ? { eyebrow: `${t("title")} · ${t(`category.${post.category}`)}`, title: post.title }
      : { eyebrow: tShare("eyebrow"), title: t("title") },
  );
}

import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { shareImage, shareImageSize, shareImageType } from "@/lib/og/share-image";

// The picture shared with any page that has none of its own.

export const alt = `${siteConfig.brand} · ${siteConfig.tutorName}`;
export const size = shareImageSize;
export const contentType = shareImageType;

export default async function Image() {
  const t = await getTranslations("share");
  return shareImage({ eyebrow: t("eyebrow"), title: t("title") });
}

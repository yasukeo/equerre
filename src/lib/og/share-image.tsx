import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// The picture a shared link shows (DECISIONS.md, D-048): a sheet of squared paper with the red
// margin of a French copybook, the page's title in Readex Pro, and whose site it is.

export const shareImageSize = { width: 1200, height: 630 };
export const shareImageType = "image/png";

// next/og reads TrueType, not the woff2 next/font serves to browsers: the same face, as files
// kept in the repository with their licence (assets/fonts/OFL.txt).
const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/ReadexPro-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/ReadexPro-SemiBold.ttf")),
]);

// The palette of DESIGN.md, written out: an image has no CSS variables. Light theme only,
// since the picture is shown by someone else's app.
const PAPIER = "#f5f8fb";
const ENCRE = "#132033";
const ENCRE_DOUCE = "#4e5d73";
const QUADRILLAGE = "#d3deea";
const STYLO_ROUGE = "#be2f26";

/** One carreau of the grid: 20px on screen (DESIGN.md), doubled for a 1200px picture. */
const CARREAU = 40;

export async function shareImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [regular, semiBold] = await fonts;
  const long = title.length > 48;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: `${CARREAU * 2}px ${CARREAU * 2}px ${CARREAU * 1.5}px ${CARREAU * 4}px`,
        backgroundColor: PAPIER,
        backgroundImage: `linear-gradient(${QUADRILLAGE} 1px, transparent 1px), linear-gradient(90deg, ${QUADRILLAGE} 1px, transparent 1px)`,
        backgroundSize: `${CARREAU}px ${CARREAU}px`,
        color: ENCRE,
        fontFamily: "Readex Pro",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: CARREAU * 3 - 2,
          width: 4,
          backgroundColor: STYLO_ROUGE,
        }}
      />
      <div style={{ display: "flex", fontSize: 30, color: ENCRE_DOUCE }}>{eyebrow}</div>
      <div
        style={{
          display: "flex",
          marginTop: CARREAU * 0.75,
          fontSize: long ? 60 : 76,
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: 32,
        }}
      >
        <span style={{ fontWeight: 600 }}>{siteConfig.brand}</span>
        <span style={{ color: ENCRE_DOUCE }}>{siteConfig.tutorName}</span>
      </div>
    </div>,
    {
      ...shareImageSize,
      fonts: [
        { name: "Readex Pro", data: regular, weight: 400, style: "normal" },
        { name: "Readex Pro", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}

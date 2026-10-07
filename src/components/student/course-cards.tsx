import { Check, CircleDashed, Clock3 } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cycleHue, kindHue } from "@/lib/design/colors";
import type { ChapterProgress, ChapterState, DocumentProgress } from "@/lib/student/progress";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { BookmarkToggle } from "./bookmark-toggle";
import { ReadingRuler, Ruler, type RulerMark } from "./ruler";

export function marksOf(documents: DocumentProgress[]): RulerMark[] {
  return documents.map((document) =>
    document.understood ? "understood" : document.opened ? "opened" : "new",
  );
}

/** A chapter's state in words and a shape, never colour alone (DESIGN.md). */
export async function ChapterStateChip({ state }: { state: ChapterState }) {
  const t = await getTranslations("student.progress.state");
  const Icon = state === "compris" ? Check : state === "en_cours" ? Clock3 : CircleDashed;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
        state === "compris"
          ? "bg-encre text-papier"
          : state === "en_cours"
            ? "bg-lavis-bleu text-stylo-bleu"
            : "bg-sunken text-encre-douce",
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {t(state)}
    </span>
  );
}

/** One chapter of her programme: its number on the level's colour, its ruler, its state. */
export async function ChapterCard({
  chapter,
  cycle,
}: {
  chapter: ChapterProgress;
  cycle: string;
}) {
  const t = await getTranslations("student.progress");
  const band = cycleHue(cycle).band;
  const empty = chapter.documents.length === 0;
  const number = String(chapter.number).padStart(2, "0");

  const body = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-12 shrink-0 place-content-center rounded-xl text-lg font-semibold tabular [font-variation-settings:'HEXP'_45]",
          empty ? "bg-sunken text-encre-douce" : band,
        )}
      >
        {number}
      </span>
      <span className="grid min-w-0 flex-1 gap-2">
        <span className="font-semibold leading-snug">
          <span className="sr-only">{t("chapterNumber", { number: chapter.number })} </span>
          {frenchSpaces(chapter.title)}
        </span>
        {empty ? (
          <span className="text-sm text-encre-douce">{t("comingSoon")}</span>
        ) : (
          <>
            <Ruler marks={marksOf(chapter.documents)} />
            <span className="flex flex-wrap items-center gap-2 text-xs text-encre-douce">
              <ChapterStateChip state={chapter.state} />
              <span className="tabular">
                {t("understoodOf", {
                  understood: chapter.understood,
                  total: chapter.documents.length,
                })}
              </span>
            </span>
          </>
        )}
      </span>
    </>
  );

  return empty ? (
    <div className="flex items-start gap-4 rounded-2xl border border-dashed border-quadrillage p-4">
      {body}
    </div>
  ) : (
    <Link
      href={`/eleve/chapitres/${chapter.slug}`}
      className="flex items-start gap-4 rounded-2xl border border-quadrillage bg-surface p-4 transition-colors hover:border-trait"
    >
      {body}
    </Link>
  );
}

/** A document in a list: its kind, its title, how far she got, and « à revoir ». */
export async function DocumentRow({
  document,
  context,
  showBookmark = true,
}: {
  document: DocumentProgress;
  /** A line above the title: the chapter, when the list mixes several. */
  context?: string;
  showBookmark?: boolean;
}) {
  const [t, tKind] = await Promise.all([
    getTranslations("student.progress"),
    getTranslations("documentKind"),
  ]);
  const hue = kindHue(document.kind);
  const status = document.understood
    ? t(document.kind === "serie" || document.kind === "devoir" ? "doneShort" : "understoodShort")
    : document.opened
      ? t("readPercent", { percent: Math.round(document.position * 100) })
      : t("notOpened");

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-s-4 border-quadrillage bg-surface pe-2",
        hue.edge,
      )}
    >
      <Link
        href={`/eleve/cours/${document.slug}`}
        className="grid min-h-16 min-w-0 flex-1 content-center gap-1 rounded-s-2xl py-3 ps-4 hover:bg-sunken/60"
      >
        <span className="flex flex-wrap items-center gap-x-2 text-xs">
          <span className={cn("font-semibold tracking-wide uppercase", hue.text)}>
            {tKind(`one.${document.kind}`)}
          </span>
          {context ? <span className="text-encre-douce">{context}</span> : null}
        </span>
        <span className="font-medium leading-snug">{frenchSpaces(document.title)}</span>
        <span className="flex items-center gap-2 text-xs text-encre-douce">
          {document.understood ? (
            <Check aria-hidden="true" className="size-3.5 text-encre" />
          ) : document.opened ? (
            <ReadingRuler position={document.position} className="w-16" />
          ) : null}
          {status}
        </span>
      </Link>
      {showBookmark ? (
        <BookmarkToggle
          lessonId={document.id}
          saved={document.bookmarked}
          title={document.title}
          compact
        />
      ) : null}
    </div>
  );
}

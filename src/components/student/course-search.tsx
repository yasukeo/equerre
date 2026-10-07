"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDeferredValue, useId, useMemo, useState, type ReactNode } from "react";
import { kindHue } from "@/lib/design/colors";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { cn } from "@/lib/utils";

export type SearchItem = {
  slug: string;
  title: string;
  summary: string | null;
  kind: DocumentKind;
  chapterTitle: string;
  understood: boolean;
};

/** Lower case, without accents or apostrophes' variants: « intégrale » finds « Integrale ». */
function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, " ")
    .toLowerCase();
}

/**
 * Her whole programme, searchable as she types (D-104): every word must appear in the title,
 * the summary or the chapter. While the box is empty, the page under it shows as usual.
 */
export function CourseSearch({ items, children }: { items: SearchItem[]; children: ReactNode }) {
  const t = useTranslations("student.progress");
  const tKind = useTranslations("documentKind");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const inputId = useId();
  const resultsId = useId();

  const indexed = useMemo(
    () =>
      items.map((item) => ({
        item,
        haystack: fold(`${item.title} ${item.summary ?? ""} ${item.chapterTitle}`),
      })),
    [items],
  );
  const words = fold(deferred).split(/\s+/).filter(Boolean);
  const results =
    words.length === 0
      ? []
      : indexed
          .filter(({ haystack }) => words.every((word) => haystack.includes(word)))
          .slice(0, 30)
          .map(({ item }) => item);

  return (
    <div className="grid gap-6">
      <div role="search" className="relative">
        <label htmlFor={inputId} className="sr-only">
          {t("searchLabel")}
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-encre-douce"
        />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-controls={resultsId}
          autoComplete="off"
          enterKeyHint="search"
          className="min-h-14 w-full rounded-2xl border border-trait bg-surface ps-12 pe-12 text-base placeholder:text-encre-douce [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t("clearSearch")}
            className="absolute end-1.5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl text-encre-douce hover:bg-sunken"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        ) : null}
      </div>

      {/* Only the count is read aloud, not the page under the box. */}
      <p role="status" className="sr-only">
        {words.length === 0
          ? ""
          : results.length === 0
            ? t("noResults", { query: deferred.trim() })
            : t("results", { count: results.length })}
      </p>
      <div id={resultsId}>
        {words.length === 0 ? (
          children
        ) : results.length === 0 ? (
          <p
            aria-hidden="true"
            className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-6 text-center text-encre-douce"
          >
            {t("noResults", { query: deferred.trim() })}
          </p>
        ) : (
          <div className="grid gap-3">
            <p aria-hidden="true" className="text-sm text-encre-douce">
              {t("results", { count: results.length })}
            </p>
            <ul role="list" className="grid gap-2">
              {results.map((item) => {
                const hue = kindHue(item.kind);
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/eleve/cours/${item.slug}`}
                      className={cn(
                        "grid gap-0.5 rounded-2xl border border-s-4 border-quadrillage bg-surface px-4 py-3 hover:border-trait",
                        hue.edge,
                      )}
                    >
                      <span className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={cn("font-semibold tracking-wide uppercase", hue.text)}>
                          {tKind(`one.${item.kind}`)}
                        </span>
                        <span className="text-encre-douce">{item.chapterTitle}</span>
                        {item.understood ? (
                          <span className="text-encre-douce">· {t("understoodShort")}</span>
                        ) : null}
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { CornerDownLeft, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PaletteItem = {
  href: string;
  label: string;
  /** A second line: a student's level, a page's section. */
  detail?: string;
  group: string;
  /** Extra words that find it: « paiement » finds « Enregistrer un paiement ». */
  keywords?: string;
  /** Shown before she types: the actions and pages, not the whole class. */
  suggested?: boolean;
};

function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, " ")
    .toLowerCase();
}

const LIMIT = 40;

/**
 * Go anywhere from anywhere (D-104): Ctrl K (⌘ K on a Mac) or the search button opens a box
 * that finds a student, a group, a page or an action as she types, and the keyboard alone takes
 * her there. The ARIA combobox pattern with a grouped listbox; on a phone it fills the screen.
 */
export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const t = useTranslations("tutor.search");
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [mac, setMac] = useState(false);
  const listId = useId();
  const hintId = useId();
  const optionId = (index: number) => `${listId}-o${index}`;

  useEffect(() => {
    // Read after hydration, so the server's render and the first one in the browser agree.
    const id = window.setTimeout(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), 0);
    return () => window.clearTimeout(id);
  }, []);

  const indexed = useMemo(
    () =>
      items.map((item) => ({
        item,
        text: fold(`${item.label} ${item.detail ?? ""} ${item.keywords ?? ""}`),
      })),
    [items],
  );
  const words = fold(query).split(/\s+/).filter(Boolean);
  const results = (
    words.length === 0
      ? indexed.filter(({ item }) => item.suggested)
      : indexed.filter(({ text }) => words.every((word) => text.includes(word)))
  )
    .slice(0, LIMIT)
    .map(({ item }) => item);
  const current = Math.min(active, Math.max(results.length - 1, 0));
  const groups = results.reduce<{ name: string; items: { item: PaletteItem; index: number }[] }[]>(
    (all, item, index) => {
      const last = all.at(-1);
      if (last?.name === item.group) last.items.push({ item, index });
      else all.push({ name: item.group, items: [{ item, index }] });
      return all;
    },
    [],
  );

  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    dialog.current?.showModal();
    input.current?.focus();
  }, []);
  const close = () => dialog.current?.close();
  const go = (item: PaletteItem | undefined) => {
    if (!item) return;
    close();
    router.push(item.href);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // ⌘ K on a Mac, where Ctrl K deletes to the end of the line; Ctrl K elsewhere.
      const modifier = mac ? event.metaKey : event.ctrlKey;
      if (modifier && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mac]);

  useEffect(() => {
    document.getElementById(`${listId}-o${current}`)?.scrollIntoView({ block: "nearest" });
  }, [current, listId]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current - 1 + results.length) % results.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[current]);
    }
  };

  const shortcut = mac ? "⌘ K" : "Ctrl K";

  return (
    <>
      <button
        ref={opener}
        type="button"
        onClick={open}
        aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
        className="flex min-h-11 items-center gap-2 rounded-xl border border-quadrillage bg-papier px-3 text-sm text-encre-douce hover:border-trait hover:text-encre md:min-w-64"
      >
        <Search aria-hidden="true" className="size-4 shrink-0" />
        <span className="sr-only md:not-sr-only">{t("open")}</span>
        <kbd className="ms-auto hidden rounded border border-quadrillage bg-surface px-1.5 font-sans text-xs md:inline">
          {shortcut}
        </kbd>
      </button>
      <dialog
        ref={dialog}
        aria-label={t("open")}
        onClose={() => opener.current?.focus()}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-surface p-0 text-encre backdrop:bg-encre-fixe/40 md:mx-auto md:mt-[10dvh] md:h-auto md:max-h-[80dvh] md:w-[min(40rem,calc(100vw-2rem))] md:rounded-2xl md:border md:border-quadrillage md:shadow-2xl"
      >
        <div className="flex h-full flex-col md:h-auto md:max-h-[80dvh]">
          <div className="m-2 flex items-center gap-2 rounded-xl border border-transparent px-2 focus-within:border-encre focus-within:ring-2 focus-within:ring-surligneur">
            <Search aria-hidden="true" className="size-5 shrink-0 text-encre-douce" />
            <input
              ref={input}
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={results.length > 0 ? optionId(current) : undefined}
              aria-autocomplete="list"
              aria-describedby={hintId}
              aria-label={t("placeholder")}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t("placeholder")}
              autoComplete="off"
              enterKeyHint="go"
              className="min-h-12 flex-1 bg-transparent text-base focus:outline-none"
            />
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="flex size-11 items-center justify-center rounded-xl text-encre-douce hover:bg-sunken"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <p role="status" className="sr-only">
            {results.length === 0 ? t("empty") : t("results", { count: results.length })}
          </p>
          <div
            id={listId}
            role="listbox"
            aria-label={t("resultsLabel")}
            className="min-h-0 flex-1 overflow-y-auto border-t border-quadrillage p-2"
          >
            {results.length === 0 ? (
              <p aria-hidden="true" className="px-3 py-6 text-center text-sm text-encre-douce">
                {t("empty")}
              </p>
            ) : (
              groups.map((group) => {
                const headingId = `${listId}-g${group.items[0]?.index ?? 0}`;
                return (
                  <div key={headingId} role="group" aria-labelledby={headingId}>
                    <p
                      id={headingId}
                      className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-encre-douce uppercase"
                    >
                      {group.name}
                    </p>
                    {group.items.map(({ item, index }) => (
                      <div
                        key={`${item.href}-${item.label}`}
                        id={optionId(index)}
                        role="option"
                        aria-selected={index === current}
                        onMouseMove={() => setActive(index)}
                        onClick={() => go(item)}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2",
                          index === current ? "bg-bleu-fond text-bleu-texte" : "hover:bg-sunken",
                        )}
                      >
                        <span className="grid min-w-0 flex-1">
                          <span className="truncate font-medium">{item.label}</span>
                          {item.detail ? (
                            <span className="truncate text-xs text-encre-douce">{item.detail}</span>
                          ) : null}
                        </span>
                        {index === current ? (
                          <CornerDownLeft
                            aria-hidden="true"
                            className="size-4 shrink-0 rtl:-scale-x-100"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
          <p
            id={hintId}
            className="hidden border-t border-quadrillage px-4 py-2 text-xs text-encre-douce md:block"
          >
            {t("hint")}
          </p>
        </div>
      </dialog>
    </>
  );
}

"use client";

import { CornerDownLeft, Search, X } from "lucide-react";
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
};

export type PaletteLabels = {
  open: string;
  placeholder: string;
  close: string;
  empty: string;
  hint: string;
};

function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, " ")
    .toLowerCase();
}

/**
 * Go anywhere from anywhere (D-104): Ctrl K (⌘ K on a Mac) or the search button opens a box
 * that finds a student, a page or an action as she types, and the keyboard alone takes her
 * there. Built on the native dialog, so focus is trapped and Échap closes it.
 */
export function CommandPalette({ items, labels }: { items: PaletteItem[]; labels: PaletteLabels }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();
  const optionId = (index: number) => `${listId}-${index}`;

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
      ? indexed
      : indexed.filter(({ text }) => words.every((word) => text.includes(word)))
  )
    .slice(0, 40)
    .map(({ item }) => item);
  const current = Math.min(active, Math.max(results.length - 1, 0));

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
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.getElementById(optionId(current))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[current]);
    }
  };

  let lastGroup = "";
  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex min-h-11 items-center gap-2 rounded-xl border border-quadrillage bg-papier px-3 text-sm text-encre-douce hover:border-trait hover:text-encre md:min-w-64"
      >
        <Search aria-hidden="true" className="size-4 shrink-0" />
        <span className="sr-only md:not-sr-only">{labels.open}</span>
        <kbd className="ms-auto hidden rounded border border-quadrillage bg-surface px-1.5 font-sans text-xs md:inline">
          Ctrl K
        </kbd>
      </button>
      <dialog
        ref={dialog}
        aria-label={labels.open}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        className="m-0 mx-auto mt-[10vh] w-[min(40rem,calc(100vw-2rem))] max-w-none rounded-2xl border border-quadrillage bg-surface p-0 text-encre shadow-2xl backdrop:bg-encre-fixe/40"
      >
        <div className="flex items-center gap-2 border-b border-quadrillage px-3">
          <Search aria-hidden="true" className="size-5 shrink-0 text-encre-douce" />
          <input
            ref={input}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results.length > 0 ? optionId(current) : undefined}
            aria-autocomplete="list"
            aria-label={labels.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={labels.placeholder}
            autoComplete="off"
            className="min-h-14 flex-1 bg-transparent text-base outline-none placeholder:text-encre-douce"
          />
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="flex size-11 items-center justify-center rounded-xl text-encre-douce hover:bg-sunken"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <ul
          id={listId}
          role="listbox"
          aria-label={labels.open}
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <li role="presentation" className="px-3 py-6 text-center text-sm text-encre-douce">
              {labels.empty}
            </li>
          ) : (
            results.map((item, index) => {
              const heading = item.group !== lastGroup ? item.group : null;
              lastGroup = item.group;
              return (
                <li key={`${item.group}-${item.href}-${item.label}`} role="presentation">
                  {heading ? (
                    <p
                      role="presentation"
                      className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-encre-douce uppercase"
                    >
                      {heading}
                    </p>
                  ) : null}
                  <div
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
                      <CornerDownLeft aria-hidden="true" className="size-4 shrink-0" />
                    ) : null}
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <p className="border-t border-quadrillage px-4 py-2 text-xs text-encre-douce">
          {labels.hint}
        </p>
      </dialog>
    </>
  );
}

"use client";

import { CircleAlert, FileDown, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type MouseEvent } from "react";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { pdfHref } from "@/lib/pdf/links";

type Props = {
  id: string;
  version: string;
  kind: DocumentKind;
  /** Read after the link by a screen reader, where several documents' links sit together. */
  title?: string;
  className?: string;
};

type Status =
  { state: "idle" } | { state: "busy"; href: string } | { state: "error"; message: string };

/**
 * A document's PDF (D-096): a course or a summary whole, a series or a test as its statements
 * alone or with its corrections. A PDF is printed on demand, which takes a moment: the link
 * says so while it waits, and says what went wrong rather than leaving it to the browser's
 * download list. Without script, or with a modifier key, it is a plain download link. Never a
 * <Link>: a prefetch would print it for nobody.
 */
export function PdfLinks({ id, version, kind, title, className }: Props) {
  const t = useTranslations("pdf");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const links =
    kind === "serie" || kind === "devoir"
      ? [
          { href: pdfHref(id, version), label: t("downloadStatements") },
          { href: pdfHref(id, version, true), label: t("downloadWithSolutions") },
        ]
      : [{ href: pdfHref(id, version), label: t("download") }];

  async function download(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    // One at a time: a second tap would only print it twice.
    if (status.state === "busy") return;
    setStatus({ state: "busy", href });
    try {
      const response = await fetch(href);
      if (!response.ok) {
        setStatus({
          state: "error",
          message:
            response.status === 429
              ? t("tooMany")
              : response.status === 503
                ? t("busy")
                : t("failed"),
        });
        return;
      }
      const blob = await response.blob();
      const name =
        /filename="([^"]+)"/.exec(response.headers.get("content-disposition") ?? "")?.[1] ??
        "document.pdf";
      const url = URL.createObjectURL(blob);
      const save = document.createElement("a");
      save.href = url;
      save.download = name;
      document.body.append(save);
      save.click();
      save.remove();
      // Some browsers read the file after the click returns.
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setStatus({ state: "idle" });
    } catch {
      setStatus({ state: "error", message: t("failed") });
    }
  }

  return (
    <div className={`grid gap-1 print:hidden ${className ?? ""}`}>
      <ul role="list" className="flex flex-wrap gap-x-5">
        {links.map((link) => {
          const busy = status.state === "busy" && status.href === link.href;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                download
                onClick={(event) => void download(event, link.href)}
                aria-busy={busy || undefined}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
              >
                {busy ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 shrink-0 animate-spin motion-reduce:animate-none"
                  />
                ) : (
                  <FileDown aria-hidden="true" className="size-4 shrink-0" />
                )}
                {link.label}
                {title ? <span className="sr-only">, {title}</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
      {/* Always in the page, so a screen reader hears what is put in it. */}
      <p aria-live="polite" className="text-sm">
        {status.state === "busy" ? (
          <span className="text-encre-douce">{t("preparing")}</span>
        ) : status.state === "error" ? (
          <span className="flex items-start gap-1.5 text-stylo-rouge">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {status.message}
          </span>
        ) : null}
      </p>
    </div>
  );
}

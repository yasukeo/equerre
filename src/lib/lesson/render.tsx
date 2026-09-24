// Renders a lesson on the server. Nothing here touches a DOM, so a lesson page can
// be prerendered and the editor never reaches a reader's phone.

import { renderJSONContentToReactElement } from "@tiptap/static-renderer/json/react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "./document";
import { renderMath } from "./math";

type Attrs = Record<string, unknown> | undefined;

export type LessonRenderOptions = {
  /** "Définition", "Théorème"… so the renderer stays free of the message catalogue. */
  calloutLabel: (kind: CalloutKind) => string;
  /** Where an attachment points, so the renderer stays free of the routing table. */
  fileHref: (path: string) => string;
};

function stringAttr(attrs: Attrs, name: string): string {
  const value = attrs?.[name];
  return typeof value === "string" ? value : "";
}

function numberAttr(attrs: Attrs, name: string): number | undefined {
  const value = attrs?.[name];
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

function calloutKind(attrs: Attrs): CalloutKind {
  const kind = attrs?.kind;
  return typeof kind === "string" && (CALLOUT_KINDS as readonly string[]).includes(kind)
    ? (kind as CalloutKind)
    : "definition";
}

function readableSize(attrs: Attrs): string | null {
  const bytes = numberAttr(attrs, "size");
  if (bytes === undefined) return null;
  const show = (value: number, digits: number) =>
    new Intl.NumberFormat(siteConfig.defaultLocale, { maximumFractionDigits: digits }).format(
      value,
    );
  const megabytes = bytes / 1_048_576;
  return megabytes >= 1 ? `${show(megabytes, 1)} Mo` : `${show(bytes / 1024, 0)} Ko`;
}

export function createLessonRenderer({ calloutLabel, fileHref }: LessonRenderOptions) {
  return renderJSONContentToReactElement({
    nodeMapping: {
      doc: ({ children }) => <>{children}</>,
      paragraph: ({ children }) => <p>{children}</p>,
      hardBreak: () => <br />,
      // The lesson title is the page's h1, so the body starts at h2.
      heading: ({ node, children }) =>
        numberAttr(node.attrs, "level") === 3 ? <h3>{children}</h3> : <h2>{children}</h2>,
      text: ({ node }) => (typeof node.text === "string" ? node.text : null),
      bulletList: ({ children }) => <ul>{children}</ul>,
      orderedList: ({ node, children }) => {
        const start = node.attrs?.start;
        const from = typeof start === "number" && Number.isInteger(start) && start !== 1;
        return <ol start={from ? start : undefined}>{children}</ol>;
      },
      listItem: ({ children }) => <li>{children}</li>,
      inlineMath: ({ node }) => (
        <span
          className="lecon-math"
          dangerouslySetInnerHTML={{ __html: renderMath(stringAttr(node.attrs, "latex"), false) }}
        />
      ),
      blockMath: ({ node }) => (
        <div
          className="lecon-math lecon-math-bloc"
          dangerouslySetInnerHTML={{ __html: renderMath(stringAttr(node.attrs, "latex"), true) }}
        />
      ),
      callout: ({ node, children }) => {
        const kind = calloutKind(node.attrs);
        return (
          <aside className="lecon-encadre" data-kind={kind}>
            <p className="lecon-encadre-titre">{calloutLabel(kind)}</p>
            {children}
          </aside>
        );
      },
      image: ({ node }) => (
        // A lesson image is already the right size in a public bucket, and a signed
        // URL would defeat the optimizer's cache, so it is served as it is stored.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stringAttr(node.attrs, "src")}
          alt={stringAttr(node.attrs, "alt")}
          width={numberAttr(node.attrs, "width")}
          height={numberAttr(node.attrs, "height")}
          loading="lazy"
          decoding="async"
        />
      ),
      fileAttachment: ({ node }) => {
        const name = stringAttr(node.attrs, "name");
        const size = readableSize(node.attrs);
        return (
          <p className="lecon-fichier">
            <a href={fileHref(stringAttr(node.attrs, "path"))}>{name || "Document"}</a>
            {size === null ? null : <span className="lecon-fichier-taille">{size}</span>}
          </p>
        );
      },
    },
    markMapping: {
      bold: ({ children }) => <strong>{children}</strong>,
      italic: ({ children }) => <em>{children}</em>,
    },
    // A node the editor can produce but this renderer does not know must not blank
    // the lesson, nor take the tutor's words with it: it is unwrapped, and whatever it
    // holds is drawn through the same mapping. A leaf with nothing inside disappears.
    unhandledNode: ({ children }) => <>{children}</>,
    unhandledMark: ({ children }) => <>{children}</>,
  });
}

export function renderLesson(content: StoredLesson, options: LessonRenderOptions): ReactNode {
  return createLessonRenderer(options)({ content });
}

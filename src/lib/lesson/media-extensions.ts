// Images and attached documents of the lesson vocabulary (DECISIONS.md, D-040, D-053), as
// editor nodes. Kept free of React so the tests can build the editor's schema in Node.
//
// Every attribute is read back from HTML explicitly. ProseMirror's clipboard goes through
// HTML, even from one place in the editor to another, and Tiptap's default reading turns an
// attribute that looks like a number into one: an alt text of « 3 » would come back as 3,
// a width of « 640.5 » as a fraction, and saving would refuse the lesson.

import { mergeAttributes, Node } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { isLessonFileName, isLessonImageUrl } from "@/lib/storage-paths";
import { formatFileSize } from "./file-size";

function positiveInteger(value: string | null): number | null {
  if (value === null || !/^\d+$/.test(value)) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

export const LessonImage = Image.extend({
  addAttributes() {
    // No title: the vocabulary has none, and the page would not show it.
    return {
      src: { default: null, parseHTML: (element) => element.getAttribute("src") },
      alt: { default: null, parseHTML: (element) => element.getAttribute("alt") },
      width: {
        default: null,
        parseHTML: (element) => positiveInteger(element.getAttribute("width")),
      },
      height: {
        default: null,
        parseHTML: (element) => positiveInteger(element.getAttribute("height")),
      },
    };
  },

  parseHTML() {
    // Only images already in the lesson library. One pasted from a website is dropped: every
    // reader's browser would fetch it from that site, and saving would refuse it anyway.
    return [
      {
        tag: "img[src]",
        getAttrs: (element) => (isLessonImageUrl(element.getAttribute("src") ?? "") ? null : false),
      },
    ];
  },

  // Markdown's ![texte](adresse) would bring in an image from anywhere.
  addInputRules() {
    return [];
  },
}).configure({ inline: false, allowBase64: false });

/** A PDF stored in the private lesson-files bucket, drawn as its name and size. */
export const FileAttachment = Node.create({
  name: "fileAttachment",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      path: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-path"),
        renderHTML: (attributes) => ({ "data-path": attributes.path }),
      },
      name: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-name") ?? "",
        renderHTML: (attributes) => ({ "data-name": attributes.name }),
      },
      size: {
        default: null,
        parseHTML: (element) => positiveInteger(element.getAttribute("data-size")),
        renderHTML: (attributes) =>
          typeof attributes.size === "number" ? { "data-size": String(attributes.size) } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-file-attachment]",
        getAttrs: (element) =>
          isLessonFileName(element.getAttribute("data-path") ?? "") ? null : false,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const name = typeof node.attrs.name === "string" ? node.attrs.name : "";
    const size = typeof node.attrs.size === "number" ? formatFileSize(node.attrs.size) : "";
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-file-attachment": "", class: "lecon-fichier" }),
      ["span", { class: "lecon-fichier-nom" }, name || "Document"],
      ["span", { class: "lecon-fichier-taille" }, size],
    ];
  },
});

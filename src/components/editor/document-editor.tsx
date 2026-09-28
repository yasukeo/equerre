"use client";

import { NodeSelection } from "@tiptap/pm/state";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Paperclip,
  Pilcrow,
  Redo2,
  Sigma,
  SquareSigma,
  Undo2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "@/lib/lesson/document";
import { lessonExtensions } from "@/lib/lesson/editor-schema";
import { blockInsertionRange } from "@/lib/lesson/insert-block";
import { FileDialog, type FileTarget, type InsertedFile } from "./file-dialog";
import { ImageDialog, type ImageTarget, type InsertedImage } from "./image-dialog";
import { MathDialog, type MathTarget } from "./math-dialog";
import "./editeur.css";

// One rich-text field in the lesson vocabulary (DECISIONS.md, D-040): a lesson's body, an
// exercise's statement or its worked solution. The page it sits on owns saving; this owns
// the editor, its toolbar and its dialogs, and reports the document as it will be saved.

type MediaType = "image" | "fileAttachment";

function stringAttr(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * The editor's document as it is saved. StarterKit's trailing node adds an empty paragraph
 * after a document ending with an encadré, on the first transaction of any kind, including a
 * click: it is there to type into, so it is neither saved nor counted as a change.
 */
function serialize(editor: Editor): string {
  const json = editor.getJSON();
  const blocks = json.content ?? [];
  const last = blocks.at(-1);
  const trailing = blocks.length > 1 && last?.type === "paragraph" && !last.content?.length;
  return JSON.stringify(trailing ? { ...json, content: blocks.slice(0, -1) } : json);
}

// The editor needs a block to put the cursor in.
const EMPTY_BODY: StoredLesson = { type: "doc", content: [{ type: "paragraph" }] };

export type DocumentEditorProps = {
  /** The id of the visible label that names this field. */
  labelledBy: string;
  /** The same name, for the toolbar: two editors on one page need two toolbars told apart. */
  label: string;
  initialContent: StoredLesson;
  /** The lesson or exercise whose storage folder receives the images. */
  folderId: string;
  /** Attached PDFs, for lessons only (D-044). */
  attachments: boolean;
  /** Images, for lessons and exercises; the blog's posts have none in v1 (D-089). */
  images?: boolean;
  calloutLabels: Record<CalloutKind, string>;
  /**
   * Called once, with the document as the editor first writes it. The stored JSON comes back
   * from jsonb with its keys reordered, so only this can serve as the « saved » baseline.
   */
  onReady: (serialized: string) => void;
  onChange: (serialized: string) => void;
  size?: "page" | "field";
};

export function DocumentEditor({
  labelledBy,
  label,
  initialContent,
  folderId,
  attachments,
  images = true,
  calloutLabels,
  onReady,
  onChange,
  size = "page",
}: DocumentEditorProps) {
  const initialBody = initialContent.content?.length ? initialContent : EMPTY_BODY;

  // What the tutor has written so far, kept here so it survives the editor being rebuilt.
  const [latest, setLatest] = useState<string | null>(null);
  const [math, setMath] = useState<MathTarget | null>(null);
  const [image, setImage] = useState<ImageTarget | null>(null);
  const [file, setFile] = useState<FileTarget | null>(null);

  const extensions = useMemo(
    () =>
      lessonExtensions({
        calloutLabels,
        attachments,
        onMathClick: (kind, node, pos) => {
          setMath({
            display: kind === "block",
            latex: typeof node.attrs.latex === "string" ? node.attrs.latex : "",
            pos,
          });
        },
      }),
    [calloutLabels, attachments],
  );

  const editor = useEditor({
    extensions,
    content: initialBody,
    // Rendered on the client only: the server has no editor to hydrate.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `lecon-corps editeur-page${size === "field" ? " editeur-page-champ" : ""}`,
        "aria-labelledby": labelledBy,
        "aria-multiline": "true",
        role: "textbox",
      },
      // A double click on an image or a document opens it, as a click on a formula does.
      handleDoubleClickOn: (_view, _pos, node, nodePos, _event, direct) => {
        if (!direct) return false;
        if (node.type.name === "image") {
          setImage({
            pos: nodePos,
            src: stringAttr(node.attrs.src),
            alt: stringAttr(node.attrs.alt),
          });
          return true;
        }
        if (node.type.name === "fileAttachment") {
          setFile({ pos: nodePos, name: stringAttr(node.attrs.name) });
          return true;
        }
        return false;
      },
    },
    onCreate: ({ editor: created }) => {
      if (latest === null) {
        const written = serialize(created);
        setLatest(written);
        onReady(written);
      } else if (serialize(created) !== latest) {
        // With Cache Components, Next keeps a page it navigates away from hidden rather than
        // unmounting it; Tiptap destroys its editor then and rebuilds it from the stored
        // document when the page shows again. What the tutor had typed is put back.
        created.commands.setContent(JSON.parse(latest) as StoredLesson, { emitUpdate: false });
      }
    },
    onUpdate: ({ editor: current }) => {
      const written = serialize(current);
      setLatest(written);
      onChange(written);
    },
  });

  const submitMath = (latex: string) => {
    if (!editor || !math) return;
    const chain = editor.chain().focus();
    if (math.pos === null) {
      (math.display ? chain.insertBlockMath({ latex }) : chain.insertInlineMath({ latex })).run();
    } else if (math.display) {
      chain.updateBlockMath({ latex, pos: math.pos }).run();
    } else {
      chain.updateInlineMath({ latex, pos: math.pos }).run();
    }
    setMath(null);
  };

  const removeMath = () => {
    if (!editor || !math || math.pos === null) return;
    const chain = editor.chain().focus();
    (math.display
      ? chain.deleteBlockMath({ pos: math.pos })
      : chain.deleteInlineMath({ pos: math.pos })
    ).run();
    setMath(null);
  };

  /** The image or document the tutor has selected, if that is what she has selected. */
  const selected = (type: MediaType) => {
    const selection = editor?.state.selection;
    return selection instanceof NodeSelection && selection.node.type.name === type
      ? { node: selection.node, pos: selection.from }
      : null;
  };

  const insertMedia = (type: MediaType, attrs: InsertedImage | InsertedFile) => {
    if (!editor) return;
    const nodeType = editor.schema.nodes[type];
    const range = nodeType ? blockInsertionRange(editor.state, nodeType) : null;
    const chain = editor.chain().focus();
    (range
      ? chain.insertContentAt(range, { type, attrs })
      : chain.insertContent({ type, attrs })
    ).run();
  };

  /** Changes or removes the node at `pos`, provided it is still the one the dialog opened. */
  const changeMedia = (type: MediaType, pos: number, attrs: Record<string, unknown> | null) => {
    editor
      ?.chain()
      .focus()
      .command(({ tr }) => {
        const node = tr.doc.nodeAt(pos);
        if (node?.type.name !== type) return false;
        if (attrs === null) tr.delete(pos, pos + node.nodeSize);
        else tr.setNodeMarkup(pos, undefined, { ...node.attrs, ...attrs });
        return true;
      })
      .run();
  };

  const openImage = () => {
    const current = selected("image");
    setImage(
      current
        ? {
            pos: current.pos,
            src: stringAttr(current.node.attrs.src),
            alt: stringAttr(current.node.attrs.alt),
          }
        : { pos: null, src: "", alt: "" },
    );
  };

  const openFile = () => {
    const current = selected("fileAttachment");
    setFile(
      current
        ? { pos: current.pos, name: stringAttr(current.node.attrs.name) }
        : { pos: null, name: "" },
    );
  };

  return (
    <>
      <div className="editeur">
        <Toolbar
          editor={editor}
          label={label}
          calloutLabels={calloutLabels}
          onMath={(display) => setMath({ display, latex: "", pos: null })}
          onImage={images ? openImage : null}
          onFile={attachments ? openFile : null}
        />
        <EditorContent editor={editor} />
      </div>

      {/* The page's form holds this editor, and each dialog is a form of its own. A form may
          not contain another, so the dialogs live under <body>; being opened only by a click,
          they never render on the server. */}
      {math || image || file
        ? createPortal(
            <>
              {math ? (
                <MathDialog
                  target={math}
                  onSubmit={submitMath}
                  onRemove={removeMath}
                  onClose={() => setMath(null)}
                />
              ) : null}
              {image && images ? (
                <ImageDialog
                  folderId={folderId}
                  target={image}
                  onInsert={(inserted) => {
                    insertMedia("image", inserted);
                    setImage(null);
                  }}
                  onUpdate={(alt) => {
                    if (image.pos !== null) changeMedia("image", image.pos, { alt });
                    setImage(null);
                  }}
                  onRemove={() => {
                    if (image.pos !== null) changeMedia("image", image.pos, null);
                    setImage(null);
                  }}
                  onClose={() => setImage(null)}
                />
              ) : null}
              {file && attachments ? (
                <FileDialog
                  lessonId={folderId}
                  target={file}
                  onInsert={(inserted) => {
                    insertMedia("fileAttachment", inserted);
                    setFile(null);
                  }}
                  onUpdate={(name) => {
                    if (file.pos !== null) changeMedia("fileAttachment", file.pos, { name });
                    setFile(null);
                  }}
                  onRemove={() => {
                    if (file.pos !== null) changeMedia("fileAttachment", file.pos, null);
                    setFile(null);
                  }}
                  onClose={() => setFile(null)}
                />
              ) : null}
            </>,
            document.body,
          )
        : null}
    </>
  );
}

function readToolbarState(editor: Editor) {
  return {
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    paragraph: editor.isActive("paragraph") && !editor.isActive("callout"),
    h2: editor.isActive("heading", { level: 2 }),
    h3: editor.isActive("heading", { level: 3 }),
    bulletList: editor.isActive("bulletList"),
    orderedList: editor.isActive("orderedList"),
    inList: editor.isActive("bulletList") || editor.isActive("orderedList"),
    callout: editor.isActive("callout")
      ? (editor.getAttributes("callout").kind as CalloutKind)
      : "",
    image: editor.isActive("image"),
    file: editor.isActive("fileAttachment"),
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  };
}

function Toolbar({
  editor,
  label,
  calloutLabels,
  onMath,
  onImage,
  onFile,
}: {
  editor: Editor | null;
  label: string;
  calloutLabels: Record<CalloutKind, string>;
  onMath: (display: boolean) => void;
  onImage: (() => void) | null;
  onFile: (() => void) | null;
}) {
  const t = useTranslations("editor.toolbar");

  // useEditorState keeps the snapshot it took while the editor was still null until the
  // first transaction, which left the toolbar empty until the tutor typed. Until it has one
  // of its own, the toolbar reads the editor directly.
  const tracked = useEditorState({
    editor,
    selector: ({ editor: current }) => (current ? readToolbarState(current) : null),
  });

  if (!editor) {
    return <div className="editeur-barre" aria-hidden="true" />;
  }
  const active = tracked ?? readToolbarState(editor);
  const headingsBlocked = active.callout !== "" || active.inList;

  const run =
    (command: (chain: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => () =>
      command(editor.chain().focus()).run();

  const tool = (
    name: string,
    icon: ReactNode,
    onClick: () => void,
    pressed?: boolean,
    disabled?: boolean,
  ) => (
    <button
      type="button"
      className="editeur-bouton"
      aria-label={name}
      title={name}
      aria-pressed={pressed}
      disabled={disabled}
      // Keep the selection in the text while the button is pressed.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {icon}
    </button>
  );

  const icon = { "aria-hidden": true, className: "size-4" } as const;

  return (
    <div role="toolbar" aria-label={t("label", { field: label })} className="editeur-barre">
      {tool(
        t("paragraph"),
        <Pilcrow {...icon} />,
        run((c) => c.setParagraph()),
        active.paragraph,
      )}
      {tool(
        t("heading2"),
        <Heading2 {...icon} />,
        run((c) => c.toggleHeading({ level: 2 })),
        active.h2,
        headingsBlocked,
      )}
      {tool(
        t("heading3"),
        <Heading3 {...icon} />,
        run((c) => c.toggleHeading({ level: 3 })),
        active.h3,
        headingsBlocked,
      )}
      <span className="editeur-separateur" aria-hidden="true" />
      {tool(
        t("bold"),
        <Bold {...icon} />,
        run((c) => c.toggleBold()),
        active.bold,
      )}
      {tool(
        t("italic"),
        <Italic {...icon} />,
        run((c) => c.toggleItalic()),
        active.italic,
      )}
      <span className="editeur-separateur" aria-hidden="true" />
      {tool(
        t("bulletList"),
        <List {...icon} />,
        run((c) => c.toggleBulletList()),
        active.bulletList,
      )}
      {tool(
        t("orderedList"),
        <ListOrdered {...icon} />,
        run((c) => c.toggleOrderedList()),
        active.orderedList,
      )}
      <span className="editeur-separateur" aria-hidden="true" />
      {tool(t("inlineMath"), <Sigma {...icon} />, () => onMath(false))}
      {tool(t("blockMath"), <SquareSigma {...icon} />, () => onMath(true))}
      <span className="editeur-separateur" aria-hidden="true" />
      {/* While one is selected, the same button edits it rather than adding another. */}
      {onImage
        ? tool(active.image ? t("imageEdit") : t("image"), <ImagePlus {...icon} />, onImage)
        : null}
      {onFile
        ? tool(active.file ? t("fileEdit") : t("file"), <Paperclip {...icon} />, onFile)
        : null}
      <span className="editeur-separateur" aria-hidden="true" />
      <select
        aria-label={t("callout")}
        className="editeur-choix"
        value={active.callout}
        onChange={(event) => {
          const kind = event.target.value;
          const chain = editor.chain().focus();
          if (kind === "") chain.unsetCallout().run();
          else if (active.callout) chain.setCalloutKind(kind as CalloutKind).run();
          else chain.setCallout(kind as CalloutKind).run();
        }}
      >
        <option value="">{t("calloutNone")}</option>
        {CALLOUT_KINDS.map((kind) => (
          <option key={kind} value={kind}>
            {calloutLabels[kind]}
          </option>
        ))}
      </select>
      <span className="editeur-separateur" aria-hidden="true" />
      {tool(
        t("undo"),
        <Undo2 {...icon} />,
        run((c) => c.undo()),
        undefined,
        !active.canUndo,
      )}
      {tool(
        t("redo"),
        <Redo2 {...icon} />,
        run((c) => c.redo()),
        undefined,
        !active.canRedo,
      )}
    </div>
  );
}

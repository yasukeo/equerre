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
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  PublicationChip,
  type LessonVisibility,
  type PublicationStatus,
} from "@/components/lesson-status";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "@/lib/lesson/document";
import { lessonExtensions } from "@/lib/lesson/editor-schema";
import { blockInsertionRange } from "@/lib/lesson/insert-block";
import { saveLesson } from "../actions";
import { FileDialog, type FileTarget, type InsertedFile } from "./file-dialog";
import { ImageDialog, type ImageTarget, type InsertedImage } from "./image-dialog";
import { MathDialog, type MathTarget } from "./math-dialog";

type MediaType = "image" | "fileAttachment";

function stringAttr(value: unknown): string {
  return typeof value === "string" ? value : "";
}

const VISIBILITIES: LessonVisibility[] = ["enrolled", "specific", "public"];

function snapshotOf(title: string, summary: string, visibility: string, content: string) {
  return [title, summary, visibility, content].join("\u0000");
}

/**
 * The editor's document as it is saved. StarterKit's trailing node adds an empty paragraph
 * after a lesson ending with an encadré, on the first transaction of any kind, including a
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

type Props = {
  calloutLabels: Record<CalloutKind, string>;
  lesson: {
    id: string;
    title: string;
    summary: string;
    status: PublicationStatus;
    visibility: LessonVisibility;
    content: StoredLesson;
    context: string;
    publicPath: string;
  };
};

export function LessonEditor({ calloutLabels, lesson }: Props) {
  const t = useTranslations("tutor.lessonEditor");
  const tLessons = useTranslations("tutor.lessons");

  const initialBody = lesson.content.content?.length ? lesson.content : EMPTY_BODY;

  // Controlled on purpose: React resets uncontrolled fields after a form action, which
  // would put the old title back on screen right after it was saved.
  const [title, setTitle] = useState(lesson.title);
  const [summary, setSummary] = useState(lesson.summary);
  const [visibility, setVisibility] = useState(lesson.visibility);
  const [status, setStatus] = useState(lesson.status);
  const [content, setContent] = useState(() => JSON.stringify(initialBody));
  const [math, setMath] = useState<MathTarget | null>(null);
  const [image, setImage] = useState<ImageTarget | null>(null);
  const [file, setFile] = useState<FileTarget | null>(null);

  const snapshot = snapshotOf(title, summary, visibility, content);
  // The lesson as last saved, in the editor's own form. Null until the editor exists:
  // the stored JSON comes back from jsonb with its keys reordered, so it never compares
  // equal to what the editor writes and every lesson would open as « unsaved ».
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);
  const submittedSnapshot = useRef(snapshot);
  const dirty = savedSnapshot !== null && snapshot !== savedSnapshot;

  const extensions = useMemo(
    () =>
      lessonExtensions({
        calloutLabels,
        onMathClick: (kind, node, pos) => {
          setMath({
            display: kind === "block",
            latex: typeof node.attrs.latex === "string" ? node.attrs.latex : "",
            pos,
          });
        },
      }),
    [calloutLabels],
  );

  const editor = useEditor({
    extensions,
    content: initialBody,
    // Rendered on the client only: the server has no editor to hydrate.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "lecon-corps editeur-page",
        "aria-labelledby": "lesson-body-label",
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
      if (savedSnapshot === null) {
        const written = serialize(created);
        setContent(written);
        setSavedSnapshot(snapshotOf(lesson.title, lesson.summary, lesson.visibility, written));
      } else if (serialize(created) !== content) {
        // With Cache Components, Next keeps a page it navigates away from hidden rather than
        // unmounting it; Tiptap destroys its editor then and rebuilds it from the stored
        // lesson when the page shows again. What the tutor had typed is put back.
        created.commands.setContent(JSON.parse(content) as StoredLesson, { emitUpdate: false });
      }
    },
    onUpdate: ({ editor: current }) => setContent(serialize(current)),
  });

  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData) => {
      const result = await saveLesson(previous, formData);
      if (result.status === "success") {
        setSavedSnapshot(submittedSnapshot.current);
        const intent = formData.get("intent");
        if (intent === "publish") setStatus("published");
        if (intent === "unpublish") setStatus("draft");
      }
      return result;
    },
    initialFormState,
  );

  // Leaving with unsaved changes asks first.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const openMath = (display: boolean) => {
    setMath({ display, latex: "", pos: null });
  };

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
      <form
        onSubmit={(event) => {
          // Dispatched by hand rather than through the form's action prop. React resets a
          // form once its action succeeds, and the reset puts a controlled <select> back on
          // the option it was first rendered with: the next save would then quietly send the
          // old visibility, and a published lesson would drop off the public site.
          event.preventDefault();
          submittedSnapshot.current = snapshot;
          const submitter = (event.nativeEvent as SubmitEvent).submitter;
          const formData = new FormData(event.currentTarget, submitter);
          startTransition(() => formAction(formData));
        }}
        className="grid gap-6"
        noValidate
      >
        <input type="hidden" name="id" value={lesson.id} />
        <input type="hidden" name="content" value={content} />

        <div className="grid gap-2">
          <p className="text-sm text-encre-douce">{lesson.context}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <PublicationChip status={status} label={tLessons(`status.${status}`)} />
            {dirty ? (
              <span className="text-sm text-encre-douce">{t("unsaved")}</span>
            ) : status === "published" && visibility === "public" ? (
              <Link
                href={lesson.publicPath}
                className="text-sm text-stylo-bleu underline underline-offset-2"
              >
                {tLessons("open")}
              </Link>
            ) : null}
          </div>
        </div>

        <Field
          id="lesson-title"
          name="title"
          label={t("fields.title")}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          error={fieldError(state, "title")}
          required
        />
        <TextareaField
          id="lesson-summary"
          name="summary"
          label={t("fields.summary")}
          hint={t("fields.summaryHint")}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          maxLength={300}
          rows={2}
          error={fieldError(state, "summary")}
        />
        <SelectField
          id="lesson-visibility"
          name="visibility"
          label={t("fields.visibility")}
          hint={tLessons(`visibilityHint.${visibility}`)}
          value={visibility}
          onChange={(event) => setVisibility(event.target.value as LessonVisibility)}
        >
          {VISIBILITIES.map((value) => (
            <option key={value} value={value}>
              {tLessons(`visibility.${value}`)}
            </option>
          ))}
        </SelectField>

        <div className="grid gap-1.5">
          <span id="lesson-body-label" className="text-sm font-medium">
            {t("fields.body")}
          </span>
          <div className="editeur">
            <Toolbar
              editor={editor}
              calloutLabels={calloutLabels}
              onMath={openMath}
              onImage={openImage}
              onFile={openFile}
            />
            <EditorContent editor={editor} />
          </div>
          <p className="text-sm text-encre-douce">{t("mathShortcut")}</p>
        </div>

        <FormMessage state={state} />

        <div className="flex flex-wrap gap-2">
          <Button type="submit" name="intent" value="save" size="lg" disabled={pending}>
            {pending ? t("saving") : t("save")}
          </Button>
          {status === "draft" ? (
            <Button
              type="submit"
              name="intent"
              value="publish"
              size="lg"
              variant="outline"
              disabled={pending}
            >
              {t("publish")}
            </Button>
          ) : (
            <Button
              type="submit"
              name="intent"
              value="unpublish"
              size="lg"
              variant="outline"
              disabled={pending}
            >
              {t("unpublish")}
            </Button>
          )}
        </div>
      </form>

      {/* Outside the form above: a form may not contain another. */}
      {math ? (
        <MathDialog
          target={math}
          onSubmit={submitMath}
          onRemove={removeMath}
          onClose={() => setMath(null)}
        />
      ) : null}
      {image ? (
        <ImageDialog
          lessonId={lesson.id}
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
      {file ? (
        <FileDialog
          lessonId={lesson.id}
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
  calloutLabels,
  onMath,
  onImage,
  onFile,
}: {
  editor: Editor | null;
  calloutLabels: Record<CalloutKind, string>;
  onMath: (display: boolean) => void;
  onImage: () => void;
  onFile: () => void;
}) {
  const t = useTranslations("tutor.lessonEditor.toolbar");

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
    label: string,
    icon: ReactNode,
    onClick: () => void,
    pressed?: boolean,
    disabled?: boolean,
  ) => (
    <button
      type="button"
      className="editeur-bouton"
      aria-label={label}
      title={label}
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
    <div role="toolbar" aria-label={t("label")} className="editeur-barre">
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
      {tool(active.image ? t("imageEdit") : t("image"), <ImagePlus {...icon} />, onImage)}
      {tool(active.file ? t("fileEdit") : t("file"), <Paperclip {...icon} />, onFile)}
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

"use client";

import { Lock } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/input";
import { formatLocal } from "@/lib/dates";
import { initialFormState, type FormState } from "@/lib/form-state";
import { MAX_NOTE_LENGTH } from "@/lib/students/limits";
import { addNote, deleteNote, updateNote } from "./actions";

type Note = { id: string; body: string; createdAt: string; updatedAt: string };

function useNoteAction(
  action: (previous: FormState, formData: FormData) => Promise<FormState>,
  failed: string,
  onSuccess?: () => void,
) {
  return useActionState(async (previous: FormState, formData: FormData): Promise<FormState> => {
    try {
      const result = await action(previous, formData);
      if (result.status === "success") onSuccess?.();
      return result;
    } catch (error) {
      unstable_rethrow(error);
      return { status: "error", message: failed };
    }
  }, initialFormState);
}

function send(action: (formData: FormData) => void, fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  startTransition(() => action(formData));
}

const date = (value: string) => formatLocal(value, "d MMMM yyyy 'à' HH:mm");

/** Notes only the tutor reads: `student_notes` has no policy that lets a student near it. */
export function NotesPanel({ studentId, notes }: { studentId: string; notes: Note[] }) {
  const t = useTranslations("tutor.student");
  const [body, setBody] = useState("");
  const [state, action, pending] = useNoteAction(addNote, t("errors.unknown"), () => setBody(""));
  // A note that goes takes focus with it: it is handed to the new-note box.
  const field = useRef<HTMLTextAreaElement>(null);
  const refocus = () => field.current?.focus();

  return (
    <section aria-labelledby="student-notes" className="grid gap-3">
      <div className="grid gap-1">
        <h2 id="student-notes" className="flex items-center gap-2 text-lg font-medium">
          <Lock aria-hidden="true" className="size-4 text-encre-douce" />
          {t("notesHeading")}
        </h2>
        <p className="text-sm text-encre-douce">{t("notesLead")}</p>
      </div>
      <form
        className="grid gap-2"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          send(action, { studentId, body });
        }}
      >
        <Label htmlFor="note-new">{t("newNote")}</Label>
        <Textarea
          ref={field}
          id="note-new"
          rows={3}
          maxLength={MAX_NOTE_LENGTH}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          aria-invalid={state.status === "error" ? true : undefined}
          aria-describedby={state.status === "error" ? "note-new-error" : undefined}
        />
        {state.status === "error" ? (
          <p id="note-new-error" role="alert" className="text-sm text-stylo-rouge">
            {state.message}
          </p>
        ) : null}
        <Button type="submit" size="sm" disabled={pending} className="justify-self-start">
          {pending ? t("adding") : t("addNote")}
        </Button>
      </form>
      {notes.length === 0 ? (
        <p className="text-sm text-encre-douce">{t("noNotes")}</p>
      ) : (
        <ol className="grid gap-2">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onRemoved={refocus} />
          ))}
        </ol>
      )}
    </section>
  );
}

function NoteItem({ note, onRemoved }: { note: Note; onRemoved: () => void }) {
  const t = useTranslations("tutor.student");
  const [mode, setMode] = useState<"read" | "edit" | "confirmDelete">("read");
  const editing = mode === "edit";
  const [body, setBody] = useState(note.body);
  // A newer text from the server replaces what the edit box would open with.
  const [known, setKnown] = useState(note.body);
  if (note.body !== known) {
    setKnown(note.body);
    if (!editing) setBody(note.body);
  }
  const [saved, save, saving] = useNoteAction(updateNote, t("errors.unknown"), () =>
    toggle("read"),
  );
  const [removed, remove, removing] = useNoteAction(deleteNote, t("errors.unknown"), onRemoved);
  const error =
    editing && saved.status === "error" ? saved : removed.status === "error" ? removed : null;

  // Focus follows the buttons that give way to a form and back; reset once used.
  const moved = useRef(false);
  const field = useRef<HTMLTextAreaElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const confirmButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    (mode === "edit"
      ? field.current
      : mode === "confirmDelete"
        ? confirmButton.current
        : editButton.current
    )?.focus();
  }, [mode]);
  function toggle(next: "read" | "edit" | "confirmDelete") {
    moved.current = true;
    setMode(next);
  }

  const written = date(note.createdAt);
  return (
    <li className="grid gap-2 rounded-md border border-quadrillage bg-surface p-3">
      <p className="text-xs text-encre-douce">
        {written}
        {note.updatedAt !== note.createdAt
          ? ` · ${t("noteEdited", { date: date(note.updatedAt) })}`
          : null}
      </p>
      {editing ? (
        <form
          className="grid gap-2"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            send(save, { id: note.id, body });
          }}
        >
          <Label htmlFor={`note-${note.id}`} className="sr-only">
            {t("editLabel", { date: written })}
          </Label>
          <Textarea
            ref={field}
            id={`note-${note.id}`}
            rows={4}
            maxLength={MAX_NOTE_LENGTH}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" size="sm" disabled={saving}>
              {t("saveNote")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setBody(note.body);
                toggle("read");
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p className="break-words whitespace-pre-line">{body}</p>
          {mode === "confirmDelete" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm">{t("deleteConfirm")}</span>
              <Button
                ref={confirmButton}
                type="button"
                size="sm"
                variant="outline"
                disabled={removing}
                onClick={() => send(remove, { id: note.id })}
              >
                {t("delete")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={removing}
                onClick={() => toggle("read")}
              >
                {t("keep")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button
                ref={editButton}
                type="button"
                size="sm"
                variant="ghost"
                aria-label={t("editLabel", { date: written })}
                onClick={() => toggle("edit")}
              >
                {t("edit")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                aria-label={t("deleteLabel", { date: written })}
                onClick={() => toggle("confirmDelete")}
              >
                {t("delete")}
              </Button>
            </div>
          )}
        </>
      )}
      {error ? (
        <p role="alert" className="text-sm text-stylo-rouge">
          {error.message}
        </p>
      ) : null}
    </li>
  );
}

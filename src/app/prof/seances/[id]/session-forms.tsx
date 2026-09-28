"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChapterSelect } from "@/components/chapter-select";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import type { ChapterOptions } from "@/lib/chapters";
import { handFocus } from "@/lib/focus";
import { fieldError } from "@/lib/form-state";
import {
  MAX_LOCATION_LENGTH,
  MAX_REASON_LENGTH,
  MAX_RECAP_LENGTH,
  MAX_SESSION_HOMEWORK_LENGTH,
} from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { cancelSession, closeSession, moveSession } from "../actions";

type Mode = "en_ligne" | "domicile" | "chez_prof";

/** Where and when: the day and hour (Casablanca), the place, the meeting link. */
export function MoveForm({
  id,
  initial,
}: {
  id: string;
  initial: { date: string; time: string; mode: Mode; location: string; meetingUrl: string };
}) {
  const t = useTranslations("tutor.session");
  const tMode = useTranslations("session.mode");
  const [values, setValues] = useState(initial);
  const [state, action, pending] = useFormAction(moveSession, t("errors.unknown"));
  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, { id, ...values });
      }}
    >
      <div className="grid grid-cols-2 gap-3 sm:max-w-sm [&>*]:min-w-0">
        <Field
          id="move-date"
          type="date"
          label={t("date")}
          value={values.date}
          onChange={set("date")}
          error={fieldError(state, "date")}
        />
        <Field
          id="move-time"
          type="time"
          step={900}
          label={t("time")}
          value={values.time}
          onChange={set("time")}
          error={fieldError(state, "time")}
        />
      </div>
      <SelectField
        id="move-mode"
        label={t("mode")}
        value={values.mode}
        onChange={set("mode")}
        error={fieldError(state, "mode")}
        className="sm:max-w-sm"
      >
        {(["chez_prof", "domicile", "en_ligne"] as const).map((mode) => (
          <option key={mode} value={mode}>
            {tMode(mode)}
          </option>
        ))}
      </SelectField>
      <Field
        id="move-location"
        label={t("location")}
        hint={t("locationHint")}
        autoComplete="off"
        maxLength={MAX_LOCATION_LENGTH}
        value={values.location}
        onChange={set("location")}
        error={fieldError(state, "location")}
      />
      <Field
        id="move-url"
        type="url"
        inputMode="url"
        label={t("meetingUrl")}
        hint={t("meetingUrlHint")}
        autoComplete="off"
        value={values.meetingUrl}
        onChange={set("meetingUrl")}
        error={fieldError(state, "meetingUrl")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("saving") : t("save")}
      </Button>
    </form>
  );
}

/** Cancels the session, and with it the rest of its weekly series if she says so. */
export function CancelSessionForm({ id, laterInSeries }: { id: string; laterInSeries: number }) {
  const t = useTranslations("tutor.session");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [following, setFollowing] = useState(false);
  const [state, action, pending] = useFormAction(cancelSession, t("errors.unknown"));
  const box = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    handFocus(
      open ? (field.current?.querySelector("textarea") ?? null) : start.current,
      box.current,
    );
  }, [open]);
  const toggle = (next: boolean) => {
    moved.current = true;
    setOpen(next);
  };

  return (
    <div ref={box} className="grid gap-3">
      {open ? (
        <form
          className="grid gap-3 rounded-md border border-stylo-rouge/40 bg-lavis-rouge p-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            sendFields(action, { id, reason, following: String(following) });
          }}
        >
          <p>{t("cancelConfirm")}</p>
          <div ref={field}>
            <TextareaField
              id="cancel-reason"
              label={t("reasonLabel")}
              hint={t("reasonHint")}
              rows={2}
              maxLength={MAX_REASON_LENGTH}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </div>
          {laterInSeries > 0 ? (
            <label className="flex min-h-11 items-start gap-3">
              <input
                type="checkbox"
                checked={following}
                onChange={(event) => setFollowing(event.target.checked)}
                className="mt-1 size-5 accent-encre"
              />
              <span>{t("cancelFollowing", { count: laterInSeries })}</span>
            </label>
          ) : null}
          <FormMessage state={state} />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="outline" disabled={pending}>
              {t("cancel")}
            </Button>
            <Button type="button" variant="ghost" disabled={pending} onClick={() => toggle(false)}>
              {t("keep")}
            </Button>
          </div>
        </form>
      ) : (
        <Button
          ref={start}
          type="button"
          variant="outline"
          className="justify-self-start"
          onClick={() => toggle(true)}
        >
          {t("cancel")}
        </Button>
      )}
    </div>
  );
}

type AttendanceStatus = "present" | "absent" | "excuse";

/**
 * What happened: it took place (with the chapter, the homework and the recap the student
 * reads) or she did not come. A group's session records each member instead.
 */
export function CloseForm({
  id,
  isGroup,
  chapters,
  initial,
  members,
}: {
  id: string;
  isGroup: boolean;
  chapters: ChapterOptions;
  initial: { status: "terminee" | "absent"; chapterId: string; homework: string; recap: string };
  members: { id: string; name: string; status: AttendanceStatus | null; expected: boolean }[];
}) {
  const t = useTranslations("tutor.session");
  const [values, setValues] = useState(initial);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus | "">>(() =>
    // A paused or stopped member is marked excused until she says otherwise: marked present,
    // the session would count against her hours (D-088).
    Object.fromEntries(
      members.map((member) => [
        member.id,
        member.status ?? (member.expected ? "present" : "excuse"),
      ]),
    ),
  );
  const [state, action, pending] = useFormAction(closeSession, t("errors.unknown"));
  const set = (key: "chapterId" | "homework" | "recap") => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));
  const done = values.status === "terminee";

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, {
          id,
          ...values,
          ...Object.fromEntries(
            Object.entries(attendance).map(([student, status]) => [
              `attendance.${student}`,
              status,
            ]),
          ),
        });
      }}
    >
      {isGroup ? null : (
        <fieldset className="grid gap-1">
          <legend className="mb-1 text-sm font-medium">{t("outcome")}</legend>
          {(["terminee", "absent"] as const).map((status) => (
            <label key={status} className="flex min-h-11 items-center gap-3">
              <input
                type="radio"
                name="close-status"
                value={status}
                checked={values.status === status}
                onChange={() => setValues((current) => ({ ...current, status }))}
                className="size-5 accent-encre"
              />
              {t(`outcomes.${status}`)}
            </label>
          ))}
        </fieldset>
      )}

      {isGroup && members.length > 0 ? (
        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-medium">{t("attendance")}</legend>
          <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
            {members.map((member) => (
              <li
                key={member.id}
                className="grid gap-1 py-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <span className="font-medium" id={`attendance-${member.id}`}>
                  {member.name}
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby={`attendance-${member.id}`}
                  className="flex flex-wrap gap-x-4"
                >
                  {(["present", "absent", "excuse"] as const).map((status) => (
                    <label key={status} className="flex min-h-11 items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`attendance-${member.id}`}
                        value={status}
                        checked={attendance[member.id] === status}
                        onChange={() =>
                          setAttendance((current) => ({ ...current, [member.id]: status }))
                        }
                        className="size-5 accent-encre"
                      />
                      {t(`presence.${status}`)}
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      {done ? (
        <>
          <ChapterSelect
            id="close-chapter"
            label={t("chapter")}
            levels={chapters}
            emptyLabel={t("noChapter")}
            value={values.chapterId}
            onChange={set("chapterId")}
            error={fieldError(state, "chapterId")}
          />
          <TextareaField
            id="close-homework"
            label={t("homework")}
            hint={t("homeworkHint")}
            rows={2}
            maxLength={MAX_SESSION_HOMEWORK_LENGTH}
            value={values.homework}
            onChange={set("homework")}
            error={fieldError(state, "homework")}
          />
          <TextareaField
            id="close-recap"
            label={t("recap")}
            hint={t("recapHint")}
            rows={4}
            maxLength={MAX_RECAP_LENGTH}
            value={values.recap}
            onChange={set("recap")}
            error={fieldError(state, "recap")}
          />
        </>
      ) : null}
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("saving") : t("saveClose")}
      </Button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { formatLocal } from "@/lib/dates";
import { handFocus } from "@/lib/focus";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import { MAX_GROUP_NAME_LENGTH, MAX_SCHEDULE_LABEL_LENGTH } from "@/lib/students/limits";
import { addMember, createGroup, deleteGroup, removeMember, updateGroup } from "./actions";

function useGroupAction(
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

type Level = { code: string; label: string };

/** A group's name, level and hours: to create one, or change it. */
export function GroupForm({
  id,
  levels,
  initial = { name: "", levelCode: "", scheduleLabel: "" },
}: {
  /** Absent for a new group. */
  id?: string;
  levels: Level[];
  initial?: { name: string; levelCode: string; scheduleLabel: string };
}) {
  const t = useTranslations("tutor.groups");
  const [values, setValues] = useState(initial);
  const [state, action, pending] = useGroupAction(
    id ? updateGroup : createGroup,
    t("errors.unknown"),
  );
  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));
  const prefix = id ? "group" : "new-group";

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        send(action, { ...(id ? { id } : {}), ...values });
      }}
    >
      <Field
        id={`${prefix}-name`}
        label={t("name")}
        hint={t("nameHint")}
        autoComplete="off"
        maxLength={MAX_GROUP_NAME_LENGTH}
        value={values.name}
        onChange={set("name")}
        error={fieldError(state, "name")}
      />
      <SelectField
        id={`${prefix}-level`}
        label={t("level")}
        value={values.levelCode}
        onChange={set("levelCode")}
        error={fieldError(state, "levelCode")}
      >
        <option value="">{t("anyLevel")}</option>
        {levels.map((level) => (
          <option key={level.code} value={level.code}>
            {level.label}
          </option>
        ))}
      </SelectField>
      <Field
        id={`${prefix}-schedule`}
        label={t("scheduleLabel")}
        hint={t("scheduleHint")}
        autoComplete="off"
        maxLength={MAX_SCHEDULE_LABEL_LENGTH}
        value={values.scheduleLabel}
        onChange={set("scheduleLabel")}
        error={fieldError(state, "scheduleLabel")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {id ? (pending ? t("saving") : t("save")) : pending ? t("creating") : t("create")}
      </Button>
    </form>
  );
}

type Member = { id: string; name: string; levelLabel: string | null; joinedAt: string };

/** Who is in the group; taking someone out asks first and says what she keeps (D-070). */
export function MemberList({ groupId, members }: { groupId: string; members: Member[] }) {
  const t = useTranslations("tutor.groups");
  // Removing a member takes her row, and the focus, away: the list's heading takes it.
  const heading = useRef<HTMLHeadingElement>(null);

  return (
    <div className="grid gap-2">
      <h2 ref={heading} id="group-members" tabIndex={-1} className="text-lg font-medium">
        {t("membersHeading")}
      </h2>
      {members.length === 0 ? (
        <p className="text-encre-douce">{t("noMembers")}</p>
      ) : (
        <ul
          aria-labelledby="group-members"
          className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
          role="list"
        >
          {members.map((member) => (
            <MemberItem
              key={member.id}
              groupId={groupId}
              member={member}
              onRemoved={(from) => handFocus(heading.current, from)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function MemberItem({
  groupId,
  member,
  onRemoved,
}: {
  groupId: string;
  member: Member;
  onRemoved: (from: HTMLElement | null) => void;
}) {
  const t = useTranslations("tutor.groups");
  const [confirming, setConfirming] = useState(false);
  const item = useRef<HTMLLIElement>(null);
  // Once removed, the page drops this row: the focus goes to the list's heading.
  const [state, action, pending] = useGroupAction(removeMember, t("errors.unknown"), () =>
    onRemoved(item.current),
  );
  const confirmButton = useRef<HTMLButtonElement>(null);
  const removeButton = useRef<HTMLButtonElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    handFocus(confirming ? confirmButton.current : removeButton.current, item.current);
  }, [confirming]);
  const toggle = (next: boolean) => {
    moved.current = true;
    setConfirming(next);
  };
  return (
    <li ref={item} className="grid gap-2 bg-surface px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="grid gap-0.5">
          <Link
            href={`/prof/eleves/${member.id}`}
            className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
          >
            {member.name}
          </Link>
          <span className="text-sm text-encre-douce">
            {[member.levelLabel, t("since", { date: formatLocal(member.joinedAt, "d MMMM yyyy") })]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
        {confirming ? null : (
          <Button
            ref={removeButton}
            type="button"
            size="sm"
            variant="ghost"
            aria-label={t("removeLabel", { name: member.name })}
            onClick={() => toggle(true)}
          >
            {t("remove")}
          </Button>
        )}
      </div>
      {confirming ? (
        <div className="grid gap-2 rounded-md border border-stylo-rouge/40 bg-lavis-rouge p-3 text-sm">
          <p>{t("removeConfirm", { name: member.name })}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              ref={confirmButton}
              type="button"
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => send(action, { groupId, studentId: member.id })}
            >
              {t("remove")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={pending}
              onClick={() => toggle(false)}
            >
              {t("keep")}
            </Button>
          </div>
        </div>
      ) : null}
      {confirming && state.status === "error" ? (
        <p role="alert" className="text-sm text-stylo-rouge">
          {state.message}
        </p>
      ) : null}
    </li>
  );
}

/** Adds a student to the group, from those not in it yet. */
export function AddMember({
  groupId,
  candidates,
}: {
  groupId: string;
  candidates: { id: string; name: string; levelLabel: string | null }[];
}) {
  const t = useTranslations("tutor.groups");
  const [studentId, setStudentId] = useState("");
  // Cleared once she is in, not before: a refusal leaves the choice to try again.
  const [state, action, pending] = useGroupAction(addMember, t("errors.unknown"), () =>
    setStudentId(""),
  );
  // The last student added takes the form away with its button; focus goes to what says so.
  const allIn = useRef<HTMLParagraphElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const wasOpen = useRef(candidates.length > 0);
  useEffect(() => {
    if (wasOpen.current && candidates.length === 0) handFocus(allIn.current, form.current);
    wasOpen.current = candidates.length > 0;
  }, [candidates.length]);

  // A confirmation belongs to the student just added: choosing the next one puts it away.
  const message =
    state.status === "error" || (state.status === "success" && studentId === "")
      ? state
      : initialFormState;

  if (candidates.length === 0) {
    return (
      <div className="grid gap-2">
        <FormMessage state={message} />
        <p ref={allIn} tabIndex={-1} className="text-sm text-encre-douce">
          {t("allIn")}
        </p>
      </div>
    );
  }
  return (
    <form
      ref={form}
      className="grid gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        send(action, { groupId, studentId });
      }}
    >
      <SelectField
        id="add-member"
        label={t("pickStudent")}
        hint={t("addHint")}
        value={studentId}
        onChange={(event) => setStudentId(event.target.value)}
      >
        <option value="">{t("pickPlaceholder")}</option>
        {candidates.map((candidate) => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.levelLabel ? `${candidate.name} — ${candidate.levelLabel}` : candidate.name}
          </option>
        ))}
      </SelectField>
      <FormMessage state={message} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("adding") : t("add")}
      </Button>
    </form>
  );
}

/** Deletes a group that has no history yet; otherwise says why it cannot (D-070). */
export function DeleteGroup({ id, hasHistory }: { id: string; hasHistory: boolean }) {
  const t = useTranslations("tutor.groups");
  const [confirming, setConfirming] = useState(false);
  const [state, action, pending] = useGroupAction(deleteGroup, t("errors.unknown"));
  // The button pressed gives way to the other: focus follows it.
  const box = useRef<HTMLDivElement>(null);
  const confirmButton = useRef<HTMLButtonElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    handFocus(confirming ? confirmButton.current : startButton.current, box.current);
  }, [confirming]);
  const toggle = (next: boolean) => {
    moved.current = true;
    setConfirming(next);
  };

  return (
    <div ref={box} className="grid gap-3">
      <p className="text-sm text-encre-douce">
        {hasHistory ? t("errors.hasHistory") : t("deleteHint")}
      </p>
      {hasHistory ? null : confirming ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm">{t("deleteConfirm")}</span>
          <Button
            ref={confirmButton}
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => send(action, { id })}
          >
            {t("delete")}
          </Button>
          <Button type="button" variant="ghost" disabled={pending} onClick={() => toggle(false)}>
            {t("keep")}
          </Button>
        </div>
      ) : (
        <Button
          ref={startButton}
          type="button"
          variant="outline"
          className="justify-self-start"
          onClick={() => toggle(true)}
        >
          {t("delete")}
        </Button>
      )}
      <FormMessage state={state.status === "error" ? state : initialFormState} />
    </div>
  );
}

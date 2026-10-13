"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SessionTicket } from "@/components/session-ticket";
import {
  FORM_WITH_PREVIEW,
  FormPreview,
  PreviewPlaceholder,
} from "@/components/shell/form-preview";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { formatLocal, localDateTimeToUtc, withFirst } from "@/lib/dates";
import { fieldError } from "@/lib/form-state";
import type { SessionMode } from "@/lib/sessions/queries";
import { MAX_LOCATION_LENGTH } from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { planSessions } from "../actions";

type Option = { id: string; name: string };
type TypeOption = Option & { isGroup: boolean; mode: string; durationMin: number };

/** `yyyy-MM-dd` and `HH:mm` as an instant in Casablanca, or null while either is incomplete. */
function instantOf(date: string, time: string): Date | null {
  try {
    return localDateTimeToUtc(date, time);
  } catch {
    return null;
  }
}

/**
 * Plans one session or a weekly series, for a student or a group (D-074), beside the leaf the
 * student will find in her agenda (D-108).
 */
export function PlanForm({
  students,
  groups,
  types,
  today,
  initial,
}: {
  students: (Option & { levelLabel: string | null })[];
  groups: Option[];
  types: TypeOption[];
  today: string;
  initial: { recipient: "student" | "group"; studentId: string; groupId: string };
}) {
  const t = useTranslations("tutor.planSession");
  const tMode = useTranslations("session.mode");
  const tStatus = useTranslations("session.status");
  const firstType = (group: boolean) => types.find((type) => type.isGroup === group)?.id ?? "";
  const [values, setValues] = useState({
    ...initial,
    typeId: firstType(initial.recipient === "group"),
    date: today,
    time: "18:00",
    repeat: false,
    until: "",
    mode: "",
    location: "",
    meetingUrl: "",
  });
  const [state, action, pending] = useFormAction(planSessions, t("errors.unknown"));
  const set =
    (
      key:
        | "studentId"
        | "groupId"
        | "typeId"
        | "date"
        | "time"
        | "until"
        | "mode"
        | "location"
        | "meetingUrl",
    ) =>
    (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));
  const group = values.recipient === "group";
  const shownTypes = types.filter((type) => type.isGroup === group);
  const type = types.find((option) => option.id === values.typeId);
  const mode = values.mode || type?.mode || "chez_prof";
  const weeks =
    values.repeat && values.until > values.date
      ? Math.floor(
          (Date.parse(`${values.until}T12:00:00Z`) - Date.parse(`${values.date}T12:00:00Z`)) /
            (7 * 24 * 3_600_000),
        ) + 1
      : 1;

  // The leaf as it will be: who it is with, when, for how long, where.
  const who = group
    ? groups.find((option) => option.id === values.groupId)?.name
    : students.find((option) => option.id === values.studentId)?.name;
  const startsAt = instantOf(values.date, values.time);
  const endsAt = startsAt
    ? new Date(startsAt.getTime() + (type?.durationMin ?? 60) * 60_000)
    : null;
  const until = values.repeat && weeks > 1 ? instantOf(values.until, "12:00") : null;

  return (
    <form
      className={FORM_WITH_PREVIEW}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, {
          ...values,
          mode,
          repeat: String(values.repeat),
        });
      }}
    >
      <div className="grid min-w-0 gap-5">
        <fieldset className="grid gap-1">
          <legend className="mb-1 text-sm font-medium">{t("for")}</legend>
          <div className="flex flex-wrap gap-x-6">
            {(["student", "group"] as const).map((recipient) => (
              <label key={recipient} className="flex min-h-11 items-center gap-3">
                <input
                  type="radio"
                  name="plan-recipient"
                  value={recipient}
                  checked={values.recipient === recipient}
                  onChange={() =>
                    setValues((current) => ({
                      ...current,
                      recipient,
                      typeId: firstType(recipient === "group"),
                      mode: "",
                    }))
                  }
                  className="size-5 accent-encre"
                />
                {t(`recipients.${recipient}`)}
              </label>
            ))}
          </div>
        </fieldset>

        {group ? (
          <SelectField
            id="plan-group"
            label={t("group")}
            value={values.groupId}
            onChange={set("groupId")}
            error={fieldError(state, "groupId")}
          >
            <option value="">{t("pick")}</option>
            {groups.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </SelectField>
        ) : (
          <SelectField
            id="plan-student"
            label={t("student")}
            hint={t("studentHint")}
            value={values.studentId}
            onChange={set("studentId")}
            error={fieldError(state, "studentId")}
          >
            <option value="">{t("pick")}</option>
            {students.map((option) => (
              <option key={option.id} value={option.id}>
                {option.levelLabel ? `${option.name} — ${option.levelLabel}` : option.name}
              </option>
            ))}
          </SelectField>
        )}

        <SelectField
          id="plan-type"
          label={t("type")}
          value={values.typeId}
          onChange={(event) =>
            setValues((current) => ({ ...current, typeId: event.target.value, mode: "" }))
          }
          error={fieldError(state, "typeId")}
        >
          {shownTypes.length === 0 ? <option value="">{t("noType")}</option> : null}
          {shownTypes.map((option) => (
            <option key={option.id} value={option.id}>
              {t("typeOption", { name: option.name, duration: option.durationMin })}
            </option>
          ))}
        </SelectField>

        <div className="grid grid-cols-2 gap-3 sm:max-w-sm [&>*]:min-w-0">
          <Field
            id="plan-date"
            type="date"
            label={t("date")}
            value={values.date}
            onChange={set("date")}
            error={fieldError(state, "date")}
          />
          <Field
            id="plan-time"
            type="time"
            step={900}
            label={t("time")}
            value={values.time}
            onChange={set("time")}
            error={fieldError(state, "time")}
          />
        </div>

        <div className="grid gap-3">
          <label className="flex min-h-11 items-start gap-3">
            <input
              type="checkbox"
              checked={values.repeat}
              onChange={(event) =>
                setValues((current) => ({ ...current, repeat: event.target.checked }))
              }
              className="mt-1 size-5 shrink-0 accent-encre"
            />
            <span className="grid gap-0.5">
              <span>{t("repeat")}</span>
              <span className="text-sm text-encre-douce">{t("repeatHint")}</span>
            </span>
          </label>
          {values.repeat ? (
            <Field
              id="plan-until"
              type="date"
              min={values.date}
              label={t("until")}
              value={values.until}
              onChange={set("until")}
              error={fieldError(state, "until")}
              className="sm:max-w-xs"
            />
          ) : null}
        </div>

        <SelectField
          id="plan-mode"
          label={t("mode")}
          value={mode}
          onChange={set("mode")}
          error={fieldError(state, "mode")}
          className="sm:max-w-sm"
        >
          {(["chez_prof", "domicile", "en_ligne"] as const).map((option) => (
            <option key={option} value={option}>
              {tMode(option)}
            </option>
          ))}
        </SelectField>
        <Field
          id="plan-location"
          label={t("location")}
          hint={t("locationHint")}
          autoComplete="off"
          maxLength={MAX_LOCATION_LENGTH}
          value={values.location}
          onChange={set("location")}
          error={fieldError(state, "location")}
        />
        {mode === "en_ligne" ? (
          <Field
            id="plan-url"
            type="url"
            inputMode="url"
            label={t("meetingUrl")}
            hint={t("meetingUrlHint")}
            autoComplete="off"
            value={values.meetingUrl}
            onChange={set("meetingUrl")}
            error={fieldError(state, "meetingUrl")}
          />
        ) : null}
      </div>

      <FormPreview
        id="plan-preview"
        title={t("preview.title")}
        caption={
          group
            ? who
              ? t("preview.captionGroup", { name: who })
              : t("preview.captionNobodyGroup")
            : who
              ? t("preview.caption", { name: who.split(" ")[0] ?? who })
              : t("preview.captionNobody")
        }
        footer={
          <>
            <FormMessage state={state} />
            <Button type="submit" size="lg" disabled={pending} className="w-full">
              {pending ? t("planning") : t("submit", { count: weeks })}
            </Button>
          </>
        }
      >
        {startsAt && endsAt ? (
          <SessionTicket
            startsAt={startsAt.toISOString()}
            endsAt={endsAt.toISOString()}
            status="planifiee"
            statusLabel={tStatus("planifiee")}
            title={type?.name}
            group={group ? (who ?? t("preview.nobodyGroup")) : undefined}
            mode={mode as SessionMode}
            place={values.location.trim() || tMode(mode as SessionMode)}
            past={false}
          >
            {until ? (
              <p className="text-sm text-encre-douce">
                {t("preview.series", {
                  count: weeks,
                  until: withFirst(formatLocal(until, "d MMMM yyyy")),
                })}
              </p>
            ) : null}
          </SessionTicket>
        ) : (
          <PreviewPlaceholder>{t("preview.noDate")}</PreviewPlaceholder>
        )}
      </FormPreview>
    </form>
  );
}

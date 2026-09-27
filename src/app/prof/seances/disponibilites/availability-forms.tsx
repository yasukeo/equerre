"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { handFocus } from "@/lib/focus";
import { fieldError, submittedValue } from "@/lib/form-state";
import { MAX_EXCEPTION_NOTE_LENGTH } from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { addException, addWindow, removeException, removeWindow, saveRules } from "./actions";

type TypeOption = { id: string; name: string };

/**
 * Takes one hour range or exception away. Its line goes with it, so the focus goes to the
 * section's heading, unless she has moved on meanwhile.
 */
export function RemoveButton({
  id,
  kind,
  label,
  headingId,
}: {
  id: string;
  kind: "window" | "exception";
  label: string;
  /** The section's heading, which takes the focus once the line is gone. */
  headingId: string;
}) {
  const t = useTranslations("tutor.availability");
  const button = useRef<HTMLButtonElement>(null);
  const [state, action, pending] = useFormAction(
    kind === "window" ? removeWindow : removeException,
    t("errors.unknown"),
    () => handFocus(document.getElementById(headingId), button.current?.closest("li") ?? null),
  );
  return (
    <>
      <Button
        ref={button}
        type="button"
        size="sm"
        variant="ghost"
        aria-label={label}
        disabled={pending}
        onClick={() => sendFields(action, { id })}
      >
        <X aria-hidden="true" />
        {t("remove")}
      </Button>
      {state.status === "error" ? (
        <p role="alert" className="basis-full text-sm text-stylo-rouge">
          {state.message}
        </p>
      ) : null}
    </>
  );
}

export function AddWindowForm({ types }: { types: TypeOption[] }) {
  const t = useTranslations("tutor.availability");
  const [values, setValues] = useState({ weekday: "2", start: "17:00", end: "20:00", typeId: "" });
  const [state, action, pending] = useFormAction(addWindow, t("errors.unknown"));
  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  return (
    <form
      className="grid gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, values);
      }}
    >
      <div className="grid grid-cols-2 gap-3 [&>*]:min-w-0">
        <SelectField
          id="window-weekday"
          label={t("weekday")}
          value={values.weekday}
          onChange={set("weekday")}
          error={fieldError(state, "weekday")}
          className="col-span-2"
        >
          {([1, 2, 3, 4, 5, 6, 7] as const).map((day) => (
            <option key={day} value={day}>
              {t(`days.${day}`)}
            </option>
          ))}
        </SelectField>
        <Field
          id="window-start"
          type="time"
          step={900}
          label={t("from")}
          value={values.start}
          onChange={set("start")}
          error={fieldError(state, "start")}
        />
        <Field
          id="window-end"
          type="time"
          step={900}
          label={t("to")}
          value={values.end}
          onChange={set("end")}
          error={fieldError(state, "end")}
        />
      </div>
      <SelectField
        id="window-type"
        label={t("forType")}
        value={values.typeId}
        onChange={set("typeId")}
        error={fieldError(state, "typeId")}
      >
        <option value="">{t("allTypes")}</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </SelectField>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("adding") : t("addWindow")}
      </Button>
    </form>
  );
}

type ExceptionKind = "days" | "hours" | "opening";

export function AddExceptionForm({ types, today }: { types: TypeOption[]; today: string }) {
  const t = useTranslations("tutor.availability");
  const empty = { startsOn: today, endsOn: today, start: "", end: "", typeId: "", note: "" };
  const [kind, setKind] = useState<ExceptionKind>("days");
  const [values, setValues] = useState(empty);
  const [state, action, pending] = useFormAction(addException, t("errors.unknown"), () =>
    setValues(empty),
  );
  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, { kind, ...values });
      }}
    >
      <fieldset className="grid gap-2">
        <legend className="mb-1 text-sm font-medium">{t("kind")}</legend>
        {(["days", "hours", "opening"] as const).map((option) => (
          <label key={option} className="flex min-h-11 items-start gap-3 py-1">
            <input
              type="radio"
              name="exception-kind"
              value={option}
              checked={kind === option}
              onChange={() => setKind(option)}
              className="mt-1 size-5 accent-encre"
            />
            <span className="grid gap-0.5">
              <span>{t(`kinds.${option}`)}</span>
              <span className="text-sm text-encre-douce">{t(`kindHints.${option}`)}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="grid grid-cols-2 gap-3 [&>*]:min-w-0">
        <Field
          id="exception-starts-on"
          type="date"
          min={today}
          label={kind === "opening" ? t("on") : t("startsOn")}
          value={values.startsOn}
          onChange={set("startsOn")}
          error={fieldError(state, "startsOn")}
        />
        {kind === "opening" ? null : (
          <Field
            id="exception-ends-on"
            type="date"
            min={values.startsOn || today}
            label={t("endsOn")}
            value={values.endsOn}
            onChange={set("endsOn")}
            error={fieldError(state, "endsOn")}
          />
        )}
      </div>

      {kind === "days" ? null : (
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm [&>*]:min-w-0">
          <Field
            id="exception-start"
            type="time"
            step={900}
            label={t("from")}
            value={values.start}
            onChange={set("start")}
            error={fieldError(state, "start")}
          />
          <Field
            id="exception-end"
            type="time"
            step={900}
            label={t("to")}
            value={values.end}
            onChange={set("end")}
            error={fieldError(state, "end")}
          />
        </div>
      )}

      {kind === "opening" ? (
        <SelectField
          id="exception-type"
          label={t("forType")}
          value={values.typeId}
          onChange={set("typeId")}
          error={fieldError(state, "typeId")}
        >
          <option value="">{t("allTypes")}</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </SelectField>
      ) : null}

      <Field
        id="exception-note"
        label={t("note")}
        hint={t("noteHint")}
        autoComplete="off"
        maxLength={MAX_EXCEPTION_NOTE_LENGTH}
        value={values.note}
        onChange={set("note")}
        error={fieldError(state, "note")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("adding") : t(`add.${kind}`)}
      </Button>
    </form>
  );
}

export function RulesForm({
  rules,
}: {
  rules: { minNoticeHours: number; horizonDays: number; cancellationWindowHours: number };
}) {
  const t = useTranslations("tutor.availability");
  const [state, action, pending] = useFormAction(saveRules, t("errors.unknown"));
  const initial = (key: keyof typeof rules) => submittedValue(state, key) ?? String(rules[key]);

  return (
    <form action={action} className="grid gap-4" noValidate>
      <Field
        id="rules-notice"
        name="minNoticeHours"
        type="number"
        inputMode="numeric"
        min={0}
        max={168}
        label={t("minNotice")}
        hint={t("minNoticeHint")}
        defaultValue={initial("minNoticeHours")}
        error={fieldError(state, "minNoticeHours")}
      />
      <Field
        id="rules-horizon"
        name="horizonDays"
        type="number"
        inputMode="numeric"
        min={1}
        max={120}
        label={t("horizon")}
        hint={t("horizonHint")}
        defaultValue={initial("horizonDays")}
        error={fieldError(state, "horizonDays")}
      />
      <Field
        id="rules-cancellation"
        name="cancellationWindowHours"
        type="number"
        inputMode="numeric"
        min={0}
        max={168}
        label={t("cancellationWindow")}
        hint={t("cancellationWindowHint")}
        defaultValue={initial("cancellationWindowHours")}
        error={fieldError(state, "cancellationWindowHours")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("saving") : t("saveRules")}
      </Button>
    </form>
  );
}

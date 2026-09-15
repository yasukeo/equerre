"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { ContactFields } from "@/components/contact-fields";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { inviteStudent } from "./actions";

type Props = {
  levels: { code: string; label: string }[];
  groups: { id: string; name: string }[];
};

export function InviteStudentForm({ levels, groups }: Props) {
  const t = useTranslations("tutor.invite");
  const tContact = useTranslations("contact");
  const [state, action, pending] = useActionState(inviteStudent, initialFormState);
  const submittedLevel = submittedValue(state, "levelCode") ?? "";
  const submittedGroup = submittedValue(state, "groupId") ?? "";

  return (
    <form action={action} className="grid gap-4" noValidate>
      <Field
        id="invite-name"
        name="fullName"
        label={t("fullName")}
        autoComplete="off"
        required
        defaultValue={submittedValue(state, "fullName")}
        error={fieldError(state, "fullName")}
      />
      <Field
        id="invite-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="off"
        label={t("email")}
        required
        defaultValue={submittedValue(state, "email")}
        error={fieldError(state, "email")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {/* React resets a form after its action runs; the key remounts each select with the
            value that was just submitted, so a correction doesn't silently lose the choice. */}
        <SelectField
          key={`level-${submittedLevel}`}
          id="invite-level"
          name="levelCode"
          label={t("level")}
          required
          defaultValue={submittedLevel}
          error={fieldError(state, "levelCode")}
        >
          <option value="" disabled>
            {t("levelPlaceholder")}
          </option>
          {levels.map((level) => (
            <option key={level.code} value={level.code}>
              {level.label}
            </option>
          ))}
        </SelectField>
        <SelectField
          key={`group-${submittedGroup}`}
          id="invite-group"
          name="groupId"
          label={t("group")}
          defaultValue={submittedGroup}
        >
          <option value="">{t("noGroup")}</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </SelectField>
      </div>

      <ContactFields
        idPrefix="invite"
        heading={tContact("tutorHeading")}
        state={state}
        labels={{
          phone: tContact("phone"),
          phoneHint: tContact("phoneHint"),
          school: tContact("school"),
          guardianName: tContact("guardianName"),
          guardianPhone: tContact("guardianPhone"),
        }}
      />

      <FormMessage state={state}>
        {state.status === "success" && state.detail ? (
          <div className="flex flex-wrap items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-sm border border-quadrillage bg-surface px-2 py-1.5 text-xs">
              {state.detail}
            </code>
            <CopyButton value={state.detail} label={t("copyLink")} />
          </div>
        ) : null}
      </FormMessage>

      <Button type="submit" disabled={pending}>
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

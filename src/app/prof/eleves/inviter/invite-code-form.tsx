"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { createInviteCode } from "./actions";

type Props = {
  levels: { code: string; label: string }[];
  groups: { id: string; name: string }[];
};

export function InviteCodeForm({ levels, groups }: Props) {
  const t = useTranslations("tutor.invite");
  const tCommon = useTranslations("common");
  const [state, action, pending] = useActionState(createInviteCode, initialFormState);

  return (
    <form action={action} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          id="code-level"
          name="levelCode"
          label={t("level")}
          defaultValue={submittedValue(state, "levelCode") ?? ""}
        >
          <option value="">{t("anyLevel")}</option>
          {levels.map((level) => (
            <option key={level.code} value={level.code}>
              {level.label}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="code-group"
          name="groupId"
          label={t("group")}
          defaultValue={submittedValue(state, "groupId") ?? ""}
        >
          <option value="">{t("noGroup")}</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </SelectField>
        <Field
          id="code-max-uses"
          name="maxUses"
          type="number"
          inputMode="numeric"
          min={1}
          max={200}
          label={t("maxUses")}
          defaultValue={submittedValue(state, "maxUses") ?? "1"}
          error={fieldError(state, "maxUses")}
        />
        <Field
          id="code-valid-days"
          name="validDays"
          type="number"
          inputMode="numeric"
          min={1}
          max={90}
          label={t("validDays")}
          defaultValue={submittedValue(state, "validDays") ?? "14"}
          error={fieldError(state, "validDays")}
        />
      </div>

      <FormMessage state={state}>
        {state.status === "success" && state.detail ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl font-semibold tracking-[0.2em] tabular">{state.detail}</span>
            <CopyButton value={state.detail} label={tCommon("copy")} />
          </div>
        ) : null}
      </FormMessage>

      <Button type="submit" variant="outline" disabled={pending}>
        {pending ? t("codeSubmitting") : t("codeSubmit")}
      </Button>
    </form>
  );
}

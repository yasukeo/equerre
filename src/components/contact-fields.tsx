import { Field } from "@/components/ui/field";
import { fieldError, submittedValue, type FormState } from "@/lib/form-state";

type ContactFieldsProps = {
  /** Prefix for element ids, unique per page. */
  idPrefix: string;
  heading: string;
  state: FormState;
  labels: {
    phone: string;
    phoneHint: string;
    school: string;
    guardianName: string;
    guardianPhone: string;
  };
};

/** The optional phone, school and guardian fields shared by sign-up and the tutor's invite form. */
export function ContactFields({ idPrefix, heading, state, labels }: ContactFieldsProps) {
  const headingId = `${idPrefix}-contact`;

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className="grid gap-4 border-t border-quadrillage pt-4"
    >
      <p id={headingId} className="text-sm font-medium">
        {heading}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          label={labels.phone}
          hint={labels.phoneHint}
          defaultValue={submittedValue(state, "phone")}
          error={fieldError(state, "phone")}
        />
        <Field
          id={`${idPrefix}-school`}
          name="school"
          autoComplete="organization"
          label={labels.school}
          defaultValue={submittedValue(state, "school")}
          error={fieldError(state, "school")}
        />
        <Field
          id={`${idPrefix}-guardian-name`}
          name="guardianName"
          autoComplete="off"
          label={labels.guardianName}
          defaultValue={submittedValue(state, "guardianName")}
          error={fieldError(state, "guardianName")}
        />
        <Field
          id={`${idPrefix}-guardian-phone`}
          name="guardianPhone"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          label={labels.guardianPhone}
          defaultValue={submittedValue(state, "guardianPhone")}
          error={fieldError(state, "guardianPhone")}
        />
      </div>
    </div>
  );
}

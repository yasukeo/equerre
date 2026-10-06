"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { initialFormState } from "@/lib/form-state";
import { setCorrectionPublished } from "./actions";

type Props = {
  id: string;
  published: boolean;
  /**
   * Why visitors do not see it whatever its status: the paper has a correction file of its own,
   * or the paper itself is off the site.
   */
  hidden: "solution" | "paper" | null;
  /** The correction's public page. */
  href: string;
};

/** Équerre's correction of this paper (D-103): where it stands, and the switch to change it. */
export function CorrectionStatus({ id, published, hidden, href }: Props) {
  const t = useTranslations("tutor.exams.correction");
  const [state, action, pending] = useActionState(setCorrectionPublished, initialFormState);

  return (
    <section
      aria-labelledby="paper-correction-title"
      className="grid max-w-xl gap-3 border-t border-quadrillage pt-6"
    >
      <h2 id="paper-correction-title" className="text-sm font-semibold">
        {t("title")}
      </h2>
      <p className="text-sm text-encre-douce">
        {hidden === "solution"
          ? t("hiddenBySolution")
          : hidden === "paper"
            ? t("hiddenByPaper")
            : published
              ? t("online")
              : t("offline")}
      </p>
      <form action={action} className="flex flex-wrap items-center gap-2">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="published" value={published ? "false" : "true"} />
        <Button type="submit" variant="outline" disabled={pending}>
          {published ? t("unpublish") : t("publish")}
        </Button>
        {published && hidden === null ? (
          <a
            href={href}
            className="inline-flex min-h-11 items-center px-2 text-sm text-stylo-bleu underline underline-offset-4"
          >
            {t("view")}
          </a>
        ) : null}
      </form>
      <FormMessage state={state} />
    </section>
  );
}

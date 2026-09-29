"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button-variants";

type ErrorViewProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

/** The body of every `error.tsx`: says what happened and offers the two ways out, in French. */
export default function ErrorView({ error, retry }: ErrorViewProps) {
  const t = useTranslations("errors.generic");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto grid max-w-md gap-4 py-12">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="text-encre-douce">{t("lead")}</p>
      <div className="flex flex-wrap gap-3">
        {/* A native button: this screen loads with every page, and needs no primitive. */}
        <button type="button" className={buttonVariants()} onClick={() => retry()}>
          {t("retry")}
        </button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          {t("home")}
        </Link>
      </div>
    </div>
  );
}

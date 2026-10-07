import { MessagesSquare } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("chat");
  return { title: t("title") };
}

/** Beside the list on a wide screen, until a conversation is opened. */
export default async function StudentMessagesPage() {
  const t = await getTranslations("chat");
  return (
    <>
      <h1 className="text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45] lg:sr-only">
        {t("title")}
      </h1>
      <div className="hidden min-h-80 place-content-center justify-items-center gap-3 rounded-2xl border border-dashed border-trait px-6 py-10 text-center lg:grid">
        <span className="flex size-12 items-center justify-center rounded-full bg-sunken">
          <MessagesSquare aria-hidden="true" className="size-6" />
        </span>
        <p className="max-w-xs text-encre-douce">{t("pickConversation")}</p>
      </div>
    </>
  );
}

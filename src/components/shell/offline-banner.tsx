"use client";

import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOffline } from "next/offline";

export function OfflineBanner() {
  const isOffline = useOffline();
  const t = useTranslations("common");

  return (
    <div aria-live="polite" role="status">
      {isOffline ? (
        <p className="flex items-center gap-2 border-b border-trait bg-sunken px-4 py-2 text-sm text-encre">
          <WifiOff aria-hidden="true" className="size-4 shrink-0" />
          {t("offline")}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { Bell as BellIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useEffectEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/** Sent by the notification page once it has counted what it showed as read. */
export const NOTIFICATIONS_READ = "equerre:notifications-read";

/**
 * The bell in the header, with what is unread. It counts again when a notification arrives or
 * is read, live: the header stays on screen from one page to the next and is not drawn again
 * (D-086). The channel carries only her own rows, under the select-own policy.
 */
export function Bell({
  href,
  profileId,
  initial,
}: {
  href: string;
  profileId: string;
  initial: number;
}) {
  const t = useTranslations("notifications");
  const pathname = usePathname();
  const [unread, setUnread] = useState(initial);

  const recount = useEffectEvent(async () => {
    const { count, error } = await createClient()
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .is("read_at", null);
    if (!error && count !== null) setUnread(count);
  });

  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | null = null;
    let stopped = false;
    let timer: number | undefined;
    const soon = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => void recount(), 300);
    };
    const visible = () => {
      if (document.visibilityState === "visible") soon();
    };
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (stopped) return;
      if (data.session) await supabase.realtime.setAuth(data.session.access_token);
      if (stopped) return;
      channel = supabase
        .channel(`bell:${crypto.randomUUID()}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `profile_id=eq.${profileId}`,
          },
          soon,
        )
        .subscribe();
    })();
    window.addEventListener(NOTIFICATIONS_READ, soon);
    document.addEventListener("visibilitychange", visible);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      window.removeEventListener(NOTIFICATIONS_READ, soon);
      document.removeEventListener("visibilitychange", visible);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [profileId]);

  return (
    <Link
      href={href}
      aria-label={unread > 0 ? t("bellUnread", { count: unread }) : t("bell")}
      aria-current={pathname === href ? "page" : undefined}
      className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-sunken aria-[current=page]:bg-sunken"
    >
      <BellIcon aria-hidden="true" className="size-5" />
      {unread > 0 ? (
        <span
          aria-hidden="true"
          className="absolute end-1 top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-encre px-1 text-[0.6875rem] leading-5 font-semibold text-papier tabular"
        >
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </Link>
  );
}

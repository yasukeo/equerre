"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

/**
 * Draws a page with counts again when she comes back to it: Next keeps a page she left alive
 * and hidden, and shows it as it was, while the conversation she read has changed since.
 */
export function RefreshOnReturn() {
  const router = useRouter();
  const shown = useRef(false);
  useEffect(() => {
    // Mounted again: the page is shown again after she went elsewhere.
    if (shown.current) router.refresh();
    shown.current = true;
    const visible = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => document.removeEventListener("visibilitychange", visible);
  }, [router]);
  return null;
}

/**
 * Draws the inbox again when a message arrives in any conversation she takes part in. The
 * channel carries only what the messages policy lets her read.
 */
export function InboxLive() {
  const router = useRouter();
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | null = null;
    let stopped = false;
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (stopped) return;
      if (data.session) await supabase.realtime.setAuth(data.session.access_token);
      if (stopped) return;
      channel = supabase
        .channel(`inbox:${crypto.randomUUID()}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => router.refresh(), 300);
        })
        .subscribe();
    })();
    return () => {
      stopped = true;
      window.clearTimeout(timer.current);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [router]);
  return <RefreshOnReturn />;
}

/** Opens the conversation with a student or a group who has none going yet. */
export function ConversationPicker({
  options,
}: {
  options: { id: string; label: string; group: "students" | "groups" }[];
}) {
  const t = useTranslations("chat");
  const router = useRouter();
  const [chosen, setChosen] = useState("");
  return (
    <form
      className="flex flex-wrap items-end gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (chosen) router.push(`/prof/messages/${chosen}`);
      }}
    >
      <label className="grid min-w-0 flex-1 gap-1.5 text-sm font-medium">
        {t("writeTo")}
        <Select value={chosen} onChange={(event) => setChosen(event.target.value)}>
          <option value="">{t("pick")}</option>
          {(["students", "groups"] as const).map((kind) => {
            const ofKind = options.filter((option) => option.group === kind);
            return ofKind.length === 0 ? null : (
              <optgroup key={kind} label={t(kind)}>
                {ofKind.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </Select>
      </label>
      <Button type="submit" variant="outline" disabled={!chosen}>
        {t("open")}
      </Button>
    </form>
  );
}

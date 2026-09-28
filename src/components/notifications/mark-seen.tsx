"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { NOTIFICATIONS_READ } from "./bell";

/**
 * Counts as read everything up to the newest notification the page shows, older ones beyond
 * the fifty listed too, as soon as the page is on screen: at once, or when she comes back to a
 * tab she had left in the background (D-086). One that arrives meanwhile is newer: it stays
 * new. The page keeps its « Nouvelle » marks as it was drawn; the bell counts again.
 */
export function MarkSeen({ upTo }: { upTo: string }) {
  useEffect(() => {
    let done = false;
    const mark = async () => {
      if (done || document.visibilityState !== "visible") return;
      done = true;
      const { error } = await createClient().rpc("mark_notifications_read", { p_up_to: upTo });
      if (error) done = false;
      else window.dispatchEvent(new Event(NOTIFICATIONS_READ));
    };
    void mark();
    document.addEventListener("visibilitychange", mark);
    return () => document.removeEventListener("visibilitychange", mark);
  }, [upTo]);
  return null;
}

"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

/** What this app keeps on the device for the person signed in: message drafts and outboxes. */
const DEVICE_PREFIX = "equerre:";

function forgetDevice() {
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith(DEVICE_PREFIX)) window.localStorage.removeItem(key);
    }
  } catch {
    // Storage the browser refuses holds nothing of ours either.
  }
}

/**
 * Signs out, and first clears what the chat kept on this device: on a phone the family shares,
 * the next person does not read her drafts (D-083).
 */
export function SignOutForm({ label }: { label: string }) {
  return (
    <form action={signOut} onSubmit={forgetDevice}>
      {/* On a narrow phone, the door alone: the header keeps the brand, the bell and it. */}
      <Button type="submit" variant="ghost" size="sm" className="min-w-11">
        <LogOut aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">{label}</span>
      </Button>
    </form>
  );
}

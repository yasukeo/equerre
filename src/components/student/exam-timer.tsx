"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function clock(ms: number): string {
  const total = Math.max(Math.ceil(ms / 1000), 0);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * The exam's clock: the time left from when she started, kept by the server's start time so
 * a reload or a closed tab does not reset it. The last quarter of an hour turns to red pen.
 * Read aloud only every minute, not every second.
 */
export function ExamTimer({ startedAt, minutes }: { startedAt: string; minutes: number }) {
  const t = useTranslations("student.exam");
  const end = Date.parse(startedAt) + minutes * 60_000;
  // Null until the first tick, so the server's render and the browser's first one agree.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const left = now === null ? minutes * 60_000 : end - now;
  const over = left <= 0;
  const late = !over && left < 15 * 60_000;
  const share = Math.min(Math.max(left / (minutes * 60_000), 0), 1);
  const minutesLeft = Math.max(Math.ceil(left / 60_000), 0);

  return (
    <div className="grid gap-2">
      <p
        className={cn(
          "text-5xl font-semibold tabular [font-variation-settings:'HEXP'_45]",
          over || late ? "text-stylo-rouge" : "text-encre",
        )}
        aria-hidden="true"
      >
        {over ? "0:00:00" : clock(left)}
      </p>
      <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-sunken">
        <span
          className={cn("block h-full rounded-full", over || late ? "bg-stylo-rouge" : "bg-encre")}
          style={{ width: `${share * 100}%` }}
        />
      </span>
      <p className="text-sm text-encre-douce" aria-live="polite">
        {over ? t("timeUp") : t("minutesLeft", { minutes: minutesLeft })}
      </p>
    </div>
  );
}

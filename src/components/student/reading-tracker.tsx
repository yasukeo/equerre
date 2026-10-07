"use client";

import { ArrowDown, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const SAVE_EVERY_MS = 8000;

function scrollRatio(): number {
  const room = document.documentElement.scrollHeight - window.innerHeight;
  return room <= 0 ? 1 : Math.min(Math.max(window.scrollY / room, 0), 1);
}

/**
 * Remembers where she is in a document (D-104), and offers to take her back there. A thin
 * blue line at the top of the screen fills as she reads: her pen moving down the page.
 * Saving is quiet and best-effort: a lost update only makes « Reprendre » a little early.
 */
export function ReadingTracker({
  lessonId,
  initialPosition,
  understood,
}: {
  lessonId: string;
  initialPosition: number;
  understood: boolean;
}) {
  const t = useTranslations("student.progress");
  const [ratio, setRatio] = useState(0);
  const [offer, setOffer] = useState(
    !understood && initialPosition > 0.05 && initialPosition < 0.95,
  );
  const saved = useRef(initialPosition);
  const lastSave = useRef(0);

  useEffect(() => {
    const supabase = createClient();
    const save = (position: number | null) => {
      lastSave.current = Date.now();
      if (position !== null) saved.current = position;
      void supabase
        .rpc("track_lesson", { p_lesson_id: lessonId, p_position: position ?? undefined })
        .then(() => undefined, () => undefined);
    };
    // Opening it counts, wherever she is.
    save(null);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const now = scrollRatio();
        setRatio(now);
        if (now > 0.02) setOffer(false);
        if (Date.now() - lastSave.current > SAVE_EVERY_MS && Math.abs(now - saved.current) > 0.03) {
          save(now);
        }
      });
    };
    const onHide = () => {
      const now = scrollRatio();
      if (Math.abs(now - saved.current) > 0.01) save(now);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onHide();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      onHide();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lessonId]);

  const resume = () => {
    const room = document.documentElement.scrollHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: room * initialPosition, behavior: reduce ? "auto" : "smooth" });
    setOffer(false);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-stylo-bleu print:hidden"
        style={{ transform: `scaleX(${ratio})` }}
      />
      {offer ? (
        <div className="fixed inset-x-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-quadrillage bg-surface p-2 shadow-lg md:bottom-6 print:hidden">
          <button
            type="button"
            onClick={resume}
            className="flex min-h-11 flex-1 items-center gap-2 rounded-xl px-3 text-start font-medium hover:bg-sunken"
          >
            <ArrowDown aria-hidden="true" className="size-5 text-stylo-bleu" />
            {t("resumeAt", { percent: Math.round(initialPosition * 100) })}
          </button>
          <button
            type="button"
            onClick={() => setOffer(false)}
            aria-label={t("dismiss")}
            className="flex size-11 items-center justify-center rounded-xl text-encre-douce hover:bg-sunken"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}

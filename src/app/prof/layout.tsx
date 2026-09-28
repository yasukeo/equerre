import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Ellipsis,
  House,
  MessageCircle,
  NotebookPen,
  Users,
  Wallet,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";

const ITEM = "flex min-w-0 flex-1 md:block";
// A phone's bottom bar holds five places and « Plus »; the rail holds them all.
const DESKTOP_ONLY = "hidden min-w-0 flex-1 md:block";
const PHONE_ONLY = "flex min-w-0 flex-1 md:hidden";

// Navigation grows phase by phase; there are no links to screens that don't exist yet.
export default async function TutorLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.tutor");

  return (
    <AppShell
      homeHref="/prof"
      navLabel={t("label")}
      nav={
        <>
          <li className={ITEM}>
            <NavLink href="/prof" exact icon={<House aria-hidden="true" />}>
              {t("today")}
            </NavLink>
          </li>
          <li className={ITEM}>
            <NavLink href="/prof/seances" icon={<CalendarDays aria-hidden="true" />}>
              {t("sessions")}
            </NavLink>
          </li>
          <li className={ITEM}>
            <NavLink href="/prof/messages" icon={<MessageCircle aria-hidden="true" />}>
              {t("messages")}
            </NavLink>
          </li>
          <li className={ITEM}>
            {/* The invitation lives on the list of students, which it adds to. */}
            <NavLink href="/prof/eleves" icon={<Users aria-hidden="true" />}>
              {t("students")}
            </NavLink>
          </li>
          <li className={ITEM}>
            <NavLink href="/prof/devoirs" icon={<ClipboardList aria-hidden="true" />}>
              {t("assignments")}
            </NavLink>
          </li>
          <li className={DESKTOP_ONLY}>
            <NavLink href="/prof/paiements" icon={<Wallet aria-hidden="true" />}>
              {t("payments")}
            </NavLink>
          </li>
          <li className={DESKTOP_ONLY}>
            <NavLink href="/prof/lecons" icon={<BookOpen aria-hidden="true" />}>
              {t("lessons")}
            </NavLink>
          </li>
          <li className={DESKTOP_ONLY}>
            <NavLink href="/prof/exercices" icon={<NotebookPen aria-hidden="true" />}>
              {t("exercises")}
            </NavLink>
          </li>
          <li className={PHONE_ONLY}>
            <NavLink
              href="/prof/plus"
              also={["/prof/paiements", "/prof/lecons", "/prof/exercices"]}
              icon={<Ellipsis aria-hidden="true" />}
            >
              {t("more")}
            </NavLink>
          </li>
        </>
      }
    >
      {children}
    </AppShell>
  );
}

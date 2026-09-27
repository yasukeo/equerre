import { BookOpen, CalendarDays, ClipboardList, House, NotebookPen, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";

// Navigation grows phase by phase; there are no links to screens that don't exist yet.
export default async function TutorLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.tutor");

  return (
    <AppShell
      homeHref="/prof"
      navLabel={t("label")}
      nav={
        <>
          <li className="flex min-w-0 flex-1 md:block">
            <NavLink href="/prof" exact icon={<House aria-hidden="true" />}>
              {t("today")}
            </NavLink>
          </li>
          <li className="flex min-w-0 flex-1 md:block">
            <NavLink href="/prof/seances" icon={<CalendarDays aria-hidden="true" />}>
              {t("sessions")}
            </NavLink>
          </li>
          <li className="flex min-w-0 flex-1 md:block">
            <NavLink href="/prof/lecons" icon={<BookOpen aria-hidden="true" />}>
              {t("lessons")}
            </NavLink>
          </li>
          <li className="flex min-w-0 flex-1 md:block">
            <NavLink href="/prof/exercices" icon={<NotebookPen aria-hidden="true" />}>
              {t("exercises")}
            </NavLink>
          </li>
          <li className="flex min-w-0 flex-1 md:block">
            <NavLink href="/prof/devoirs" icon={<ClipboardList aria-hidden="true" />}>
              {t("assignments")}
            </NavLink>
          </li>
          <li className="flex min-w-0 flex-1 md:block">
            {/* The invitation lives on the list of students, which it adds to. */}
            <NavLink href="/prof/eleves" icon={<Users aria-hidden="true" />}>
              {t("students")}
            </NavLink>
          </li>
        </>
      }
    >
      {children}
    </AppShell>
  );
}

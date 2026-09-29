import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  House,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";
import { ClientMessages } from "@/i18n/client-messages";

export default async function StudentLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.student");

  return (
    <ClientMessages area="student">
      <AppShell
        homeHref="/eleve"
        navLabel={t("label")}
        nav={
          <>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve" exact icon={<House aria-hidden="true" />}>
                {t("home")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/cours" icon={<BookOpen aria-hidden="true" />}>
                {t("lessons")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/devoirs" icon={<ClipboardList aria-hidden="true" />}>
                {t("homework")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/seances" icon={<CalendarDays aria-hidden="true" />}>
                {t("sessions")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/messages" icon={<MessageCircle aria-hidden="true" />}>
                {t("messages")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/profil" icon={<UserRound aria-hidden="true" />}>
                {t("profile")}
              </NavLink>
            </li>
          </>
        }
      >
        {children}
      </AppShell>
    </ClientMessages>
  );
}

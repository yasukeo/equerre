import { CalendarDays, ClipboardList, House, MessageCircle, Notebook } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";
import { ClientMessages } from "@/i18n/client-messages";

// Five places a thumb reaches on a phone (D-104): her day, her course, her homework, her
// calendar, her messages. Her profile is behind her initials in the header.
export default async function StudentLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.student");

  return (
    <ClientMessages area="student">
      <AppShell
        homeHref="/eleve"
        navLabel={t("label")}
        accountHref="/eleve/profil"
        accountLabel={t("profile")}
        nav={
          <>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve" exact icon={<House aria-hidden="true" />}>
                {t("home")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink
                href="/eleve/cours"
                also={["/eleve/chapitres", "/eleve/examens", "/eleve/progression"]}
                icon={<Notebook aria-hidden="true" />}
              >
                {t("revise")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/devoirs" icon={<ClipboardList aria-hidden="true" />}>
                {t("homework")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/seances" icon={<CalendarDays aria-hidden="true" />}>
                {t("agenda")}
              </NavLink>
            </li>
            <li className="flex min-w-0 flex-1 md:block">
              <NavLink href="/eleve/messages" icon={<MessageCircle aria-hidden="true" />}>
                {t("messages")}
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

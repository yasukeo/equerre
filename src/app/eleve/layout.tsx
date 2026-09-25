import { BookOpen, ClipboardList, House, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";

// Séances and Messages join the bottom bar as their phases ship.
export default async function StudentLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.student");

  return (
    <AppShell
      homeHref="/eleve"
      navLabel={t("label")}
      nav={
        <>
          <li className="flex flex-1 md:block">
            <NavLink href="/eleve" exact icon={<House aria-hidden="true" />}>
              {t("home")}
            </NavLink>
          </li>
          <li className="flex flex-1 md:block">
            <NavLink href="/eleve/cours" icon={<BookOpen aria-hidden="true" />}>
              {t("lessons")}
            </NavLink>
          </li>
          <li className="flex flex-1 md:block">
            <NavLink href="/eleve/devoirs" icon={<ClipboardList aria-hidden="true" />}>
              {t("homework")}
            </NavLink>
          </li>
          <li className="flex flex-1 md:block">
            <NavLink href="/eleve/profil" icon={<UserRound aria-hidden="true" />}>
              {t("profile")}
            </NavLink>
          </li>
        </>
      }
    >
      {children}
    </AppShell>
  );
}

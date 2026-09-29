import { House } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";

// The parent view (D-091): one place, her children, read only.
export default async function ParentLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.parent");

  return (
    <AppShell
      homeHref="/parent"
      navLabel={t("label")}
      nav={
        <li className="flex min-w-0 flex-1 md:block">
          <NavLink href="/parent" icon={<House aria-hidden="true" />}>
            {t("home")}
          </NavLink>
        </li>
      }
    >
      {children}
    </AppShell>
  );
}

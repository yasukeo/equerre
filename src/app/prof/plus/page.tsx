import {
  BookOpen,
  CalendarClock,
  FileText,
  Globe,
  NotebookPen,
  Tags,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav.tutor");
  return { title: t("more") };
}

// On a phone, the places the bottom bar has no room for (DECISIONS.md, D-082).
const PLACES: {
  href: string;
  key:
    | "payments"
    | "lessons"
    | "exercises"
    | "exams"
    | "availability"
    | "sessionTypes"
    | "groups"
    | "invite"
    | "site";
  icon: LucideIcon;
}[] = [
  { href: "/prof/paiements", key: "payments", icon: Wallet },
  { href: "/prof/lecons", key: "lessons", icon: BookOpen },
  { href: "/prof/exercices", key: "exercises", icon: NotebookPen },
  { href: "/prof/examens", key: "exams", icon: FileText },
  { href: "/prof/seances/disponibilites", key: "availability", icon: CalendarClock },
  { href: "/prof/seances/types", key: "sessionTypes", icon: Tags },
  { href: "/prof/eleves/groupes", key: "groups", icon: Users },
  { href: "/prof/eleves/inviter", key: "invite", icon: UserPlus },
  { href: "/prof/site", key: "site", icon: Globe },
];

export default async function MorePage() {
  const t = await getTranslations("nav.tutor");
  return (
    <div className="grid max-w-md gap-4">
      <h1 className="text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold break-words [font-variation-settings:'HEXP'_45]">
        {t("more")}
      </h1>
      <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
        {PLACES.map(({ href, key, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className="flex min-h-14 items-center gap-3 px-1 hover:bg-sunken">
              <Icon aria-hidden="true" className="size-5 text-encre-douce" />
              {t(`places.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

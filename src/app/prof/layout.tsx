import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Ellipsis,
  FileText,
  Globe,
  House,
  MessageCircle,
  NotebookPen,
  Users,
  Wallet,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { NavLink } from "@/components/shell/nav-link";
import { CorrectionsBadge, UnreadBadge } from "@/components/tutor/nav-badges";
import { TutorSearch } from "@/components/tutor/tutor-search";
import { ClientMessages } from "@/i18n/client-messages";

const ITEM = "flex min-w-0 flex-1 md:block";
// A phone's bottom bar holds five places and « Plus »; the rail holds them all.
const DESKTOP_ONLY = "hidden min-w-0 flex-1 md:block";
const PHONE_ONLY = "flex min-w-0 flex-1 md:hidden";
/** A section's name in the rail, on a desktop only: the bar has no room for it (D-104). */
const SECTION =
  "hidden px-3 pt-5 pb-1 text-xs font-semibold tracking-wide text-encre-douce uppercase md:block";

export default async function TutorLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("nav.tutor");

  return (
    <ClientMessages area="tutor">
      <AppShell
        homeHref="/prof"
        navLabel={t("label")}
        search={<TutorSearch />}
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
              <NavLink
                href="/prof/messages"
                icon={<MessageCircle aria-hidden="true" />}
                badge={
                  <Suspense fallback={null}>
                    <UnreadBadge label={t("unreadBadge")} />
                  </Suspense>
                }
              >
                {t("messages")}
              </NavLink>
            </li>
            <li className={ITEM}>
              {/* The invitation lives on the list of students, which it adds to. */}
              <NavLink href="/prof/eleves" icon={<Users aria-hidden="true" />}>
                {t("students")}
              </NavLink>
            </li>
            <li aria-hidden="true" className={SECTION}>
              {t("sectionTeach")}
            </li>
            <li className={ITEM}>
              <NavLink
                href="/prof/devoirs"
                icon={<ClipboardList aria-hidden="true" />}
                badge={
                  <Suspense fallback={null}>
                    <CorrectionsBadge label={t("correctionsBadge")} />
                  </Suspense>
                }
              >
                {t("assignments")}
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
            <li className={DESKTOP_ONLY}>
              <NavLink href="/prof/examens" icon={<FileText aria-hidden="true" />}>
                {t("exams")}
              </NavLink>
            </li>
            <li aria-hidden="true" className={SECTION}>
              {t("sectionManage")}
            </li>
            <li className={DESKTOP_ONLY}>
              <NavLink href="/prof/paiements" icon={<Wallet aria-hidden="true" />}>
                {t("payments")}
              </NavLink>
            </li>
            <li className={DESKTOP_ONLY}>
              <NavLink
                href="/prof/site"
                also={["/prof/conseils"]}
                icon={<Globe aria-hidden="true" />}
              >
                {t("site")}
              </NavLink>
            </li>
            <li className={PHONE_ONLY}>
              <NavLink
                href="/prof/plus"
                also={[
                  "/prof/paiements",
                  "/prof/lecons",
                  "/prof/exercices",
                  "/prof/examens",
                  "/prof/site",
                  "/prof/conseils",
                ]}
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
    </ClientMessages>
  );
}

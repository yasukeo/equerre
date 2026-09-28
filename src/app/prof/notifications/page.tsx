import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { NotificationList } from "@/components/notifications/notification-list";
import { requireViewer } from "@/lib/auth";
import { listMyNotifications } from "@/lib/notifications/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notifications");
  return { title: t("title") };
}

export default async function TutorNotificationsPage() {
  const t = await getTranslations("notifications");
  return (
    <div className="grid max-w-3xl gap-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-md bg-sunken" />}>
        <TutorNotifications />
      </Suspense>
    </div>
  );
}

async function TutorNotifications() {
  await requireViewer("tutor");
  return <NotificationList page={await listMyNotifications("tutor")} role="tutor" />;
}

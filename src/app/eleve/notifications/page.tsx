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

export default async function StudentNotificationsPage() {
  const t = await getTranslations("notifications");
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-md bg-sunken" />}>
        <StudentNotifications />
      </Suspense>
    </div>
  );
}

async function StudentNotifications() {
  await requireViewer("student");
  return <NotificationList page={await listMyNotifications("student")} role="student" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { NotificationList } from "@/components/notifications/notification-list";
import { PageHeader } from "@/components/shell/page-header";
import { requireViewer } from "@/lib/auth";
import { listMyNotifications } from "@/lib/notifications/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notifications");
  return { title: t("title") };
}

export default async function TutorNotificationsPage() {
  const t = await getTranslations("notifications");
  return (
    <div className="grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-6">
      <PageHeader title={t("title")} />
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-2xl bg-sunken" />}>
        <TutorNotifications />
      </Suspense>
    </div>
  );
}

async function TutorNotifications() {
  await requireViewer("tutor");
  return <NotificationList page={await listMyNotifications("tutor")} role="tutor" />;
}

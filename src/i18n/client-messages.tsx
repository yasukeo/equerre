import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { CLIENT_NAMESPACES, pickMessages, type ClientArea } from "./client-namespaces";

/** Hands the client components of one part of the app their messages, and only theirs. */
export async function ClientMessages({
  area,
  children,
}: {
  area: ClientArea;
  children: ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider
      messages={pickMessages(
        messages as Parameters<typeof pickMessages>[0],
        CLIENT_NAMESPACES[area],
      )}
    >
      {children}
    </NextIntlClientProvider>
  );
}

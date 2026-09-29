"use client";

import messages from "../../messages/fr.errors.json";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Replaces the root layout, so there is no translation provider here: the strings are read
// from the error screens' own dictionary file, the only part of it this screen needs (D-092).
export default function GlobalError({ retry }: GlobalErrorProps) {
  const t = messages.errors.generic;

  return (
    <html lang="fr">
      <body>
        <main className="mx-auto grid max-w-md gap-4 px-4 py-16">
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-encre-douce">{t.lead}</p>
          <button
            type="button"
            onClick={() => retry()}
            className="min-h-11 justify-self-start rounded-md bg-encre px-4 font-medium text-papier"
          >
            {t.retry}
          </button>
        </main>
      </body>
    </html>
  );
}

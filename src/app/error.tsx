"use client";

import ErrorView from "@/components/error-view";

type RootErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// The root boundary sits outside every layout, so it brings its own gutter and main landmark.
// The workspace boundaries re-export ErrorView directly: their shell already provides both.
export default function RootError(props: RootErrorProps) {
  return (
    <main id="contenu" className="px-4">
      <ErrorView {...props} />
    </main>
  );
}

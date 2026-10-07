import { countUnread } from "@/lib/chat/queries";
import { countCorrectionQueue } from "@/lib/correction/queries";

// Counts beside the places in the tutor's navigation (D-104): she sees what waits without
// opening each page. Each streams in its own Suspense boundary; a failed count shows nothing.

function Badge({ count, label }: { count: number; label: string }) {
  if (count <= 0) return null;
  return (
    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-stylo-rouge px-1.5 text-xs leading-5 font-semibold text-white tabular">
      {count > 99 ? "99+" : count}
      <span className="sr-only"> {label}</span>
    </span>
  );
}

export async function UnreadBadge({ label }: { label: string }) {
  const count = await countUnread().catch(() => 0);
  return <Badge count={count} label={label} />;
}

export async function CorrectionsBadge({ label }: { label: string }) {
  const count = await countCorrectionQueue().catch(() => 0);
  return <Badge count={count} label={label} />;
}

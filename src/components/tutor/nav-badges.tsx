import { connection } from "next/server";
import { countUnread } from "@/lib/chat/queries";
import { countCorrectionQueue } from "@/lib/correction/queries";

// Counts beside the places in the tutor's navigation (D-104): she sees what waits without
// opening each page. Each streams in its own Suspense boundary; a failed count shows nothing.

// In the colour of what they count (D-100): unread messages orange, homework red.
function Badge({ count, label, tone }: { count: number; label: string; tone: string }) {
  if (count <= 0) return null;
  return (
    <span
      className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs leading-5 font-semibold text-white tabular ${tone}`}
    >
      {count > 99 ? "99+" : count}
      <span className="sr-only"> {label}</span>
    </span>
  );
}

export async function UnreadBadge({ label }: { label: string }) {
  // Her session is read here: the render must belong to the request first.
  await connection();
  const count = await countUnread().catch(() => 0);
  return <Badge count={count} label={label} tone="bg-orange-bande" />;
}

export async function CorrectionsBadge({ label }: { label: string }) {
  await connection();
  const count = await countCorrectionQueue().catch(() => 0);
  return <Badge count={count} label={label} tone="bg-rouge-bande" />;
}

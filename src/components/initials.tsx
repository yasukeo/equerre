import { cn } from "@/lib/utils";

/** « Salma Alaoui » → « SA »: two letters for an avatar. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
  return letters.map((part) => part?.charAt(0).toLocaleUpperCase("fr") ?? "").join("") || "·";
}

/** A person's initials in a round pastille. Decorative: the name is always written beside it. */
export function Initials({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-sunken text-xs font-semibold",
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}

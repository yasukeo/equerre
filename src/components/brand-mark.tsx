import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** A set square drawn as a construction: outer triangle, inner cut-out, right-angle mark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-semibold text-encre", className)}>
      {/* The set square in white on the blue of the 2e bac's notebook (D-100). */}
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bleu-bande text-white">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M4 3v17h17z" />
          <path d="M8 11.5V16h4.5z" />
          <path d="M4 17h3v3" />
        </svg>
      </span>
      <span className="text-lg [font-variation-settings:'HEXP'_60]">{siteConfig.brand}</span>
    </span>
  );
}

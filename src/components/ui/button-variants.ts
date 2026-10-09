import { cva } from "class-variance-authority";

// The button's look, apart from the button: a link styled as a button needs only these
// classes, and importing them from ./button would ship Base UI's button to pages that render
// no button at all (D-092).

// Every size keeps a 44px hit target (brief §8). Focus styling comes from globals.css.
export const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-60 aria-invalid:border-stylo-rouge [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        // The site's blue (D-100): the one action a screen is for.
        default: "border-transparent bg-bleu-bande text-white hover:bg-bleu-bande/90",
        outline: "border-trait bg-surface text-encre hover:bg-sunken",
        ghost: "border-transparent text-encre hover:bg-sunken",
        destructive: "border-stylo-rouge bg-surface text-stylo-rouge hover:bg-lavis-rouge",
        link: "min-h-0 border-transparent px-0 text-encre underline decoration-trait underline-offset-4 hover:decoration-encre",
      },
      size: {
        default: "px-4 text-base",
        sm: "px-3 text-sm",
        lg: "min-h-12 px-5 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

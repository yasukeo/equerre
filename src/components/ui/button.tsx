import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Every size keeps a 44px hit target (brief §8). Focus styling comes from globals.css.
const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-transparent font-medium whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-60 aria-invalid:border-stylo-rouge [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-encre text-papier hover:bg-encre/85",
        outline: "border-trait bg-surface text-encre hover:bg-sunken",
        ghost: "text-encre hover:bg-sunken",
        destructive: "border-stylo-rouge bg-surface text-stylo-rouge hover:bg-lavis-rouge",
        link: "min-h-0 px-0 text-encre underline decoration-trait underline-offset-4 hover:decoration-encre",
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

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

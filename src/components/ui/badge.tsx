import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        cyan: "bg-cyan/15 text-primary-deep",
        chemistry: "bg-chemistry/12 text-chemistry",
        physics: "bg-physics/15 text-[#8c5a00]",
        maths: "bg-maths/15 text-[#00645d]",
        surface: "bg-white text-primary shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

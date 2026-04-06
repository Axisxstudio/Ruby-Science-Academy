import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "ring-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[0_16px_30px_rgba(15,76,129,0.22)] hover:-translate-y-0.5 hover:bg-primary-deep",
        secondary:
          "bg-white text-primary shadow-[var(--shadow-ambient)] hover:-translate-y-0.5",
        outline:
          "border border-border-soft bg-white/70 text-primary hover:bg-surface-soft",
        ghost: "text-primary hover:bg-primary/8",
        accent:
          "bg-cyan text-primary-deep shadow-[0_16px_32px_rgba(0,194,255,0.22)] hover:-translate-y-0.5 hover:bg-cyan/90",
        destructive:
          "bg-chemistry text-white shadow-[0_16px_30px_rgba(255,107,44,0.18)] hover:bg-chemistry/90",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

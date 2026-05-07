import * as React from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-white shadow hover:opacity-90 transition-opacity",
  secondary:
    "bg-secondary text-white shadow hover:opacity-90 transition-opacity",
  destructive:
    "bg-destructive text-white shadow-sm hover:opacity-90 transition-opacity",
  outline:
    "border border-border bg-transparent hover:bg-foreground/5 text-foreground transition-colors",
  ghost:
    "hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-8 text-lg",
  icon: "h-10 w-10",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "focus-visible:ring-primary inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };

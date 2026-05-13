"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type InputVariant = "default" | "ghost";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const baseStyles =
      "flex h-10 w-full text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
      default:
        "rounded-md border border-border bg-card-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      ghost:
        "border-none bg-transparent px-0 py-0 focus-visible:ring-0 focus-visible:outline-none",
    };

    return (
      <input
        type={type}
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };

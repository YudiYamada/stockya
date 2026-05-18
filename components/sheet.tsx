"use client";

import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type SheetContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SheetContext = React.createContext<SheetContextProps | undefined>(
  undefined,
);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within a <Sheet />");
  }
  return context;
}

interface SheetProps {
  children: React.ReactNode;
}

export function Sheet({ children }: SheetProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function SheetTrigger({
  asChild,
  className,
  ...props
}: SheetTriggerProps) {
  const { setOpen } = useSheet();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={() => setOpen(true)}
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

export function SheetClose({
  asChild,
  className,
  ...props
}: SheetTriggerProps) {
  const { setOpen } = useSheet();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={() => setOpen(false)}
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SheetContent({
  className,
  children,
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useSheet();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="bg-overlay fixed inset-0 transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Painel Lateral */}
      <div
        className={cn(
          "border-border bg-card-background relative h-full w-full max-w-150 border-l p-6 shadow-lg outline-none",
          "animate-in slide-in-from-right-full",
          className,
        )}
        {...props}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
        >
          <X className="h-7 w-7 hover:cursor-pointer" />
          <span className="sr-only">Fechar</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-foreground text-lg font-semibold", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

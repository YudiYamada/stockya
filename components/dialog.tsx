"use client";

import { Slot } from "@radix-ui/react-slot";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils"; // Ajuste o path conforme sua estrutura

const DialogContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("Dialog components must be used within <Dialog />");
  return context;
};

interface DialogElementProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Dialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children,
  asChild = false,
  className,
}: DialogElementProps) {
  const { setOpen } = useDialog();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={() => setOpen(true)}
      className={cn(!asChild && "inline-block cursor-pointer", className)}
    >
      {children}
    </Comp>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDialog();

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="bg-overlay animate-in fade-in fixed inset-0 backdrop-blur-sm duration-200"
        onClick={() => setOpen(false)}
      />

      <div
        className={cn(
          "border-border bg-card-background animate-in zoom-in-95 relative z-50 w-full max-w-lg overflow-hidden rounded-xl border p-6 shadow-xl duration-200",
          className,
        )}
      >
        {children}

        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:cursor-pointer hover:opacity-100 focus:outline-none"
        >
          <span className="text-xl font-light">×</span>
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function DialogHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DialogTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}

export function DialogFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DialogClose({
  children,
  asChild = false,
  className,
}: DialogElementProps) {
  const { setOpen } = useDialog();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={() => setOpen(false)}
      className={cn(!asChild && "cursor-pointer", className)}
    >
      {children}
    </Comp>
  );
}

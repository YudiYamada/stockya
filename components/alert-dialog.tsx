"use client";

import { Slot } from "@radix-ui/react-slot";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface AlertDialogContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(
  undefined,
);

function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "AlertDialog components must be used within an <AlertDialog />",
    );
  }
  return context;
}

interface AlertDialogProps {
  children: ReactNode;
}

export function AlertDialog({ children }: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function AlertDialogTrigger({
  children,
  asChild = false,
  className,
}: AlertDialogTriggerProps) {
  const { setIsOpen } = useAlertDialog();
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      onClick={() => setIsOpen(true)}
      className={cn(!asChild && "inline-block cursor-pointer", className)}
    >
      {children}
    </Comp>
  );
}

export function AlertDialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen } = useAlertDialog();

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    },
    [setIsOpen],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="bg-overlay animate-in fade-in fixed inset-0 backdrop-blur-sm duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div
        role="alertdialog"
        aria-modal="true"
        className={cn(
          "border-border bg-card-background relative z-50 w-full max-w-md overflow-hidden rounded-lg border p-6 shadow-xl",
          "animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
    >
      {children}
    </div>
  );
}

export function AlertDialogTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-foreground text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({
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

export function AlertDialogFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ActionProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "destructive";
  className?: string;
}

export function AlertDialogAction({
  children,
  onClick,
  variant = "primary",
  className,
}: ActionProps) {
  const { setIsOpen } = useAlertDialog();

  const variants = {
    primary: "bg-primary text-white hover:brightness-110",
    destructive: "bg-destructive text-white hover:brightness-110",
  };

  const handleAction = () => {
    if (onClick) onClick();
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleAction}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setIsOpen } = useAlertDialog();
  return (
    <button
      onClick={() => setIsOpen(false)}
      className={cn(
        "border-border text-foreground hover:bg-primary/10 inline-flex h-10 cursor-pointer items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

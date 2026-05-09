"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface DropdownProps {
  children: ReactNode;
}

type DropdownInjectionProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<DropdownInjectionProps>,
            {
              isOpen,
              setIsOpen,
            },
          );
        }
        return child;
      })}
    </div>
  );
}

interface DropdownTriggerProps {
  children?: ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

export function DropdownTrigger({
  children,
  setIsOpen,
  isOpen,
}: DropdownTriggerProps) {
  return (
    <div
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}

interface DropdownContentProps {
  children: ReactNode;
  isOpen?: boolean;
  align?: "left" | "right";
  className?: string;
}

export function DropdownContent({
  children,
  isOpen,
  align = "right",
  className,
}: DropdownContentProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "border-border bg-card-background absolute z-50 mt-2 min-w-48 overflow-hidden rounded-md border p-1 shadow-lg",
        "animate-in fade-in zoom-in-95 duration-100",
        align === "right" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
  className?: string;
  disabled?: boolean;
}

export function DropdownItem({
  children,
  onClick,
  variant = "default",
  className,
  disabled,
}: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "text-foreground hover:bg-primary/10 hover:text-primary",
        variant === "destructive" && "text-destructive hover:bg-destructive/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DropdownLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-muted-foreground px-3 py-1.5 text-xs font-semibold tracking-wider uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownSeparator() {
  return <div className="bg-border -mx-1 my-1 h-px" />;
}

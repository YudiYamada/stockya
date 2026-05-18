"use client";

import { Check, ChevronsUpDown, Search } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Input } from "./input";

type ComboboxContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: string;
  setSelectedValue: (value: string, display?: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  registerItem: (id: string, visible: boolean) => void;
  visibleCount: number;
  displayValue: string;
  setDisplayValue: (value: string) => void;
};

const ComboboxContext = React.createContext<ComboboxContextProps | undefined>(
  undefined,
);

function useCombobox() {
  const context = React.useContext(ComboboxContext);
  if (!context)
    throw new Error("Combobox components must be used within a <Combobox />");
  return context;
}

export function Combobox({
  children,
  value = "",
  onValueChange,
}: {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (val: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedValue, setInternalValue] = React.useState(value);
  const [displayValue, setDisplayValue] = React.useState("");
  const [visibleItems, setVisibleItems] = React.useState<Set<string>>(
    new Set(),
  );

  React.useEffect(() => {
    setInternalValue(value);
    if (!value) {
      setDisplayValue("");
    }
  }, [value]);

  const registerItem = React.useCallback((id: string, isVisible: boolean) => {
    setVisibleItems((prev) => {
      const next = new Set(prev);
      if (isVisible) next.add(id);
      else next.delete(id);
      return prev.size === next.size && [...prev].every((v) => next.has(v))
        ? prev
        : next;
    });
  }, []);

  const setSelectedValue = React.useCallback(
    (val: string, display?: string) => {
      setInternalValue(val);
      if (display !== undefined) {
        setDisplayValue(display);
      }
      onValueChange?.(val);
      setOpen(false);
      setSearchTerm("");
    },
    [onValueChange],
  );

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        selectedValue,
        setSelectedValue,
        searchTerm,
        setSearchTerm,
        registerItem,
        visibleCount: visibleItems.size,
        displayValue,
        setDisplayValue,
      }}
    >
      <div className="relative w-full">{children}</div>
    </ComboboxContext.Provider>
  );
}

export function ComboboxInput({
  className,
  placeholder,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { setOpen, displayValue } = useCombobox();
  return (
    <div
      className="relative flex cursor-pointer items-center"
      onClick={() => setOpen(true)}
    >
      <Input
        {...props}
        readOnly
        value={displayValue}
        placeholder={placeholder}
        variant="ghost"
        className={cn("cursor-pointer", className)}
      />
      <ChevronsUpDown className="absolute right-3 h-4 w-4 shrink-0 opacity-50" />
    </div>
  );
}

export function ComboboxSearch({
  placeholder = "Pesquisar...",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const { searchTerm, setSearchTerm } = useCombobox();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="border-border flex items-center border-b px-3"
      sticky-top-0="true"
    >
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn(
          "h-9 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
      />
    </div>
  );
}

export function ComboboxContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useCombobox();
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "border-border bg-card-background animate-in fade-in-0 zoom-in-95 absolute z-50 mt-2 max-h-72 w-full overflow-hidden rounded-md border shadow-md",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function ComboboxList({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-h-62.5 overflow-y-auto p-1", className)}>
      {children}
    </div>
  );
}

export function ComboboxItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setSelectedValue, selectedValue, searchTerm, registerItem } =
    useCombobox();

  const label = typeof children === "string" ? children : value;
  const isVisible = label.toLowerCase().includes(searchTerm.toLowerCase());

  React.useEffect(() => {
    registerItem(value, isVisible);
  }, [value, isVisible, registerItem]);

  if (!isVisible) return null;

  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => setSelectedValue(value, label)}
      className={cn(
        "hover:bg-primary/10 hover:text-primary relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        isSelected && "bg-primary/5 text-primary font-medium",
        className,
      )}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {children}
    </div>
  );
}

export function ComboboxEmpty({ children }: { children?: React.ReactNode }) {
  const { visibleCount, searchTerm } = useCombobox();
  if (visibleCount > 0) return null;
  return (
    <div className="text-muted-foreground py-6 text-center text-sm">
      {children || `Nenhum resultado para "${searchTerm}"`}
    </div>
  );
}

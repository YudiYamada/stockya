"use client";

import { useEffect, useState } from "react";

import { type ToastProps, toastStore } from "@/lib/toast-store";
import { cn } from "@/lib/utils";

export function Toaster() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-100 flex w-full max-w-100 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "animate-in slide-in-from-right-full duration-300",
            "bg-card-background border-border rounded-xl border p-4 shadow-2xl",
            "group relative flex flex-col gap-1 overflow-hidden",
            "transition-all hover:scale-[1.02]",
          )}
        >
          {/* Barra lateral colorida baseada no tipo */}
          <div
            className={cn(
              "absolute top-0 bottom-0 left-0 w-1",
              t.type === "success" && "bg-primary",
              t.type === "error" && "bg-destructive",
              t.type === "info" && "bg-secondary",
              t.type === "default" && "bg-muted-foreground",
            )}
          />

          <div className="flex items-start justify-between pl-2">
            <div className="flex flex-col">
              <h3 className="text-foreground text-[0.95rem] leading-none font-bold">
                {t.title}
              </h3>
              {t.description && (
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => toastStore.remove(t.id)}
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

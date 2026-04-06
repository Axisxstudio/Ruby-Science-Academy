"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      closeButton
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast: "rounded-3xl border border-border-soft bg-white shadow-[var(--shadow-ambient)]",
          title: "font-display text-sm font-bold text-primary",
          description: "text-sm text-muted",
        },
      }}
    />
  );
}

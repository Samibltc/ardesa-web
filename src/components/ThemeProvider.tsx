"use client";
import React, { useEffect, useState } from "react";

// Minimal ThemeProvider stub to satisfy import after dark mode rollback.
// Currently passes children through without modifying classes.
// Extend later with context, prefers-color-scheme, or localStorage state.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface ToggleProps {
  className?: string;
}

// Simple placeholder toggle; persists a 'dark' class on <html> when activated.
export function ThemeToggle({ className = "" }: ToggleProps) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);
  return (
    <button
      type="button"
      aria-label="Tema Değiştir"
      onClick={() => setDark((d) => !d)}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border border-cyan-400/30 bg-white/5 text-cyan-100 hover:bg-cyan-400/10 transition ${className}`}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

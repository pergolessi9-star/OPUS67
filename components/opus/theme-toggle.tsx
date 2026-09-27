"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const STORAGE_KEY = "opus67-theme";

/**
 * ThemeToggle — switches OPUS67 DARK (default) / OPUS67 LIGHT by setting
 * data-theme on <html> and persisting the choice locally. Dark remains the
 * primary experience; light keeps the spectral identity (Ice/Mist surfaces).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme applies to this session only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "light"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-opus border border-line text-steel transition-colors duration-150 ease-opus hover:border-line-strong hover:text-ice"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

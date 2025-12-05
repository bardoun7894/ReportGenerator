"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function ThemeToggle() {
          const { theme, setTheme } = useTheme();
          const [mounted, setMounted] = useState(false);

          // Avoid hydration mismatch
          useEffect(() => {
                    setMounted(true);
          }, []);

          if (!mounted) return null;

          return (
                    <button
                              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                              aria-label="Toggle Theme"
                    >
                              {theme === "dark" ? (
                                        <SunIcon className="w-5 h-5 text-yellow-400" />
                              ) : (
                                        <MoonIcon className="w-5 h-5 text-slate-600" />
                              )}
                    </button>
          );
}

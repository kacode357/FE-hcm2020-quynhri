"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b border-red-500">
      <h1 className="text-2xl font-bold text-red-600">My App</h1>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-4 py-2 rounded-md border border-red-500 text-red-600 dark:text-red-300 dark:border-red-300 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}

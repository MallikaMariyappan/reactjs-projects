"use client";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-indigo-700 dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span className="text-white text-xl font-bold tracking-wide">TextCraft</span>
      </div>
      <button
        onClick={toggleDark}
        className="text-white bg-indigo-500 dark:bg-gray-700 hover:bg-indigo-400 dark:hover:bg-gray-600 transition px-4 py-2 rounded-lg text-sm font-medium"
        aria-label="Toggle dark mode"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

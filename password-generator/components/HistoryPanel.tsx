"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromHistory, clearHistory } from "@/store/passwordSlice";

const strengthColors: Record<string, string> = {
  "Very Weak":   "bg-red-100 text-red-700",
  "Weak":        "bg-orange-100 text-orange-700",
  "Fair":        "bg-yellow-100 text-yellow-700",
  "Strong":      "bg-lime-100 text-lime-700",
  "Very Strong": "bg-green-100 text-green-700",
};

export default function HistoryPanel() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((s) => s.password.history);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, pwd: string) => {
    await navigator.clipboard.writeText(pwd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 text-center">
        <p className="text-4xl mb-2">📋</p>
        <p className="text-gray-500 text-sm font-medium">No saved passwords yet.</p>
        <p className="text-gray-400 text-xs mt-1">Click Save on a password to store it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-gray-800">📋 Saved Passwords</h2>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-3 py-1 rounded-lg transition"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
          >
            {/* Label + strength + time */}
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <div className="flex items-center gap-2">
                {entry.label && (
                  <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                    {entry.label}
                  </span>
                )}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${strengthColors[entry.strength]}`}>
                  {entry.strength}
                </span>
              </div>
              <span className="text-xs text-gray-400">{entry.createdAt}</span>
            </div>

            {/* Password */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-800 flex-1 truncate">
                {entry.password}
              </span>
              <button
                onClick={() => handleCopy(entry.id, entry.password)}
                className={`flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-lg transition ${
                  copiedId === entry.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                aria-label="Copy password"
              >
                {copiedId === entry.id ? "✓" : "Copy"}
              </button>
              <button
                onClick={() => dispatch(removeFromHistory(entry.id))}
                className="flex-shrink-0 text-gray-300 hover:text-red-400 transition ml-1"
                aria-label="Delete saved password"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

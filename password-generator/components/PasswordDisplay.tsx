"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { generateNew, saveToHistory, setCopied } from "@/store/passwordSlice";

export default function PasswordDisplay() {
  const dispatch = useAppDispatch();
  const { currentPassword, copied } = useAppSelector((s) => s.password);
  const [showPassword, setShowPassword] = useState(true);
  const [labelInput, setLabelInput] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentPassword);
    dispatch(setCopied(true));
    setTimeout(() => dispatch(setCopied(false)), 2000);
  };

  const handleSave = () => {
    dispatch(saveToHistory(labelInput || undefined));
    setLabelInput("");
    setShowSaveInput(false);
  };

  // Color-code character types
  const renderPassword = () => {
    if (!showPassword) {
      return <span className="tracking-widest">{"•".repeat(Math.min(currentPassword.length, 32))}</span>;
    }
    return currentPassword.split("").map((char, i) => {
      let cls = "text-gray-200";
      if (/[A-Z]/.test(char)) cls = "text-blue-300";
      else if (/[a-z]/.test(char)) cls = "text-white";
      else if (/[0-9]/.test(char)) cls = "text-yellow-300";
      else cls = "text-pink-300";
      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-3">
      {/* Password display */}
      <div className="bg-gray-900 rounded-2xl p-4 border border-gray-700 relative group">
        <div
          className="font-mono text-lg sm:text-xl leading-relaxed break-all min-h-[3rem] select-all"
          aria-label="Generated password"
          aria-live="polite"
        >
          {renderPassword()}
        </div>

        {/* Color legend */}
        {showPassword && (
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-700 text-xs">
            <span className="text-blue-300">■ Uppercase</span>
            <span className="text-white">■ Lowercase</span>
            <span className="text-yellow-300">■ Numbers</span>
            <span className="text-pink-300">■ Symbols</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Regenerate */}
        <button
          onClick={() => dispatch(generateNew())}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition active:scale-95 shadow"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Regenerate
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition active:scale-95 shadow ${
            copied
              ? "bg-green-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>

        {/* Show/Hide */}
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition active:scale-95"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
          {showPassword ? "Hide" : "Show"}
        </button>

        {/* Save */}
        <button
          onClick={() => setShowSaveInput(!showSaveInput)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition active:scale-95"
        >
          💾 Save
        </button>
      </div>

      {/* Save with label */}
      {showSaveInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Label (e.g. Gmail, Bank...)"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

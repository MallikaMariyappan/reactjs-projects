"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setText,
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  removeExtraSpaces,
  reverseText,
  clearText,
} from "@/store/textSlice";

export default function TextEditor() {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.text.text);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "textcraft-output.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("File downloaded!");
  };

  const buttons = [
    { label: "UPPERCASE", action: () => dispatch(toUpperCase()), color: "bg-blue-500 hover:bg-blue-600" },
    { label: "lowercase", action: () => dispatch(toLowerCase()), color: "bg-green-500 hover:bg-green-600" },
    { label: "Title Case", action: () => dispatch(toTitleCase()), color: "bg-yellow-500 hover:bg-yellow-600" },
    { label: "Sentence case", action: () => dispatch(toSentenceCase()), color: "bg-purple-500 hover:bg-purple-600" },
    { label: "Remove Spaces", action: () => dispatch(removeExtraSpaces()), color: "bg-orange-500 hover:bg-orange-600" },
    { label: "Reverse Text", action: () => dispatch(reverseText()), color: "bg-pink-500 hover:bg-pink-600" },
  ];

  return (
    <div className="relative">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={`${btn.color} text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 shadow hover:shadow-md active:scale-95`}
          >
            {btn.label}
          </button>
        ))}
        <button
          onClick={() => { dispatch(clearText()); showToast("Text cleared!"); }}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 shadow hover:shadow-md active:scale-95"
        >
          Clear
        </button>
        <button
          onClick={handleCopy}
          className={`${copied ? "bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"} text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 shadow hover:shadow-md active:scale-95`}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
        <button
          onClick={handleDownload}
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 shadow hover:shadow-md active:scale-95"
        >
          Download
        </button>
      </div>

      {/* Textarea */}
      <textarea
        className="w-full min-h-[280px] p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base resize-y shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => dispatch(setText(e.target.value))}
        aria-label="Text editor input"
        spellCheck
      />

      {/* Preview */}
      {text && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Preview
          </h3>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap min-h-[80px]">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

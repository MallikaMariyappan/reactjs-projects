"use client";
import { useAppSelector } from "@/store/hooks";

export default function Display() {
  const { display, expression, angleMode, memory } = useAppSelector(
    (state) => state.calculator
  );

  // Dynamic font size based on display length
  const fontSize =
    display.length > 14
      ? "text-2xl"
      : display.length > 10
      ? "text-3xl"
      : display.length > 7
      ? "text-4xl"
      : "text-5xl";

  return (
    <div className="bg-gray-900 rounded-2xl p-5 mb-1 shadow-inner select-none">
      {/* Mode badges */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2">
          <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">
            {angleMode}
          </span>
          {memory !== 0 && (
            <span className="text-xs bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full font-medium">
              M: {memory}
            </span>
          )}
        </div>
      </div>

      {/* Expression */}
      <div className="text-gray-400 text-sm min-h-[1.5rem] text-right truncate mb-1 font-mono">
        {expression || "\u00A0"}
      </div>

      {/* Main display */}
      <div
        className={`text-white font-bold text-right font-mono tracking-tight leading-none ${fontSize} transition-all duration-100 overflow-hidden`}
        aria-live="polite"
        aria-label={`Calculator display: ${display}`}
      >
        {display}
      </div>
    </div>
  );
}

"use client";
import { useAppSelector } from "@/store/hooks";
import type { StrengthLevel } from "@/store/passwordSlice";

const strengthConfig: Record<StrengthLevel, { color: string; bg: string; bars: number; emoji: string }> = {
  "Very Weak":   { color: "text-red-600",    bg: "bg-red-500",    bars: 1, emoji: "🔴" },
  "Weak":        { color: "text-orange-600",  bg: "bg-orange-500", bars: 2, emoji: "🟠" },
  "Fair":        { color: "text-yellow-600",  bg: "bg-yellow-500", bars: 3, emoji: "🟡" },
  "Strong":      { color: "text-lime-600",    bg: "bg-lime-500",   bars: 4, emoji: "🟢" },
  "Very Strong": { color: "text-green-700",   bg: "bg-green-500",  bars: 5, emoji: "💚" },
};

export default function StrengthMeter() {
  const { currentStrength, strengthScore } = useAppSelector((s) => s.password);
  const cfg = strengthConfig[currentStrength];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-600">Password Strength</span>
        <span className={`font-bold ${cfg.color} flex items-center gap-1`}>
          {cfg.emoji} {currentStrength}
        </span>
      </div>

      {/* 5-bar indicator */}
      <div className="flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
              i < cfg.bars ? cfg.bg : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Score progress bar */}
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${cfg.bg} rounded-full transition-all duration-500`}
          style={{ width: `${strengthScore}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 text-right">Score: {strengthScore}/100</p>
    </div>
  );
}

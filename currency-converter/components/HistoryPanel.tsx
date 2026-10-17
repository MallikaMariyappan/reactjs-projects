"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearHistory } from "@/store/converterSlice";
import { currencyMap } from "@/data/currencies";

export default function HistoryPanel() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((s) => s.converter.history);

  const formatNum = (n: number, code: string) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 2,
      }).format(n);
    } catch {
      return `${n.toFixed(2)} ${code}`;
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center">
        <div className="text-4xl mb-2">📋</div>
        <p className="text-gray-500 text-sm">No conversions yet.</p>
        <p className="text-gray-400 text-xs mt-1">Your conversion history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-gray-800">📋 History</h2>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-xs text-red-400 hover:text-red-600 transition border border-red-200 hover:border-red-400 px-3 py-1 rounded-lg"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {history.map((entry, i) => {
          const fromInfo = currencyMap[entry.from];
          const toInfo = currencyMap[entry.to];
          return (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-1 flex-shrink-0">
                <span>{fromInfo?.flag}</span>
                <span className="text-gray-400 text-xs">→</span>
                <span>{toInfo?.flag}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {formatNum(entry.amount, entry.from)} → {formatNum(entry.result, entry.to)}
                </p>
                <p className="text-xs text-gray-400">{entry.timestamp}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                ×{entry.rate.toFixed(4)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

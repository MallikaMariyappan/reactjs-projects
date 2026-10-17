"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearHistory, loadFromHistory } from "@/store/calculatorSlice";

export default function HistoryPanel() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.calculator.history);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10 gap-3">
        <span className="text-4xl">📋</span>
        <p className="text-sm">No calculations yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-white font-semibold text-sm">History</h3>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-xs text-red-400 hover:text-red-300 transition"
        >
          Clear All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {history.map((entry, i) => (
          <button
            key={i}
            onClick={() => dispatch(loadFromHistory(entry.result))}
            className="w-full text-right bg-gray-800 hover:bg-gray-700 rounded-xl p-3 transition group"
          >
            <p className="text-gray-400 text-xs truncate group-hover:text-gray-300">
              {entry.expression}
            </p>
            <p className="text-white font-bold text-base truncate">{entry.result}</p>
            <p className="text-gray-600 text-xs">{entry.timestamp}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearHistory, loadJokeFromHistory } from "@/store/jokeSlice";

const categoryEmojis: Record<string, string> = {
  Programming: "💻", Pun: "🎭", Misc: "🎲",
  Dark: "🌑", Spooky: "👻", Christmas: "🎄", Any: "😂",
};

export default function HistoryPanel() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((s) => s.jokes.history);

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 text-center">
        <p className="text-5xl mb-3">📋</p>
        <p className="font-semibold text-gray-600 mb-1">No history yet</p>
        <p className="text-gray-400 text-sm">Jokes you view will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-gray-800">
          📋 Recent Jokes <span className="text-gray-400">({history.length})</span>
        </h2>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {history.map((joke, i) => (
          <button
            key={`${joke.id}-${i}`}
            onClick={() => dispatch(loadJokeFromHistory(joke))}
            className="w-full text-left bg-gray-50 hover:bg-yellow-50 border border-gray-100 hover:border-yellow-200 rounded-xl px-4 py-3 transition group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-500">
                {categoryEmojis[joke.category]} {joke.category}
              </span>
              <span className="text-xs text-gray-400">{joke.savedAt}</span>
            </div>
            <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
              {joke.type === "single"
                ? joke.joke
                : joke.setup}
            </p>
            <p className="text-xs text-yellow-600 mt-1 opacity-0 group-hover:opacity-100 transition">
              Click to reload →
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

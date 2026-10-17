"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory, toggleSafeMode, fetchJoke } from "@/store/jokeSlice";
import type { JokeCategory } from "@/store/jokeSlice";

const categories: { id: JokeCategory; emoji: string; label: string }[] = [
  { id: "Any",         emoji: "🎲", label: "Any" },
  { id: "Programming", emoji: "💻", label: "Programming" },
  { id: "Pun",         emoji: "🎭", label: "Pun" },
  { id: "Misc",        emoji: "🎪", label: "Misc" },
  { id: "Dark",        emoji: "🌑", label: "Dark" },
  { id: "Spooky",      emoji: "👻", label: "Spooky" },
  { id: "Christmas",   emoji: "🎄", label: "Christmas" },
];

export default function Controls() {
  const dispatch = useAppDispatch();
  const { category, safeMode, streak, totalFetched } = useAppSelector(
    (s) => s.jokes
  );

  const handleCategory = (cat: JokeCategory) => {
    dispatch(setCategory(cat));
    dispatch(fetchJoke({ category: cat, safeMode }));
  };

  return (
    <div className="space-y-4">
      {/* Stats strip */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur rounded-2xl px-5 py-3 border border-white shadow-sm">
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-extrabold text-gray-800 text-lg leading-none">{totalFetched}</p>
            <p className="text-gray-400 text-xs">Jokes Seen</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="font-extrabold text-yellow-500 text-lg leading-none">🔥 {streak}</p>
            <p className="text-gray-400 text-xs">Streak</p>
          </div>
        </div>

        {/* Safe mode toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-xs font-semibold text-gray-600">Safe Mode</span>
          <div
            onClick={() => dispatch(toggleSafeMode())}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              safeMode ? "bg-green-500" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={safeMode}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && dispatch(toggleSafeMode())}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                safeMode ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-lg">{safeMode ? "🛡️" : "⚠️"}</span>
        </label>
      </div>

      {/* Category pills */}
      <div className="bg-white/60 backdrop-blur rounded-2xl px-4 py-4 border border-white shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-95 ${
                category === cat.id
                  ? "bg-yellow-400 text-gray-900 shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-700"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

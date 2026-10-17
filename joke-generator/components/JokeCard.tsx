"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchJoke,
  revealPunchline,
  toggleFavorite,
} from "@/store/jokeSlice";

const categoryEmojis: Record<string, string> = {
  Programming: "💻",
  Pun: "🎭",
  Misc: "🎲",
  Dark: "🌑",
  Spooky: "👻",
  Christmas: "🎄",
  Any: "😂",
};

export default function JokeCard() {
  const dispatch = useAppDispatch();
  const { current, loading, error, category, safeMode, showPunchline, favorites } =
    useAppSelector((s) => s.jokes);
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isFavorited = current
    ? favorites.some((f) => f.id === current.id)
    : false;

  // Fetch on first load
  useEffect(() => {
    dispatch(fetchJoke({ category, safeMode }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
    dispatch(fetchJoke({ category, safeMode }));
  };

  const handleCopy = async () => {
    if (!current) return;
    const text =
      current.type === "single"
        ? current.joke!
        : `${current.setup}\n\n${current.delivery}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!current) return;
    const text =
      current.type === "single"
        ? current.joke!
        : `${current.setup} — ${current.delivery}`;
    if (navigator.share) {
      await navigator.share({ title: "Here's a joke!", text });
    } else {
      handleCopy();
    }
  };

  const emoji = categoryEmojis[current?.category ?? "Any"] ?? "😂";

  return (
    <div
      className={`transition-all duration-300 ${
        isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-yellow-100 overflow-hidden">
        {/* Card header strip */}
        <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400" />

        <div className="p-8">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="text-6xl animate-bounce">😂</div>
              <p className="text-gray-500 font-medium animate-pulse">
                Finding the perfect joke...
              </p>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Joke content */}
          {!loading && current && (
            <div>
              {/* Category badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  <span>{emoji}</span>
                  {current.category}
                </span>
                <div className="flex items-center gap-2">
                  {!current.safe && (
                    <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-1 rounded-full">
                      🔞 Mature
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-mono">#{current.id}</span>
                </div>
              </div>

              {/* Two-part joke */}
              {current.type === "twopart" ? (
                <div className="space-y-6">
                  {/* Setup */}
                  <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-400">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">
                      Setup 🎯
                    </p>
                    <p className="text-gray-800 text-xl font-semibold leading-relaxed">
                      {current.setup}
                    </p>
                  </div>

                  {/* Punchline reveal */}
                  {showPunchline ? (
                    <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-400 animate-fadeIn">
                      <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">
                        Punchline 🥁
                      </p>
                      <p className="text-gray-800 text-xl font-bold leading-relaxed">
                        {current.delivery}
                      </p>
                      <p className="text-3xl mt-3">😂</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => dispatch(revealPunchline())}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 rounded-2xl text-lg transition shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      🥁 Reveal Punchline
                    </button>
                  )}
                </div>
              ) : (
                /* Single joke */
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 text-center">
                  <p className="text-6xl mb-5">😂</p>
                  <p className="text-gray-800 text-xl sm:text-2xl font-semibold leading-relaxed">
                    {current.joke}
                  </p>
                </div>
              )}

              {/* Error notice (fallback) */}
              {error && (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 mt-4 flex items-center gap-2">
                  ⚠️ {error}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {/* Next joke */}
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-gray-900 font-bold px-6 py-3 rounded-xl transition shadow active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Next Joke
                </button>

                {/* Favorite */}
                <button
                  onClick={() => dispatch(toggleFavorite())}
                  className={`flex items-center gap-2 font-bold px-4 py-3 rounded-xl transition active:scale-95 ${
                    isFavorited
                      ? "bg-red-500 text-white shadow"
                      : "bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500"
                  }`}
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorited ? "❤️" : "🤍"} {isFavorited ? "Saved" : "Save"}
                </button>

                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 font-bold px-4 py-3 rounded-xl transition active:scale-95 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                  aria-label="Copy joke"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-4 py-3 rounded-xl transition active:scale-95"
                  aria-label="Share joke"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          )}

          {/* Empty / error state */}
          {!loading && !current && (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">😶</p>
              <p className="text-gray-500 mb-4">No joke loaded yet.</p>
              <button
                onClick={handleNext}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition"
              >
                Get a Joke!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFavorite, clearFavorites, loadJokeFromHistory } from "@/store/jokeSlice";

const categoryEmojis: Record<string, string> = {
  Programming: "💻", Pun: "🎭", Misc: "🎲",
  Dark: "🌑", Spooky: "👻", Christmas: "🎄", Any: "😂",
};

export default function FavoritesPanel() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.jokes.favorites);

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 text-center">
        <p className="text-5xl mb-3">🤍</p>
        <p className="font-semibold text-gray-600 mb-1">No favorites yet</p>
        <p className="text-gray-400 text-sm">Click ❤️ Save on a joke to add it here.</p>
      </div>
    );
  }

  const getJokeText = (joke: (typeof favorites)[0]) =>
    joke.type === "single"
      ? joke.joke!
      : `${joke.setup} ... ${joke.delivery}`;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-gray-800">
          ❤️ Favorites <span className="text-red-400">({favorites.length})</span>
        </h2>
        <button
          onClick={() => dispatch(clearFavorites())}
          className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {favorites.map((joke) => (
          <div
            key={joke.id}
            className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 group"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded-full">
                {categoryEmojis[joke.category]} {joke.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{joke.savedAt}</span>
                <button
                  onClick={() => dispatch(removeFavorite(joke.id))}
                  className="text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                  aria-label="Remove favorite"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Joke text */}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {getJokeText(joke)}
            </p>

            {/* Load button */}
            <button
              onClick={() => dispatch(loadJokeFromHistory(joke))}
              className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 font-semibold transition opacity-0 group-hover:opacity-100"
            >
              View full joke →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

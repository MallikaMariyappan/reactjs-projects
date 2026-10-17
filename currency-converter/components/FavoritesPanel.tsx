"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadFavorite, toggleFavorite, convert } from "@/store/converterSlice";
import { currencyMap } from "@/data/currencies";

export default function FavoritesPanel() {
  const dispatch = useAppDispatch();
  const { favorites, rates, amount } = useAppSelector((s) => s.converter);

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center">
        <div className="text-4xl mb-2">⭐</div>
        <p className="text-gray-500 text-sm">No favorite pairs yet.</p>
        <p className="text-gray-400 text-xs mt-1">Click ★ on any rate to save it.</p>
      </div>
    );
  }

  const getRate = (pair: string) => {
    const [from, to] = pair.split("-");
    const fromRate = rates[from] ?? 1;
    const toRate = rates[to] ?? 1;
    return toRate / fromRate;
  };

  const getConverted = (pair: string) => {
    const amt = parseFloat(amount) || 1;
    return amt * getRate(pair);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
      <h2 className="text-lg font-extrabold text-gray-800 mb-4">⭐ Favorite Pairs</h2>
      <div className="space-y-2">
        {favorites.map((pair) => {
          const [from, to] = pair.split("-");
          const fromInfo = currencyMap[from];
          const toInfo = currencyMap[to];
          const rate = getRate(pair);
          const converted = getConverted(pair);

          return (
            <div
              key={pair}
              className="flex items-center gap-3 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3"
            >
              {/* Flags */}
              <span className="text-lg">{fromInfo?.flag}</span>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-lg">{toInfo?.flag}</span>

              {/* Pair info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm">
                  {from} → {to}
                </p>
                <p className="text-xs text-gray-400">
                  1 {from} = {rate.toFixed(4)} {to}
                </p>
              </div>

              {/* Converted amount */}
              <div className="text-right">
                <p className="font-bold text-gray-800 text-sm">
                  {converted.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">{to}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-1 ml-1">
                <button
                  onClick={() => {
                    dispatch(loadFavorite(pair));
                    dispatch(convert());
                  }}
                  className="text-blue-500 hover:text-blue-700 transition text-xs px-2 py-1 rounded-lg hover:bg-blue-50"
                  title="Load this pair"
                >
                  Use
                </button>
                <button
                  onClick={() => dispatch(toggleFavorite(pair))}
                  className="text-yellow-500 hover:text-red-500 transition text-lg leading-none"
                  title="Remove from favorites"
                >
                  ★
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

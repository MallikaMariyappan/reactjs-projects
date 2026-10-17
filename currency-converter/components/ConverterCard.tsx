"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFromCurrency,
  setToCurrency,
  setAmount,
  swapCurrencies,
  convert,
  fetchRates,
  toggleFavorite,
} from "@/store/converterSlice";
import { currencyMap } from "@/data/currencies";
import CurrencySelect from "./CurrencySelect";

export default function ConverterCard() {
  const dispatch = useAppDispatch();
  const {
    fromCurrency,
    toCurrency,
    amount,
    result,
    rates,
    loading,
    error,
    lastUpdated,
    favorites,
  } = useAppSelector((state) => state.converter);

  // Fetch live rates on mount
  useEffect(() => {
    dispatch(fetchRates("USD"));
  }, [dispatch]);

  const fromInfo = currencyMap[fromCurrency];
  const toInfo = currencyMap[toCurrency];

  const rate =
    rates[fromCurrency] && rates[toCurrency]
      ? rates[toCurrency] / rates[fromCurrency]
      : null;

  const pairKey = `${fromCurrency}-${toCurrency}`;
  const isFav = favorites.includes(pairKey);

  const handleConvert = () => {
    dispatch(convert());
  };

  const formatNumber = (n: number, code: string) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 4,
      }).format(n);
    } catch {
      return `${n.toFixed(4)} ${code}`;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold">Currency Converter</h2>
            <p className="text-blue-200 text-xs mt-0.5">
              {loading ? (
                <span className="animate-pulse">Fetching live rates...</span>
              ) : (
                <>🕒 {lastUpdated}</>
              )}
            </p>
          </div>
          <button
            onClick={() => dispatch(fetchRates(fromCurrency))}
            disabled={loading}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded-xl px-3 py-2 text-sm font-medium transition flex items-center gap-1"
            aria-label="Refresh rates"
          >
            <span className={loading ? "animate-spin inline-block" : ""}>🔄</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2 text-yellow-700 text-xs flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}

      <div className="p-6 space-y-5">
        {/* Amount input */}
        <div>
          <label htmlFor="amount" className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
              {fromInfo?.symbol}
            </span>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => dispatch(setAmount(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && handleConvert()}
              min="0"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 text-lg font-bold transition"
              placeholder="Enter amount"
              aria-label="Amount to convert"
            />
          </div>
        </div>

        {/* Currency selectors + Swap */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <CurrencySelect
            id="from"
            label="From"
            value={fromCurrency}
            onChange={(code) => dispatch(setFromCurrency(code))}
          />

          {/* Swap button */}
          <button
            onClick={() => dispatch(swapCurrencies())}
            className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition active:scale-95 mb-[1.6rem]"
            aria-label="Swap currencies"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4M4 17h12M4 17l4 4M4 17l4-4" />
            </svg>
          </button>

          <CurrencySelect
            id="to"
            label="To"
            value={toCurrency}
            onChange={(code) => dispatch(setToCurrency(code))}
          />
        </div>

        {/* Live rate display */}
        {rate && (
          <div className="bg-blue-50 rounded-xl px-4 py-2.5 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              1 {fromCurrency} =
            </span>
            <span className="font-bold text-blue-700">
              {rate.toFixed(6)} {toCurrency}
            </span>
            <button
              onClick={() => dispatch(toggleFavorite(pairKey))}
              className={`ml-2 text-lg transition ${isFav ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              title={isFav ? "Remove favorite" : "Save as favorite"}
            >
              ★
            </button>
          </div>
        )}

        {/* Convert button */}
        <button
          onClick={handleConvert}
          disabled={loading || !amount}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-base transition shadow-md hover:shadow-lg active:scale-[0.99]"
        >
          {loading ? "Fetching rates..." : "Convert"}
        </button>

        {/* Result */}
        {result !== null && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 text-center">
            <p className="text-gray-500 text-sm mb-1">
              {amount} {fromInfo?.name} =
            </p>
            <div className="text-4xl font-extrabold text-green-700 mb-1">
              {toInfo?.flag} {formatNumber(result, toCurrency)}
            </div>
            <p className="text-gray-400 text-xs">
              Rate: 1 {fromCurrency} = {rate?.toFixed(6)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

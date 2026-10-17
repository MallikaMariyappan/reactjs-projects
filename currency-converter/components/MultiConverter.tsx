"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { convert, setToCurrency } from "@/store/converterSlice";
import { currencyMap } from "@/data/currencies";

export default function MultiConverter() {
  const dispatch = useAppDispatch();
  const { fromCurrency, amount, rates, multiList } = useAppSelector(
    (state) => state.converter
  );

  const amountNum = parseFloat(amount) || 0;
  const fromRate = rates[fromCurrency] ?? 1;

  const getConverted = (toCode: string) => {
    const toRate = rates[toCode] ?? 1;
    return (amountNum / fromRate) * toRate;
  };

  const formatNum = (n: number, code: string) => {
    if (isNaN(n) || !isFinite(n)) return "—";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 2,
      }).format(n);
    } catch {
      return n.toFixed(2);
    }
  };

  const handleUseRate = (code: string) => {
    dispatch(setToCurrency(code));
    dispatch(convert());
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-gray-800">
          📊 Multi-Currency View
        </h2>
        <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {amountNum} {fromCurrency}
        </span>
      </div>

      <div className="space-y-2">
        {multiList.map((code) => {
          const info = currencyMap[code];
          if (!info) return null;
          const converted = getConverted(code);

          return (
            <button
              key={code}
              onClick={() => handleUseRate(code)}
              className="w-full flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl px-4 py-3 transition group"
              title={`Use ${code} as target currency`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{info.flag}</span>
                <div className="text-left">
                  <p className="font-bold text-gray-800 text-sm">{info.code}</p>
                  <p className="text-xs text-gray-400">{info.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition">
                  {formatNum(converted, code)}
                </p>
                <p className="text-xs text-gray-400">
                  1 {fromCurrency} = {(rates[code] / (rates[fromCurrency] ?? 1)).toFixed(4)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Click any row to use it as your conversion target
      </p>
    </div>
  );
}

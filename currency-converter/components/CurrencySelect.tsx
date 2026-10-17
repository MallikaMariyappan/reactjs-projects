"use client";
import { currencies, currencyMap } from "@/data/currencies";

interface Props {
  value: string;
  onChange: (code: string) => void;
  label: string;
  id: string;
}

export default function CurrencySelect({ value, onChange, label, id }: Props) {
  const selected = currencyMap[value];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none select-none">
          {selected?.flag}
        </div>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white text-gray-800 font-semibold text-sm appearance-none cursor-pointer transition"
          aria-label={label}
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code} — {c.name}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p className="text-xs text-gray-400 pl-1">{selected?.name}</p>
    </div>
  );
}

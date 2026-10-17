"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOption, usePreset } from "@/store/passwordSlice";
import type { PasswordOptions } from "@/store/passwordSlice";

type SetOptionPayload<K extends keyof PasswordOptions> = {
  key: K;
  value: PasswordOptions[K];
};

export default function OptionsPanel() {
  const dispatch = useAppDispatch();
  const options = useAppSelector((s) => s.password.options);

  const set = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    dispatch(setOption({ key, value } as SetOptionPayload<K>));
  };

  const presets = [
    { id: "pin",       label: "📌 PIN",       desc: "6-digit numeric" },
    { id: "memorable", label: "💬 Memorable",  desc: "12 chars, no symbols" },
    { id: "strong",    label: "🔒 Strong",     desc: "16 chars, all types" },
    { id: "maximum",   label: "🛡️ Maximum",   desc: "32 chars, maximum entropy" },
  ] as const;

  const toggles = [
    { key: "useUppercase" as const, label: "Uppercase",  example: "A–Z",     color: "text-blue-600" },
    { key: "useLowercase" as const, label: "Lowercase",  example: "a–z",     color: "text-gray-600" },
    { key: "useNumbers"  as const, label: "Numbers",    example: "0–9",     color: "text-yellow-600" },
    { key: "useSymbols"  as const, label: "Symbols",    example: "!@#$...", color: "text-pink-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Presets</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => dispatch(usePreset(p.id))}
              className="bg-gray-100 hover:bg-purple-100 hover:border-purple-300 border border-gray-200 rounded-xl px-3 py-3 text-left transition group"
            >
              <p className="font-semibold text-gray-800 text-sm group-hover:text-purple-700">{p.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Length slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-gray-700">Password Length</label>
          <span className="bg-purple-600 text-white font-bold text-sm w-10 h-10 rounded-xl flex items-center justify-center">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min={4}
          max={64}
          value={options.length}
          onChange={(e) => set("length", Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600"
          aria-label="Password length"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>4</span>
          <span>16</span>
          <span>32</span>
          <span>64</span>
        </div>
      </div>

      {/* Character type toggles */}
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Character Types</h3>
        <div className="grid grid-cols-2 gap-3">
          {toggles.map((t) => (
            <label
              key={t.key}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${
                options[t.key]
                  ? "border-purple-400 bg-purple-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={options[t.key] as boolean}
                onChange={(e) => set(t.key, e.target.checked)}
                className="w-4 h-4 accent-purple-600"
                aria-label={t.label}
              />
              <div>
                <p className={`text-sm font-semibold ${options[t.key] ? "text-purple-700" : "text-gray-600"}`}>
                  {t.label}
                </p>
                <p className={`text-xs font-mono ${t.color}`}>{t.example}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Advanced options */}
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Advanced Options</h3>
        <div className="space-y-3">
          {/* Exclude ambiguous */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-gray-700">Exclude Ambiguous</p>
              <p className="text-xs text-gray-400">Remove 0, O, 1, l, I (look-alike chars)</p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={options.excludeAmbiguous}
                onChange={(e) => set("excludeAmbiguous", e.target.checked)}
                className="sr-only"
                aria-label="Exclude ambiguous characters"
              />
              <div
                onClick={() => set("excludeAmbiguous", !options.excludeAmbiguous)}
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  options.excludeAmbiguous ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md mt-0.5 transition-transform ${
                    options.excludeAmbiguous ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
          </label>

          {/* Min numbers */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-sm font-semibold text-gray-700">Min Numbers</p>
              <p className="text-xs text-gray-400">Minimum digits guaranteed</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => set("minNumbers", Math.max(0, options.minNumbers - 1))}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600 transition">−</button>
              <span className="w-6 text-center font-bold text-gray-800">{options.minNumbers}</span>
              <button onClick={() => set("minNumbers", Math.min(Math.floor(options.length / 4), options.minNumbers + 1))}
                disabled={!options.useNumbers}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600 transition disabled:opacity-40">+</button>
            </div>
          </div>

          {/* Min symbols */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-sm font-semibold text-gray-700">Min Symbols</p>
              <p className="text-xs text-gray-400">Minimum symbols guaranteed</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => set("minSymbols", Math.max(0, options.minSymbols - 1))}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600 transition">−</button>
              <span className="w-6 text-center font-bold text-gray-800">{options.minSymbols}</span>
              <button onClick={() => set("minSymbols", Math.min(Math.floor(options.length / 4), options.minSymbols + 1))}
                disabled={!options.useSymbols}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600 transition disabled:opacity-40">+</button>
            </div>
          </div>

          {/* Custom symbols */}
          {options.useSymbols && (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.useCustomSymbols}
                  onChange={(e) => set("useCustomSymbols", e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                  aria-label="Use custom symbols"
                />
                <span className="text-sm font-semibold text-gray-700">Use Custom Symbols</span>
              </label>
              {options.useCustomSymbols && (
                <input
                  type="text"
                  value={options.customSymbols}
                  onChange={(e) => set("customSymbols", e.target.value)}
                  placeholder="e.g. !@#$%"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Custom symbol characters"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

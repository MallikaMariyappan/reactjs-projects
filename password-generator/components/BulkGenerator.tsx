"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { generateBulk, setBulkCount } from "@/store/passwordSlice";

export default function BulkGenerator() {
  const dispatch = useAppDispatch();
  const { bulkPasswords, bulkCount } = useAppSelector((s) => s.password);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (pwd: string, i: number) => {
    await navigator.clipboard.writeText(pwd);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(bulkPasswords.join("\n"));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([bulkPasswords.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `passwords-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-lg font-extrabold text-gray-800 mb-4">⚡ Bulk Generator</h2>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-600" htmlFor="bulkCount">Count:</label>
          <input
            id="bulkCount"
            type="number"
            min={1}
            max={50}
            value={bulkCount}
            onChange={(e) => dispatch(setBulkCount(Number(e.target.value)))}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Number of passwords to generate"
          />
        </div>
        <button
          onClick={() => dispatch(generateBulk())}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow active:scale-95"
        >
          Generate {bulkCount} Passwords
        </button>

        {bulkPasswords.length > 0 && (
          <>
            <button
              onClick={handleCopyAll}
              className={`font-semibold px-4 py-2.5 rounded-xl text-sm transition ${
                copiedIdx === -1 ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {copiedIdx === -1 ? "✓ All Copied!" : "Copy All"}
            </button>
            <button
              onClick={handleDownload}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition"
            >
              💾 Download .txt
            </button>
          </>
        )}
      </div>

      {/* Password list */}
      {bulkPasswords.length > 0 ? (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {bulkPasswords.map((pwd, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-900 rounded-xl px-4 py-2.5 group"
            >
              <span className="text-gray-500 text-xs w-5 flex-shrink-0 font-mono">{i + 1}.</span>
              <span className="font-mono text-sm text-gray-100 flex-1 truncate">{pwd}</span>
              <button
                onClick={() => handleCopy(pwd, i)}
                className={`flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-lg transition ${
                  copiedIdx === i
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300 opacity-0 group-hover:opacity-100"
                }`}
                aria-label={`Copy password ${i + 1}`}
              >
                {copiedIdx === i ? "✓" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">🔑</p>
          <p className="text-sm">Click Generate to create multiple passwords at once.</p>
        </div>
      )}
    </div>
  );
}

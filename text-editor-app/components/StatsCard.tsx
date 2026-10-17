"use client";
import { useAppSelector } from "@/store/hooks";

export default function StatsCard() {
  const { wordCount, charCount, charCountNoSpaces, sentenceCount, paragraphCount, readingTime } =
    useAppSelector((state) => state.text);

  const stats = [
    { label: "Words", value: wordCount, icon: "📝" },
    { label: "Characters", value: charCount, icon: "🔤" },
    { label: "Chars (no spaces)", value: charCountNoSpaces, icon: "🔡" },
    { label: "Sentences", value: sentenceCount, icon: "📖" },
    { label: "Paragraphs", value: paragraphCount, icon: "📄" },
    { label: "Reading Time", value: readingTime, icon: "⏱️" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700"
        >
          <span className="text-2xl mb-1">{stat.icon}</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {stat.value}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

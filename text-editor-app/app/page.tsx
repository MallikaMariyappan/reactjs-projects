import TextEditor from "@/components/TextEditor";
import StatsCard from "@/components/StatsCard";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">
          TextCraft
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your all-in-one text manipulation and analysis tool
        </p>
      </div>

      {/* Stats */}
      <StatsCard />

      {/* Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          ✏️ Text Editor
        </h2>
        <TextEditor />
      </div>

      {/* Features Info */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Case Conversion", desc: "Uppercase, lowercase, title case & sentence case", icon: "🔠" },
          { title: "Text Cleanup", desc: "Remove extra spaces and unwanted whitespace", icon: "🧹" },
          { title: "Text Reverse", desc: "Reverse your entire text with one click", icon: "🔄" },
          { title: "Live Stats", desc: "Words, characters, sentences & reading time", icon: "📊" },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{f.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

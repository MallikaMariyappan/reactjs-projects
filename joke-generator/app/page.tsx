import JokeCard from "@/components/JokeCard";
import Controls from "@/components/Controls";
import FavoritesPanel from "@/components/FavoritesPanel";
import HistoryPanel from "@/components/HistoryPanel";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="flex justify-center gap-3 text-5xl mb-4">
          😂 🤣 😆
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
          Random <span className="text-yellow-500">Joke</span> Generator
        </h1>
        <p className="text-gray-500 text-lg max-w-lg mx-auto">
          A fresh joke, any time you need one. Pick a category, reveal the punchline,
          and share the laughs!
        </p>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: controls + favorites + history */}
        <div className="space-y-5">
          <Controls />
          <FavoritesPanel />
          <HistoryPanel />
        </div>

        {/* Right column: joke card (spans 2 cols) */}
        <div className="lg:col-span-2">
          <JokeCard />

          {/* Info cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { icon: "🎭", title: "7 Categories", desc: "Programming, Puns, Dark & more" },
              { icon: "🥁", title: "Punchline Reveal", desc: "Two-part jokes with suspense" },
              { icon: "❤️", title: "Save Favorites", desc: "Keep the funniest ones" },
              { icon: "🛡️", title: "Safe Mode", desc: "Family-friendly filter" },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow text-center"
              >
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm">{f.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-400 text-xs mt-10">
        Jokes provided by{" "}
        <a
          href="https://jokeapi.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-500 hover:underline"
        >
          JokeAPI v2
        </a>{" "}
        — a free, open-source joke API 🎉
      </p>
    </div>
  );
}

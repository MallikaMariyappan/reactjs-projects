import ConverterCard from "@/components/ConverterCard";
import MultiConverter from "@/components/MultiConverter";
import FavoritesPanel from "@/components/FavoritesPanel";
import HistoryPanel from "@/components/HistoryPanel";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
          💱 Live Currency <span className="text-blue-600">Converter</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Convert between 38+ world currencies with real-time exchange rates.
          Save favorite pairs, view history, and compare multiple currencies.
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Converter */}
        <div className="lg:col-span-1">
          <ConverterCard />
        </div>

        {/* Right: Multi + Favorites + History */}
        <div className="lg:col-span-2 space-y-6">
          <MultiConverter />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FavoritesPanel />
            <HistoryPanel />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "🌍", title: "38+ Currencies", desc: "All major world currencies" },
          { icon: "⚡", title: "Live Rates", desc: "Auto-fetched from open.er-api.com" },
          { icon: "⭐", title: "Favorites", desc: "Save your most-used pairs" },
          { icon: "📊", title: "Multi-View", desc: "Compare 8 currencies at once" },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl p-4 shadow border border-gray-100 text-center"
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-gray-800 text-sm">{f.title}</h3>
            <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-xs mt-6">
        Rates provided by{" "}
        <a
          href="https://open.er-api.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          open.er-api.com
        </a>{" "}
        · For informational purposes only
      </p>
    </div>
  );
}

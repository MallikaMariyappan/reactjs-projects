import PasswordDisplay from "@/components/PasswordDisplay";
import StrengthMeter from "@/components/StrengthMeter";
import OptionsPanel from "@/components/OptionsPanel";
import BulkGenerator from "@/components/BulkGenerator";
import HistoryPanel from "@/components/HistoryPanel";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
          🔐 Pass<span className="text-purple-400">Forge</span>
        </h1>
        <p className="text-purple-200 text-lg max-w-xl mx-auto">
          Generate powerful, customizable passwords with real-time strength analysis.
          Built for security, designed for simplicity.
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Options */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-6">
            <h2 className="text-lg font-extrabold text-gray-800 mb-5">⚙️ Options</h2>
            <OptionsPanel />
          </div>
        </div>

        {/* Right: Generator + History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Generator card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4">🔑 Your Password</h2>
            <PasswordDisplay />
            <div className="mt-5">
              <StrengthMeter />
            </div>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📏", title: "Use 16+ chars", desc: "Longer passwords are exponentially harder to crack" },
              { icon: "🎲", title: "Mix it up", desc: "Combine uppercase, numbers, and symbols for max entropy" },
              { icon: "🔄", title: "Unique per site", desc: "Never reuse passwords — use a password manager" },
            ].map((tip) => (
              <div key={tip.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{tip.title}</h3>
                <p className="text-purple-300 text-xs">{tip.desc}</p>
              </div>
            ))}
          </div>

          {/* Bulk Generator */}
          <BulkGenerator />

          {/* History */}
          <HistoryPanel />
        </div>
      </div>
    </div>
  );
}

import Calculator from "@/components/Calculator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="text-center pt-10 pb-4 px-4">
        <h1 className="text-3xl font-extrabold text-white mb-1">
          Calc<span className="text-orange-500">Pro</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Advanced Scientific Calculator · Redux Powered
        </p>
      </header>

      {/* Calculator */}
      <main className="flex-1 flex items-start justify-center px-4 pb-10 pt-4">
        <Calculator />
      </main>

      {/* Features strip */}
      <section className="border-t border-gray-800 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🔢", title: "Basic Arithmetic", desc: "+  −  ×  ÷  %" },
            { icon: "📐", title: "Scientific", desc: "sin cos tan log ln" },
            { icon: "⚡", title: "Power & Roots", desc: "x² x³ √ ∛ xʸ e^x" },
            { icon: "📋", title: "History", desc: "Last 20 calculations" },
          ].map((f) => (
            <div key={f.title} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs font-mono">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

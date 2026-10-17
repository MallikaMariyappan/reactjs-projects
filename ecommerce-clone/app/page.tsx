import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-2">
            🔥 Limited Time Offer
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
            Up to <span className="text-yellow-300">50% OFF</span>
            <br />on Top Brands
          </h1>
          <p className="text-orange-100 text-sm">Free shipping on orders over $100</p>
        </div>
        <div className="flex gap-4 text-white text-center">
          {[
            { value: "200+", label: "Products" },
            { value: "50+", label: "Brands" },
            { value: "4.8★", label: "Rating" },
          ].map((s) => (
            <div key={s.label} className="bg-white/20 rounded-2xl px-5 py-4">
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-xs opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar />
      </div>

      {/* Products */}
      <ProductGrid />
    </div>
  );
}

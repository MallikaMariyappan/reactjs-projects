"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory, setSortBy, setSearch, resetFilters } from "@/store/filterSlice";
import { categories } from "@/data/products";

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const { category, sortBy, search } = useAppSelector((state) => state.filter);

  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search products..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Category */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                category === cat
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          aria-label="Sort products"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => dispatch(resetFilters())}
          className="text-sm text-gray-500 hover:text-orange-500 underline transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

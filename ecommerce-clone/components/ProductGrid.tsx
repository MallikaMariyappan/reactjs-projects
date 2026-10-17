"use client";
import { useMemo } from "react";
import { products } from "@/data/products";
import { useAppSelector } from "@/store/hooks";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { category, sortBy, search } = useAppSelector((state) => state.filter);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list.sort((a, b) => b.discount - a.discount);
        break;
    }

    return list;
  }, [category, sortBy, search]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-400 text-sm">Try changing your filters or search query.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-gray-700">{filtered.length}</span> products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

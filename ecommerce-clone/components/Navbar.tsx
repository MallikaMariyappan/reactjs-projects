"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-xl font-extrabold text-gray-800">
            Shop<span className="text-orange-500">Kart</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/wishlist"
            className="relative flex items-center gap-1 text-gray-600 hover:text-red-500 transition text-sm font-medium"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-orange-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </nav>
  );
}

function SearchBar() {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}

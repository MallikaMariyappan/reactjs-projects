"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);
  const cartIds = useAppSelector((state) => state.cart.items.map((i) => i.id));

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">💝</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your wishlist is empty</h2>
        <p className="text-gray-400 mb-6">Save items you love to your wishlist.</p>
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold inline-block transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        💝 My Wishlist <span className="text-orange-500">({items.length})</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-50">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="300px" />
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow hover:bg-red-600 transition"
                aria-label="Remove from wishlist"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs text-orange-500 font-semibold uppercase mb-1">{item.brand}</p>
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2">{item.name}</h3>
              <div className="flex items-center gap-2 mb-4 mt-auto">
                <span className="text-lg font-bold text-gray-900">${item.price}</span>
                {item.discount > 0 && (
                  <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full">
                    -{item.discount}%
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    dispatch(addToCart(item));
                  }}
                  disabled={!item.inStock}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                    !item.inStock
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : cartIds.includes(item.id)
                      ? "bg-orange-100 text-orange-700"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {!item.inStock ? "Out of Stock" : cartIds.includes(item.id) ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

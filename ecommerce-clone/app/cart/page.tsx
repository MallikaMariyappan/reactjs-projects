"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "@/store/cartSlice";
import CartSummary from "@/components/CartSummary";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold inline-block transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          🛒 My Cart <span className="text-orange-500">({items.length})</span>
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-500 hover:text-red-700 border border-red-300 hover:border-red-500 px-4 py-1.5 rounded-lg transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow border border-gray-100 p-4 flex gap-4 items-start"
            >
              {/* Image */}
              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-orange-500 font-semibold uppercase mb-0.5">{item.brand}</p>
                <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-2">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">${item.price}</span>
                  {item.discount > 0 && (
                    <span className="text-xs text-gray-400 line-through">${item.originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Quantity + Remove */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Remove item"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-orange-400 flex items-center justify-center text-gray-600 hover:text-orange-500 transition font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-orange-400 flex items-center justify-center text-gray-600 hover:text-orange-500 transition font-bold"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-bold text-orange-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

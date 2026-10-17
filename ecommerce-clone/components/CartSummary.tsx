"use client";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function CartSummary() {
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = items.reduce((sum, i) => sum + i.originalPrice * i.quantity, 0);
  const savings = originalTotal - subtotal;
  const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 9.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>You Save</span>
            <span className="font-semibold">-${savings.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600 font-semibold">FREE</span>
            ) : (
              `$${shipping}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span className="font-medium">${tax}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span className="text-orange-500">${total}</span>
          </div>
        </div>
      </div>

      {subtotal < 100 && subtotal > 0 && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700">
          🚚 Add <strong>${(100 - subtotal).toFixed(2)}</strong> more to get FREE shipping!
        </div>
      )}

      <button
        disabled={items.length === 0}
        className="mt-5 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition"
      >
        Proceed to Checkout
      </button>

      <Link
        href="/"
        className="block mt-3 text-center text-sm text-gray-500 hover:text-orange-500 transition"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}

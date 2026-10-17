"use client";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((i) => i.id === product.id)
  );
  const isInCart = useAppSelector((state) =>
    state.cart.items.some((i) => i.id === product.id)
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {product.badge}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow transition ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight hover:text-orange-500 transition line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-sm">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          disabled={!product.inStock}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
            !product.inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isInCart
              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {!product.inStock ? "Out of Stock" : isInCart ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

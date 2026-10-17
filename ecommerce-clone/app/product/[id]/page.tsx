"use client";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((i) => i.id === product.id)
  );
  const isInCart = useAppSelector((state) =>
    state.cart.items.some((i) => i.id === product.id)
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-xl ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500 transition">Home</Link>
        <span>/</span>
        <span className="hover:text-orange-500 transition cursor-pointer">{product.category}</span>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-orange-500 font-bold uppercase tracking-widest mb-2">
            {product.brand}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-orange-500 font-bold">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-4xl font-extrabold text-gray-900">${product.price}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Savings callout */}
          {product.discount > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 mb-5 text-green-700 text-sm font-medium">
              🎉 You save <strong>${product.originalPrice - product.price}</strong> on this item!
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize">
                #{tag}
              </span>
            ))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={!product.inStock}
              className={`flex-1 py-3.5 rounded-2xl text-base font-bold transition shadow-md ${
                !product.inStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : isInCart
                  ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                  : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg"
              }`}
            >
              {!product.inStock
                ? "Out of Stock"
                : isInCart
                ? "✓ Added to Cart"
                : "🛒 Add to Cart"}
            </button>

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`px-4 py-3.5 rounded-2xl border-2 transition ${
                isWishlisted
                  ? "border-red-400 bg-red-50 text-red-500"
                  : "border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-400"
              }`}
              aria-label="Toggle wishlist"
            >
              <svg className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Cart link */}
          {isInCart && (
            <Link
              href="/cart"
              className="block mt-3 text-center text-sm text-orange-600 hover:underline font-medium"
            >
              View Cart →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

# 🛒 ShopKart — E-Commerce Website Clone

> **Project 2 of 6** · Intermediate React Projects Series
>
> ⚠️ **Disclaimer: This project is built strictly for learning and portfolio purposes. It is NOT a real store — no real transactions, payments, or user data are collected. All product images are from Unsplash.**

A fully-featured e-commerce website clone inspired by platforms like Amazon and Flipkart. Built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit** — featuring product listings, cart management, wishlist, dynamic product pages, and a complete price calculator.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Use Cases](#use-cases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Flow](#project-flow)
- [Redux Architecture](#redux-architecture)
- [Pages & Routes](#pages--routes)
- [Price Calculator Logic](#price-calculator-logic)
- [Getting Started](#getting-started)
- [Key Concepts Practiced](#key-concepts-practiced)

---

## Overview

ShopKart is a pixel-level clone of a modern e-commerce shopping website. It replicates the core user journey: browse products → filter/search → view details → add to cart → see price breakdown → manage wishlist. All state is managed with Redux, making every interaction predictable and debuggable.

---

## Use Cases

| Who | How They Use It |
|-----|----------------|
| 👨‍🎓 **Learners** | Study how a real e-commerce UI is structured with React |
| 💼 **Portfolio Builders** | Showcase a full-featured, real-world looking project |
| 🧑‍💻 **Developers** | Reference implementation of cart + wishlist + filters with Redux |
| 🎨 **Designers** | See how Tailwind CSS handles complex responsive layouts |
| 🧪 **Interviewers** | Common interview project demonstrating state management skills |

---

## Features

### 🏠 Home Page
- **Hero banner** with sale headline, stats, and gradient background
- **12 sample products** across 4 categories (Electronics, Footwear, Clothing, Accessories)
- **Category filter** pills — All / Electronics / Footwear / Clothing / Accessories
- **Sort options** — Featured, Price Low→High, Price High→Low, Top Rated, Best Discount
- **Real-time search bar** filtering products by name, brand, or category
- Product count display updating with filters

### 🃏 Product Cards
- Product image with hover **zoom animation**
- Brand label, product name, star rating with review count
- Price, original price strikethrough, discount badge (e.g. `-20%`)
- **Out of Stock** overlay with disabled state
- Badges: `Best Seller`, `Sale`, `New`, `Top Rated`
- **Wishlist heart toggle** (fills red when saved)
- **Add to Cart button** — changes to `✓ Added to Cart` when in cart

### 📦 Product Detail Page (`/product/[id]`)
- Full-size product image
- Complete product info: name, brand, rating, review count
- Price display with **savings callout** (`🎉 You save $X!`)
- Product description and tags
- In Stock / Out of Stock indicator
- Add to Cart + Wishlist buttons with live state
- Breadcrumb navigation (Home → Category → Product)
- Link to View Cart when added

### 🛒 Cart Page (`/cart`)
- Full cart item list with image, brand, name, price
- **Quantity controls** (+ / −) — decreasing to 0 removes the item
- Remove individual item (×)
- Clear entire cart button
- **Order Summary / Price Calculator:**
  - Subtotal (sum of all items × quantities)
  - Savings (total original − discounted)
  - Shipping (FREE on orders over $100, else $9.99)
  - Tax (8% of subtotal)
  - Grand Total
  - "Add $X more for FREE shipping" nudge
- Proceed to Checkout button
- Empty cart state with CTA to continue shopping

### 💝 Wishlist Page (`/wishlist`)
- All wishlisted products in a responsive grid
- Remove from wishlist
- Add to Cart directly from wishlist
- Shows "In Cart" state if already added
- Empty state with explore CTA

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework, App Router, dynamic routes |
| **React** | 19 | UI component library |
| **TypeScript** | 5 | Interfaces for Product, CartItem, WishlistItem |
| **Tailwind CSS** | 4 | Responsive styling, grid, hover effects |
| **Redux Toolkit** | 2.3 | Cart, wishlist, and filter state |
| **React Redux** | 9 | `useSelector`, `useDispatch` hooks |
| **next/image** | — | Optimized image loading with `fill` layout |
| **next/link** | — | Client-side navigation |

---

## Project Structure

```
ecommerce-clone/
│
├── app/
│   ├── layout.tsx                # Root layout — navbar, footer, Redux Provider
│   ├── page.tsx                  # Home page — hero, filter bar, product grid
│   ├── cart/
│   │   └── page.tsx              # Cart page with item list + price calculator
│   ├── wishlist/
│   │   └── page.tsx              # Wishlist page
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic product detail page
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx                # Sticky nav — logo, cart badge, wishlist badge
│   ├── ProductCard.tsx           # Single product card with all interactions
│   ├── ProductGrid.tsx           # Filtered + sorted product grid using useMemo
│   ├── FilterBar.tsx             # Category pills, sort dropdown, search input
│   ├── CartSummary.tsx           # Price calculator sidebar
│   └── ReduxProvider.tsx
│
├── store/
│   ├── store.ts                  # Redux store with 3 reducers
│   ├── cartSlice.ts              # Cart: add, remove, qty+/-, clear
│   ├── wishlistSlice.ts          # Wishlist: toggle, remove
│   ├── filterSlice.ts            # Filters: category, sort, search
│   └── hooks.ts
│
├── data/
│   └── products.ts               # 12 sample products with full data
│
├── types/
│   └── index.ts                  # Product, CartItem, WishlistItem interfaces
│
└── README.md
```

---

## Project Flow

```
User visits Home (/)
        │
        ▼
Redux store initializes (empty cart, empty wishlist, default filters)
        │
        ▼
ProductGrid reads filter state → useMemo computes filtered + sorted list
        │
        ▼
User selects a category / sorts / types in search
        │
        ▼
FilterBar dispatches setCategory / setSortBy / setSearch
        │
        ▼
ProductGrid re-renders with filtered products instantly
        │
        ▼
User clicks "Add to Cart" on a ProductCard
        │
        ├──▶ cartSlice.addToCart → item added (or qty++if existing)
        ├──▶ Navbar cart badge updates immediately
        └──▶ Button changes to "✓ Added to Cart"
        │
        ▼
User clicks product name → navigates to /product/[id]
        │
        ▼
Dynamic route reads params.id → finds product from data array
        │
        ▼
User goes to /cart
        │
        ▼
CartSummary computes: subtotal → savings → shipping → tax → total
        │
        ▼
User adjusts quantity → cartSlice.increaseQty / decreaseQty
        │
        ▼
CartSummary recalculates total in real time
```

---

## Redux Architecture

### 3 Slices

```
store/
 ├── cartSlice
 │     state:   { items: CartItem[] }
 │     actions: addToCart, removeFromCart, increaseQty, decreaseQty, clearCart
 │
 ├── wishlistSlice
 │     state:   { items: Product[] }
 │     actions: toggleWishlist, removeFromWishlist
 │
 └── filterSlice
       state:   { category, sortBy, search, priceRange }
       actions: setCategory, setSortBy, setSearch, setPriceRange, resetFilters
```

### Cart Item Shape
```ts
interface CartItem extends Product {
  quantity: number;   // added on top of Product
}
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero + FilterBar + ProductGrid |
| `/product/[id]` | Product Detail | Dynamic route — full product view |
| `/cart` | Cart | Item list + quantity controls + price calculator |
| `/wishlist` | Wishlist | Saved products grid |

---

## Price Calculator Logic

```
subtotal        = Σ (item.price × item.quantity)
originalTotal   = Σ (item.originalPrice × item.quantity)
savings         = originalTotal − subtotal
shipping        = subtotal >= 100 ? 0 : 9.99
tax             = subtotal × 0.08
grandTotal      = subtotal + shipping + tax
```

---

## Getting Started

```bash
# Navigate to project
cd ecommerce-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

Open **http://localhost:3000**

---

## Key Concepts Practiced

| Concept | Where Used |
|---------|-----------|
| **Next.js dynamic routes** | `/product/[id]/page.tsx` with `use(params)` |
| **Multiple Redux slices** | cart, wishlist, filter — all in one store |
| **`useMemo` for performance** | `ProductGrid.tsx` — filtering + sorting |
| **`next/image` optimization** | `ProductCard`, `CartPage`, `WishlistPage` |
| **Responsive grid layouts** | 1→2→3→4 column product grid |
| **Sticky navbar** | `position: sticky` with live badge counts |
| **Computed cart totals** | Price calculator in `CartSummary.tsx` |
| **Conditional rendering** | Empty states for cart and wishlist |

---

## License

For **learning and portfolio purposes** only. Product images from [Unsplash](https://unsplash.com). No copyright infringement intended.

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

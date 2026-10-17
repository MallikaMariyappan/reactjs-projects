import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = { items: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  sortBy: string;
  search: string;
  priceRange: [number, number];
}

const initialState: FilterState = {
  category: "All",
  sortBy: "default",
  search: "",
  priceRange: [0, 2000],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    resetFilters(state) {
      state.category = "All";
      state.sortBy = "default";
      state.search = "";
      state.priceRange = [0, 2000];
    },
  },
});

export const { setCategory, setSortBy, setSearch, setPriceRange, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fallbackRates } from "@/data/currencies";

export interface ConversionRecord {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

interface ConverterState {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  result: number | null;
  rates: Record<string, number>;
  lastUpdated: string;
  loading: boolean;
  error: string | null;
  history: ConversionRecord[];
  favorites: string[]; // e.g. ["USD-INR", "EUR-GBP"]
  multiList: string[];  // list of target currencies for multi-convert
}

const initialState: ConverterState = {
  fromCurrency: "USD",
  toCurrency: "INR",
  amount: "1",
  result: null,
  rates: fallbackRates,
  lastUpdated: "Fallback rates",
  loading: false,
  error: null,
  history: [],
  favorites: ["USD-EUR", "USD-INR", "EUR-GBP"],
  multiList: ["EUR", "GBP", "JPY", "INR", "AUD", "CAD", "CNY", "BRL"],
};

// Async thunk: fetch live rates from the free open.er-api.com
export const fetchRates = createAsyncThunk(
  "converter/fetchRates",
  async (baseCurrency: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${baseCurrency}`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.result !== "success") throw new Error("Bad response");
      return {
        rates: data.rates as Record<string, number>,
        base: baseCurrency,
        updated: new Date(data.time_last_update_utc).toLocaleString(),
      };
    } catch {
      return rejectWithValue("Could not fetch live rates. Using fallback.");
    }
  }
);

const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setFromCurrency(state, action: PayloadAction<string>) {
      state.fromCurrency = action.payload;
      state.result = null;
    },
    setToCurrency(state, action: PayloadAction<string>) {
      state.toCurrency = action.payload;
      state.result = null;
    },
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
      state.result = null;
    },
    swapCurrencies(state) {
      const temp = state.fromCurrency;
      state.fromCurrency = state.toCurrency;
      state.toCurrency = temp;
      state.result = null;
    },
    convert(state) {
      const amount = parseFloat(state.amount);
      if (isNaN(amount) || amount < 0) return;

      const fromRate = state.rates[state.fromCurrency] ?? 1;
      const toRate = state.rates[state.toCurrency] ?? 1;
      // rates are all relative to USD base
      const amountInUSD = amount / fromRate;
      const converted = amountInUSD * toRate;
      const rate = toRate / fromRate;

      state.result = converted;

      // Add to history
      state.history.unshift({
        from: state.fromCurrency,
        to: state.toCurrency,
        amount,
        result: converted,
        rate,
        timestamp: new Date().toLocaleString(),
      });
      if (state.history.length > 15) state.history.pop();
    },
    clearHistory(state) {
      state.history = [];
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const pair = action.payload; // e.g. "USD-EUR"
      const idx = state.favorites.indexOf(pair);
      if (idx >= 0) {
        state.favorites.splice(idx, 1);
      } else {
        state.favorites.push(pair);
      }
    },
    loadFavorite(state, action: PayloadAction<string>) {
      const [from, to] = action.payload.split("-");
      state.fromCurrency = from;
      state.toCurrency = to;
      state.result = null;
    },
    addToMultiList(state, action: PayloadAction<string>) {
      if (!state.multiList.includes(action.payload)) {
        state.multiList.push(action.payload);
      }
    },
    removeFromMultiList(state, action: PayloadAction<string>) {
      state.multiList = state.multiList.filter((c) => c !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
        state.lastUpdated = action.payload.updated;
        state.error = null;
        state.result = null; // reset result on new rates
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFromCurrency,
  setToCurrency,
  setAmount,
  swapCurrencies,
  convert,
  clearHistory,
  toggleFavorite,
  loadFavorite,
  addToMultiList,
  removeFromMultiList,
} = converterSlice.actions;

export default converterSlice.reducer;

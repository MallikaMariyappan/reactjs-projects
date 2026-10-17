import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ── Types ─────────────────────────────────────────────────
export type JokeCategory =
  | "Any"
  | "Programming"
  | "Misc"
  | "Dark"
  | "Pun"
  | "Spooky"
  | "Christmas";

export type JokeType = "single" | "twopart";

export interface Joke {
  id: number;
  category: JokeCategory;
  type: JokeType;
  // single joke
  joke?: string;
  // two-part joke
  setup?: string;
  delivery?: string;
  safe: boolean;
  lang: string;
}

export interface SavedJoke extends Joke {
  savedAt: string;
}

interface JokeState {
  current: Joke | null;
  loading: boolean;
  error: string | null;
  category: JokeCategory;
  safeMode: boolean;
  showPunchline: boolean;
  favorites: SavedJoke[];
  history: SavedJoke[];
  streak: number;      // how many jokes fetched in a row
  totalFetched: number;
}

// ── Fallback jokes (shown when API fails) ─────────────────
const fallbackJokes: Joke[] = [
  {
    id: 0, category: "Programming", type: "twopart", safe: true, lang: "en",
    setup: "Why do programmers prefer dark mode?",
    delivery: "Because light attracts bugs! 🐛",
  },
  {
    id: 1, category: "Pun", type: "twopart", safe: true, lang: "en",
    setup: "I told my wife she was drawing her eyebrows too high.",
    delivery: "She looked surprised.",
  },
  {
    id: 2, category: "Misc", type: "single", safe: true, lang: "en",
    joke: "I used to hate facial hair, but then it grew on me.",
  },
  {
    id: 3, category: "Programming", type: "twopart", safe: true, lang: "en",
    setup: "Why did the developer go broke?",
    delivery: "Because he used up all his cache!",
  },
  {
    id: 4, category: "Pun", type: "twopart", safe: true, lang: "en",
    setup: "Why don't scientists trust atoms?",
    delivery: "Because they make up everything!",
  },
  {
    id: 5, category: "Programming", type: "twopart", safe: true, lang: "en",
    setup: "How many programmers does it take to change a light bulb?",
    delivery: "None – that's a hardware problem.",
  },
  {
    id: 6, category: "Misc", type: "single", safe: true, lang: "en",
    joke: "I asked my dog what two minus two is. He said nothing.",
  },
  {
    id: 7, category: "Pun", type: "twopart", safe: true, lang: "en",
    setup: "What do you call cheese that isn't yours?",
    delivery: "Nacho cheese!",
  },
];

// ── Async Thunk ───────────────────────────────────────────
export const fetchJoke = createAsyncThunk(
  "jokes/fetchJoke",
  async (
    { category, safeMode }: { category: JokeCategory; safeMode: boolean },
    { rejectWithValue }
  ) => {
    try {
      const cat = category === "Any" ? "Any" : category;
      const safe = safeMode ? "&safe-mode" : "";
      const url = `https://v2.jokeapi.dev/joke/${cat}?lang=en${safe}&blacklistFlags=racist,sexist`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (data.error) throw new Error(data.message || "API error");
      return data as Joke;
    } catch {
      // Return a random fallback joke
      const filtered = safeMode
        ? fallbackJokes.filter((j) => j.safe)
        : fallbackJokes;
      const categorized =
        category === "Any"
          ? filtered
          : filtered.filter((j) => j.category === category);
      const pool = categorized.length > 0 ? categorized : filtered;
      const joke = pool[Math.floor(Math.random() * pool.length)];
      return rejectWithValue({ joke, message: "Using offline jokes." });
    }
  }
);

// ── Slice ─────────────────────────────────────────────────
const initialState: JokeState = {
  current: null,
  loading: false,
  error: null,
  category: "Any",
  safeMode: true,
  showPunchline: false,
  favorites: [],
  history: [],
  streak: 0,
  totalFetched: 0,
};

const jokeSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<JokeCategory>) {
      state.category = action.payload;
      state.current = null;
      state.showPunchline = false;
    },
    toggleSafeMode(state) {
      state.safeMode = !state.safeMode;
    },
    revealPunchline(state) {
      state.showPunchline = true;
    },
    toggleFavorite(state) {
      if (!state.current) return;
      const exists = state.favorites.some((f) => f.id === state.current!.id);
      if (exists) {
        state.favorites = state.favorites.filter((f) => f.id !== state.current!.id);
      } else {
        state.favorites.unshift({
          ...state.current,
          savedAt: new Date().toLocaleString(),
        });
        if (state.favorites.length > 30) state.favorites.pop();
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
    },
    clearFavorites(state) {
      state.favorites = [];
    },
    clearHistory(state) {
      state.history = [];
    },
    loadJokeFromHistory(state, action: PayloadAction<SavedJoke>) {
      state.current = action.payload;
      state.showPunchline = action.payload.type === "single";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.showPunchline = false;
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.error = null;
        // Single jokes show immediately; twopart need reveal
        state.showPunchline = action.payload.type === "single";
        state.streak += 1;
        state.totalFetched += 1;
        // Add to history
        state.history.unshift({
          ...action.payload,
          savedAt: new Date().toLocaleTimeString(),
        });
        if (state.history.length > 20) state.history.pop();
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.loading = false;
        // Use the fallback joke from rejectWithValue
        const payload = action.payload as { joke: Joke; message: string } | undefined;
        if (payload?.joke) {
          state.current = payload.joke;
          state.error = payload.message;
          state.showPunchline = payload.joke.type === "single";
          state.streak += 1;
          state.totalFetched += 1;
          state.history.unshift({
            ...payload.joke,
            savedAt: new Date().toLocaleTimeString(),
          });
        } else {
          state.error = "Failed to fetch joke. Please try again.";
        }
      });
  },
});

export const {
  setCategory,
  toggleSafeMode,
  revealPunchline,
  toggleFavorite,
  removeFavorite,
  clearFavorites,
  clearHistory,
  loadJokeFromHistory,
} = jokeSlice.actions;

export default jokeSlice.reducer;

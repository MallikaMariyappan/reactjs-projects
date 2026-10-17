# 😂 JokeBomb — Random Joke Generator

> **Project 6 of 6** · Intermediate React Projects Series

A fun, interactive joke generator app that fetches real-time jokes from **JokeAPI v2** (free, no API key needed). Features a two-part joke reveal with animated punchline, 7 categories, safe mode, favorites, history, share support, and a streak counter. Built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit**.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Use Cases](#use-cases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Flow](#project-flow)
- [Redux Architecture](#redux-architecture)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Key Concepts Practiced](#key-concepts-practiced)

---

## Overview

JokeBomb is a React application that fetches random jokes from the JokeAPI v2 REST API and presents them in a polished, interactive card interface. Two-part jokes show a setup first and require the user to click "Reveal Punchline" — creating a comedic pause. Users can save favorite jokes, browse history, share with friends, and track how many jokes they've seen.

---

## Use Cases

| Who | How They Use It |
|-----|----------------|
| 😄 **Everyone** | Get a quick laugh during a break |
| 👨‍💻 **Programmers** | Programming category for developer-specific humor |
| 🎉 **Party Hosts** | Pull up jokes for ice-breaker games |
| 👨‍👩‍👧 **Families** | Safe Mode ensures family-friendly content |
| 💼 **Portfolio** | Demonstrates API integration, async Redux, and animation |
| 🎓 **Students** | Learn `createAsyncThunk`, API error handling, fallback data |

---

## Features

### 🎭 Joke Display Card
- **Two types of jokes:**
  - **Single** — full joke text shown immediately in a centered card
  - **Two-part** — Setup shown in amber box first, then punchline revealed on button click
- **Animated punchline reveal** — fade-in animation when punchline appears (`@keyframes fadeIn`)
- **Category badge** with emoji (e.g. `💻 Programming`, `🎭 Pun`)
- **Mature content indicator** shown on unsafe jokes
- **Joke ID** shown in corner for reference
- Smooth **scale + opacity transition** between jokes

### 🔄 Fetching Jokes
- **Auto-fetches on page load** via `useEffect`
- Fetches from `https://v2.jokeapi.dev/joke/{category}`
- **Loading state** — bouncing emoji + staggered dot animation while fetching
- **8 offline fallback jokes** built-in — app never breaks without internet
- Yellow warning banner shown when using offline fallback

### 🗂️ 7 Joke Categories
| Category | Emoji | Description |
|----------|-------|-------------|
| Any | 🎲 | Random from all categories |
| Programming | 💻 | Developer and tech humor |
| Pun | 🎭 | Classic wordplay |
| Misc | 🎪 | General humor |
| Dark | 🌑 | Dark comedy |
| Spooky | 👻 | Halloween-style jokes |
| Christmas | 🎄 | Holiday themed |

Changing category **auto-fetches** a new joke immediately.

### 🛡️ Safe Mode
- Toggle switch in the controls bar
- When ON: `&safe-mode` param added to every API request
- Filters out dark, explicit, and insensitive content
- Visual indicator: 🛡️ (safe) or ⚠️ (off)

### 📊 Stats Tracker
| Stat | Description |
|------|-------------|
| 🔥 Streak | Jokes fetched in current session consecutively |
| 🎯 Jokes Seen | Total jokes fetched all-time this session |

### ❤️ Favorites
- Click `❤️ Save` button to save current joke
- Button turns red `❤️ Saved` when active (toggle)
- Favorites panel shows all saved jokes with:
  - Category badge + timestamp
  - Joke text preview (truncated to 3 lines)
  - **"View full joke →"** on hover to reload it into the main card
  - Individual remove button (×)
  - Clear All button
- Stores up to **30 favorites**

### 📋 History
- Last **20 jokes** automatically tracked
- Shows category emoji, time, and setup/joke preview
- Click any entry to **reload it** into the main card
- Clear history button

### 🔗 Copy & Share
- **Copy** — copies full joke text to clipboard (single line or setup + delivery)
- **Share** — uses native Web Share API on mobile devices; falls back to clipboard on desktop

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | App Router, SSR-ready |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Typed joke objects and state |
| **Tailwind CSS** | 4 | Utility-first styling, animations |
| **Redux Toolkit** | 2.3 | Async joke fetching + all state |
| **React Redux** | 9 | Hooks |
| **JokeAPI v2** | — | Free REST API — no key required |
| **Web Share API** | Browser | Native mobile sharing |
| **Clipboard API** | Browser | Copy joke text |

---

## Project Structure

```
joke-generator/
│
├── app/
│   ├── layout.tsx                # Root layout — sticky navbar + Redux Provider
│   ├── page.tsx                  # Main page — 2-column layout (controls + card)
│   └── globals.css               # Tailwind + custom @keyframes fadeIn animation
│
├── components/
│   ├── JokeCard.tsx              # Main joke display — all actions (copy, share, save, next)
│   ├── Controls.tsx              # Category pills + safe mode toggle + stats strip
│   ├── FavoritesPanel.tsx        # Saved jokes with reload + remove
│   ├── HistoryPanel.tsx          # Recent joke history with reload
│   └── ReduxProvider.tsx
│
├── store/
│   ├── store.ts                  # Redux store
│   ├── jokeSlice.ts              # fetchJoke AsyncThunk + all reducers
│   └── hooks.ts
│
└── README.md
```

---

## Project Flow

```
User opens app
        │
        ▼
Redux store initializes:
   current = null, category = "Any", safeMode = true
        │
        ▼
JokeCard useEffect → dispatches fetchJoke({ category:"Any", safeMode:true })
        │
        ▼
createAsyncThunk fires:
   GET https://v2.jokeapi.dev/joke/Any?lang=en&safe-mode&blacklistFlags=racist,sexist
        │
        ├── SUCCESS:
        │     joke object received
        │     → current = joke
        │     → if type="single": showPunchline = true
        │     → if type="twopart": showPunchline = false (wait for reveal)
        │     → history entry added
        │     → streak++ & totalFetched++
        │
        └── FAILURE (API down / network error):
              → random fallback joke selected
              → error message shown in yellow banner
              → streak++ & totalFetched++ still increment
        │
        ▼
JokeCard renders:
   twopart → shows Setup box + "🥁 Reveal Punchline" button
   single  → shows full joke immediately
        │
        ▼
User clicks "🥁 Reveal Punchline"
        │
        ▼
revealPunchline() dispatched → showPunchline = true
Punchline box fades in with animation
        │
        ▼
User clicks "❤️ Save"
        │
        ▼
toggleFavorite() dispatched:
   if not in favorites → favorites.unshift({ ...current, savedAt })
   if already saved    → filter out of favorites[]
   button updates to "❤️ Saved" or "🤍 Save"
        │
        ▼
User clicks "💻 Programming" category pill
        │
        ▼
setCategory("Programming") dispatched → current = null, showPunchline = false
fetchJoke({ category:"Programming", safeMode }) dispatched
New joke fetched immediately
        │
        ▼
User clicks "🔗 Share"
        │
        ▼
if navigator.share available → Web Share API opens native share sheet
else → copies text to clipboard (same as Copy)
```

---

## Redux Architecture

```ts
interface JokeState {
  current: Joke | null;         // currently displayed joke
  loading: boolean;             // API call in progress
  error: string | null;         // null | fallback message
  category: JokeCategory;       // selected category
  safeMode: boolean;            // family-friendly filter
  showPunchline: boolean;       // two-part reveal flag
  favorites: SavedJoke[];       // saved jokes (max 30)
  history: SavedJoke[];         // recent jokes (max 20)
  streak: number;               // consecutive jokes this session
  totalFetched: number;         // all-time fetch count
}
```

### Async Thunk — `fetchJoke`

```ts
fetchJoke({ category: JokeCategory, safeMode: boolean })

// URL built:
`https://v2.jokeapi.dev/joke/${category}?lang=en${safe}&blacklistFlags=racist,sexist`

// On success → returns Joke object → fulfilled case
// On failure → picks fallback joke → rejectWithValue({ joke, message })
```

### All Reducer Actions

| Action | Payload | Description |
|--------|---------|-------------|
| `fetchJoke` | AsyncThunk | Fetch joke from API |
| `setCategory` | `JokeCategory` | Change category + reset card |
| `toggleSafeMode` | — | Toggle safe/unsafe content |
| `revealPunchline` | — | Show punchline for two-part jokes |
| `toggleFavorite` | — | Save/unsave current joke |
| `removeFavorite` | `number` (id) | Remove specific favorite |
| `clearFavorites` | — | Wipe all favorites |
| `clearHistory` | — | Wipe joke history |
| `loadJokeFromHistory` | `SavedJoke` | Reload a past joke |

---

## API Integration

```
Base URL: https://v2.jokeapi.dev/joke/{category}

Query Parameters used:
  lang=en              → English jokes only
  safe-mode            → When safeMode is true
  blacklistFlags=racist,sexist → Always applied for respectful content

Joke object (two-part):
{
  "id": 173,
  "category": "Programming",
  "type": "twopart",
  "setup": "Why do programmers prefer dark mode?",
  "delivery": "Because light attracts bugs!",
  "safe": true,
  "lang": "en"
}

Joke object (single):
{
  "id": 15,
  "category": "Misc",
  "type": "single",
  "joke": "I used to hate facial hair, but then it grew on me.",
  "safe": true,
  "lang": "en"
}
```

**Fallback jokes:** 8 hardcoded jokes in `jokeSlice.ts` used when API is unreachable. Selected randomly based on current category and safe mode setting.

---

## Getting Started

```bash
cd joke-generator
npm install
npm run dev
```

Open **http://localhost:3000**

> Jokes are fetched automatically from JokeAPI v2. No API key or account required.

---

## Key Concepts Practiced

| Concept | Where Used |
|---------|-----------|
| **`createAsyncThunk`** | `fetchJoke` in `jokeSlice.ts` |
| **Fallback data in `rejectWithValue`** | Offline fallback joke selection |
| **`useEffect` for auto-fetch** | `JokeCard.tsx` on mount |
| **State-driven UI flow** | `showPunchline` flag controls reveal UX |
| **CSS `@keyframes`** | `fadeIn` animation on punchline reveal |
| **Web Share API** | Native share with clipboard fallback |
| **Two-state button** | ❤️ / 🤍 favorite toggle |
| **Staggered loading animation** | 3 dots with `animationDelay` |
| **Content blacklisting** | `blacklistFlags` query param |
| **Responsive 3-col layout** | Controls left, card spans 2 right |

---

## License

For **learning and portfolio purposes** only. Jokes provided by [JokeAPI v2](https://jokeapi.dev) — free and open source.

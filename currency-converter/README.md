# 💱 CurrencyX — Live Currency Converter

> **Project 4 of 6** · Intermediate React Projects Series

A fully-featured, real-time currency converter app supporting **38+ world currencies**. Fetches live exchange rates from a free public API, displays multi-currency comparisons, saves favorite pairs, and tracks conversion history. Built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit** using `createAsyncThunk` for async API calls.

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
- [Conversion Logic](#conversion-logic)
- [Supported Currencies](#supported-currencies)
- [Getting Started](#getting-started)
- [Key Concepts Practiced](#key-concepts-practiced)

---

## Overview

CurrencyX lets users convert any amount between 38+ global currencies using live exchange rates fetched from **open.er-api.com** (free, no API key required). The app includes a multi-currency comparison view, a favorites system for saved pairs, conversion history, and graceful offline fallback with built-in static rates.

---

## Use Cases

| Who | How They Use It |
|-----|----------------|
| ✈️ **Travelers** | Check exchange rates before a trip |
| 🛍️ **Online Shoppers** | Convert product prices from foreign stores |
| 💹 **Investors** | Quick reference for currency comparison |
| 🎓 **Students** | Learn about exchange rates and forex basics |
| 💻 **Developers** | Reference for `createAsyncThunk` + API state management |
| 🌍 **Expats** | Track home currency vs. local currency daily |

---

## Features

### 💱 Main Converter
- Convert any amount between **38+ currencies**
- **Currency selector dropdowns** with emoji flags + full currency names
- **Swap button (⇄)** to instantly flip From ↔ To currencies
- **Enter key** support for quick conversion
- Live exchange rate display (e.g. `1 USD = 83.12 INR`)
- **Star any pair (★)** to save it as a favorite
- **Result displayed** with proper `Intl.NumberFormat` formatting:
  - `$1,234.56` for USD
  - `¥12,345` for JPY (no decimals)
  - `₹83,120.00` for INR

### 🔄 Live Rate Fetching
- Auto-fetches on page load from `open.er-api.com`
- Displays **last updated timestamp** from API
- **Refresh button** to re-fetch latest rates at any time
- Loading spinner with animated pulse text
- **Yellow warning banner** if API request fails, showing offline message

### 📊 Multi-Currency View
- See your amount converted to **8 popular currencies simultaneously**
  - EUR, GBP, JPY, INR, AUD, CAD, CNY, BRL (default)
- Each row shows: flag, code, name, converted amount, exchange rate
- Click any row to instantly use it as the main conversion target

### ⭐ Favorite Pairs
- Click ★ on any live rate to save the currency pair
- Favorites panel shows all saved pairs with:
  - From → To flags and codes
  - Exchange rate
  - Converted amount (based on current amount input)
- **"Use" button** to load a favorite pair into the main converter
- Remove individual favorites or star again to toggle off
- **3 default favorites** pre-loaded: USD→EUR, USD→INR, EUR→GBP

### 📋 Conversion History
- Last **15 conversions** stored automatically on every "Convert" click
- Each entry shows: flags, amount, result, exchange rate, timestamp
- Clear all history with one click

### 🌍 38+ Currencies
Full coverage of major world currencies with emoji flags and symbols.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | App Router, SSR-ready |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Typed state, interfaces |
| **Tailwind CSS** | 4 | Responsive layout, glassmorphism navbar |
| **Redux Toolkit** | 2.3 | State + `createAsyncThunk` for API |
| **React Redux** | 9 | Hooks |
| **open.er-api.com** | — | Free live exchange rate API (no key needed) |
| **Intl.NumberFormat** | Browser | Locale-aware currency formatting |

---

## Project Structure

```
currency-converter/
│
├── app/
│   ├── layout.tsx                # Root layout — glassmorphism navbar + Redux Provider
│   ├── page.tsx                  # Main page — hero + 3-column layout
│   └── globals.css
│
├── components/
│   ├── ConverterCard.tsx         # Main converter — input, selects, swap, result
│   ├── CurrencySelect.tsx        # Reusable dropdown with flag emoji + name
│   ├── MultiConverter.tsx        # 8-currency comparison grid
│   ├── FavoritesPanel.tsx        # Starred pairs with live rates
│   ├── HistoryPanel.tsx          # Last 15 conversions
│   └── ReduxProvider.tsx
│
├── store/
│   ├── store.ts                  # Redux store
│   ├── converterSlice.ts         # All state + fetchRates async thunk
│   └── hooks.ts
│
├── data/
│   └── currencies.ts             # 38 currency definitions + fallback rate table
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
   fromCurrency = "USD", toCurrency = "INR"
   rates = fallbackRates (built-in static)
        │
        ▼
useEffect in ConverterCard → dispatches fetchRates("USD")
        │
        ▼
createAsyncThunk calls https://open.er-api.com/v6/latest/USD
        │
        ├── SUCCESS: rates updated, lastUpdated timestamp set
        └── FAILURE: error message shown, fallback rates remain
        │
        ▼
User types amount → setAmount dispatched
User selects "EUR" from dropdown → setFromCurrency dispatched
User clicks "↔ Swap" → swapCurrencies dispatched
        │
        ▼
User clicks "Convert"
        │
        ▼
convert() reducer:
   amountInUSD = amount / rates[fromCurrency]
   result      = amountInUSD × rates[toCurrency]
   rate        = rates[toCurrency] / rates[fromCurrency]
   → result stored in state
   → ConversionRecord added to history[]
        │
        ▼
ConverterCard displays result with Intl.NumberFormat
        │
        ▼
User clicks ★ on rate
        │
        ▼
toggleFavorite("USD-EUR") → added to favorites[]
FavoritesPanel updates immediately
        │
        ▼
MultiConverter recalculates all 8 rows on every state change
```

---

## Redux Architecture

```ts
interface ConverterState {
  fromCurrency: string;          // "USD"
  toCurrency: string;            // "INR"
  amount: string;                // "100"
  result: number | null;         // 8312.00
  rates: Record<string,number>;  // { USD:1, EUR:0.92, INR:83.1, ... }
  lastUpdated: string;           // "Oct 17, 2026, 10:00 AM"
  loading: boolean;              // API fetch in progress
  error: string | null;          // null or fallback message
  history: ConversionRecord[];   // last 15 conversions
  favorites: string[];           // ["USD-EUR", "USD-INR"]
  multiList: string[];           // ["EUR","GBP","JPY","INR","AUD","CAD","CNY","BRL"]
}
```

### Actions

| Action | Type | Description |
|--------|------|-------------|
| `fetchRates` | AsyncThunk | Fetch rates from open.er-api.com |
| `setFromCurrency` | `string` | Change source currency |
| `setToCurrency` | `string` | Change target currency |
| `setAmount` | `string` | Update amount input |
| `swapCurrencies` | — | Flip from ↔ to |
| `convert` | — | Compute result + add to history |
| `toggleFavorite` | `string` | Add/remove pair from favorites |
| `loadFavorite` | `string` | Load a saved pair into converter |
| `clearHistory` | — | Wipe conversion history |

---

## API Integration

```
Endpoint: https://open.er-api.com/v6/latest/USD

Response shape:
{
  "result": "success",
  "base_code": "USD",
  "time_last_update_utc": "Thu, 17 Oct 2026 00:00:00 +0000",
  "rates": {
    "USD": 1,
    "EUR": 0.9187,
    "INR": 83.12,
    ...
  }
}
```

**Fallback behavior:** If the API call fails for any reason (network error, rate limit, etc.), the app silently falls back to built-in static rates stored in `data/currencies.ts` and shows a yellow warning banner. Users can still use the full app offline.

---

## Conversion Logic

```
All rates are stored relative to USD base (USD = 1.0)

amountInUSD = inputAmount / rates[fromCurrency]
result      = amountInUSD × rates[toCurrency]
displayRate = rates[toCurrency] / rates[fromCurrency]

Example: 100 EUR → INR
  amountInUSD = 100 / 0.92 = 108.70
  result      = 108.70 × 83.1 = 9,031.77
  displayRate = 83.1 / 0.92 = 90.33
  → "100 EUR = ₹9,031.77  (1 EUR = 90.33 INR)"
```

---

## Supported Currencies

USD 🇺🇸, EUR 🇪🇺, GBP 🇬🇧, JPY 🇯🇵, AUD 🇦🇺, CAD 🇨🇦, CHF 🇨🇭, CNY 🇨🇳, INR 🇮🇳, KRW 🇰🇷, BRL 🇧🇷, MXN 🇲🇽, SGD 🇸🇬, HKD 🇭🇰, NOK 🇳🇴, SEK 🇸🇪, DKK 🇩🇰, NZD 🇳🇿, ZAR 🇿🇦, RUB 🇷🇺, TRY 🇹🇷, AED 🇦🇪, SAR 🇸🇦, THB 🇹🇭, IDR 🇮🇩, MYR 🇲🇾, PHP 🇵🇭, PKR 🇵🇰, EGP 🇪🇬, NGN 🇳🇬, PLN 🇵🇱, CZK 🇨🇿, HUF 🇭🇺, ILS 🇮🇱, CLP 🇨🇱, ARS 🇦🇷, VND 🇻🇳, BDT 🇧🇩

---

## Getting Started

```bash
cd currency-converter
npm install
npm run dev
```

Open **http://localhost:3000**

> Live rates are fetched automatically. No API key required.

---

## Key Concepts Practiced

| Concept | Where Used |
|---------|-----------|
| **`createAsyncThunk`** | `fetchRates` in `converterSlice.ts` |
| **Async state (loading/error)** | `extraReducers` pending/fulfilled/rejected |
| **Graceful API fallback** | `rejectWithValue` + built-in fallback rates |
| **`Intl.NumberFormat`** | Currency-aware number display |
| **Responsive 3-column layout** | `grid-cols-1 lg:grid-cols-3` |
| **Glassmorphism navbar** | `bg-white/80 backdrop-blur-md` |
| **Derived UI from single state** | MultiConverter recalculates all rows from Redux |

---

## License

For **learning and portfolio purposes** only. Exchange rates from [open.er-api.com](https://open.er-api.com).

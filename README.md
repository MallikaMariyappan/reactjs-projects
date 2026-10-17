# ⚛️ Intermediate React Projects

A series of **6 intermediate-level React projects** built to strengthen skills in Next.js, Tailwind CSS, Redux Toolkit, API integration, and modern frontend architecture. Each project is fully self-contained with its own codebase, dependencies, and detailed README.

---

## 🗂️ Projects at a Glance

| # | Project | Folder | APIs Used | Key Feature |
|---|---------|--------|-----------|-------------|
| 1 | 📝 TextCraft | `text-editor-app/` | None | 8 text transformations + live stats |
| 2 | 🛒 ShopKart | `ecommerce-clone/` | None | Cart + Wishlist + Price Calculator |
| 3 | 🧮 CalcPro | `advanced-calculator/` | None | Scientific calc + keyboard + history |
| 4 | 💱 CurrencyX | `currency-converter/` | open.er-api.com | Live rates + 38 currencies |
| 5 | 🔐 PassForge | `password-generator/` | None | Strength meter + bulk gen + download |
| 6 | 😂 JokeBomb | `joke-generator/` | jokeapi.dev | API jokes + punchline reveal |

---

## 🛠️ Common Tech Stack

Every project in this series uses the same core stack:

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework with App Router |
| **React** | 19 | UI component library |
| **TypeScript** | 5 | Type safety throughout |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Redux Toolkit** | 2.3 | State management |
| **React Redux** | 9 | Redux hooks for React |

---

## ▶️ How to Run Any Project

```bash
# Replace <folder-name> with the project folder
cd <folder-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📁 Detailed Project Docs

---

### 1. 📝 TextCraft — Text Editor App
**Folder:** `text-editor-app/`

A text utility app that lets users transform and analyze text in real time.

**Use Case:** Writers, students, developers who need quick text formatting and word count.

**Key Features:**
- 6 text transformations (UPPERCASE, lowercase, Title Case, Sentence Case, Remove Spaces, Reverse)
- Live stats: words, characters, sentences, paragraphs, reading time
- Copy to clipboard, Download as .txt
- Dark mode toggle, Live preview section
- Toast notifications for all actions

**Project Flow:**
```
User types in textarea
   → setText() dispatched to Redux
   → All 6 stats recalculated in reducer
   → StatsCard re-renders instantly
User clicks "UPPERCASE"
   → toUpperCase() dispatched
   → state.text transformed in-place
   → Preview updates
```

**Redux Slice:** `textSlice` — all stats derived inside `setText` reducer

---

### 2. 🛒 ShopKart — E-Commerce Clone
**Folder:** `ecommerce-clone/`

> ⚠️ For learning purposes only — not a real store.

A full-featured shopping website clone with product browsing, cart, wishlist, and checkout pricing.

**Use Case:** Portfolio project demonstrating real-world e-commerce UI and state management.

**Key Features:**
- 12 products across 4 categories with images, ratings, discounts
- Filter by category, sort by price/rating/discount, real-time search
- Add to Cart / Wishlist with badge counters in navbar
- Dynamic product detail pages (`/product/[id]`)
- Price Calculator: subtotal → savings → shipping → tax → total
- Free shipping threshold nudge

**Project Flow:**
```
Home → Filter + Search → ProductGrid (useMemo)
   → Click product → /product/[id] (dynamic route)
   → Add to Cart → cartSlice.addToCart
   → /cart → CartSummary computes total
   → Wishlist toggle → wishlistSlice
```

**Redux Slices:** `cartSlice`, `wishlistSlice`, `filterSlice`

---

### 3. 🧮 CalcPro — Advanced Calculator
**Folder:** `advanced-calculator/`

A scientific calculator with all operations handled inside Redux reducers.

**Use Case:** Students, developers needing quick browser-based scientific computations.

**Key Features:**
- Basic: +, −, ×, ÷, %
- Scientific: sin, cos, tan (DEG/RAD), log, ln, x², x³, √, ∛, 1/x, x!, e^x
- Constants: π and e
- Memory: MS, MR, M+, MC
- Calculation history (last 20, click to reuse)
- Full keyboard support
- Floating-point precision handled with `toPrecision(12)`

**Project Flow:**
```
User presses 7 → inputDigit("7") → display = "7"
User presses × → setOperator("×") → prevValue="7", op="×"
User presses 4 → inputDigit("4") → display = "4"
User presses = → evaluate() → result=28, history updated
User presses √ → applyUnary("√") → result=5.29...
```

**Redux Slice:** `calculatorSlice` — 18 actions, complete state machine

---

### 4. 💱 CurrencyX — Currency Converter
**Folder:** `currency-converter/`

Live currency converter with 38+ currencies and real-time rate fetching.

**Use Case:** Travelers, shoppers, investors needing quick currency conversion.

**Key Features:**
- Live rates from open.er-api.com (free, no API key)
- 38+ currencies with emoji flags and symbols
- Swap button, favorites system, conversion history
- Multi-currency view (8 currencies at once)
- Offline fallback with built-in static rates
- `Intl.NumberFormat` for locale-aware display

**Project Flow:**
```
App loads → fetchRates("USD") dispatched (createAsyncThunk)
   → SUCCESS: rates updated from API
   → FAILURE: built-in fallback rates used
User types amount + selects currencies
User clicks Convert → convert() reducer:
   amountInUSD = amount / rates[from]
   result = amountInUSD × rates[to]
   → Result displayed, history entry added
```

**Redux Slice:** `converterSlice` — `createAsyncThunk` for live API

---

### 5. 🔐 PassForge — Password Generator
**Folder:** `password-generator/`

Advanced password generator with strength analysis, bulk generation, and save history.

**Use Case:** Anyone needing secure passwords, IT admins for bulk onboarding.

**Key Features:**
- Customizable: length 4–64, char types, exclude ambiguous, custom symbols
- Minimum number/symbol guarantees with Fisher-Yates shuffle
- Strength meter: 5 levels, 0–100 score
- 4 presets: PIN, Memorable, Strong, Maximum
- Bulk generate 1–50 passwords + Download as .txt
- Save with label, copy, show/hide

**Project Flow:**
```
Options change → setOption() dispatched
   → generatePassword(options) called in reducer:
      build pool → guarantee minimums → fill → Fisher-Yates shuffle
   → calcStrength(password) called:
      score += length points + variety points + bonuses - penalties
   → display updates + strength meter animates
```

**Redux Slice:** `passwordSlice` — all generation and scoring logic

---

### 6. 😂 JokeBomb — Random Joke Generator
**Folder:** `joke-generator/`

Fetches real-time jokes from JokeAPI v2 with category filter, safe mode, and animated punchline reveal.

**Use Case:** Entertainment app for quick laughs; portfolio demo of async Redux + API.

**Key Features:**
- 7 categories: Any, Programming, Pun, Misc, Dark, Spooky, Christmas
- Two-part jokes: setup shown first, click to reveal punchline (animated)
- Safe Mode filter, streak counter, total count
- Favorites, history, copy to clipboard, Web Share API
- Offline fallback with 8 built-in jokes
- Content blacklist: `blacklistFlags=racist,sexist`

**Project Flow:**
```
App loads → fetchJoke() dispatched (createAsyncThunk)
   → GET jokeapi.dev/joke/Any?safe-mode
   → SUCCESS: joke displayed, history updated, streak++
   → FAILURE: fallback joke shown + warning banner
Two-part joke:
   Setup shown → User clicks "🥁 Reveal Punchline"
   → revealPunchline() → showPunchline = true → fadeIn animation
```

**Redux Slice:** `jokeSlice` — `createAsyncThunk` + 8 sync reducers

---

## 🧩 Skills Practiced Across All Projects

| Skill | Projects |
|-------|---------|
| **Redux Toolkit slices** | All 6 |
| **TypeScript interfaces** | All 6 |
| **Next.js App Router** | All 6 |
| **Responsive Tailwind layouts** | All 6 |
| **`createAsyncThunk` + API** | CurrencyX, JokeBomb |
| **Dynamic routes** | ShopKart (`/product/[id]`) |
| **`useMemo` for performance** | ShopKart |
| **Keyboard event handling** | CalcPro |
| **`Intl.NumberFormat`** | CurrencyX |
| **Clipboard API** | TextCraft, PassForge, JokeBomb |
| **File Download (Blob)** | TextCraft, PassForge |
| **Web Share API** | JokeBomb |
| **CSS animations** | JokeBomb (`@keyframes`) |
| **Fisher-Yates shuffle** | PassForge |
| **Offline fallback data** | CurrencyX, JokeBomb |
| **Dark mode** | TextCraft |

---

## 📄 License

All projects are for **learning and portfolio purposes** only.

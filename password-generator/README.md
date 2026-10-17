# 🔐 PassForge — Advanced Password Generator

> **Project 5 of 6** · Intermediate React Projects Series

A powerful, fully customizable password generator with real-time strength analysis, guaranteed minimum character rules, bulk generation, save-with-label history, and a download-as-file feature. Built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit** — all generation logic lives inside Redux reducers.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Use Cases](#use-cases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Flow](#project-flow)
- [Redux Architecture](#redux-architecture)
- [Generation Algorithm](#generation-algorithm)
- [Strength Scoring Algorithm](#strength-scoring-algorithm)
- [Getting Started](#getting-started)
- [Key Concepts Practiced](#key-concepts-practiced)

---

## Overview

PassForge generates cryptographically-diverse passwords based on user-defined rules. Users control length (4–64), character types, minimum requirements, ambiguous character exclusion, and custom symbol sets. A real-time strength meter scores each password and the user can save, bulk-generate, copy, or download results.

---

## Use Cases

| Who | How They Use It |
|-----|----------------|
| 🔒 **End Users** | Generate secure unique passwords for every account |
| 🏢 **IT Admins** | Bulk-generate temporary passwords for onboarding |
| 🎓 **Students** | Learn about password security and entropy |
| 💻 **Developers** | Reference for Redux business logic + Clipboard API |
| 📋 **Portfolio** | Practical, useful app demonstrating real-world value |

---

## Features

### 🔑 Password Generator
- **Generates a password instantly** on page load
- **Auto-regenerates** every time any option changes
- **Color-coded character display:**
  - 🔵 Blue = Uppercase letters (A–Z)
  - ⚪ White = Lowercase letters (a–z)
  - 🟡 Yellow = Numbers (0–9)
  - 🩷 Pink = Symbols (!@#$...)
- **Show / Hide toggle** — hide the password visually
- **One-click Copy** with ✓ visual feedback
- **Save with label** (e.g. "Gmail", "Bank", "Netflix")
- **Regenerate** button for a new password with same settings

### 📊 Strength Meter
- **5 strength levels:** Very Weak → Weak → Fair → Strong → Very Strong
- **5-bar visual indicator** (color-matched to level)
- **Animated score bar** (0–100)
- Score displayed numerically for precision
- Updates instantly on every regeneration

### ⚙️ Full Customization

| Option | Range / Type | Description |
|--------|-------------|-------------|
| **Length** | Slider 4–64 | Password character count |
| **Uppercase** | Toggle | Include A–Z |
| **Lowercase** | Toggle | Include a–z |
| **Numbers** | Toggle | Include 0–9 |
| **Symbols** | Toggle | Include !@#$%... |
| **Exclude Ambiguous** | Toggle | Remove 0, O, 1, l, I |
| **Min Numbers** | Counter 0–¼ length | Guaranteed digits in output |
| **Min Symbols** | Counter 0–¼ length | Guaranteed symbols in output |
| **Custom Symbols** | Text input | Define your own symbol set |

### 🎯 Quick Presets
| Preset | Length | Config | Best For |
|--------|--------|--------|----------|
| 📌 PIN | 6 | Numbers only | ATM PINs |
| 💬 Memorable | 12 | Upper + Lower + Numbers | Easy to type |
| 🔒 Strong | 16 | All types, 2+2 min | Standard accounts |
| 🛡️ Maximum | 32 | All types, 4+4 min | Banking, email |

### ⚡ Bulk Generator
- Generate **1 to 50 passwords** at once using current settings
- Hover over any row to reveal individual **Copy** button
- **Copy All** — all passwords to clipboard as newline-separated text
- **Download as .txt** — saves file named `passwords-{timestamp}.txt`

### 📋 Saved Password History
- Save current password with an optional **label**
- Each entry shows: label tag, strength badge, timestamp, password
- **Color-coded strength badge** per entry
- Copy individual entries
- Delete individual entries or clear all
- Stores up to **20 saved passwords**

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Typed options, state, interfaces |
| **Tailwind CSS** | 4 | Dark gradient background, responsive layout |
| **Redux Toolkit** | 2.3 | All password generation logic |
| **React Redux** | 9 | Hooks |
| **Clipboard API** | Browser | Copy to clipboard |
| **Blob + URL.createObjectURL** | Browser | Download as .txt file |
| **Math.random** | Browser | Random character selection |

---

## Project Structure

```
password-generator/
│
├── app/
│   ├── layout.tsx                # Root layout — dark purple bg + navbar + Redux Provider
│   ├── page.tsx                  # Main page — options panel + generator + tips + bulk + history
│   └── globals.css
│
├── components/
│   ├── PasswordDisplay.tsx       # Color-coded output, copy, show/hide, save with label
│   ├── StrengthMeter.tsx         # 5-bar indicator + animated score progress bar
│   ├── OptionsPanel.tsx          # Length slider, toggles, presets, advanced options
│   ├── BulkGenerator.tsx         # Generate N passwords, copy all, download .txt
│   ├── HistoryPanel.tsx          # Saved passwords with labels, strength badges
│   └── ReduxProvider.tsx
│
├── store/
│   ├── store.ts                  # Redux store
│   ├── passwordSlice.ts          # ALL logic: generate, score, presets, history, bulk
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
Redux initializes → generatePassword(defaultOptions) called
   Default: length=16, uppercase+lowercase+numbers+symbols
        │
        ▼
calcStrength(password) runs → score + level computed
   Both stored in state (currentPassword, strengthScore, currentStrength)
        │
        ▼
PasswordDisplay renders color-coded characters
StrengthMeter renders bars + animated score bar
        │
        ▼
User drags length slider to 24
        │
        ▼
setOption({ key: "length", value: 24 }) dispatched
Reducer: updates options.length → auto-calls generatePassword + calcStrength
        │
        ▼
New password appears instantly, strength meter updates
        │
        ▼
User clicks preset "🛡️ Maximum"
        │
        ▼
usePreset("maximum") dispatched:
   options = { length:32, all types on, min 4+4 }
   New password generated + scored
        │
        ▼
User clicks "💾 Save" → types "Gmail" → presses Enter
        │
        ▼
saveToHistory("Gmail") → PasswordEntry added to history[]
   { id, password, strength, createdAt, label:"Gmail" }
        │
        ▼
User clicks "Generate 10 Passwords" in Bulk Generator
        │
        ▼
generateBulk() → Array.from({length:10}, () => generatePassword(options))
Stored in bulkPasswords[]
        │
        ▼
User clicks "Download .txt"
        │
        ▼
Blob created → URL.createObjectURL → <a> click → file downloaded
```

---

## Redux Architecture

```ts
interface PasswordState {
  options: PasswordOptions;       // all generator settings
  currentPassword: string;        // latest generated password
  currentStrength: StrengthLevel; // "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong"
  strengthScore: number;          // 0–100 numeric score
  history: PasswordEntry[];       // saved passwords (max 20)
  bulkPasswords: string[];        // bulk-generated list
  bulkCount: number;              // count for bulk generation
  copied: boolean;                // copy button feedback state
}

interface PasswordOptions {
  length: number;             // 4–64
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  excludeAmbiguous: boolean;  // removes 0, O, 1, l, I
  customSymbols: string;      // e.g. "!@#$%"
  useCustomSymbols: boolean;
  minNumbers: number;         // guaranteed minimum digits
  minSymbols: number;         // guaranteed minimum symbols
}
```

### Key Actions

| Action | Payload | Description |
|--------|---------|-------------|
| `generateNew` | — | Regenerate with current options |
| `generateBulk` | — | Create `bulkCount` passwords |
| `setOption<K>` | `{key, value}` | Update any option + auto-regen |
| `usePreset` | `"pin"\|"memorable"\|"strong"\|"maximum"` | Load preset + regen |
| `saveToHistory` | `label?: string` | Save current password |
| `removeFromHistory` | `id: string` | Delete one saved entry |
| `clearHistory` | — | Clear all saved entries |
| `setBulkCount` | `number` | Set bulk generation count |
| `setCopied` | `boolean` | Control copy button feedback |

---

## Generation Algorithm

```
1. Build character pool from enabled options:
   pool = ""
   if useUppercase → pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
   if useLowercase → pool += "abcdefghijklmnopqrstuvwxyz"
   if useNumbers   → pool += "0123456789"
   if useSymbols   → pool += "!@#$%^&*()_+..." (or customSymbols)

2. Remove ambiguous characters if excludeAmbiguous:
   filter out: 0, O, 1, l, I

3. Guarantee minimums (required[] array):
   Add minNumbers random chars from NUMBERS pool
   Add minSymbols random chars from SYMBOLS pool

4. Fill remaining slots (length - required.length):
   Pick random chars from full pool

5. Shuffle using Fisher-Yates algorithm:
   for i = length-1 down to 1:
     j = random int in [0, i]
     swap chars[i] and chars[j]

6. Join and return
```

---

## Strength Scoring Algorithm

```
Start at score = 0

LENGTH:
  +10 if length >= 8
  +15 if length >= 12
  +20 if length >= 16
  +10 if length >= 20

CHARACTER VARIETY:
  +10 contains uppercase [A-Z]
  +10 contains lowercase [a-z]
  +10 contains numbers   [0-9]
  +15 contains symbols   [^A-Za-z0-9]

BONUS:
  +5  3 or more character types present
  +5  all 4 character types present

PENALTIES:
  −10 3+ consecutive identical characters (aaa, 111)
  −10 only letters, no numbers or symbols

Clamp result to [0, 100]

Levels:
  0–19   → Very Weak  🔴
  20–39  → Weak       🟠
  40–59  → Fair       🟡
  60–79  → Strong     🟢
  80–100 → Very Strong 💚
```

---

## Getting Started

```bash
cd password-generator
npm install
npm run dev
```

Open **http://localhost:3000**

---

## Key Concepts Practiced

| Concept | Where Used |
|---------|-----------|
| **All logic in Redux reducers** | `passwordSlice.ts` — no business logic in components |
| **Fisher-Yates shuffle** | Unbiased character ordering in `generatePassword()` |
| **Minimum character guarantees** | Required-pool technique before main fill |
| **`Blob` + `URL.createObjectURL`** | Bulk download as `.txt` file |
| **Clipboard API** | Copy with visual feedback |
| **Custom CSS toggle switch** | Pure Tailwind, no library |
| **Sticky responsive layout** | Options panel sticky on large screens |
| **Typed generic reducer** | `setOption<K extends keyof PasswordOptions>` |

---

## License

For **learning and portfolio purposes** only. Built as part of the Intermediate React Projects series.

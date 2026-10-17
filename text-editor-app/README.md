# 📝 TextCraft — Text Editor App

> **Project 1 of 6** · Intermediate React Projects Series

A powerful, feature-rich text utility and analysis web app built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit**. TextCraft lets users manipulate, transform, and analyze their text in real time — all in the browser, no backend required.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Use Cases](#use-cases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Flow](#project-flow)
- [Redux Architecture](#redux-architecture)
- [Getting Started](#getting-started)
- [Key Concepts Practiced](#key-concepts-practiced)
- [Screenshots Overview](#screenshots-overview)

---

## Overview

TextCraft is a browser-based text editor that provides a suite of text transformation and analysis tools. Users paste or type text into the editor, then apply transformations with a single click. Live statistics update in real time as the user types.

---

## Use Cases

| Who | How They Use It |
|-----|----------------|
| 👩‍💻 **Developers** | Quickly convert API response text to different cases |
| 📝 **Writers / Bloggers** | Check word count, reading time, clean up spacing |
| 🎓 **Students** | Count words for assignments, format text |
| 📊 **Data Analysts** | Clean and normalize CSV/text data |
| 🌐 **Content Creators** | Format social media captions, titles |
| 📧 **Email Writers** | Estimate reading time before sending long emails |

---

## Features

### ✏️ Text Transformations
| Button | What It Does |
|--------|-------------|
| **UPPERCASE** | Converts all text to `UPPERCASE` |
| **lowercase** | Converts all text to `lowercase` |
| **Title Case** | Capitalizes the **First Letter Of Every Word** |
| **Sentence case** | Capitalizes the first letter of every sentence |
| **Remove Extra Spaces** | Strips all double/triple spaces and leading/trailing whitespace |
| **Reverse Text** | Reverses the entire string character by character |

### 📋 Utility Actions
| Button | What It Does |
|--------|-------------|
| **Copy** | Copies text to clipboard with visual ✓ feedback |
| **Download** | Saves text as a `.txt` file to your device |
| **Clear** | Instantly wipes the editor |

### 📊 Live Statistics (update as you type)
| Stat | Description |
|------|-------------|
| Words | Total word count |
| Characters | Total character count including spaces |
| Chars (no spaces) | Character count excluding whitespace |
| Sentences | Number of sentences (split by `.`, `!`, `?`) |
| Paragraphs | Number of paragraphs (split by newlines) |
| Reading Time | Estimated at 200 words per minute |

### 🌗 Other
- **Dark Mode** toggle in the navbar
- **Live Preview** section below the editor showing formatted output
- **Toast notifications** for every action (Copied!, Cleared!, Downloaded!)

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework, App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Redux Toolkit** | 2.3 | Global state management |
| **React Redux** | 9 | Redux bindings for React |

**APIs / Browser APIs used:**
- `navigator.clipboard.writeText()` — copy to clipboard
- `Blob` + `URL.createObjectURL()` — download as file
- `document.documentElement.classList.toggle("dark")` — dark mode

---

## Project Structure

```
text-editor-app/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — wraps app in Redux Provider + Navbar
│   ├── page.tsx                  # Home page — renders stats + editor + feature cards
│   └── globals.css               # Global Tailwind CSS import
│
├── components/
│   ├── Navbar.tsx                # Top navigation with logo and dark/light mode toggle
│   ├── TextEditor.tsx            # Main textarea + toolbar buttons + preview section
│   ├── StatsCard.tsx             # 6-metric live stats grid (reads from Redux)
│   └── ReduxProvider.tsx         # Client-side Redux <Provider> wrapper
│
├── store/
│   ├── store.ts                  # Configures Redux store with textReducer
│   ├── textSlice.ts              # Text state + all transformation reducers
│   └── hooks.ts                  # Typed useAppDispatch and useAppSelector hooks
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## Project Flow

```
User opens the app
        │
        ▼
 Redux store initializes with empty text state
        │
        ▼
 User types in <TextEditor> textarea
        │
        ▼
 onChange → dispatches setText(value) to Redux
        │
        ▼
 textSlice reducer recalculates all stats:
   wordCount, charCount, charCountNoSpaces,
   sentenceCount, paragraphCount, readingTime
        │
        ├──▶ <StatsCard> re-renders with new stats
        └──▶ <TextEditor> live preview updates
        │
        ▼
 User clicks a toolbar button (e.g. UPPERCASE)
        │
        ▼
 Dispatches action → reducer transforms state.text
        │
        ▼
 All stats recalculate automatically
        │
        ▼
 Toast notification appears for 2.5 seconds
```

---

## Redux Architecture

```ts
// State shape
interface TextState {
  text: string;
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: string;
}

// Actions (reducers in textSlice.ts)
setText(value)          // update text + recalculate all stats
toUpperCase()           // text.toUpperCase()
toLowerCase()           // text.toLowerCase()
toTitleCase()           // capitalize first letter of each word
toSentenceCase()        // capitalize first letter of each sentence
removeExtraSpaces()     // text.replace(/\s+/g, ' ').trim()
reverseText()           // text.split('').reverse().join('')
clearText()             // reset all state to empty
```

All stats are **derived synchronously inside the reducer** — no `useEffect`, no extra selectors needed.

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm

### Installation & Run

```bash
# Step 1 — Navigate to the project
cd text-editor-app

# Step 2 — Install all dependencies (Next.js, Tailwind, Redux)
npm install

# Step 3 — Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Key Concepts Practiced

| Concept | Where Used |
|---------|-----------|
| **Redux Toolkit slice** | `textSlice.ts` — all state + reducers in one place |
| **Derived state in reducers** | Stats computed inside `setText` reducer |
| **Next.js App Router** | `app/layout.tsx`, `app/page.tsx` |
| **`"use client"` directive** | All interactive components |
| **Tailwind dark mode** | `dark:` prefix classes + `classList.toggle("dark")` |
| **Clipboard API** | `navigator.clipboard.writeText()` |
| **File Download** | `Blob` + `<a>` download trick |
| **Toast notifications** | `useState` + `setTimeout` pattern |

---

## Screenshots Overview

```
┌─────────────────────────────────────────────────────┐
│  📝 TextCraft                           🌙 Dark Mode │  ← Navbar
├─────────────────────────────────────────────────────┤
│  📝 12    🔤 68    🔡 57    📖 2    📄 1    ⏱️ 1min │  ← Live Stats
├─────────────────────────────────────────────────────┤
│  [UPPERCASE] [lowercase] [Title] [Sentence]          │
│  [Remove Spaces] [Reverse] [Clear] [Copy] [Download] │  ← Toolbar
│  ╔═══════════════════════════════════════════════╗   │
│  ║ Type or paste your text here...               ║   │  ← Editor
│  ╚═══════════════════════════════════════════════╝   │
│  Preview:                                            │
│  ╔═══════════════════════════════════════════════╗   │
│  ║ Formatted output shown here in real time      ║   │  ← Preview
│  ╚═══════════════════════════════════════════════╝   │
├─────────────────────────────────────────────────────┤
│  ✏️ Case Conversion  🧹 Cleanup  🔄 Reverse  📊 Stats│  ← Feature Cards
└─────────────────────────────────────────────────────┘
```

---

## License

This project is for **learning and portfolio purposes** only. Built as part of the Intermediate React Projects series.

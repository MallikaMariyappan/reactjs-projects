# 🧮 CalcPro — Advanced Scientific Calculator

> **Project 3 of 6** · Intermediate React Projects Series

A fully-featured scientific calculator with basic arithmetic, trigonometry, logarithms, power/root functions, memory registers, keyboard support, and a scrollable calculation history. Built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit** — all calculator logic lives entirely inside Redux reducers.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Use Cases](#use-cases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Flow](#project-flow)
- [Redux Architecture](#redux-architecture)
- [Button Reference](#button-reference)
- [Strength Algorithm](#strength-algorithm)
- [Getting Started](#getting-started)
- [Key Concepts Practiced](#key-concepts-practiced)

---

## Overview

CalcPro goes well beyond a basic four-function calculator. It supports scientific operations (sin, cos, tan, log, ln, powers, roots), memory registers, a toggleable DEG/RAD mode, calculation history with click-to-reuse, and full keyboard input. Every operation — including chaining — is handled in a single Redux slice with no logic in the UI components.

---

## Use Cases

| Who | How They Use It |
|-----|----------------|
| 🎓 **Students** | Solve trigonometry, logarithms for homework |
| 🔬 **Scientists** | Quick scientific computations in browser |
| 💻 **Developers** | Reference for Redux state machine patterns |
| 📱 **General Users** | Everyday arithmetic with keyboard support |
| 🧑‍🏫 **Teachers** | Demo of DEG vs RAD mode for trig functions |

---

## Features

### ➕ Basic Arithmetic
| Operation | Button | Keyboard |
|-----------|--------|----------|
| Addition | `+` | `+` |
| Subtraction | `−` | `-` |
| Multiplication | `×` | `*` |
| Division | `÷` | `/` |
| Modulus | `%` | `%` |
| Power (xʸ) | `xʸ` | `^` |

### 📐 Scientific Functions
| Function | Description |
|----------|-------------|
| `sin` `cos` `tan` | Trigonometric (respects DEG/RAD mode) |
| `log` | Base-10 logarithm |
| `ln` | Natural logarithm (base e) |
| `e^x` | Natural exponential |
| `10^x` | Power of 10 |
| `x²` | Square |
| `x³` | Cube |
| `√` | Square root |
| `∛` | Cube root |
| `1/x` | Reciprocal |
| `x!` | Factorial (integer only, max 20) |
| `\|x\|` | Absolute value |
| `±` | Toggle positive/negative sign |

### 🔵 Mathematical Constants
| Constant | Value |
|----------|-------|
| `π` | 3.141592653589793 |
| `e` | 2.718281828459045 |

### 💾 Memory Register (4 operations)
| Button | Action |
|--------|--------|
| `MS` | Store current value to memory |
| `MR` | Recall memory value to display |
| `M+` | Add current value to memory |
| `MC` | Clear memory register to 0 |

### ⌨️ Keyboard Support
| Key | Action |
|-----|--------|
| `0`–`9`, `.` | Input digits |
| `+` `-` `*` `/` `%` `^` | Operators |
| `Enter` or `=` | Evaluate |
| `Backspace` | Delete last digit |
| `Escape` | All Clear (AC) |
| `Delete` | Clear Entry (CE) |

### 📋 Calculation History
- Stores last **20 calculations** with expression and result
- Timestamped entries
- Click any entry to **reuse the result** in the calculator
- Clear all history with one click

### 🎛️ Display Features
- **Expression bar** — shows full expression being built (e.g. `12 × 4 =`)
- **Dynamic font size** — automatically shrinks for long numbers
- **Angle mode badge** — `DEG` or `RAD` shown in display
- **Memory badge** — shows current memory value when non-zero
- Floating-point precision cleanup (avoids `0.1 + 0.2 = 0.30000000000000004`)
- Scientific notation for very large (`> 1e15`) or very small (`< 1e-7`) numbers

### 🎨 UI Toggles
- **Scientific panel** — toggle scientific functions panel on/off
- **History panel** — toggle history sidebar on/off

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework, App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety for all state and actions |
| **Tailwind CSS** | 4 | Calculator button grid, color variants |
| **Redux Toolkit** | 2.3 | Full calculator state machine |
| **React Redux** | 9 | Hooks |

---

## Project Structure

```
advanced-calculator/
│
├── app/
│   ├── layout.tsx                # Root layout with dark bg + Redux Provider
│   ├── page.tsx                  # Main page — header + Calculator + features strip
│   └── globals.css
│
├── components/
│   ├── Calculator.tsx            # Full keypad, scientific panel, keyboard handler
│   ├── Display.tsx               # Expression bar + main number + badges
│   ├── CalcButton.tsx            # Reusable button (5 color variants)
│   ├── HistoryPanel.tsx          # Scrollable calculation history
│   └── ReduxProvider.tsx
│
├── store/
│   ├── store.ts                  # Redux store
│   ├── calculatorSlice.ts        # Complete calculator state machine (18 actions)
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
Redux store initializes with display="0", operator="", history=[]
        │
        ▼
User presses digit button (or keyboard key)
        │
        ▼
inputDigit("7") dispatched → display updates to "7"
        │
        ▼
User presses operator "×"
        │
        ▼
setOperator("×") dispatched:
   prevValue = "7"
   operator  = "×"
   expression = "7 × "
   waitingForOperand = true
        │
        ▼
User presses digit "4"
        │
        ▼
inputDigit("4") → display = "4", waitingForOperand = false
        │
        ▼
User presses "="
        │
        ▼
evaluate() dispatched:
   result = prev(7) × curr(4) = 28
   history entry added with timestamp
   display = "28"
   justEvaluated = true
        │
        ▼
User presses "√" (unary)
        │
        ▼
applyUnary("√"):
   result = Math.sqrt(28) = 5.291502622...
   history entry added: "√(28) ="
   display = "5.2915..."
```

---

## Redux Architecture

```ts
interface CalcState {
  display: string;            // Current number shown on screen
  expression: string;         // Full expression string shown above display
  prevValue: string;          // Left operand stored for binary ops
  operator: string;           // Current active operator
  waitingForOperand: boolean; // True after pressing an operator
  justEvaluated: boolean;     // True after pressing = (next digit starts fresh)
  history: HistoryEntry[];    // Last 20 calculations
  angleMode: "DEG" | "RAD";  // For sin/cos/tan
  memory: number;             // Memory register value
}
```

### All 18 Reducer Actions

| Action | Type | Description |
|--------|------|-------------|
| `inputDigit` | `PayloadAction<string>` | Append digit or decimal point |
| `setOperator` | `PayloadAction<string>` | Set binary operator, chain if pending |
| `evaluate` | — | Calculate result, push to history |
| `applyUnary` | `PayloadAction<string>` | Apply single-operand function |
| `inputConstant` | `PayloadAction<string>` | Set π or e as current value |
| `clear` | — | Clear current entry (CE) |
| `allClear` | — | Reset all state (AC) |
| `backspace` | — | Delete last digit |
| `toggleAngleMode` | — | Switch DEG ↔ RAD |
| `memoryStore` | — | MS: save display to memory |
| `memoryRecall` | — | MR: load memory to display |
| `memoryAdd` | — | M+: add display to memory |
| `memoryClear` | — | MC: reset memory to 0 |
| `clearHistory` | — | Clear history array |
| `loadFromHistory` | `PayloadAction<string>` | Load a result from history |

---

## Button Reference

### Color Coding
| Color | Variant | Used For |
|-------|---------|----------|
| Gray (`bg-gray-700`) | `digit` | Number buttons 0–9, decimal |
| Indigo (`bg-indigo-600`) | `operator` | +, −, ×, ÷, % |
| Orange (`bg-orange-500`) | `equals` | = button |
| Cyan text (`bg-gray-600`) | `function` | sin, cos, log, √, etc. |
| Teal (`bg-teal-700`) | `memory` | MS, MR, M+, MC |
| Red (`bg-red-600`) | `clear` | AC, CE |
| Yellow text (`bg-gray-800`) | `special` | π, e, ±, DEG/RAD |

---

## Getting Started

```bash
cd advanced-calculator
npm install
npm run dev
```

Open **http://localhost:3000**

---

## Key Concepts Practiced

| Concept | Where Used |
|---------|-----------|
| **Redux as state machine** | Full calculator logic in `calculatorSlice.ts` |
| **Operator chaining** | `setOperator` evaluates if op already pending |
| **`useEffect` + keyboard events** | `Calculator.tsx` — `window.addEventListener("keydown")` |
| **Dynamic font size** | `Display.tsx` — conditional Tailwind classes |
| **Toggle panels** | `useState` for Scientific and History panels |
| **Floating-point cleanup** | `toPrecision(12)` + `parseFloat` |
| **Accessibility** | `aria-live` on display, `aria-label` on all buttons |

---

## License

For **learning and portfolio purposes** only. Built as part of the Intermediate React Projects series.

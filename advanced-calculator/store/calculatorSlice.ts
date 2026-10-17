import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AngleMode = "DEG" | "RAD";

export interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: string;
}

interface CalcState {
  display: string;          // what shows on screen
  expression: string;       // full expression string
  prevValue: string;
  operator: string;
  waitingForOperand: boolean;
  justEvaluated: boolean;
  history: HistoryEntry[];
  angleMode: AngleMode;
  memory: number;
}

const initialState: CalcState = {
  display: "0",
  expression: "",
  prevValue: "",
  operator: "",
  waitingForOperand: false,
  justEvaluated: false,
  history: [],
  angleMode: "DEG",
  memory: 0,
};

const MAX_DISPLAY = 15;

const formatResult = (n: number): string => {
  if (!isFinite(n)) return n > 0 ? "Infinity" : "-Infinity";
  if (isNaN(n)) return "Error";
  // Avoid floating-point noise
  const fixed = parseFloat(n.toPrecision(12));
  // Use exponential for very large/small
  if (Math.abs(fixed) > 1e15 || (Math.abs(fixed) < 1e-7 && fixed !== 0)) {
    return fixed.toExponential(6);
  }
  return String(fixed);
};

const toRad = (deg: number) => (deg * Math.PI) / 180;

const calcSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    // ── Digit / Decimal ──────────────────────────────────
    inputDigit(state, action: PayloadAction<string>) {
      const digit = action.payload;

      if (state.justEvaluated) {
        // Start fresh after =
        state.display = digit === "." ? "0." : digit;
        state.expression = digit === "." ? "0." : digit;
        state.justEvaluated = false;
        state.waitingForOperand = false;
        return;
      }

      if (state.waitingForOperand) {
        state.display = digit === "." ? "0." : digit;
        state.waitingForOperand = false;
      } else {
        if (digit === "." && state.display.includes(".")) return;
        const newVal = state.display === "0" && digit !== "."
          ? digit
          : state.display + digit;
        if (newVal.replace("-", "").replace(".", "").length > MAX_DISPLAY) return;
        state.display = newVal;
      }

      // Update expression tail
      if (state.operator) {
        // Replace the right-hand part after operator
        const opIdx = state.expression.lastIndexOf(
          ` ${state.operator} `
        );
        if (opIdx >= 0) {
          state.expression =
            state.expression.slice(0, opIdx + state.operator.length + 2) +
            state.display;
        } else {
          state.expression = state.display;
        }
      } else {
        state.expression = state.display;
      }
    },

    // ── Operator ─────────────────────────────────────────
    setOperator(state, action: PayloadAction<string>) {
      const op = action.payload;

      if (state.operator && !state.waitingForOperand) {
        // Chain: evaluate first
        const prev = parseFloat(state.prevValue);
        const curr = parseFloat(state.display);
        let result = 0;
        switch (state.operator) {
          case "+": result = prev + curr; break;
          case "−": result = prev - curr; break;
          case "×": result = prev * curr; break;
          case "÷": result = curr !== 0 ? prev / curr : NaN; break;
          case "%": result = prev % curr; break;
          case "^": result = Math.pow(prev, curr); break;
        }
        const res = formatResult(result);
        state.display = res;
        state.prevValue = res;
        state.expression = `${res} ${op} `;
      } else {
        state.prevValue = state.display;
        state.expression = `${state.display} ${op} `;
      }

      state.operator = op;
      state.waitingForOperand = true;
      state.justEvaluated = false;
    },

    // ── Equals ───────────────────────────────────────────
    evaluate(state) {
      if (!state.operator || state.waitingForOperand) return;

      const prev = parseFloat(state.prevValue);
      const curr = parseFloat(state.display);
      let result = 0;

      switch (state.operator) {
        case "+": result = prev + curr; break;
        case "−": result = prev - curr; break;
        case "×": result = prev * curr; break;
        case "÷": result = curr !== 0 ? prev / curr : NaN; break;
        case "%": result = prev % curr; break;
        case "^": result = Math.pow(prev, curr); break;
        default: result = curr;
      }

      const res = formatResult(result);
      const expr = `${state.expression} =`;

      // Push to history
      state.history.unshift({
        expression: expr,
        result: res,
        timestamp: new Date().toLocaleTimeString(),
      });
      if (state.history.length > 20) state.history.pop();

      state.display = res;
      state.expression = expr;
      state.prevValue = "";
      state.operator = "";
      state.waitingForOperand = false;
      state.justEvaluated = true;
    },

    // ── Unary operations ─────────────────────────────────
    applyUnary(state, action: PayloadAction<string>) {
      const op = action.payload;
      const curr = parseFloat(state.display);
      let result = 0;
      let label = "";
      const deg = state.angleMode === "DEG";

      switch (op) {
        case "x²":   result = Math.pow(curr, 2); label = `(${curr})²`; break;
        case "x³":   result = Math.pow(curr, 3); label = `(${curr})³`; break;
        case "√":    result = curr >= 0 ? Math.sqrt(curr) : NaN; label = `√(${curr})`; break;
        case "∛":    result = Math.cbrt(curr); label = `∛(${curr})`; break;
        case "1/x":  result = curr !== 0 ? 1 / curr : NaN; label = `1/(${curr})`; break;
        case "x!":   result = factorial(curr); label = `${curr}!`; break;
        case "log":  result = curr > 0 ? Math.log10(curr) : NaN; label = `log(${curr})`; break;
        case "ln":   result = curr > 0 ? Math.log(curr) : NaN; label = `ln(${curr})`; break;
        case "sin":  result = deg ? Math.sin(toRad(curr)) : Math.sin(curr); label = `sin(${curr})`; break;
        case "cos":  result = deg ? Math.cos(toRad(curr)) : Math.cos(curr); label = `cos(${curr})`; break;
        case "tan":  result = deg ? Math.tan(toRad(curr)) : Math.tan(curr); label = `tan(${curr})`; break;
        case "±":    result = -curr; label = `-(${curr})`; break;
        case "abs":  result = Math.abs(curr); label = `|${curr}|`; break;
        case "e^x":  result = Math.exp(curr); label = `e^(${curr})`; break;
        case "10^x": result = Math.pow(10, curr); label = `10^(${curr})`; break;
        default: return;
      }

      const res = formatResult(result);
      state.history.unshift({
        expression: `${label} =`,
        result: res,
        timestamp: new Date().toLocaleTimeString(),
      });
      if (state.history.length > 20) state.history.pop();

      state.display = res;
      state.expression = `${label} = ${res}`;
      state.prevValue = "";
      state.operator = "";
      state.justEvaluated = true;
      state.waitingForOperand = false;
    },

    // ── Constants ────────────────────────────────────────
    inputConstant(state, action: PayloadAction<string>) {
      const val = action.payload === "π" ? String(Math.PI) : String(Math.E);
      state.display = val;
      state.expression = val;
      state.justEvaluated = false;
      state.waitingForOperand = false;
    },

    // ── Clear / Backspace ────────────────────────────────
    clear(state) {
      state.display = "0";
      state.expression = "";
      state.prevValue = "";
      state.operator = "";
      state.waitingForOperand = false;
      state.justEvaluated = false;
    },

    allClear(state) {
      Object.assign(state, { ...initialState, history: state.history, memory: state.memory, angleMode: state.angleMode });
    },

    backspace(state) {
      if (state.justEvaluated || state.waitingForOperand) return;
      if (state.display.length <= 1 || (state.display.length === 2 && state.display[0] === "-")) {
        state.display = "0";
      } else {
        state.display = state.display.slice(0, -1);
      }
    },

    // ── Angle mode ───────────────────────────────────────
    toggleAngleMode(state) {
      state.angleMode = state.angleMode === "DEG" ? "RAD" : "DEG";
    },

    // ── Memory ───────────────────────────────────────────
    memoryStore(state) {
      state.memory = parseFloat(state.display) || 0;
    },
    memoryRecall(state) {
      state.display = String(state.memory);
      state.waitingForOperand = false;
      state.justEvaluated = false;
    },
    memoryAdd(state) {
      state.memory += parseFloat(state.display) || 0;
    },
    memoryClear(state) {
      state.memory = 0;
    },

    // ── History ──────────────────────────────────────────
    clearHistory(state) {
      state.history = [];
    },

    loadFromHistory(state, action: PayloadAction<string>) {
      state.display = action.payload;
      state.justEvaluated = true;
      state.operator = "";
      state.prevValue = "";
    },
  },
});

// Helper: factorial (integer only, capped at 20)
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 20) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export const {
  inputDigit,
  setOperator,
  evaluate,
  applyUnary,
  inputConstant,
  clear,
  allClear,
  backspace,
  toggleAngleMode,
  memoryStore,
  memoryRecall,
  memoryAdd,
  memoryClear,
  clearHistory,
  loadFromHistory,
} = calcSlice.actions;

export default calcSlice.reducer;

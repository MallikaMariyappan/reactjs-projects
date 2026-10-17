import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ── Character pools ──────────────────────────────────────
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS   = "0123456789";
const SYMBOLS   = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
const AMBIGUOUS = "0O1lI";

export type StrengthLevel = "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";

export interface PasswordEntry {
  id: string;
  password: string;
  strength: StrengthLevel;
  createdAt: string;
  label: string;
}

export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  excludeAmbiguous: boolean;
  customSymbols: string;
  useCustomSymbols: boolean;
  minNumbers: number;
  minSymbols: number;
}

interface PasswordState {
  options: PasswordOptions;
  currentPassword: string;
  currentStrength: StrengthLevel;
  strengthScore: number; // 0-100
  history: PasswordEntry[];
  bulkPasswords: string[];
  bulkCount: number;
  copied: boolean;
}

// ── Strength calculator ───────────────────────────────────
function calcStrength(password: string): { level: StrengthLevel; score: number } {
  if (!password) return { level: "Very Weak", score: 0 };

  let score = 0;
  const len = password.length;

  // Length points
  if (len >= 8)  score += 10;
  if (len >= 12) score += 15;
  if (len >= 16) score += 20;
  if (len >= 20) score += 10;

  // Character variety
  if (/[A-Z]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  // Multiple char types
  const types = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) =>
    r.test(password)
  ).length;
  if (types >= 3) score += 5;
  if (types === 4) score += 5;

  // Penalize patterns
  if (/(.)\1{2,}/.test(password)) score -= 10; // repeated chars
  if (/^[a-z]+$/i.test(password)) score -= 10; // only letters

  score = Math.max(0, Math.min(100, score));

  let level: StrengthLevel = "Very Weak";
  if (score >= 80) level = "Very Strong";
  else if (score >= 60) level = "Strong";
  else if (score >= 40) level = "Fair";
  else if (score >= 20) level = "Weak";

  return { level, score };
}

// ── Password generator ────────────────────────────────────
function generatePassword(options: PasswordOptions): string {
  let pool = "";
  const required: string[] = [];

  if (options.useUppercase) pool += UPPERCASE;
  if (options.useLowercase) pool += LOWERCASE;
  if (options.useNumbers)   pool += NUMBERS;
  if (options.useSymbols) {
    const syms = options.useCustomSymbols && options.customSymbols
      ? options.customSymbols
      : SYMBOLS;
    pool += syms;
  }

  if (!pool) return "Select at least one option";

  // Remove ambiguous if requested
  if (options.excludeAmbiguous) {
    pool = pool.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
  }

  // Guarantee required minimums
  const addRequired = (chars: string, count: number) => {
    const filtered = options.excludeAmbiguous
      ? chars.split("").filter((c) => !AMBIGUOUS.includes(c)).join("")
      : chars;
    if (!filtered) return;
    for (let i = 0; i < count; i++) {
      required.push(filtered[Math.floor(Math.random() * filtered.length)]);
    }
  };

  if (options.useNumbers  && options.minNumbers > 0) addRequired(NUMBERS, options.minNumbers);
  if (options.useSymbols  && options.minSymbols > 0) {
    const syms = options.useCustomSymbols && options.customSymbols
      ? options.customSymbols : SYMBOLS;
    addRequired(syms, options.minSymbols);
  }

  // Fill remaining length
  const remaining = options.length - required.length;
  const chars: string[] = [...required];
  for (let i = 0; i < remaining; i++) {
    chars.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  // Shuffle using Fisher-Yates
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

// ── Initial state ─────────────────────────────────────────
const defaultOptions: PasswordOptions = {
  length: 16,
  useUppercase: true,
  useLowercase: true,
  useNumbers: true,
  useSymbols: true,
  excludeAmbiguous: false,
  customSymbols: "!@#$%",
  useCustomSymbols: false,
  minNumbers: 1,
  minSymbols: 1,
};

const initialPassword = generatePassword(defaultOptions);
const initialStrength = calcStrength(initialPassword);

const initialState: PasswordState = {
  options: defaultOptions,
  currentPassword: initialPassword,
  currentStrength: initialStrength.level,
  strengthScore: initialStrength.score,
  history: [],
  bulkPasswords: [],
  bulkCount: 5,
  copied: false,
};

// ── Slice ─────────────────────────────────────────────────
const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    generateNew(state) {
      const pwd = generatePassword(state.options);
      const { level, score } = calcStrength(pwd);
      state.currentPassword = pwd;
      state.currentStrength = level;
      state.strengthScore = score;
      state.copied = false;
    },

    generateBulk(state) {
      state.bulkPasswords = Array.from({ length: state.bulkCount }, () =>
        generatePassword(state.options)
      );
    },

    setOption<K extends keyof PasswordOptions>(
      state: PasswordState,
      action: PayloadAction<{ key: K; value: PasswordOptions[K] }>
    ) {
      (state.options[action.payload.key] as PasswordOptions[K]) =
        action.payload.value;
      // Clamp minNumbers + minSymbols if length changes
      if (action.payload.key === "length") {
        const len = action.payload.value as number;
        state.options.minNumbers = Math.min(state.options.minNumbers, Math.floor(len / 4));
        state.options.minSymbols = Math.min(state.options.minSymbols, Math.floor(len / 4));
      }
      // Auto-regen on option change
      const pwd = generatePassword(state.options);
      const { level, score } = calcStrength(pwd);
      state.currentPassword = pwd;
      state.currentStrength = level;
      state.strengthScore = score;
      state.copied = false;
    },

    saveToHistory(state, action: PayloadAction<string | undefined>) {
      const entry: PasswordEntry = {
        id: Date.now().toString(),
        password: state.currentPassword,
        strength: state.currentStrength,
        createdAt: new Date().toLocaleString(),
        label: action.payload ?? "",
      };
      state.history.unshift(entry);
      if (state.history.length > 20) state.history.pop();
    },

    removeFromHistory(state, action: PayloadAction<string>) {
      state.history = state.history.filter((e) => e.id !== action.payload);
    },

    clearHistory(state) {
      state.history = [];
    },

    setCopied(state, action: PayloadAction<boolean>) {
      state.copied = action.payload;
    },

    setBulkCount(state, action: PayloadAction<number>) {
      state.bulkCount = Math.min(50, Math.max(1, action.payload));
    },

    usePreset(
      state,
      action: PayloadAction<"pin" | "memorable" | "strong" | "maximum">
    ) {
      switch (action.payload) {
        case "pin":
          state.options = { ...defaultOptions, length: 6, useUppercase: false, useLowercase: false, useSymbols: false, useNumbers: true, minNumbers: 6, minSymbols: 0 };
          break;
        case "memorable":
          state.options = { ...defaultOptions, length: 12, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: false, minNumbers: 2, minSymbols: 0 };
          break;
        case "strong":
          state.options = { ...defaultOptions, length: 16, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: true, minNumbers: 2, minSymbols: 2 };
          break;
        case "maximum":
          state.options = { ...defaultOptions, length: 32, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: true, minNumbers: 4, minSymbols: 4 };
          break;
      }
      const pwd = generatePassword(state.options);
      const { level, score } = calcStrength(pwd);
      state.currentPassword = pwd;
      state.currentStrength = level;
      state.strengthScore = score;
      state.copied = false;
    },
  },
});

export const {
  generateNew,
  generateBulk,
  setOption,
  saveToHistory,
  removeFromHistory,
  clearHistory,
  setCopied,
  setBulkCount,
  usePreset,
} = passwordSlice.actions;

export default passwordSlice.reducer;

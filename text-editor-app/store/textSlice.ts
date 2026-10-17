import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextState {
  text: string;
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: string;
}

const countStats = (text: string) => {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = trimmed === "" ? 0 : trimmed.split(/\n+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  const readingTime = words === 0 ? "0 min" : minutes < 1 ? "< 1 min" : `${minutes} min`;
  return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime };
};

const initialState: TextState = {
  text: "",
  wordCount: 0,
  charCount: 0,
  charCountNoSpaces: 0,
  sentenceCount: 0,
  paragraphCount: 0,
  readingTime: "0 min",
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      const s = countStats(action.payload);
      state.text = action.payload;
      state.wordCount = s.words;
      state.charCount = s.chars;
      state.charCountNoSpaces = s.charsNoSpaces;
      state.sentenceCount = s.sentences;
      state.paragraphCount = s.paragraphs;
      state.readingTime = s.readingTime;
    },
    toUpperCase(state) {
      state.text = state.text.toUpperCase();
    },
    toLowerCase(state) {
      state.text = state.text.toLowerCase();
    },
    toTitleCase(state) {
      state.text = state.text
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
    toSentenceCase(state) {
      state.text = state.text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
    },
    removeExtraSpaces(state) {
      state.text = state.text.replace(/\s+/g, " ").trim();
    },
    reverseText(state) {
      state.text = state.text.split("").reverse().join("");
    },
    clearText(state) {
      state.text = "";
      state.wordCount = 0;
      state.charCount = 0;
      state.charCountNoSpaces = 0;
      state.sentenceCount = 0;
      state.paragraphCount = 0;
      state.readingTime = "0 min";
    },
    copyText(state) {
      // copy is handled in component; this is a no-op reducer placeholder
      void state;
    },
  },
});

export const {
  setText,
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  removeExtraSpaces,
  reverseText,
  clearText,
} = textSlice.actions;

export default textSlice.reducer;

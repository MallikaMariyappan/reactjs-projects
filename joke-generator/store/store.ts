import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "./jokeSlice";

export const store = configureStore({
  reducer: {
    jokes: jokeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

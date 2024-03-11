import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export enum Language {
  ENGLISH = "english",
  RUSSIAN = "russian",
}

interface AppState {
  theme: Theme;
  language: Language;
}

export const LOCAL_STORAGE_THEME_KEY = "theme";
export const LOCAL_STORAGE_LANGUAGE_KEY = "language";

const initialState: AppState = {
  theme:
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ?? Theme.LIGHT,
  language:
    (localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) as Language) ??
    Language.RUSSIAN,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = AppSlice.actions;

export default AppSlice.reducer;
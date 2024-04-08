import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Language} from "../../config/i18nConfig";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
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
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = AppSlice.actions;

export default AppSlice.reducer;
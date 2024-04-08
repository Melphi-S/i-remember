import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./reducers/AppSlice.ts";
import userReducer from "./reducers/UserSlice.ts";
import vocabularyReducer from "./reducers/VocabularySlice.ts";
import { authAPI } from "../api/services/AuthService.ts";
import { userApi } from "../api/services/UserService.ts";
import { baseWordsApi } from "../api/services/BaseWordsService.ts";
import { vocabularyWordsApi } from "../api/services/VocabularyWordsService.ts";
import { vocabularyApi } from "../api/services/VocabularyService.ts";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    vocabulary: vocabularyReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [vocabularyWordsApi.reducerPath]: vocabularyWordsApi.reducer,
    [baseWordsApi.reducerPath]: baseWordsApi.reducer,
    [vocabularyApi.reducerPath]: vocabularyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(userApi.middleware)
      .concat(vocabularyWordsApi.middleware)
      .concat(baseWordsApi.middleware)
      .concat(vocabularyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

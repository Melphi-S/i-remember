import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./reducers/AppSlice.ts";
import userReducer from "./reducers/UserSlice.ts";
import vocabularyReducer from "./reducers/VocabularySlice.ts";
import { authAPI } from "../api/services/AuthService.ts";
import { userApi } from "../api/services/UserService.ts";
import { wordsApi } from "../api/services/WordsService.ts";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    vocabulary: vocabularyReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [wordsApi.reducerPath]: wordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(userApi.middleware)
      .concat(wordsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

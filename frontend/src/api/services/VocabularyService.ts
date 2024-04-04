import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import { VocabularyWord } from "../models/Vocabulary.ts";
import {
  decreaseWordStatus,
  increaseWordStatus,
  rejectWord,
} from "../../store/reducers/VocabularySlice.ts";
const cookies = new Cookies();

export const vocabularyApi = createApi({
  reducerPath: "vocabularyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/vocabulary-words/`,
  }),
  endpoints: (builder) => ({
    increaseStatus: builder.mutation<VocabularyWord, number>({
      query: (id) => ({
        url: `${id}/increase`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(increaseWordStatus(data.data.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    decreaseStatus: builder.mutation<VocabularyWord, number>({
      query: (id) => ({
        url: `${id}/decrease`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(decreaseWordStatus(data.data.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    rejectWord: builder.mutation<VocabularyWord, number>({
      query: (id) => ({
        url: `${id}/ban`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(rejectWord(data.data.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

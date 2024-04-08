import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import { VocabularyWord } from "../models/Vocabulary.ts";
import {
  acceptWord,
  decreaseWordStatus,
  increaseWordStatus,
  rejectWord,
} from "../../store/reducers/VocabularySlice.ts";
import { API_URL } from "../../utils/variables.ts";
const cookies = new Cookies();

export const vocabularyWordsApi = createApi({
  reducerPath: "vocabularyWordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/vocabulary-words/`,
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
    decreaseStatus: builder.mutation<
      VocabularyWord,
      { id: number; step: number }
    >({
      query: ({ id, step }) => ({
        url: `${id}/decrease/${step}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            decreaseWordStatus({ id: data.data.id, status: data.data.status }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    rejectWord: builder.mutation<VocabularyWord, number>({
      query: (id) => ({
        url: `${id}/reject`,
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
    acceptWord: builder.mutation<VocabularyWord, number>({
      query: (id) => ({
        url: `${id}/accept`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(acceptWord(data.data.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

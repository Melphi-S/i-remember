import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import { Vocabulary } from "../models/Vocabulary.ts";
import { setVocabulary } from "../../store/reducers/VocabularySlice.ts";
import { API_URL } from "../../utils/variables.ts";
const cookies = new Cookies();

export const vocabularyApi = createApi({
  reducerPath: "vocabularyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/vocabularies/`,
  }),
  endpoints: (builder) => ({
    getFirstWords: builder.mutation<Vocabulary, void>({
      query: () => ({
        url: `getFirst`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log('RTK', data)
          dispatch(setVocabulary(data.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

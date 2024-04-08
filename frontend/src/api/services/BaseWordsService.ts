import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../utils/variables.ts";

export const baseWordsApi = createApi({
  reducerPath: "baseWordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/words/`,
  }),
  endpoints: (builder) => ({
    getNumberOfWords: builder.query<number, void>({
      query() {
        return {
          url: "number",
        };
      },
    }),
  }),
});

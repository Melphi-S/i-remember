import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseWordsApi = createApi({
  reducerPath: "baseWordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/words/`,
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

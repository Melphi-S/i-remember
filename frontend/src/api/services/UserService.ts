import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User.ts";
import { setUser } from "../../store/reducers/UserSlice.ts";
import { Cookies } from "react-cookie";
import { Vocabulary } from "../models/Vocabulary.ts";
import { setVocabulary } from "../../store/reducers/VocabularySlice.ts";
import {API_URL} from "../../utils/variables.ts";
const cookies = new Cookies();

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/users/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<User & { vocabulary: Vocabulary }, string>({
      query(token) {
        return {
          url: "me",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          const { id, username, email, avatar, wordsPerDay, vocabulary } =
            data.data;
          dispatch(setUser({ id, username, email, avatar, wordsPerDay }));
          dispatch(setVocabulary(vocabulary));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    patch: builder.mutation<User, Partial<User>>({
      query: (user: Partial<User>) => ({
        url: `/me`,
        method: "PATCH",
        body: user,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          const { id, username, email, avatar, wordsPerDay } = data.data;
          dispatch(setUser({ id, username, email, avatar, wordsPerDay }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    changePassword: builder.mutation<
      boolean,
      { oldPassword: string; newPassword: string }
    >({
      query: ({ oldPassword, newPassword }) => ({
        url: `/me/password`,
        method: "PATCH",
        body: { oldPassword, newPassword },
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
    }),
  }),
});

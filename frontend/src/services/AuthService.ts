import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserSignin } from "../models/User.ts";
import { userApi } from "./UserService.ts";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const authAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signin: builder.mutation<{ access_token: string }, UserSignin>({
      query: (body: UserSignin) => ({
        url: `/signin`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const res = await queryFulfilled;
          const token = res.data.access_token;
          cookies.set("token", token);
          await dispatch(userApi.endpoints.getMe.initiate(token));
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
});

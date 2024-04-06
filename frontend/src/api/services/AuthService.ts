import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {PasswordReset, UserSignin, UserSignup} from "../models/User.ts";
import { userApi } from "./UserService.ts";
import { Cookies } from "react-cookie";
import {API_URL, oneYear} from "../../utils/variables.ts";
const cookies = new Cookies();

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation<boolean, UserSignup>({
      query: (body: UserSignup) => ({
        url: `/signup`,
        method: "POST",
        body: body,
      })
    }),
    signin: builder.mutation<{ access_token: string }, UserSignin>({
      query: (body: UserSignin) => ({
        url: `/signin`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled}) {
        try {
          const res = await queryFulfilled;
          const token = res.data.access_token;
          cookies.set("token", token, {expires: new Date(Date.now() + oneYear)});
          await dispatch(userApi.endpoints.getMe.initiate(token));
        } catch (error) {
          console.log(error)
        }
      },
    }),
    verify: builder.mutation<{ access_token: string }, string>({
      query: (id: string) => ({
        url: `/verify/${id}`,
        method: "PATCH"
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled}) {
        try {
          const res = await queryFulfilled;
          const token = res.data.access_token;
          cookies.set("token", token, {expires: new Date(Date.now() + oneYear)});
          await dispatch(userApi.endpoints.getMe.initiate(token));
        } catch (error) {
          console.log(error)
        }
      },
    }),
    forgot: builder.mutation<boolean, { email: string}>({
      query: (body: {email: string}) => ({
        url: `/forgot`,
        method: "PATCH",
        body: body,
      }),
    }),
    reset: builder.mutation<{ access_token: string }, PasswordReset>({
      query: (body: PasswordReset) => ({
        url: `/reset`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled}) {
        try {
          const res = await queryFulfilled;
          const token = res.data.access_token;
          cookies.set("token", token, {expires: new Date(Date.now() + oneYear)});
          await dispatch(userApi.endpoints.getMe.initiate(token));
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
});

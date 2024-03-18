import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {User} from "../models/User.ts";
import {setUser} from "../../store/reducers/UserSlice.ts";
import {Cookies} from "react-cookie";
const cookies = new Cookies();

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/users/`,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<User, string>({
            query(token) {
                return {
                    url: 'me',
                    headers: {Authorization: `Bearer ${token}`}
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const data  = await queryFulfilled;
                    const {id, username, email, avatar, wordsPerDay} = data.data
                    dispatch(setUser({id, username, email, avatar, wordsPerDay}));
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
                headers: {Authorization: `Bearer ${cookies.get('token')}`}
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled}) {
                try {
                    const data = await queryFulfilled;
                    const {id, username, email, avatar, wordsPerDay} = data.data
                    dispatch(setUser({id, username, email, avatar, wordsPerDay}));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    }),
});
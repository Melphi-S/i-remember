import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {User} from "../models/User.ts";
import {setUser} from "../../store/reducers/UserSlice.ts";

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
                    const {id, username, email} = data.data
                    dispatch(setUser({id, username, email}));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});
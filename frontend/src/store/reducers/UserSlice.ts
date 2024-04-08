import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../../api/models/User.ts";
import { Cookies } from "react-cookie";
const cookies = new Cookies()

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: (state) => {
            cookies.remove('token');
            state.user = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;
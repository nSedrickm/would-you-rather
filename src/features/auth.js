// user management
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authedUser: ''
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                authedUser: action.payload
            }

        },
        logout: (state) => {
            return {
                ...state,
                authedUser: ''
            }
        }
    },
})

// Action creators are generated for each reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
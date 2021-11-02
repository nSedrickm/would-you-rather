// user management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from '../services/_DATA';

export const getUsers = createAsyncThunk(
    'auth/getUsers',
    async () => {
        const response = await API._getUsers();
        return response;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: {},
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
                users: [],
                authedUser: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                return {
                    ...state,
                    users: action.payload,
                    loading: false
                }
            });
    },
})

// Action creators are generated for each reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
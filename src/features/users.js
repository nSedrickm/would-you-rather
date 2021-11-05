// user management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from '../services/_DATA';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        const response = await API._getUsers();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: {},
        loading: false
    },
    reducers: {
        addUserAnswer: (state, action) => {
            const { userId, questionId, option } = action.payload;
            return {
                ...state,
                users: {
                    ...state.users,
                    [userId]: {
                        ...state.users[userId],
                        answers: {
                            ...state.users[userId].answers,
                            [questionId]: option
                        }
                    }
                }
            }
        },
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
export const { addUserAnswer } = userSlice.actions;

export default userSlice.reducer;
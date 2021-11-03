// user management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from '../services/_DATA';

export const getQuestions = createAsyncThunk(
    'questions/getQuestions',
    async () => {
        const response = await API._getQuestions();
        return response;
    }
);

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: {},
        loading: false
    },
    reducers: {
        answerQuestion: (state, action) => {
            const { id, user, option } = action.payload;
            return {
                ...state,
                questions: {
                    ...state.questions,
                    [id]: {
                        ...state.questions[id],
                        [option]: {
                            ...state.questions[id][option],
                            votes: [...state.questions[id][option].votes, user]
                        }
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                return {
                    ...state,
                    questions: action.payload,
                    loading: false
                }
            });
    },
})

// Action creators are generated for each reducer function
export const { answerQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
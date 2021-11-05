// user management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserAnswer } from './users';
import * as API from '../services/_DATA';

export const getQuestions = createAsyncThunk(
    'questions/getQuestions',
    async () => {
        const response = await API._getQuestions();
        return response;
    }
);

export const addQuestion = createAsyncThunk(
    'questions/addQuestion',
    async (question, { getState }) => {
        const author = getState().auth.authedUser;
        question.author = author;
        const response = await API._saveQuestion(question);
        return response;
    }
);

// thunk function for updating answered questions
export const answerAndUpdateQuestions = (data) => (dispatch, getState) => {
    const { questionId, option } = data;
    const userId = getState().auth.authedUser;
    dispatch(answerQuestion({ userId, questionId, option }))
    dispatch(addUserAnswer({ userId, questionId, option }))
};

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: {},
        loading: false
    },
    reducers: {
        answerQuestion: (state, action) => {
            const { userId, questionId, option } = action.payload;
            return {
                ...state,
                questions: {
                    ...state.questions,
                    [questionId]: {
                        ...state.questions[questionId],
                        [option]: {
                            ...state.questions[questionId][option],
                            votes: [...state.questions[questionId][option].votes, userId]
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
            })
            .addCase(addQuestion.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                return {
                    ...state,
                    questions: {
                        ...state.questions,
                        [action.payload.id]: {
                            ...action.payload
                        },
                    },
                    loading: false
                }
            })
    },
})

// Action creators are generated for each reducer function
export const { answerQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
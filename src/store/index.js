import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth';
import questionsReducer from '../features/questions'

export default configureStore({
    reducer: {
        auth: authReducer,
        questions: questionsReducer
    },
});

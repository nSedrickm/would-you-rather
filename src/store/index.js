import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth';
import questionsReducer from '../features/questions'
import usersReducer from '../features/users';

export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        questions: questionsReducer
    },
});

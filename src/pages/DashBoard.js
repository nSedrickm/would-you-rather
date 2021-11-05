import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../features/questions';
import { QuestionCard, AnsweredQuestionCard, Loader } from '../components';

// helper function to filter questions
function filterQuestions(questions, answers) {
    let answered = [];
    let unanswered = [];
    Object.keys(questions).forEach((key) => {
        if (answers[key]) {
            answered = answered.concat(questions[key])
        } else {
            unanswered = unanswered.concat(questions[key])
        }
    })
    return { answered, unanswered };
};

const DashBoard = () => {
    const [active, setActive] = useState(0);
    const users = useSelector((state) => state.users.users);
    const authedUser = useSelector((state) => state.auth.authedUser);
    const questions = useSelector((state) => state.questions.questions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = users[authedUser].answers;
    const { answered, unanswered } = filterQuestions(questions, answers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!Object.keys(questions).length) {
            dispatch(getQuestions())
        }
    }, [dispatch, questions])

    if (loading) return <Loader />

    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="mb-10 text-5xl font-bold tracking-wide text-center text-white"> Dashboard </h1>

            <div className="mx-auto rounded-2xl md:w-2/3">
                <div className="flex items-center">
                    <button
                        className={clsx("flex-grow p-4 text-lg md:text-xl font-bold border-b-2 border-green-500 rounded-tl-2xl outline-none "
                            , active === 0 ? "bg-green-500 text-white" : "text-green-500 bg-white")}
                        onClick={() => setActive(0)}
                    >
                        Unanswered Questions
                    </button>
                    <button
                        className={clsx("flex-grow p-4 text-lg md:text-xl font-bold border-b-2 border-green-500 rounded-tr-2xl outline-none "
                            , active === 1 ? "bg-green-500 text-white" : "text-green-500 bg-white")}
                        onClick={() => setActive(1)}
                    >
                        Answered Questions
                    </button>
                </div>
                {active === 0 ? (
                    <div className="py-4">
                        {!unanswered.length && <p>No unanswered questions</p>}
                        {unanswered?.map(({ id }) => {
                            return (
                                <QuestionCard
                                    key={id}
                                    author={users[questions[id].author]}
                                    question={questions[id]}
                                    authedUser={authedUser}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div className="py-4">
                        {!answered.length && <p>No answered questions</p>}
                        {answered?.map(({ id }) => {
                            return (
                                <AnsweredQuestionCard
                                    key={id}
                                    author={users[questions[id].author]}
                                    question={questions[id]}
                                    answer={answers[id]}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashBoard
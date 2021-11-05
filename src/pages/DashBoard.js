import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../features/questions';
import { QuestionCard, AnsweredQuestionCard, Loader } from '../components';


// helper function to sort questions
function sortQuestions(questions) {
    return questions.sort((a, b) => b.timestamp - a.timestamp);
}

// helper function to filter questions
function filterQuestions(questions, answers) {
    let answered = [];
    let unanswered = [];
    let sortedAnswers = [];
    let sortedUnAnswered = [];
    Object.keys(questions).forEach((key) => {
        if (answers[key]) {
            answered = answered.concat(questions[key])
        } else {
            unanswered = unanswered.concat(questions[key])
        }
    })

    sortedAnswers = sortQuestions(answered);
    sortedUnAnswered = sortQuestions(unanswered);

    return { sortedAnswers, sortedUnAnswered };
};


const DashBoard = () => {
    const [active, setActive] = useState(0);
    const users = useSelector((state) => state.users.users);
    const authedUser = useSelector((state) => state.auth.authedUser);
    const questions = useSelector((state) => state.questions.questions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = users[authedUser].answers;
    const { sortedAnswers, sortedUnAnswered } = filterQuestions(questions, answers);
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
                        {!sortedUnAnswered.length && <p className="p-4 bg-white">No unanswered questions</p>}
                        {sortedUnAnswered?.map(({ id }) => {
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
                        {!sortedAnswers.length && <p className="p-4 bg-white">No answered questions</p>}
                        {sortedAnswers?.map(({ id }) => {
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
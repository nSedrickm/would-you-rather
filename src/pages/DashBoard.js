import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../features/questions';
import { QuestionCard, Loader } from '../components';

const DashBoard = () => {
    const [active, setActive] = useState(0);
    const { users, authedUser } = useSelector((state) => state.auth);
    const { questions, loading } = useSelector((state) => state.questions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

    if (loading) return <Loader />
    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="my-10 text-5xl font-bold tracking-wide text-center text-white"> Dashboard </h1>

            <div className="mx-auto bg-white rounded-2xl md:w-2/3">
                <div className="flex items-center">
                    <button
                        className={clsx("flex-grow p-4 text-xl font-bold border-b-2 border-green-500 rounded-tl-2xl outline-none "
                            , active === 0 ? "bg-green-500 text-white" : "text-green-500 bg-white")}
                        onClick={() => setActive(0)}
                    >
                        Unanswared Polls
                    </button>
                    <button
                        className={clsx("flex-grow p-4 text-xl font-bold border-b-2 border-green-500 rounded-tr-2xl outline-none "
                            , active === 1 ? "bg-green-500 text-white" : "text-green-500 bg-white")}
                        onClick={() => setActive(1)}
                    >
                        Answered Polls
                    </button>
                </div>
                {active === 0 ? (
                    <div className="p-4">
                        {Object.keys(questions)?.map((key) => {
                            return (
                                <QuestionCard
                                    key={key}
                                    author={users[questions[key].author]}
                                    question={questions[key]}
                                    authedUser={authedUser}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div className="p-4">
                        answered polls
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashBoard
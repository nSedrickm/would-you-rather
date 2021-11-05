import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { DetailsCard, Loader } from '../components';


const QuestionDetails = () => {
    const { qid } = useParams();
    const history = useHistory();
    const questions = useSelector((state) => state.questions.questions);
    const loading = useSelector((state) => state.questions.loading);
    const question = questions[qid];

    if (loading) return <Loader />

    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="mb-10 text-5xl font-bold tracking-wide text-center text-white"> Poll Details </h1>

            <div className="mx-auto rounded-2xl md:w-2/3">
                {question?.id ? (
                    <DetailsCard
                        key={question.id}
                        question={question}
                    />
                ) : (
                    <div className="my-10 text-center">
                        <p className="mb-2 text-2xl text-white">Sorry we couldn't find that question</p>
                        <button
                            className="px-12 py-4 my-4 font-bold text-white bg-yellow-500 rounded-lg outline-none"
                            onClick={() => history.goBack()}
                        >
                            back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionDetails
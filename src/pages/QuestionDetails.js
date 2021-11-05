import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsCard, Loader } from '../components';
import NotFound from './NotFound';


const QuestionDetails = () => {
    const { qid } = useParams();
    const questions = useSelector((state) => state.questions.questions);
    const loading = useSelector((state) => state.questions.loading);
    const question = questions[qid];

    if (loading) return <Loader />

    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="mb-10 text-5xl font-bold tracking-wide text-center text-white"> Poll Details </h1>
            {question?.id ? (
                <div className="mx-auto rounded-2xl md:w-2/3">
                    <DetailsCard
                        key={question.id}
                        question={question}
                    />
                </div>
            ) : (
                <NotFound />
            )}

        </div>
    );
}

export default QuestionDetails
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addQuestion } from '../features/questions';
import { Loader } from '../components';
import toast from 'react-hot-toast';

const NewQuestion = () => {
    const [question, setQuestion] = useState({
        optionOneText: '',
        optionTwoText: ''
    });
    const loading = useSelector((state) => state.questions.loading);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleNewQuestion(e) {
        e.preventDefault();
        const { optionOneText, optionTwoText } = question;
        // input validation
        // check if both options are filled first
        if (optionOneText && optionTwoText) {
            // make sure they are unique 
            if (optionOneText === optionTwoText) {
                toast.error("please fill in different options")
            } else {
                dispatch(addQuestion(question));
                history.push("/dashboard");
            }
        } else {
            toast.error("Please fill answers for both options");
        }
    }

    if (loading) return <Loader />

    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="my-10 text-5xl font-bold tracking-wide text-center text-white"> New Question </h1>

            <div className="mx-auto text-white rounded-2xl md:w-2/3">
                <form onSubmit={(e) => handleNewQuestion(e)}>
                    <h1 className="my-4 text-4xl font-bold tracking-wide"> Would You Rather ... </h1>

                    <div className="relative mb-4">
                        <label
                            htmlFor="optionOne"
                            className="block mb-3 text-3xl font-bold"
                        >
                            OptionOne
                        </label>
                        <input
                            type="text"
                            name="optionOne"
                            className="w-full px-3 py-4 leading-8 text-white transition-colors duration-200 ease-in-out bg-transparent border border-white outline-none appearance-none focus:border-green-500 focus:ring-4 focus:ring-green-500 rounded-3xl"
                            onChange={(e) => setQuestion(prevState => {
                                return { ...prevState, optionOneText: e.target.value }
                            })}
                            minLength={10}
                        />
                    </div>

                    <div className="relative mb-4">
                        <label
                            htmlFor="optionTwo"
                            className="block mb-3 text-3xl font-bold"
                        >
                            OptionTwo
                        </label>
                        <input
                            type="text"
                            name="optionTwo"
                            className="w-full px-3 py-4 leading-8 text-white transition-colors duration-200 ease-in-out bg-transparent border border-white outline-none appearance-none focus:border-green-500 focus:ring-4 focus:ring-green-500 rounded-3xl"
                            onChange={(e) => setQuestion(prevState => {
                                return { ...prevState, optionTwoText: e.target.value }
                            })}
                            minLength={10}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-8 py-4 my-4 text-2xl font-bold text-white bg-yellow-500 rounded-3xl py-y"

                    >
                        Add
                    </button>

                </form>
            </div>
        </div>
    );
}

export default NewQuestion
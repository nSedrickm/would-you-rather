import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestionAnswer } from "../../features/questions";
import { FiUser } from "react-icons/fi";
import { useHistory } from "react-router-dom";

function calculatePercentages(question, users) {
    let optionOnePercentage, optionTwoPercentage;
    const optionOne = question.optionOne.votes.length
    const optionTwo = question.optionOne.votes.length
    const totalVotes = optionOne + optionTwo;
    optionOnePercentage = Math.round((optionOne / totalVotes) * 100);
    optionTwoPercentage = Math.round((optionTwo / totalVotes) * 100);
    return { optionOnePercentage, optionTwoPercentage }
}

export const DetailsCard = ({ question }) => {
    const [option, setOption] = useState(null);
    const authedUser = useSelector((state) => state.auth.authedUser);
    const users = useSelector((state) => state.users.users);
    const user = users[authedUser];
    const author = users[question.author];
    const isAnswered = user.answers.hasOwnProperty(question.id);
    const answer = user.answers[question.id];
    const dispatch = useDispatch();
    const history = useHistory();
    const { optionOnePercentage, optionTwoPercentage } = calculatePercentages(question, users);


    function handleAnswer() {
        if (!option) {
            toast.error('Please select an option');
        } else {
            dispatch(
                saveQuestionAnswer({
                    questionId: question.id,
                    option,
                })
            );
            history.goBack();
        }
    }

    return (
        <div className="flex flex-col items-center w-full p-4 mb-4 bg-white rounded-lg shadow-lg md:flex-row">
            <div className="flex-grow">
                {author.avatarURL ? (
                    <>
                        <img
                            src={author.avatarURL}
                            className="w-16 h-16 mx-auto rounded-full"
                            alt={author.name}
                        />
                        <p className="my-2 text-lg font-bold text-center">{author.name}</p>
                    </>
                ) : (
                    <>
                        <FiUser className="w-16 h-16 mx-auto rounded-full" />
                        <p className="my-2 text-lg font-bold text-center">{author.name}</p>
                    </>
                )}
            </div>

            <div className="flex-grow">
                {!isAnswered ? (
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-center md:text-left">
                            Would you Rather
                        </h3>
                        <label className="flex items-center my-2">
                            <input
                                type="radio"
                                className="w-4 h-4"
                                name="option"
                                checked={option === "optionOne"}
                                value="optionOne"
                                onChange={(e) => setOption(e.target.value)}
                            />
                            <span className="ml-2">{question.optionOne.text}</span>
                        </label>
                        <label className="flex items-center my-2">
                            <input
                                type="radio"
                                className="w-4 h-4"
                                name="option"
                                checked={option === "optionTwo"}
                                value="optionTwo"
                                onChange={(e) => setOption(e.target.value)}
                            />
                            <span className="ml-2">{question.optionTwo.text}</span>
                        </label>
                    </div>
                ) : (
                    <div className="mb-4">
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold text-center md:text-left">
                                Would you Rather
                            </h3>
                            <p className={clsx("my-2", answer === "optionOne" && "text-green-500")}>
                                optionOne : {question.optionOne.text}
                            </p>
                            <p className={clsx("my-2", answer === "optionTwo" && "text-green-500")}>
                                optionTwo : {question.optionTwo.text}
                            </p>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-center md:text-left">
                        Statistics
                    </h3>
                    <div className="flex-grow">
                        <p className="my-2 font-bold">
                            {optionOnePercentage || 0}% of users chose optionOne
                        </p>
                        <p className="my-2 font-bold">
                            {optionTwoPercentage || 0}% of users chose optionTwo
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row flex-wrap my-4 space-x-2 md:space-x-0 md:flex-col md:my-0">
                {option && (
                    <button
                        className="px-4 py-2 font-bold text-red-500 bg-white border border-red-500 rounded-lg outline-none md:px-8 md:mb-2"
                        onClick={() => setOption(null)}
                    >
                        reset
                    </button>
                )}

                <button
                    className="px-4 py-2 font-bold text-green-500 bg-white border border-green-500 rounded-lg outline-none md:px-8 md:mb-2"
                    onClick={() => history.goBack()}
                >
                    back
                </button>
                {!isAnswered &&
                    <button
                        className="flex-grow px-4 py-2 font-bold text-white bg-green-500 rounded-lg outline-none md:px-8 md:flex-grow-0 md:mb-2"
                        onClick={() => handleAnswer()}
                    >
                        answer
                    </button>
                }
            </div>
        </div>
    );
};

DetailsCard.propTypes = {
    question: PropTypes.object.isRequired,
};
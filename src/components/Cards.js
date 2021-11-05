import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveQuestionAnswer } from "../features/questions";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export const UserCard = ({ name, selected, onClick, avatarUrl }) => {
    return (
        <div
            className={clsx(
                "flex flex-row items-center w-full p-4 bg-white rounded-lg shadow-lg mb-4",
                selected && "text-white bg-green-500"
            )}
            onClick={() => onClick()}
        >
            <div className="mr-4">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        className="w-16 h-16 mx-auto rounded-full"
                        alt={name}
                    />
                ) : (
                    <FiUser className="w-16 h-16 mx-auto rounded-full" />
                )}
            </div>

            <div>
                <p className="text-2xl font-bold">{name}</p>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    avatarUrl: PropTypes.string.isRequired,
};

export const QuestionCard = ({ author, question, authedUser }) => {
    const [option, setOption] = useState(null);
    const dispatch = useDispatch();

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

            <div className="flex flex-row flex-wrap my-4 space-x-2 md:space-x-0 md:flex-col md:my-0">
                {option && (
                    <button
                        className="px-4 py-2 font-bold text-red-500 bg-white border border-red-500 rounded-lg outline-none md:px-8 md:mb-2"
                        onClick={() => setOption(null)}
                    >
                        reset
                    </button>
                )}

                <Link
                    className="px-4 py-2 font-bold text-green-500 bg-white border border-green-500 rounded-lg outline-none md:px-8 md:mb-2"
                    to={`/details/${question.id}`}
                >
                    details
                </Link>
                <button
                    className="flex-grow px-4 py-2 font-bold text-white bg-green-500 rounded-lg outline-none md:px-8 md:flex-grow-0 md:mb-2"
                    onClick={() => handleAnswer()}
                >
                    answer
                </button>
            </div>
        </div>
    );
};

QuestionCard.propTypes = {
    author: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    authedUser: PropTypes.string.isRequired,
};

export const AnsweredQuestionCard = ({ author, question, answer }) => {
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

            <div className="flex flex-row flex-wrap my-4 space-x-2 md:space-x-0 md:flex-col md:my-0">
                <Link
                    className="px-4 py-2 font-bold text-center text-green-500 bg-white border border-green-500 rounded-lg outline-none md:px-8 md:mb-2"
                    to={`/details/${question.id}`}
                >
                    details
                </Link>
                <button
                    className="flex-grow px-4 py-2 font-bold text-center text-white bg-green-500 rounded-lg outline-none md:px-8 md:flex-grow-0 md:mb-2"
                >
                    {answer} selected
                </button>
            </div>
        </div>
    );
};

AnsweredQuestionCard.propTypes = {
    author: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    answer: PropTypes.string.isRequired,
};


export const LeaderBoardCard = ({ user }) => {
    const { avatarURL, name, questions, answers } = user;
    const score = questions.length + Object.keys(answers).length;
    return (
        <div className="flex flex-col items-center w-full p-4 mb-4 bg-white rounded-lg shadow-lg md:flex-row">
            <div className="flex-grow">
                {avatarURL ? (
                    <>
                        <img
                            src={avatarURL}
                            className="w-16 h-16 mx-auto rounded-full"
                            alt={name}
                        />
                        <p className="my-2 text-lg font-bold text-center">{name}</p>
                    </>
                ) : (
                    <>
                        <FiUser className="w-16 h-16 mx-auto rounded-full" />
                        <p className="my-2 text-lg font-bold text-center">{name}</p>
                    </>
                )}
            </div>

            <div className="flex-grow">
                <h3 className="text-2xl font-bold text-center md:text-left">
                    Statistics
                </h3>
                <div className="flex-grow">
                    <p className="my-2 font-bold">
                        Questions Asked : {questions.length}
                    </p>
                    <p className="my-2 font-bold">
                        Questions Answered : {Object.keys(answers).length}
                    </p>
                </div>
            </div>

            <div className="my-4 md:my-0">
                <div
                    className="flex flex-col items-center py-5 font-bold text-center text-white bg-green-500 rounded-full px-7"
                >
                    <h4 className="text-xl">Score</h4>
                    <p className="text-3xl">{score}</p>
                </div>
            </div>
        </div>
    );
};

LeaderBoardCard.propTypes = {
    user: PropTypes.object.isRequired
};


import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

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

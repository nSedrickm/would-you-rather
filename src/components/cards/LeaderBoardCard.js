import React from "react";
import PropTypes from "prop-types";  
import { FiUser } from "react-icons/fi"; 

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


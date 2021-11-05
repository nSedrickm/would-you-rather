import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FiUser } from "react-icons/fi";

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




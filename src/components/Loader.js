import React from "react";
import PropTypes from "prop-types";

export const Loader = ({ message }) => {
    return (
        <div className="grid h-screen text-white bg-gradient-to-br from-blue-600 to-green-600 place-items-center">
            <div>
                <div className="w-16 h-16 mx-auto mb-4 border-b-2 rounded-full border-white-900 animate-spin"></div>
                <p className="mt-2">{message || "Loading please wait"}</p>
            </div>
        </div>
    );
}

Loader.propTypes = {
    message: PropTypes.string
}

export const InlineLoader = ({ message }) => {
    return (
        <div className="grid h-full text-gray-700 bg-white place-items-center">
            <div>
                <div className="w-16 h-16 mx-auto mb-4 border-b-2 rounded-full border-white-900 animate-spin"></div>
                <p className="mt-2">{message || "Loading please wait"}</p>
            </div>
        </div>
    );
}

InlineLoader.propTypes = {
    message: PropTypes.string
}


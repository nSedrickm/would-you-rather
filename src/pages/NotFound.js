import React from 'react';
import { useHistory } from 'react-router-dom';


const NotFound = () => {
    const history = useHistory();

    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="mt-20 text-5xl font-bold tracking-wide text-center text-white md:text-8xl"> 404 </h1>

            <div className="mx-auto rounded-2xl md:w-2/3">

                <div className="my-10 text-center">
                    <h1 className="mb-2 text-2xl text-white">sorry we couldn't find this page</h1>
                    <button
                        className="px-12 py-4 my-4 font-bold text-white bg-yellow-500 rounded-lg outline-none"
                        onClick={() => history.goBack()}
                    >
                        back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound
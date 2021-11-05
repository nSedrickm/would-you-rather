import React from 'react';
import { useSelector } from 'react-redux';
import { LeaderBoardCard } from '../components';

// helper function to sort users
function sortUsers(users) {
    return Object.keys(users).sort((a, b) => {
        const aScore = users[a].questions.length + Object.keys(users[a].answers).length;
        const bScore = users[b].questions.length + Object.keys(users[b].answers).length;
        return aScore < bScore
    })
};

const LeaderBoard = () => {
    const users = useSelector((state) => state.users.users);
    const sortedUsers = sortUsers(users);

    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="my-10 text-5xl font-bold tracking-wide text-center text-white"> Leaderboard </h1>

            <div className="mx-auto rounded-2xl md:w-2/3">

                {sortedUsers?.map((key) => {
                    return (
                        <LeaderBoardCard
                            key={key}
                            user={users[key]}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default LeaderBoard
import React from 'react';
import { useSelector } from 'react-redux';
import { LeaderBoardCard } from '../components';

const LeaderBoard = () => {
    const users = useSelector((state) => state.users.users);
    let leaderBoard = [];
    // build leaderboard
    Object.values(users).map((user) =>
        leaderBoard.push({
            id: user.id,
            avatarURL: user.avatarURL,
            name: user.name,
            questions: user.questions.length,
            answers: Object.keys(user.answers).length,
            score: user.questions.length + Object.keys(user.answers).length,
        }),
    );
    // sort users in descending order
    leaderBoard.sort((a, b) => b.score - a.score);


    return (
        <div className="h-screen p-6 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <h1 className="my-10 text-5xl font-bold tracking-wide text-center text-white"> Leaderboard </h1>
            <div className="mx-auto rounded-2xl md:w-2/3">
                {leaderBoard?.map((user) => {
                    return (
                        <LeaderBoardCard
                            key={user.id}
                            user={user}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default LeaderBoard
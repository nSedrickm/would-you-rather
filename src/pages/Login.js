import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth";
import { getUsers } from "../features/users";
import { UserCard, Loader } from "../components";
import { useLocation, useHistory } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [user, setUser] = useState(null);
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.loading);
    const dispatch = useDispatch();
    const { state } = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!Object.keys(users).length) {
            dispatch(getUsers());
        }
    }, [dispatch, users])

    const handleLogin = () => {
        if (!user) {
            toast.error("Please select a user to login");
        } else {
            dispatch(login(user));
            history.push(state.from.pathname || "/dashboard")
        }
    }

    if (loading) return <Loader />

    return (
        <div className="h-screen p-4 overflow-auto text-gray-700 bg-gradient-to-br from-blue-600 to-green-600 md:p-8">
            <header className="my-8 text-center text-white">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">Would You Rather</h1>
                <p className="text-base md:text-xl"> Please Select a user to Login and play</p>
            </header>

            <div className="w-full mx-auto md:w-1/3">
                {Object.keys(users)?.map((key) => (
                    <UserCard
                        key={key}
                        name={users[key].name}
                        selected={user === users[key].id}
                        onClick={() => setUser(users[key].id)}
                        avatarUrl={users[key].avatarURL}
                    />
                ))}
                <button
                    className="w-full px-8 py-3 my-4 text-2xl font-bold text-white bg-yellow-500 rounded-lg"
                    onClick={() => handleLogin()}
                >
                    login
                </button>
            </div>
        </div>
    );
};

export default Login;
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogOut, FiMenu, FiX, FiPlusCircle, FiHome, FiGrid } from 'react-icons/fi';
import { logout } from '../features/auth';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const Navbar = () => {
    const authedUser  = useSelector((state) => state.auth.authedUser);
    const user = useSelector((state) => state.users.users[authedUser])
    const [active, setActive] = useState(0);
    const dispatch = useDispatch();

    const NavLinks = (
        <>
            <Link
                className={clsx("flex items-center px-8 py-2 font-medium", active === 0 && "text-green-500")}
                onClick={() => setActive(0)}
                to="/dashboard"
            >
                <FiHome size={18} /> &nbsp; Home
            </Link>

            <Link
                className={clsx("flex items-center px-8 py-2 font-medium", active === 1 && "text-green-500")}
                onClick={() => setActive(1)}
                to="/new"
            >
                <FiPlusCircle size={18} /> &nbsp; New Question
            </Link>

            <Link
                className={clsx("flex items-center px-8 py-2 font-medium", active === 2 && "text-green-500")}
                onClick={() => setActive(2)}
                to="/leaderboard"
            >
                <FiGrid size={18} /> &nbsp; Leaderboard
            </Link>
        </>
    )

    return (
        <Fragment>
            <DesktopNav links={NavLinks} dispatch={dispatch} user={user} />
            <MobileNav links={NavLinks} dispatch={dispatch} user={user} />
        </Fragment>
    )
}

// desktop navbar
const DesktopNav = ({ links, user, dispatch }) => (
    <nav className="flex-col items-center justify-between hidden p-2 bg-white shadow-lg lg:flex md:flex-row">
        <h1 className="text-2xl font-bold">Would You Rather</h1>
        <div className="inline-flex px-2">
            {links}
        </div>

        <div className="inline-flex items-center">
            <img src={user?.avatarURL} className="w-10 h-10 mx-auto mr-2 rounded-full" alt={user?.name} />

            <p className="mr-2 text-xl font-bold">{user?.name}</p>
            <button
                className="inline-flex items-center px-3 py-2 text-red-500 rounded-lg"
                onClick={() => dispatch(logout())}
            >
                <FiLogOut /> &nbsp; logout
            </button>
        </div>
    </nav>
);

const MobileNav = ({ links, user, dispatch }) => {
    const [open, setOpen] = useState(false);
    function toggleMenu() {
        setOpen(!open);
    }

    return (
        <div className="shadow-lg ">
            <nav className="flex flex-row items-center justify-between p-4 bg-white lg:hidden">
                <h1 className="text-2xl font-bold">Would You Rather</h1>
                {open ? (
                    <FiX size={24} onClick={() => toggleMenu()} />
                ) : (
                    <FiMenu size={24} onClick={() => toggleMenu()} />
                )}
            </nav>

            {open && (
                <div className="">
                    <div className="flex flex-col">
                        {links}
                    </div>

                    <div className="inline-flex items-center mx-4 mt-10">
                        <img src={user?.avatarURL} className="w-10 h-10 mx-auto mr-2 rounded-full" alt={user?.name} />
                        <p className="mr-2 text-xl font-bold">{user?.name}</p>
                        <button
                            className="inline-flex items-center px-3 py-2 text-red-500 rounded-lg"
                            onClick={() => dispatch(logout())}
                        >
                            <FiLogOut /> &nbsp; logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

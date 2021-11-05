import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children, ...rest }) => {
    const authedUser = useSelector((state) => state.auth.authedUser);
    return (
        <Route {...rest} render={({ location }) => {
            return authedUser
                ? children
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }} />
        }} />
    )
}


import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";

const App = () => {
  const { authedUser } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <BrowserRouter>
        <Toaster />
        <Switch>
          <Route exact path="/">
            {authedUser ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {authedUser ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/dashboard">
            {authedUser ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
        </Switch>

      </BrowserRouter>
    </Fragment>
  );
};

export default App;

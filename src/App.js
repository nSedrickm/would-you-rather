import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "./components";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import NewQuestion from "./pages/NewQuestion.js";
import LeaderBoard from "./pages/LeaderBoard";
import QuestionDetails from "./pages/QuestionDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  const authedUser = useSelector((state) => state.auth.authedUser);
  return (
    <Fragment>
      <BrowserRouter>
        <Toaster />
        {authedUser && <Navbar />}
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
          <Route exact path="/leaderboard">
            {authedUser ? <LeaderBoard /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/add">
            {authedUser ? <NewQuestion /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/questions/:qid">
            {authedUser ? <QuestionDetails /> : <Redirect to="/login" />}
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>

      </BrowserRouter>
    </Fragment>
  );
};

export default App;

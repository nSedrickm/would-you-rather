import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, PrivateRoute } from "./components";
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
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/leaderboard">
            <LeaderBoard />
          </PrivateRoute>
          <PrivateRoute exact path="/add">
            <NewQuestion />
          </PrivateRoute>
          <PrivateRoute exact path="/questions/:qid">
            <QuestionDetails />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>

      </BrowserRouter>
    </Fragment>
  );
};

export default App;

import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Toaster />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
        
      </BrowserRouter>
    </Fragment>
  );
};

export default App;

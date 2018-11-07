import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Navigation from "./Navigation";
import LandingPage from "./Landing/Landing";
import SignInPage from "./SignIn";
import HomePage from "./Home";
import AccountPage from "./Account";
import Error404 from "./Error404/Error404";

import * as routes from "../constants/routes";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default App;

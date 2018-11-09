import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Navigation from "./Navigation";
import Error404 from "./Error404/Error404";
import LandingPage from "./Landing/Landing";
import HomePage from "./Home/Home";
import ProfilePage from "./Profile/Profile";
import SummaryPage from "./Summary/Summary";
import RoutePage from "./Route/Route";


import * as routes from "../constants/routes";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.PROFILE} component={ProfilePage} />
      <Route exact path={routes.SUMMARY} component={SummaryPage} />
      <Route exact path={routes.ROUTE} component={RoutePage} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default App;

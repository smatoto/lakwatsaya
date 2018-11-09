import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Navigation from "./Navigation";
import LandingPage from "./Landing/Landing";
import HomePage from "./Home/Home";
import AccountPage from "./Account";
import Error404 from "./Error404/Error404";
import WeatherPage from "./Weather/Weather";

import * as routes from "../constants/routes";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACTIVITY} component={AccountPage} />
      <Route exact path={routes.WEATHER} component={WeatherPage} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default App;

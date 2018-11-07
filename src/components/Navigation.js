import React from "react";
import { NavLink } from "react-router-dom";

import * as routes from "../constants/routes";

const Navigation = () => (
  <div>
    <ul>
      {/* <li>
        <NavLink exact to={routes.SIGN_IN}>
          Sign In
        </NavLink>
      </li> */}
      <li>
        <NavLink exact to={routes.LANDING}>
          Landing
        </NavLink>
      </li>
      <li>
        <NavLink exact to={routes.HOME}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact to={routes.ACCOUNT}>
          Account
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Navigation;

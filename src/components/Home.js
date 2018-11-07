import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import store from "store";
// import * as routes from "../constants/routes";
import isLoggedIn from "./StoreCredentials/isLoggedIn";

export default class Home extends Component {
  signOut = () => {
    firebase.auth().signOut();
    store.set("loggedIn", false);
    store.remove("loggedIn");
    window.location = "/";
  };

  render() {
    if (!isLoggedIn()) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <h1>Home Page</h1>
          <button onClick={this.signOut}>Sign out!</button>
        </div>
      );
    }
  }
}

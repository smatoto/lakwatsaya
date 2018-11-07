import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import * as routes from "../../constants/routes";
import store from "store";
// import isLoggedIn from "../StoreCredentials/isLoggedIn";
import "./Landing.css";
import bgVideo from "./lakwatsayavideo.mp4";

firebase.initializeApp({
  apiKey: "AIzaSyBxS7r2HkzgqN-CmF2Xr-DVz-fsKJ2EYbA",
  authDomain: "lakwatsaya-app.firebaseapp.com"
});

export default class Landing extends Component {
  state = { isSignedIn: false };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      store.set("loggedIn", !!user);
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    if (this.state.isSignedIn) {
      // <div>
      //   <div>Signed In!</div>
      //   <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
      //   <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      //   <img alt="profile" src={firebase.auth().currentUser.photoURL} />
      // </div>
      return <Redirect to={routes.HOME} />;
      // window.location = "/home";
      // window.location.href = "/home";
    } else {
      return (
        <div>
          <video autoPlay muted loop id="myVideo">
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <h1 id="titleName">Lakwatsaya!</h1>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
  }
}

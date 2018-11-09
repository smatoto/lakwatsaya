import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import * as routes from "../constants/routes";
import isLoggedIn from "../StoreCredentials/isLoggedIn";
// import Navigation from "./Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/MapContainer";
import {Container, Row, Col} from "reactstrap";


export default class Home extends Component {
  render() {
    if (!isLoggedIn()) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Sidebar /> 
            <Container>
              <Row>
                <Col>
                  <Map />
                </Col>
              </Row>
          </Container>
        </div>
      );
    }
  }
}

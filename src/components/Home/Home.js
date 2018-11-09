import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import * as routes from "../constants/routes";
import isLoggedIn from "../StoreCredentials/isLoggedIn";
// import Navigation from "./Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/MapContainer";
import { Container, Row, Col } from "reactstrap";
import RightPanelWeather from "./RightPanelWeather/RightPanelWeather";
import InputDestination from "./InputDestination/InputDestination";

export default class Home extends Component {
  render() {
    if (!isLoggedIn()) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Sidebar />
          <InputDestination />
          <Container fluid>
            <Row>
              <Col lg="6">
                <Map />
              </Col>

              <Col
                lg={{ size: 5, offset: 1 }}
                style={{ paddingRight: "100px" }}
              >
                <RightPanelWeather />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

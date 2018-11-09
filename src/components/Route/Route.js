import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import isLoggedIn from "../StoreCredentials/isLoggedIn";
import Sidebar from "../Sidebar/Sidebar";
import { Container, Row, Col } from "reactstrap";

export default class Home extends Component {
  state = {
    destination: ""
  };
  getDestination = props => {
    this.setState({ destination: props });
  };
  render() {
    if (!isLoggedIn()) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Sidebar />
          <Container class="container-fluid h-100">
            <Row class="row justify-content-center h-100">
              <Col lg="6">
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

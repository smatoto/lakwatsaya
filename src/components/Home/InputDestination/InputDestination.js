import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroupAddon,
  InputGroup
} from "reactstrap";

export default class InputDestination extends Component {
  render() {
    return (
      <div>
        <Container>
          <div style={{ padding: "20px" }}>
            <Row>
              <Col md={{ size: 6, offset: 3 }}>
                <InputGroup>
                  <Input placeholder="Where do you want to go?" />
                  <InputGroupAddon addonType="append">Search</InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

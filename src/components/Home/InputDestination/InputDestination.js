import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroupAddon,
  InputGroup
} from "reactstrap";
import { GoogleApiWrapper } from "google-maps-react";

export class InputDestination extends Component {
  componentDidMount = () => {
    this.initAutocomplete();
  };

  initAutocomplete = () => {
    this.autocomplete = new this.props.google.maps.places.Autocomplete(
      this.refs.autoCompletePlaces,
      { types: ["geocode"] }
    );

    this.autocomplete.addListener("place_changed", this.fillInAddress);
  };

  getLocation = () => {
    let input = document.getElementById("searchPlace");
    let autocomplete = new this.props.google.maps.places.Autocomplete(input);
    // autocomplete.setFields(["address_components", "name"]);

    let place = "";
    autocomplete.addListener("place_changed", () => {
      this.autocomplete = autocomplete.getPlace();
      place = autocomplete.getPlace();
      console.log(
        this.autocomplete,
        "place",
        place.geometry.location.lat(),
        place.geometry.location.lng(),
        place.formatted_address,
        place.geometry.viewport
      );
      this.props.destination(place);
    });
  };

  render() {
    return (
      <div>
        <Container>
          <div style={{ padding: "20px" }}>
            <Row>
              <Col md={{ size: 6, offset: 3 }}>
                <InputGroup>
                  <Input
                    id="searchPlace"
                    placeholder="Where do you want to go?"
                    onChange={this.getLocation}
                  />
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyCCv1kwjIPyKhEzqNY49m6gayYxmkFR6GA"
})(InputDestination);

import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    lat: null,
    long: null
  };
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };
  showPosition = position => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  };
  render() {
    return (
      <div>
        {this.state.lat ? (
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.long
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              // position={{
              //   lat: this.state.lat,
              //   lng: this.state.long
              // }}
              name={"Quezon City"}
            />

            {/* <InfoWindow onClose={this.onInfoWindowClose}> */}
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
            {/* </InfoWindow> */}
          </Map>
        ) : (
          " "
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCCv1kwjIPyKhEzqNY49m6gayYxmkFR6GA"
})(MapContainer);

import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import Preloader from "../Preloader/Preloader";

var style = {
  height: "75vh"
};

export class MapContainer extends Component {
  state = {
    lat: null,
    long: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.innerHTML = "Geolocation is not supported by this browser.";
    }
  };
  showPosition = position => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div style={style}>
        {this.state.lat ? (
          <Map
            google={this.props.google}
            zoom={15.5}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.long
            }}
            onClick={this.onMapClicked}
          >
            <Marker onClick={this.onMarkerClick} name={"My Location"} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCCv1kwjIPyKhEzqNY49m6gayYxmkFR6GA"
})(MapContainer);

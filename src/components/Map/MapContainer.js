import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

var style = { 
  // width: '1vh', 
  height: '80vh' 
};


export class MapContainer extends Component {
  state = {
    lat: null,
    long: null
  };
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      // Not supported
      this.innerHTML = "Geolocation is not supported by this browser.";
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

      <div style={style}>
        {this.state.lat ? (
          <Map
            google={this.props.google}
            zoom={15.5}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.long
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={"My Location"}
            />
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

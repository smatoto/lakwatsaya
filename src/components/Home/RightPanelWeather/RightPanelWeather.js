import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import axios from "axios";
import weather_response from "./mulan.json";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";

let address = "";

export class RightPanelWeather extends Component {
  state = {
    lat: "",
    long: "",
    data: "",
    address: "",
    destination: this.props.destination,
    showDestination: false,
    showCurrentLocation: false,
    destinationWeather: ""
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
    this.getWeatherData();
  };

  getWeatherData = () => {
    this.geocodeLatLng();
    const URL =
      "https://api-dev.weathersolutions.ph/api/v1/forecast/" +
      (this.state.lat + "," + this.state.long);

    axios
      .post(
        URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token cc84d57f4084333434f1068cde634ea6b7d20fa4"
          }
        }
      )
      .then(response => {
        this.setState({ data: response.data, showCurrentLocation: true });
      });
  };

  geocodeLatLng = () => {
    var geocoder = new this.props.google.maps.Geocoder();
    var infowindow = new this.props.google.maps.InfoWindow();
    var input = this.state.lat + "," + this.state.long;
    var latlngStr = input.split(",", 2);
    var latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1])
    };
    geocoder.geocode({ location: latlng }, function(results, status) {
      if (status === "OK") {
        if (results[0]) {
          //   var marker = new google.maps.Marker({
          //     position: latlng
          //   });
          infowindow.setContent(results[0].formatted_address);
          console.log(results[0].formatted_address);
          address = results[0].formatted_address;
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };

  componentWillReceiveProps = (next, prev) => {
    console.log(next !== prev, next, prev);
    if (next !== prev) {
      this.setState({
        destination: "Your Destination: " + next.destination.formatted_address
      });
      const URL =
        "https://api-dev.weathersolutions.ph/api/v1/forecast/" +
        (next.destination.geometry.location.lat() +
          "," +
          next.destination.geometry.location.lng());

      axios
        .post(
          URL,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token cc84d57f4084333434f1068cde634ea6b7d20fa4"
            }
          }
        )
        .then(response => {
          this.setState({
            destinationWeather: response.data,
            showDestination: true
          });
        });
    }
  };
  render() {
    let heat_index = "";
    let last_update = "";
    let destinationHeatIndex = "";
    let interpretResponse = "";

    if (this.state.data.length !== 0) {
      heat_index = this.state.data.results[0].heat_index;
      last_update = this.state.data.results[0].timestamp;
      var now = new Date(last_update);
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      var ap = "AM";
      if (hour > 11) {
        ap = "PM";
      }
      if (hour > 12) {
        hour = hour - 12;
      }
      if (hour === 0) {
        hour = 12;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      last_update = hour + ":" + minute + ":" + second + " " + ap;
      //   console.log(weather_response[0].interpretation_list[0].maximum);
      for (let i = 0; i < weather_response[0].interpretation_list.length; i++) {
        if (
          27 >= weather_response[0].interpretation_list[i].minimum &&
          27 <= weather_response[0].interpretation_list[i].maximum
        ) {
          console.log(
            weather_response[0].interpretation_list[i].response,
            "response"
          );
          interpretResponse =
            weather_response[0].interpretation_list[i].response;
        }
      }
    }

    if (this.state.destinationWeather.length !== 0) {
      destinationHeatIndex = this.state.destinationWeather.results[0]
        .heat_index;
    }
    return (
      <div>
        {this.state.showCurrentLocation ? (
          <Card>
            <CardHeader>Your Location: {address}</CardHeader>
            <CardBody>
              <CardSubtitle>As of {last_update}</CardSubtitle>
              <CardTitle>It feels like {heat_index} degrees</CardTitle>
              <CardText>{interpretResponse}</CardText>
            </CardBody>
          </Card>
        ) : (
          ""
        )}

        <br />
        <br />
        {this.state.showDestination ? (
          <Card>
            <CardHeader>{this.state.destination}</CardHeader>
            <CardBody>
              <CardSubtitle>As of {last_update}</CardSubtitle>
              <CardTitle>
                It feels like {destinationHeatIndex} degrees
              </CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCCv1kwjIPyKhEzqNY49m6gayYxmkFR6GA"
})(RightPanelWeather);

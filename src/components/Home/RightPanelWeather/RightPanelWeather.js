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
import { GoogleApiWrapper } from "google-maps-react";

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
    console.log(next !== prev);
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
    let rain = "";
    let rain_probability = "";
    let total_cloud_cover = "";
    let wind_speed = "";
    let wind_direction = "";
    let wind_gust = "";
    let desrain = "";
    let desrain_probability = "";
    let destotal_cloud_cover = "";
    let deswind_speed = "";
    let deswind_direction = "";
    let deswind_gust = "";
    let destinationresponse = "";

    if (this.state.data.length !== 0) {
      heat_index = this.state.data.results[0].heat_index;
      last_update = this.state.data.results[0].timestamp;

      rain = this.state.data.results[0].rain;
      rain_probability = this.state.data.results[0].rain_probability;
      total_cloud_cover = this.state.data.results[0].total_cloud_cover;
      wind_speed = this.state.data.results[0].wind_speed;
      wind_direction = this.state.data.results[0].wind_direction;
      wind_gust = this.state.data.results[0].wind_gust;

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

      for (let j = 0; j < weather_response.length; j++) {
        switch (weather_response[j].variable) {
          case "Heat Index":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                heat_index >=
                  weather_response[j].interpretation_list[i].minimum &&
                heat_index <= weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          case "Rain":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                rain >= weather_response[j].interpretation_list[i].minimum &&
                rain <= weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          case "Rain Probability":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                rain_probability >=
                  weather_response[j].interpretation_list[i].minimum &&
                rain_probability <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " There is a " +
                  weather_response[j].interpretation_list[i].interpretation;
              }
            }
            break;
          case "Total Cloud Cover":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                total_cloud_cover >=
                  weather_response[j].interpretation_list[i].minimum &&
                total_cloud_cover <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " The sky is " +
                  weather_response[j].interpretation_list[i].interpretation;
              }
            }
            break;
          case "Wind Speed":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                wind_speed >=
                  weather_response[j].interpretation_list[i].minimum &&
                wind_speed <= weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          case "Wind Direction":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                wind_direction >=
                  weather_response[j].interpretation_list[i].minimum &&
                wind_direction <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " The wind direction is going to " +
                  weather_response[j].interpretation_list[i].interpretation;
              }
            }
            break;
          case "Wind Gust":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                wind_gust >=
                  weather_response[j].interpretation_list[i].minimum &&
                wind_gust <= weather_response[j].interpretation_list[i].maximum
              ) {
                interpretResponse =
                  interpretResponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          default:
            break;
        }
      }
    }

    if (this.state.destinationWeather.length !== 0) {
      destinationHeatIndex = this.state.destinationWeather.results[0]
        .heat_index;
      desrain = this.state.destinationWeather.results[0].desrain;
      desrain_probability = this.state.destinationWeather.results[0]
        .rain_probability;
      destotal_cloud_cover = this.state.destinationWeather.results[0]
        .total_cloud_cover;
      deswind_speed = this.state.destinationWeather.results[0].wind_speed;
      deswind_direction = this.state.destinationWeather.results[0]
        .wind_direction;
      deswind_gust = this.state.destinationWeather.results[0].wind_gust;

      for (let j = 0; j < weather_response.length; j++) {
        switch (weather_response[j].variable) {
          case "Heat Index":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                destinationHeatIndex >=
                  weather_response[j].interpretation_list[i].minimum &&
                destinationHeatIndex <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          case "Rain":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                desrain >= weather_response[j].interpretation_list[i].minimum &&
                desrain <= weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          case "Rain Probability":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                desrain_probability >=
                  weather_response[j].interpretation_list[i].minimum &&
                desrain_probability <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " There is a " +
                  weather_response[j].interpretation_list[i].interpretation;
              }
            }
            break;
          case "Total Cloud Cover":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                destotal_cloud_cover >=
                  weather_response[j].interpretation_list[i].minimum &&
                destotal_cloud_cover <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " The sky is " +
                  weather_response[j].interpretation_list[i].interpretation;
              }
            }
            break;
          case "Wind Speed":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                deswind_speed >=
                  weather_response[j].interpretation_list[i].minimum &&
                deswind_speed <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          case "Wind Direction":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                deswind_direction >=
                  weather_response[j].interpretation_list[i].minimum &&
                deswind_direction <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " The wind direction is going to " +
                  weather_response[j].interpretation_list[i].interpretation;
              }
            }
            break;
          case "Wind Gust":
            for (
              let i = 0;
              i < weather_response[j].interpretation_list.length;
              i++
            ) {
              if (
                deswind_gust >=
                  weather_response[j].interpretation_list[i].minimum &&
                deswind_gust <=
                  weather_response[j].interpretation_list[i].maximum
              ) {
                destinationresponse =
                  destinationresponse +
                  " " +
                  weather_response[j].interpretation_list[i].response;
              }
            }
            break;
          default:
            break;
        }
      }
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
              <CardSubtitle>As of {last_update},</CardSubtitle>
              <CardTitle>
                It feels like {destinationHeatIndex} degrees.
              </CardTitle>
              <CardText>{destinationresponse}</CardText>
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

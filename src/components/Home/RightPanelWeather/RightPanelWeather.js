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

export default class RightPanelWeather extends Component {
  state = {
    lat: "",
    long: "",
    data: ""
  };
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.innerHTML = "Geolocation is not supported by this browser.";
    }
    console.log(weather_response[0]);
  };

  showPosition = position => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
    this.getWeatherData();
  };

  getWeatherData = () => {
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
        console.log(response.data);
        this.setState({ data: response.data });
      });
  };
  render() {
    console.log(this.state.data.length);
    let heat_index = "";
    let last_update = "";
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
    }
    return (
      <div>
        <Card>
          <CardHeader>Your Location</CardHeader>
          <CardBody>
            <CardSubtitle>As of {last_update}</CardSubtitle>
            <CardTitle>Heat Index is {heat_index}</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
        </Card>
        <br />
        <br />
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

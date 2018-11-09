import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
import {Container, Row, Col} from "reactstrap";
// Import credentials
import env from '../../env.json';

class WeatherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      loc : "14.5547,121.0244" 
    };
  }

  componentWillMount() {

    // Set Request Parameters
    let headers = {
        "headers" : {
            "Authorization" : env.api.weather.auth
        }
    };
    let params = { key: "value"};
    let requestURL = env.api.weather.url.spec + this.state.loc;

    //  Send POST request
    axios
      .post(requestURL,params,headers)
      .then(response => {
        this.setState({
          weatherData: response.data
        });
        console.log(this.state.weatherData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let arrayHours = [];
    for (let x = 0; x < 24; x++)
        arrayHours.push(x + ":00");
    
    const headers = arrayHours;
    return (
        <Container fluid>
            <Row>
                <Col>
                    {this.state.weatherData.length === 0 ? (
                        <h3 className="subtitle has-text-centered">Fetching data...</h3>
                        ) : (
                        <Table headers={headers} data={this.state.weatherData.results} />
                    )}
                </Col>
            </Row>    
        </Container>
    );
  }
}

export default WeatherPage;
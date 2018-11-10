import React, { Component } from "react";
import isLoggedIn from "../StoreCredentials/isLoggedIn";
import Sidebar from "../Sidebar/Sidebar";
import { Redirect } from "react-router-dom";

import TableComponent from "./Table";
import axios from "axios";
import Preloader from '../Preloader/Preloader';
import {
    Container, 
    Row, 
    Col,
    Fade
} from "reactstrap";
// Import credentials from JSON file
import env from '../../env.json';

class WeatherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: [],
            // Makati Lat-long, CHANGE THIS FOR PROD!! 
            loc : "14.5547,121.0244" 
        };
    }

  componentWillMount() {
    // Set Request Parameters
    let headers = {
        "headers" : {
            "Content-Type": "application/json",
            "Authorization" : env.api.weather.auth
        }
    },
    requestURL = env.api.weather.url.spec + this.state.loc;

    //  Send POST request to Weather API
    axios
      .post(
          requestURL,
          {},
          headers)
      .then(response => {
        this.setState({
          weatherData: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    // Conditional rendering for Weather data table
    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else {
            if(this.state.weatherData.length === 0 ) {
                return (
                    <div>
                        <Sidebar />
                        <Preloader />
                    </div>
                );
            } else {
                let timeStamps = this.state.weatherData.results.map(date => date.timestamp);
                let days = [];
                for(let timeStamp of timeStamps){
                    let day = new Date(timeStamp)
                    days.push(day.toDateString());
                }
                const headers = Array.from(new Set(days));
                return (
                    <Fade>
                        <Sidebar />
                         <Container fluid>
                            <Row>
                                <Col>
                                    <TableComponent headers={headers} data={this.state.weatherData.results} />
                                </Col>
                            </Row>    
                        </Container>
                    </Fade>
                );
            }

        }
        
    }
}

export default WeatherPage;
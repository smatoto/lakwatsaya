import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import firebase from "firebase";
import store from "store";
import * as routes from "../../constants/routes";

var user = firebase.auth().currentUser;

export default class Sidebar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  signOut = () => {
    firebase.auth().signOut();
    store.set("loggedIn", false);
    store.remove("loggedIn");
    window.location = "/";
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Lakwatsaya!</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/segments">
                  Segments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/weather">
                  Weather
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  User.name
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem exact to={routes.PROFILE}>
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/" onClick={this.signOut}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
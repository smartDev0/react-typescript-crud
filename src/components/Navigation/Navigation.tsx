import React, { Component } from "react";
import * as routes from "../../constants/routes";
import styled from "styled-components";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { firebase } from "../../firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./../Logout";

const GoRegister = styled(Link)`
  color: white;
  text-decoration: none !important;
`;

const GoHome = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 10px;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const GoProfile = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

interface InterfaceProps {
  history?: any;
}

class Navigation extends Component<InterfaceProps & RouteComponentProps, { user: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser) => {
      this.setState({ user: authUser });
    })
  }

  Redirect() {
  }

  render() {
    const { user } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <>
        {!!user ? <NavigationAuth /> : pathname === '/' ? <NavigationNonAuthLogin /> : <NavigationNonAuthRegister />}
      </>
    );
  }
}

const NavigationAuth = () => (
  <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
    <Navbar.Brand>FunColl</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <GoHome to="home">Home</GoHome>
        <GoProfile to="profile">My profile</GoProfile>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info" className="mr-sm-2">
          Search
      </Button>
        <Logout />
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

const NavigationNonAuthLogin = () => (
  <Navbar
    collapseOnSelect
    expand="lg"
    bg="dark"
    variant="dark"
    style={{ zIndex: 10 }}
  >
    <Navbar.Brand>FunColl</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Form inline>
          <Button type="button" className="register">
            <GoRegister to={routes.SIGN_UP}>Register</GoRegister>
          </Button>
        </Form>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const NavigationNonAuthRegister = () => (
  <Navbar
    collapseOnSelect
    expand="lg"
    bg="dark"
    variant="dark"
    style={{ zIndex: 10 }}
  >
    <Navbar.Brand href="">FunColl</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Form inline>
          <Button type="button" className="register">
            <GoRegister to={routes.SIGN_IN}>Login</GoRegister>
          </Button>
        </Form>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default withRouter(Navigation);

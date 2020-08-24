import React, { Component } from "react";
import * as routes from "../../constants/routes";
import styled from "styled-components";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { auth, firebase } from "../../firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AuthUserContext } from "../../firebase/AuthUserContext";
import { Link } from "react-router-dom";
import Logout from "./../Logout";
const GoRegister = styled(Link)`
  color: white;
  text-decoration: none !important;
`;
interface InterfaceProps {
  history?: any;
}

class Navigation extends Component<InterfaceProps & RouteComponentProps> {
  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      authUser
        ? this.Redirect()
        : this.setState(() => ({

        }));
    });
  }
  public Redirect() {
  }
  render() {
    const { location } = this.props;

    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <NavigationAuth />
          ) : location.pathname == "/" ? (
            <NavigationNonAuthLogin />
          ) : (
            <NavigationNonAuthRegister />
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

const NavigationAuth = () => (
  <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
    <Navbar.Brand>FunColl</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href={routes.HOME}>Home</Nav.Link>
      <Nav.Link href={routes.PROFILE}>My profile</Nav.Link>
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

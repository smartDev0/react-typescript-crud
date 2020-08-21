import React, { Component } from "react";
import * as routes from "../../constants/routes";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import { auth, firebase } from "../../firebase";

class Navigation extends Component<{}, {}> {
  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      authUser ? this.setState(() => ({})) : this.Redirect();
    });
  }
  public Redirect() {
    window.location.href = "/";
  }
  public logout = () => {
    auth.doSignOut().then(() => {
      window.localStorage.clear();
      window.location.href = "/";
    });
  };
  public render() {
    return (
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Navbar.Brand>FunColl</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={routes.HOME}>Home</Nav.Link>
          <Nav.Link href={routes.PROFILE}>My profile</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" className="mr-sm-2">
            Search
          </Button>
          <Button
            type="button"
            className="register"
            onClick={() => this.logout()}
          >
            Logout
          </Button>
        </Form>
      </Navbar>
    );
  }
}
export default Navigation;

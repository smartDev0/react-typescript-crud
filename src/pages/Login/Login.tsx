import React, { Component } from "react";
import styled from "styled-components";
import {
  Navbar,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as routes from "./../../constants/routes";
import { auth, firebase} from "../../firebase";

const H3 = styled.h3``;

const GoRegister = styled(Link)`
    color: white;
    text-decoration: none!important;
`;
const Divider = styled.div`
    text-align:center;
    padding: 5px 0
`;
const IMG = styled.img`
margin-bottom:3px; margin-right:5px
`;

const P = styled.p`
color:red
`;


interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}


class LoginPage extends Component<
  InterfaceProps,
  InterfaceState
  > {
  
  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...LoginPage.INITIAL_STATE };
  }

  private static INITIAL_STATE = {
    email: "",
    error: null,
    password: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }
  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      authUser
        ? this.Redirect()
        : this.setState(() => ({ 

         }));
    });
  }
  public Redirect() {
    const { history } = this.props;
    history.push(routes.HOME);
  }

  public onSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('response:', res);
        this.setState(() => ({ ...LoginPage.INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(LoginPage.propKey("error", error));
      });


  };

  public render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";
    return (
      <div>
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
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={event => this.onSubmit(event)}>
              <H3>Sign In</H3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={event => this.setStateWithEvent(event, "email")}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={event => this.setStateWithEvent(event, "password")}
                />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                </label>
                </div>
              </div>
              <button type="submit" disabled={isInvalid} className="btn btn-primary btn-block">
                Sign In
              </button>
              {error && <P>{error.message}</P>}
              <Divider>
                or
              </Divider>
              <button className="btn btn-primary btn-block" type="button" onClick={auth.signInWithGoogle}>
                <IMG width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Login with Google
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(LoginPage.propKey(columnType, (event.target as any).value));
  }

};
export default LoginPage;
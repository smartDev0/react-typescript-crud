import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import * as routes from "./../../constants/routes";
import { auth, firebase } from "../../firebase";

const H3 = styled.h3``;

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
        {/* <Navigation /> */}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <H3>Sign In</H3>
            <Form.Group controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={event => this.setStateWithEvent(event, "email")} />
            </Form.Group>
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={event => this.setStateWithEvent(event, "password")} />
            </Form.Group>
            <Form.Group controlId="RememberMe">
              <Form.Check
                type="checkbox"
                id="customCheck1"
                label="Remember me"
              />
            </Form.Group>
            <Button onClick={event => this.onSubmit(event)} disabled={isInvalid} className="btn btn-primary btn-block">
              Sign In
              </Button>
            {error && <P>{error.message}</P>}
            <Divider>
              or
            </Divider>
            <Button className="btn btn-primary btn-block" type="button" onClick={auth.signInWithGoogle}>
              <IMG width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Login with Google
            </Button>
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
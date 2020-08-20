import React, { Component } from "react";
import styled from "styled-components";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

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

class LoginPage extends Component {
  render() {
    return (
      <div>
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
                  <GoRegister to="register">Register</GoRegister>
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <H3>Sign In</H3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
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
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
            </button>
              <Divider>
                or
            </Divider>
              <button className="btn btn-primary btn-block">
                <IMG width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Login with Google
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

};
export default LoginPage;
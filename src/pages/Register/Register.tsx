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
import { auth, db } from "../../firebase";
import * as routes from "../../constants/routes";

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

interface InterfaceProps {
    email?: string;
    error?: any;
    history?: any;
    password?: string;
    username?: string;
}
interface InterfaceState {
    email: string;
    error: any;
    password: string;
    username: string;
}
class RegisterPage extends Component<
    InterfaceProps,
    InterfaceState> {
    private static INITIAL_STATE = {
        email: "",
        error: null,
        password: "",
        username: ""
    };
    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }
    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...RegisterPage.INITIAL_STATE };
    }
    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { email, password, username } = this.state;
        const { history } = this.props;
        auth
            .doCreateUserWithEmailAndPassword(email, password)
            .then((authUser: any) => {
                console.log('user:', authUser)
                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...RegisterPage.INITIAL_STATE }));
                        history.push(routes.HOME);
                    })
                    .catch((error: any) => {
                        this.setState(RegisterPage.propKey("error", error));
                    });
            })
            .catch((error: any) => {
                this.setState(RegisterPage.propKey("error", error));
            });
    }

    public render() {
        const { username, email, password, error } = this.state;

        const isInvalid =
            password === "" ||
            email === "" ||
            username === "";
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
                                    <GoRegister to="/">Login</GoRegister>
                                </Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.handleSubmit}>
                            <H3>Sign Up</H3>
                            <div className="form-group">
                                <label>User name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter user name"
                                    name="username"
                                    required
                                    // value={this.state.username}
                                    onChange={e=> this.setState({username: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    name="email"
                                    required
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    name="password"
                                    required
                                    onChange={e => this.setState({ password: e.target.value })}
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
                                Sign Up
                            </button>
                            {error && <p>{error.message}</p>}
                            <Divider>
                                or
                            </Divider>
                            <button className="btn btn-primary btn-block" type="button">
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
        this.setState(RegisterPage.propKey(columnType, (event.target as any).value));
    }

};
export default RegisterPage;
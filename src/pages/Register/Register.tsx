import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { auth, db, firebase } from "../../firebase";
import * as routes from "../../constants/routes";

const H3 = styled.h3``;

const P = styled.p`
color:red
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
    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...RegisterPage.INITIAL_STATE };
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

    private static INITIAL_STATE = {
        email: "",
        error: null,
        password: "",
        username: ""
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { email, password, username } = this.state;
        const { history } = this.props;
        auth
            .doCreateUserWithEmailAndPassword(email, password)
            .then((authUser: any) => {
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
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.handleSubmit}>
                            <H3>Sign Up</H3>
                            <Form.Group controlId="username">
                                <Form.Label>User name</Form.Label>
                                <Form.Control type="text" placeholder="Enter user name" value={this.state.username} onChange={event => this.setStateWithEvent(event, "username")} />
                            </Form.Group>
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
                            <Button type="submit" disabled={isInvalid} className="btn btn-primary btn-block">
                                Sign Up
                            </Button>
                            {error && <P>{error.message}</P>}
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
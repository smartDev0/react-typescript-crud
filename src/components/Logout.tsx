import React, { Component } from "react";
import * as routes from "../constants/routes";
import { Button } from "react-bootstrap";
import { auth } from "../firebase";
import { withRouter, RouteComponentProps } from 'react-router-dom'


interface InterfaceProps {
    history?: any;
}

class Logout extends Component<InterfaceProps & RouteComponentProps> {

    public componentDidMount() {
    }

    public logout = () => {
        auth.doSignOut().then(() => {
            this.props.history.push("/")
        });
    };
    public render() {
        return (
            <Button
                type="button"
                className="register"
                onClick={() => this.logout()}

            >{routes.LOGOUT}</Button>
        );
    }
}
export default withRouter(Logout);
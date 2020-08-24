import * as React from "react";
import { withRouter } from "react-router-dom";
import LoginPage from "./Login";

const SignInComponent = ({ history }: { [key: string]: any }) => (
    <div>
        <LoginPage history={history} />
    </div>
);

export const SignIn = withRouter(SignInComponent);

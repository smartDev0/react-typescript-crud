import React from "react";
import { BrowserRouter as Router, Switch, Route, useHistory  } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import HomePage from './pages/Home/Home'
import * as routes from "./constants/routes";
import { firebase } from "./firebase";
import { withAuthentication } from "./firebase/withAuthentication";

class AppComponent extends React.Component {

  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null
    };
  }
  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      authUser
        ? this.Redirect(authUser)
        : this.setState(() => ({ authUser: null }));
    });
  }
  public Redirect(authUser: any) {
    this.setState(() => ({ authUser }));
  }
  render() {

    return (
      <Router>
        <Switch>
          <Route exact path={routes.SIGN_IN} component={LoginPage} />
          <Route path={routes.SIGN_UP} component={RegisterPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </Router>
    );
  }

}

export const App = withAuthentication(AppComponent);

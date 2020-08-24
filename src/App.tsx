import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as routes from "./constants/routes";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import HomePage from './pages/Home/Home';
import MyProfile from './pages/MyProfile/MyProfile';
import "./App.css";
import Navigation from "./components/Navigation/Navigation";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path={routes.SIGN_IN} component={LoginPage} />
            <Route path={routes.SIGN_UP} component={RegisterPage} />
            <Route path={routes.HOME} component={HomePage} />
            <Route path={routes.PROFILE} component={MyProfile} />
          </Switch>
        </Router>
      </>

    );
  }

}

export default App;

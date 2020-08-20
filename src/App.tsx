import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import HomePage from './pages/Home/Home'
import * as routes from "./constants/routes";
function App() {
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

export default App;

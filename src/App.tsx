import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        {/* <Route path="/preview" component={PreviewPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;

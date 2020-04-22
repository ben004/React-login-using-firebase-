import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
        });
      } else {
        this.setState({
          authenticated: false,
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute
            path="/chat"
            authenticated={this.state.authenticated}
            component={Chat}
          ></PrivateRoute>
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          ></PublicRoute>
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={Login}
          ></PublicRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;

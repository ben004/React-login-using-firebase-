import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { auth } from "./firebase";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";

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

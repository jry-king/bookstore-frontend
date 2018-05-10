import React, { Component } from 'react';
import HomePage from "./Home.jsx";
import WrappedLogin from "./Login.jsx";
import WrappedRegistrationForm from "./Register.jsx";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

class App extends Component {
  constructor()
  {
    super();
    this.state = { userid: 0, username: "" };
  }
  setUserId = (id, name) => {
    this.setState({ userid: id, username: name });
  }
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" render={() => <WrappedLogin setUser={this.setUserId} />} />
            <Route path="/login" render={() => <WrappedLogin setUser={this.setUserId} />} />
            <Route path="/register" component={ WrappedRegistrationForm } />
            <Route path="/home" render={() => <HomePage userid={this.state.userid} username={this.state.username} />} />
          </Switch>
        </Router> 
    );
  }
}

export default App;

import React, { Component } from 'react';
import HomePage from "./Home.jsx";
import WrappedLogin from "./Login.jsx";
import WrappedRegistrationForm from "./Register.jsx";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={ WrappedLogin }/>
            <Route path="/login" component={ WrappedLogin }/>
            <Route path="/register" component={ WrappedRegistrationForm }/>
            <Route path="/home" component={ HomePage } />
          </Switch>
        </Router> 
    );
  }
}

export default App;

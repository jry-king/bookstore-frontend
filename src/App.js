import React, { Component } from 'react';
import HomePage from "./Home.jsx";
import WrappedLogin from "./Login.jsx";
import WrappedRegistrationForm from "./Register.jsx";
import { Layout } from "antd";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Content>
            <Route exact path="/" component={ WrappedLogin }/>
            <Route path="/login" component={ WrappedLogin }/>
            <Route path="/register" component={ WrappedRegistrationForm }/>
            <Route path="/home" component={ HomePage } />
         </Content>
        </Router> 
      </Layout>
    );
  }
}

export default App;

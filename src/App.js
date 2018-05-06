import React, { Component } from 'react';
import HomePage from "./Home.jsx";
import WrappedLogin from "./Login.jsx";
import './App.css';
import { Layout } from "antd";
import { BrowserRouter as Router, Route} from "react-router-dom";
const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Content>
            <Route exact path="/" component={ WrappedLogin }/>
            <Route path="/login" component={ WrappedLogin }/>
            <Route path="/register" component={ WrappedLogin }/>
            <Route path="/home" component={ HomePage } />
         </Content>
        </Router> 
      </Layout>
    );
  }
}

export default App;

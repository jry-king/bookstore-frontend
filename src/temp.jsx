import React, { Component } from 'react';
import Catalog from "./Catalog.jsx";
import HomePage from "./Home.jsx";
import WrappedLogin from "./Login.jsx";
import ShoppingList from "./Shoppinglist.jsx";
import './App.css';
import { Menu, Layout } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <div>
          <Header>
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
              <Menu.Item key="catalog"><Link to="/catalog">Catalog</Link></Menu.Item>
              <Menu.Item key="shoppingcart"><Link to="/mycart">Shoppingcart</Link></Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Route exact path="/" component={ HomePage }/>
            <Route path="/login" component={ WrappedLogin }/>
            <Route path="/catalog" render={ () => <Catalog/> } />
            <Route path="/mycart" render={ () => <ShoppingList/>} />
         </Content>
          </div>
        </Router> 
      </Layout>
    );
  }
}

export default App;
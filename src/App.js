import React, { Component } from "react";
import Catalog from "./Catalog.jsx";
import ShoppingList from "./Shoppinglist.jsx";
import HomePage from "./Home.jsx";
import WrappedLogin from "./Login.jsx";
import { Menu, Layout } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Header, Content } = Layout;
const rawdata = [
  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million", 99.99],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million", 89.99],
  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million", 79.99],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million", 129.99],
  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million", 109.99],
  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million", 119.99],
  ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million", 69.99],
  ];
const data = rawdata.map((a) => ({Book: a[0], Author: a[1], Language: a[2], Published: a[3], Sales: a[4], Price: a[5]}));
var shoppingCart = [];
var sumNum = 0;
var sumPrice = 0;

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = { cart: shoppingCart, selected: "catalog"};
  }
  addToCart = (index) => {
    if(shoppingCart.length !== 0)
    {
      shoppingCart.pop();
    }
    var record = data[index];
    var have = false;
    for(var i in shoppingCart)
    {
      if(shoppingCart[i].Book === record.Book)
      {
        shoppingCart[i].Number += 1;
        sumNum += 1;
        shoppingCart[i].TotalPrice += record.Price;
        sumPrice += record.Price;
        have = !have;
      }
    }
    if(!have)
    {
      shoppingCart.push({Book: record.Book, Price: record.Price, Number: 1, TotalPrice: record.Price});
      sumNum += 1;
      sumPrice += record.Price;
    }
    shoppingCart.push({ Book: "All books chosen", Price: null, Number: sumNum, TotalPrice: sumPrice});
    this.setState({ cart: shoppingCart });
  }
  clearCart = () => {
    shoppingCart = [];
    sumNum = 0;
    sumPrice = 0;
    this.setState({ cart: shoppingCart });
  }
  render()
  {
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
            <Route path="/catalog" render={ () => <Catalog data={data} onAddToCart={this.addToCart} /> } />
            <Route path="/mycart" render={ () => <ShoppingList data={this.state.cart} onClear={this.clearCart}/>} />
          </Content>
          </div>
        </Router> 
      </Layout>
    );
  }
}

export default App;

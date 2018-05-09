import React, { Component } from 'react';
import Catalog from "./Catalog.jsx";
import ShoppingList from "./Shoppinglist.jsx";
import BookPage from "./Book.jsx";
import './App.css';
import { Menu, Layout, Carousel } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content } = Layout;

class HomePage extends Component{
    constructor(props) 
    {
        super(props);
        this.state = { displayId: 0 };
    }
    jumpToDetail = (bookid) => {
        this.setState({displayId: bookid});
    }
    render()
    {
        return(
            <Layout>
                <Router>
                    <div>
                        <Header>
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
                                <Menu.Item key="home"><Link to="/home">Home</Link></Menu.Item>
                                <Menu.Item key="catalog"><Link to="/catalog">Catalog</Link></Menu.Item>
                                <Menu.Item key="shoppingcart"><Link to="/mycart">Shoppingcart</Link></Menu.Item>
                            </Menu>
                        </Header>
                        <Content>
                            <Route path="/home" render={() => <Carousel autoplay class="slick-slide">
                                <div><h1>Welcome to our bookstore!</h1></div>
                                <div><h1>In here you can find a sea of great books.</h1></div>
                                <div><h1>Pick your desired book in the catalog and check the shopping cart.</h1></div>
                                <div><h1>Help yourself and enjoy!</h1></div>
                            </Carousel>} />
                            <Route path="/catalog" render={() => <Catalog showDetail={this.jumpToDetail}/>} />
                            <Route path="/mycart" component={ ShoppingList } />
                            <Route path="/bookpage" render={() => <BookPage bookid={this.state.displayId}/>} />
                        </Content>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default HomePage;
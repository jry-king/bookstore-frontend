import React, { Component } from 'react';
import Catalog from "./Catalog.jsx";
import ShoppingList from "./Shoppinglist.jsx";
import BookPage from "./Book.jsx";
import './App.css';
import { Menu, Layout, Carousel, Button } from "antd";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
const { Header, Content, Sider } = Layout;

class HomePage extends Component{
    constructor(props) 
    {
        super(props);
        this.state = { 
            bookToDisplay: {},
            currentUserId: this.props.userid, 
            currentUsername: this.props.username 
        };
    }
    jumpToDetail = (book) => {
        this.setState({bookToDisplay: book});
    }
    Logout = () => {
        this.props.history.push("/login");
    }
    render()
    {
        return(
            <Layout>
                <Router>
                    <div>
                        <Layout>
                            <Header>
                                <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
                                    <Menu.Item key="home"><Link to="/home">Home</Link></Menu.Item>
                                    <Menu.Item key="catalog"><Link to="/catalog">Catalog</Link></Menu.Item>
                                    <Menu.Item key="shoppingcart"><Link to="/mycart">Shoppingcart</Link></Menu.Item>
                                </Menu>
                            </Header>
                            <Sider className="sider1">Welcome! {this.state.currentUsername} <Button type="danger" onClick={this.Logout}>logout</Button></Sider>
                        </Layout>
                        <Content>
                            <Route path="/home" render={() => <Carousel autoplay class="slick-slide">
                                <div><h1>Welcome to our bookstore!</h1></div>
                                <div><h1>In here you can find a sea of great books.</h1></div>
                                <div><h1>Pick your desired book in the catalog and check the shopping cart.</h1></div>
                                <div><h1>Help yourself and enjoy!</h1></div>
                            </Carousel>} />
                            <Route path="/catalog" render={() => <Catalog showDetail={this.jumpToDetail} />} />
                            <Route path="/mycart" component={ShoppingList} />
                            <Route path="/bookpage" render={() => <BookPage book={this.state.bookToDisplay} />} />
                        </Content>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default withRouter(HomePage);
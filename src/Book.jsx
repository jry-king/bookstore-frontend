import React, { Component } from 'react';
import { Layout, Button, notification } from "antd";
import img1 from "./cover/TheLordoftheRings.jpg";
import "./App.css";
const { Header, Footer, Sider, Content } = Layout;

class BookPage extends Component{
    constructor(props)
    {
        super(props);
        this.state = { cover : "" };
    }
    addBook = async (e) => {
        let url = "http://localhost:8080/CartManager?operation=add&userid=1&book=" + this.props.book.Book + "&price=" + this.props.book.Price.toString();
        let res = await fetch(url, {
            method: "post",
            headers: {
                "Accept": "text/html",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        });
        let result = await res.text();
        if("success" === result)
        {
            notification.open({
                message: "Book added to cart!",
                description: "Your book have been successfully added to your shopping cart. You can click the shoppingcart tag to check.",
            });
        }
        else
        {
            notification.open({
                message: "Failed to add book!",
                description: "There are some problems.",
            });
        }
    }
    getCover = async (e) => {
        let res = await fetch("localhost:8080/BookCover?bookid=" + this.props.book.BookIndex.toString(), {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        });
        let result = await res.json();
        alert(result.cover);
        this.setState({ cover : result.cover });
    }
    render()
    {
        let coverlist = { "./cover/TheLordoftheRings.jpg" : img1 };
        return(
            <Layout className="bookdetail">
                <Sider className="sider" width="700" ><img src={coverlist[this.state.cover]} alt="cover here" /><Button type="primary" onClick={this.getCover}>get cover</Button></Sider>
                <Layout>
                    <Header className="header">{this.props.book.Book}</Header>
                    <Content className="content">Author: {this.props.book.Author}<br/>Language: {this.props.book.Language}<br/>Publish time: {this.props.book.Published}<br/>Sales: {this.props.book.Sales} </Content>
                    <Footer className="footer">Price: {this.props.book.Price} <Button type="primary" onClick={ this.addBook }>add to cart</Button></Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BookPage;
import React, { Component } from 'react';
import { Layout, Button } from "antd";
import "./App.css";
const { Header, Footer, Sider, Content } = Layout;

class BookPage extends Component{
    handleClick = (e) => {
        alert(this.props.book.Book);
    }
    render()
    {
        return(
            <Layout className="bookdetail">
                <Sider className="sider">image</Sider>
                <Layout>
                    <Header className="header">{this.props.book.Book}</Header>
                    <Content className="content">Author: {this.props.book.Author}<br/>Language: {this.props.book.Language}<br/>Publish time: {this.props.book.Published}<br/>Sales: {this.props.book.Sales} </Content>
                    <Footer className="footer">Price: {this.props.book.Price} <Button type="primary">add to cart</Button></Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BookPage;
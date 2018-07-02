import React, { Component } from "react";
import { Table, Button, Layout, notification } from "antd";
import './App.css';
const { Footer, Content } = Layout;

class ShoppingList extends Component{
  constructor()
  {
    super();
    this.state = { cart: [], total: 0 };
  }
  getCart = async (e) => {
    let res = await fetch("http://localhost:8080/CartManager",{
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
    let result = await res.json();
    let itemlist = [];
    let totalOfAll = 0;
    for(let i = 0; i < result.length; i++)
    {
      itemlist.push({ Book: result[i]["book"],  Price: result[i]["price"], Number: result[i]["number"], TotalPrice: result[i]["price"]*result[i]["number"] });
      totalOfAll += result[i]["price"]*result[i]["number"];
    }
    this.setState({ cart : itemlist, total: totalOfAll });
  }
  clearCart = async (e) => {
    await fetch("http://localhost:8080/CartManager?operation=removeall&userid=0&book=null&price=0",{
      method: "post",
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
    this.setState({ cart: [], total: 0 });
  }
  payBill = async (e) => {
    await fetch("http://localhost:8080/OrderManager?userid=1&date=2018/6/23&totalprice=" + this.state.total.toString(),{
      method: "post",
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
    let res = await fetch("http://localhost:8080/OrderManager",{
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
        });
    let result = await res.json();
    let orderid = 0;
    for(let i = 0; i < result.length; i++)
    {
        if(orderid < result[i]["id"])
        {
          orderid = result[i]["id"];
        }
    }
    for(let i = 0; i < this.state.cart.length; i++)
    {
      await fetch("http://localhost:8080/OrderItemManager?orderid=" + orderid.toString() + "&number=" + this.state.cart[i].Number.toString() + "&book=" + this.state.cart[i].Book + "&price=" + this.state.cart[i].Price.toString(), {
        method: "post",
        headers: {
          "Accept": "text/html",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
      });
    }
    await fetch("http://localhost:8080/CartManager?operation=removeall&userid=0&book=null&price=0",{
      method: "post",
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
    notification.open({
      message: "Successfully paid!",
      description: "Your payment has been done.",
  });
    this.setState({ cart: [], total: 0 });
  }
  render(){
    const columns = [{
      title: "Book to purchase",
      dataIndex: "Book",
      key: "Book",
    }, {
      title: "Price of a single book",
      dataIndex: "Price",
      key: "Price",
    }, {
      title: "Number",
      dataIndex: "Number",
      key: "Number",
    }, {
      title: "Total price",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    }];
    return (
      <Layout className="App">
        <Content>
          <Table columns={columns} dataSource={this.state.cart} />
          <Button type="primary" onClick={this.getCart}>show items</Button>
          <Button type="primary" onClick={this.clearCart}>clear</Button>
        </Content>
        <Footer>All in total: {this.state.total} <Button type="primary" onClick={this.payBill}>Pay now</Button></Footer>
      </Layout>
    );
  }
}

export default ShoppingList;
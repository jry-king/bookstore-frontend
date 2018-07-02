import React, { Component } from 'react';
import { Table, Button } from "antd";
import "./App.css";

function sortString(a,b)
{
  let len = Math.min(a.length, b.length);
  for(let i = 0; i < len; i++)
  {
    if(a[i] > b[i])
    {
      return 1;
    }
    else if(a[i] < b[i])
    {
      return -1;
    }
  }
  return a.length-b.length;
}

class ItemPage extends Component{
    constructor(props){
        super(props);
        this.state = { orderid: this.props.order, data: [] };
    }
    showItems = async() => {
        let res = await fetch("http://localhost:8080/OrderItemManager?orderid=" + this.state.orderid.toString(), {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        });
        let result = await res.json();
        let itemlist = [];
        for(let i = 0; i < result.length; i++)
        {
            itemlist.push({ Orderid: result[i]["orderid"], Book: result[i]["book"], Price: result[i]["price"], Number: result[i]["number"] });
        }
        this.setState({ data : itemlist });
    }
    render()
    {
        const columns = [{
            title: "Book",
            dataIndex: "Book",
            key: "Book",
            sorter: (a, b) => sortString(a.Book, b.Book),
        }, {
            title: "Price",
            dataIndex: "Price",
            key: "Price",
            sorter: (a, b) => a.Price - b.Price,
        }, {
            title: "Number",
            dataIndex: "Number",
            key: "Number",
            sorter: (a, b) => a.number - b.number,
        }, {
            title: "OrderId",
            dataIndex: "OrderId",
            key: "OrderId",
        }];
        return(
            <div className="App">
            <Table rowKey={record => record.orderId} columns={columns} dataSource={this.state.data} />
            <Button type="primary" onClick={ this.showItems }>refresh</Button>
            </div>
        );
    }
}

export default ItemPage;
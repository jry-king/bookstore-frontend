import React, { Component } from 'react';
import { Table, Button } from "antd";
import { withRouter } from "react-router-dom";

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

class OrderPage extends Component{
    constructor(props){
        super(props);
        this.state = {
          filterDropdownVisible: false,
          data: [],
          searchText: "",
          filtered: false,
        };
    }
    getOrder = async (e) => {
        let res = await fetch("http://localhost:8080/OrderManager",{
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
        });
        let result = await res.json();
        let orderlist = [];
        for(let i = 0; i < result.length; i++)
        {
          orderlist.push({ Id: result[i]["id"], User: result[i]["user"], Date: result[i]["date"], TotalPrice: result[i]["totalPrice"], OrderIndex: result[i]["id"]});
        }
        this.setState({ data : orderlist });
    }
    onShowItems = async (e) => {
        e.persist();
        let orderid = e.target.getAttribute("orderid");
        this.props.history.push("/orderitempage");
        this.props.showDetail(orderid);
    }
    render()
    {
        const columns = [{
            title: "Id",
            dataIndex: "Id",
            key: "Id",
            sorter: (a, b) => sortString(a.Id, b.Id),
          }, {
            title: "User",
            dataIndex: "User",
            key: "User",
            sorter: (a, b) => sortString(a.User, b.User),
          }, {
            title: "Date", 
            dataIndex: "Date",
            key: "Date",
            sorter: (a, b) => sortString(a.Date, b.Date),
          }, {
            title: "TotalPrice",
            dataIndex: "TotalPrice",
            key: "TotalPrice",
            sorter: (a, b) => a.TotalPrice - b.TotalPrice,
          }, {
            title: " ",
            dataIndex: "OrderIndex",
            key: "OrderIndex",
            render: (text) => {
              return (<Button type="primary" orderid={ text } onClick={ this.onShowItems }>Check items</Button>);
            },
          }];
          return (
            <div className="App">
              <Table rowKey={record => record.Id} columns={columns} dataSource={this.state.data} />
              <Button type="primary" onClick={this.getOrder}>get orders</Button>
            </div>
          );
    }
}

export default withRouter(OrderPage);
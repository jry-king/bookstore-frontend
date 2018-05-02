import React, { Component } from "react";
import { Table, Button } from "antd";

class ShoppingList extends Component{
  constructor(props)
  {
    super(props);
    this.state = { list: this.props.data };
  }
  handleClick = () => {
    this.props.onClear();
    this.setState(this.state.list);
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
      <div>
        <Table columns = { columns } dataSource={ this.state.list }/>
        <Button type="primary" onClick={this.handleClick}>clear</Button>
      </div>
    );
  }
}

export default ShoppingList;
import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
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

class Catalog extends Component{
  constructor(props){
    super(props);
    this.state = {
      filterDropdownVisible: false,
      data: [],
      searchText: "",
      filtered: false,
    };
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.state.data.map((record) => {
        const match = record.Book.match(reg);
        if (!match) {
          return null;
        }
        var temp = {};
        Object.assign(temp, record);
        temp.Book = <span>
          {record.Book.split(reg).map((text, i) => (
            i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
          ))}
        </span>;
        return temp;
      }).filter(record => !!record),
    });
  }
  onList = async (e) => {
    let res = await fetch("http://localhost:8080/Booklist",{
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
    let result = await res.json();
    var booklist = [];
    for(let i = 0; i < result.length; i++)
    {
      booklist.push({ Book: result[i]["bookname"], Author: result[i]["author"], Language: result[i]["language"] , Published: result[i]["published"] , Sales: result[i]["sales"] , Price: result[i]["price"] });
    }
    this.setState({ data : booklist });
  }

  render() {
    const columns = [{
      title: "Book",
      dataIndex: "Book",
      key: "Book",
      sorter: (a, b) => sortString(a.Book, b.Book),
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search book"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: "Author",
      dataIndex: "Author",
      key: "Author",
      sorter: (a, b) => sortString(a.Author, b.Author),
    }, {
      title: "Language", 
      dataIndex: "Language",
      key: "Language",
      sorter: (a, b) => sortString(a.Language, b.Language),
    }, {
      title: "Published", 
      dataIndex: "Published",
      key: "Published",
      sorter: (a, b) => sortString(a.Published, b.Published),
    }, {
      title: "Sales",
      dataIndex: "Sales",
      key: "Sales",
      sorter: (a, b) => sortString(a.Sales, b.Sales),
    }, {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      sorter: (a, b) => a.Price - b.Price,
    }, {
      title: " ",
      dataIndex: " ",
      key: " ",
      render: (text, record, index) => {
        return (<Button type="primary" name={ record.Book } price={ record.Price } onClick={ this.onShop }>add to cart</Button>);
      },
    }];
    return (
      <div className="App">
        <Table columns={ columns } dataSource={ this.state.data } />
        <Button type="primary" onClick={ this.onList }>get book</Button>
      </div>
    );
  }
}

export default Catalog;
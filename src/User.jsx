import React, { Component } from 'react';
import { Table, Button } from "antd";
import "./App.css";

class UserPage extends Component{
    constructor(props){
        super(props);
        this.state = { userid: 1, data: [] };
    }
    showUser = async() => {
        let res = await fetch("http://localhost:8080/UserManager?userid=" + this.state.userid.toString(), {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        });
        let result = await res.json();
        let user = [];
        user.push({ Userid: result["id"], Name: result["username"], Password: result["userpassword"], Role: result["role"], Email: result["email"], Phone: result["phone"] });
        this.setState({ data : user });
    }
    render()
    {
        const columns = [{
            title: "Userid",
            dataIndex: "Userid",
            key: "Userid",
        }, {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
        }, {
            title: "Password",
            dataIndex: "Password",
            key: "Password",
        }, {
            title: "Role",
            dataIndex: "Role",
            key: "Role",
        }, {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
        }, {
            title: "Phone",
            dataIndex: "Phone",
            key: "Phone",
        }];
        return(
            <div className="App">
                <Table rowKey={record => record.UserId} columns={columns} dataSource={this.state.data} />
                <Button type="primary" onClick={ this.showUser }>refresh</Button>
            </div>
        );
    }
}

export default UserPage;
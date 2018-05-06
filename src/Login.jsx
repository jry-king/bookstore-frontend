import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import "./App.css";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
          username: "",
          password: ""
        };
      }
    handleSubmit = async (e) => {
        let res = await fetch("http://localhost:8080/UserManager",{
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
        });
        let result = await res.json();
        let valid = false;
        for(let i = 0; i < result.length; i++)
        {
            if(this.state.username === result[i]["username"] && this.state.password === result[i]["password"])
            {
                valid = true;
                this.props.history.push("/home");
            }
        }
        if(!valid){alert("invalid user!");}
    }
    userChange = (e) => { this.setState({ username: e.target.value }); }
    passwordChange = (e) => { this.setState({ password: e.target.value }); }
    render()
    {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    { getFieldDecorator("userName", {
                        rules: [{ required: true, message: "Please input your username!"}],
                        })(
                            <Input prefix={ <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} value="" onChange={ this.userChange } placeholder="Username" />
                        )}
                </Form.Item>
                <Form.Item>
                    { getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your password!" }],
                    })(
                        <Input prefix={ <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" value="" onChange={ this.passwordChange } placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    { getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" className="login-form-button" onClick={ this.handleSubmit }>Log in</Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default withRouter(WrappedLogin);
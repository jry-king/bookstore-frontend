import React, { Component } from "react";
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, } from 'antd';
import { withRouter } from "react-router-dom";
const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    username: "",
    password: "",
    email: "",
    phone: "",
  };

  userChange = (e) => { this.setState({ username: e.target.value }); }
  passwordChange = (e) => { this.setState({ password: e.target.value }); }
  emailChange = (e) => { this.setState({ email: e.target.value }); }
  phoneChange = (e) => { this.setState({ phone: e.target.value }); }

  handleSubmit = async (e) => {
    let url = "http://localhost:8080/UserManager?username=" + this.state.username + "&password=" + this.state.password + "&email=" + this.state.email + "&phone=" + this.state.phone;
    let res = await fetch(url,{
      method: "post",
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
    let result = await res.text();
    if("success" === result)
    {
      this.props.history.push("/home");
    }
    else
    {
      alert("register failed!");
    }
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input onChange={ this.emailChange }/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" onChange={ this.passwordChange }/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input onChange={ this.userChange }/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} onChange={ this.phoneChange } />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={ this.handleSubmit } >Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default withRouter(WrappedRegistrationForm);
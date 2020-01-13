import React, { Component } from "react";
import { Button } from "antd-mobile";
import { Toast } from "antd-mobile";
import { login, getUserInfo } from "@/api/user";
import "./index.scss";
import { setToken, setUser } from "@/utils/local";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  handleGetUserName = event => {
    this.setState({
      username: event.target.value
    });
  };
  handleGetpassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  submitForm = () => {
    const type = this.verification();
    if (!type) return;
    const { username, password } = this.state;
    let data = {
      username: username,
      password: password
    };
    login(data).then(res => {
      console.log(res);
      if (res.code === 0) {
        setToken(res.data.token);
        this.getInfo();
      }
    });
  };
  getInfo() {
    getUserInfo().then(res => {
      if (res.code === 0) {
        console.log(res);
        let userInfo = JSON.stringify(res.data);
        setUser(userInfo);
        console.log(this.props.history);
        this.props.history.goBack();
      }
    });
  }

  verification() {
    const { username, password } = this.state;
    if (!username) {
      Toast.info("请输入正确的账号", 2);
      return false;
    } else if (!password) {
      Toast.info("请输入密码", 2);
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <section className="login-page">
        <div className="login-form">
          <div className="input-content">
            <span className="iconfont icon-icon- input-icon"></span>
            <input
              className="input"
              placeholder="请输入账号"
              value={this.state.username}
              onChange={this.handleGetUserName}
            ></input>
          </div>
          <div className="input-content">
            <span className="iconfont icon-mima input-icon"></span>
            <input
              type="password"
              className="input"
              placeholder="请输入密码"
              value={this.state.password}
              onChange={this.handleGetpassword}
            ></input>
          </div>
          <div className="btn-group">
            <Button className="login-btn" onClick={this.submitForm}>
              登陆
            </Button>
            <Button>注册</Button>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Login);

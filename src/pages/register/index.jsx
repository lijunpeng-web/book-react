import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd-mobile";
import { Toast } from "antd-mobile";
import Header from "@/components/header";
import { setToken, setUser } from "@/utils/local";
import { registerUser, getUserInfo } from "@/api/user";

import "./index.scss";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "eye",
      password: "123456",
      confitPassword: "123456",
      nickname: "nike",
      qq: "408588005"
    };
  }
  componentDidMount() {}
  // 用户名
  handleGetUserName = event => {
    this.setState({
      username: event.target.value
    });
  };
  // 昵称
  handleGetNickname = event => {
    this.setState({
      nickname: event.target.value
    });
  };
  // 密码
  handleGetpassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  // 确认密码
  handleGetConfitPassword = event => {
    this.setState({
      confitPassword: event.target.value
    });
  };
  handleGetqq = event => {
    this.setState({
      qq: event.target.value
    });
  };
  // 验证
  verification() {
    const { username, password, nickname, qq, confitPassword } = this.state;
    if (!username) {
      Toast.info("请输入正确的账号", 2);
      return false;
    } else if (!password) {
      Toast.info("请输入密码", 2);
      return false;
    } else if (confitPassword !== password) {
      Toast.info("两次密码不一致", 2);
      return false;
    } else if (!nickname) {
      Toast.info("请输入昵称", 2);
      return false;
    } else if (!qq) {
      Toast.info("请输入qq", 2);
      return false;
    } else {
      return true;
    }
  }
  submitForm = () => {
    const type = this.verification();
    if (!type) return;
    const { username, password, nickname, qq } = this.state;
    let data = {
      username: username,
      password: password,
      nickname: nickname,
      qq: qq
    };
    registerUser(data).then(res => {
      console.log(res);
      if (res.code === 0) {
        setToken(res.data.token);
        this.getInfo();
      } else {
        Toast.info(res.message, 2);
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
        this.props.history.push(`/`);
      }
    });
  }
  render() {
    return (
      <section className="login-page">
        <Header headerName="注册" rightIcon={false}></Header>

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

          <div className="input-content">
            <span className="iconfont icon-mima input-icon"></span>
            <input
              type="password"
              className="input"
              placeholder="确认密码"
              value={this.state.confitPassword}
              onChange={this.handleGetConfitPassword}
            ></input>
          </div>

          <div className="input-content">
            <span className="iconfont icon-icon- input-icon"></span>
            <input
              className="input"
              placeholder="请输入昵称"
              value={this.state.nickname}
              onChange={this.handleGetNickname}
            ></input>
          </div>

          <div className="input-content">
            <span className="iconfont icon-qq input-icon"></span>
            <input
              className="input"
              placeholder="请输入qq"
              value={this.state.qq}
              onChange={this.handleGetqq}
            ></input>
          </div>

          <div className="btn-group">
            <Button className="login-btn" onClick={this.submitForm}>
              注册
            </Button>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Register);

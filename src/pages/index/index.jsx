import React, { Component } from "react";
import Header from "./components/header";
import Search from "./components/search";
import Swiper from "@/components/swiper";
import TitleNav from "./components/title-nav";
import "./index.scss";
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      loginType: false,
      bookType: "man"
    };
  }
  changeType(type) {
    console.log(type);
    this.setState({
      bookType: type
    });
  }
  render() {
    return (
      <div className="index">
        {/* 首页头部 */}
        <Header
          loginType={this.state.loginType}
          bookType={this.state.bookType}
          changeType={this.changeType.bind(this)}
        ></Header>
        {/*首页 banner */}
        <div className="index-swiper">
          <Swiper></Swiper>
        </div>
        <TitleNav></TitleNav>
        <Search></Search>
      </div>
    );
  }
}

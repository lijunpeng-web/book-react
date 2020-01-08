import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class tabNav extends Component {
  render() {
    return (
      <div className="tab-nav-list">
        <Link to="/" className="tab-nav">
          <img src={require("@/assets/images/nav_1.png")} alt="" />
          <span>分类</span>
        </Link>
        <Link to="/" className="tab-nav">
          <img src={require("@/assets/images/nav_2.png")} alt="" />
          <span>榜单</span>
        </Link>
        <Link to="/" className="tab-nav">
          <img src={require("@/assets/images/nav_3.png")} alt="" />
          <span>vip</span>
        </Link>
        <Link to="/" className="tab-nav">
          <img src={require("@/assets/images/nav_4.png")} alt="" />
          <span>免费</span>
        </Link>
      </div>
    );
  }
}

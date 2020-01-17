import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class tabNav extends Component {
  render() {
    return (
      <div className="tab-nav-list">
        <Link to="/bookstack" className="tab-nav">
          <img src={require("@/assets/images/nav_1.png")} alt="" />
          <span>分类</span>
        </Link>
        <Link
          to={`/booklist/${this.props.index}?title=榜单&is_free=0`}
          className="tab-nav"
        >
          <img src={require("@/assets/images/nav_2.png")} alt="" />
          <span>榜单</span>
        </Link>
        <Link
          to={`/booklist/${this.props.index}?title=付费&is_free=2`}
          className="tab-nav"
        >
          <img src={require("@/assets/images/nav_3.png")} alt="" />
          <span>付费</span>
        </Link>
        <Link
          to={`/booklist/${this.props.index}?title=免费&is_free=1`}
          className="tab-nav"
        >
          <img src={require("@/assets/images/nav_4.png")} alt="" />
          <span>免费</span>
        </Link>
      </div>
    );
  }
}

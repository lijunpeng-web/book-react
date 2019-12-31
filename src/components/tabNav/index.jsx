import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
export default class TabNav extends Component {
  render() {
    return (
      <nav className="bottom-nav">
        {this.props.tabList.map((item, index) => (
          <Link to={item.url} className="nav-link" key={index}>
            <span className={item.icon}></span>
            <span className="nav-name">{item.name}</span>
          </Link>
        ))}

        {/*         
        <Link to="/" className="nav-link">
          <span className="iconfont icon-shujia "></span>
          <span></span>
        </Link>
        <Link to="/" className="nav-link">
          <span className="iconfont icon-shujia "></span>
          <span></span>
        </Link>
        <Link to="/" className="nav-link">
          <span className="iconfont icon-shujia "></span>
          <span></span>
        </Link> */}
      </nav>
    );
  }
}

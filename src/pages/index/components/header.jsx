import React, { Component } from "react";
export default class Header extends Component {
  constructor() {
    super();
    console.log(this.props);
  }
  changeBookType(e) {
    // console.log(e);
    if (this.props.bookType !== e) {
      this.props.changeType(e);
    }
  }
  render() {
    return (
      <header className="index-header">
        {/* <img className="header-logo" src="" alt="" srcset="" /> */}
        <nav className="header-nav">
          <div
            onClick={this.changeBookType.bind(this, "man")}
            className={
              this.props.bookType === "man"
                ? "nav-item nav-current"
                : "nav-item"
            }
          >
            哈哈
          </div>
          <div
            onClick={this.changeBookType.bind(this, "girl")}
            className={
              this.props.bookType === "girl"
                ? "nav-item nav-current"
                : "nav-item"
            }
          >
            哈哈
          </div>
        </nav>
        <span className="navicon iconfont icon-tubiaolunkuo-"></span>
      </header>
    );
  }
}

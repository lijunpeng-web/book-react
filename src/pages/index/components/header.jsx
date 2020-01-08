import React, { Component } from "react";
import { SegmentedControl } from "antd-mobile";
export default class Header extends Component {
  changeBookType(e) {
    // console.log(e);
    if (this.props.bookType !== e) {
      this.props.changeType(e);
    }
  }
  onChange = e => {
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  };
  onValueChange = value => {
    console.log(value);
  };
  render() {
    return (
      <header className="index-header">
        {/* <img className="header-logo" src="" alt="" srcset="" /> */}
        <div className="app-name">哈哈</div>
        <SegmentedControl
          values={["哈哈", "哈哈"]}
          tintColor={"#ed424b"}
          onValueChange={this.onValueChange}
          style={{ height: "30px", width: "36%" }}
        />
        {/* <nav className="header-nav">
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
        </nav> */}
        <span className="navicon iconfont icon-tubiaolunkuo-"></span>
      </header>
    );
  }
}

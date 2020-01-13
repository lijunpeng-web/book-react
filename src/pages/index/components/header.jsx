import React, { Component } from "react";
import { SegmentedControl } from "antd-mobile";
export default class Header extends Component {
  onChange = e => {
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  };
  onValueChange = value => {
    this.props.changeType(value);
  };
  render() {
    return (
      <header className="index-header">
        {/* <img className="header-logo" src="" alt="" srcset="" /> */}
        <div className="app-name">哈哈</div>
        <SegmentedControl
          values={["男生", "女生"]}
          tintColor={"#ed424b"}
          selectedIndex={this.props.selectedIndex}
          onValueChange={this.onValueChange}
          style={{ height: "30px", width: "36%" }}
        />
        {/* <nav className="header-nav">
          <div
            onClick={this.changeBookType.bind(this, "man")}
            className={
              this.props.bookType === "M" ? "nav-item nav-current" : "nav-item"
            }
          >
            男生
          </div>
          <div
            onClick={this.changeBookType.bind(this, "girl")}
            className={
              this.props.bookType === "W" ? "nav-item nav-current" : "nav-item"
            }
          >
            女生
          </div>
        </nav> */}
        <span className="navicon iconfont icon-tubiaolunkuo-"></span>
      </header>
    );
  }
}

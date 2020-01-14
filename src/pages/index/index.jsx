import React, { Component } from "react";
import Header from "./components/header";
import Search from "./components/search";
import Swiper from "@/components/swiper";
import TitleNav from "./components/title-nav";
import BookList from "./components/book-list";

import "./index.scss";
import { getIndexBanner, getIndexBookList } from "@/api/index";
import { buyBook } from "@/api/user";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      loginType: false,
      indexBanner: [],
      listData: [],
      selectedIndex: 0
    };
  }
  componentDidMount() {
    this.getBanner();
    this.getBook(this.state.selectedIndex);
  }
  changeType(type) {
    let selectedIndex = 0;
    if (type === "女生") {
      selectedIndex = 1;
    }
    this.setState({
      selectedIndex: selectedIndex
    });
    this.getBook(selectedIndex);
  }
  getBanner() {
    getIndexBanner().then(res => {
      if (res.code === 0) {
        let indexBanner = res.data;
        this.setState({
          indexBanner
        });
      }
    });
  }
  getBook(selectedIndex) {
    let type = "M";
    if (selectedIndex === 1) {
      type = "W";
    }
    let data = {
      renqun_type: type
    };
    getIndexBookList(data).then(res => {
      let listData = res.data;
      this.setState({
        listData: listData
      });
    });
  }

  buyBookTest() {
    let data = {
      book_id: 12
    };
    buyBook(data).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <section className="index">
        {/* 首页头部 */}
        <Header
          loginType={this.state.loginType}
          selectedIndex={this.state.selectedIndex}
          changeType={this.changeType.bind(this)}
        ></Header>
        {/*首页 banner */}
        <div className="index-swiper">
          <Swiper indexBanner={this.state.indexBanner}></Swiper>
        </div>
        <TitleNav index={this.state.selectedIndex}></TitleNav>
        <Search></Search>
        {this.state.listData.map((item, index) => (
          <BookList listData={item} key={index}></BookList>
        ))}
      </section>
    );
  }
}

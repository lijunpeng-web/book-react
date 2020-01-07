import React, { Component } from "react";
import Header from "./components/header";
import Search from "./components/search";
import Swiper from "@/components/swiper";
import TitleNav from "./components/title-nav";
import "./index.scss";
import { getIndexBanner, getIndexBookList } from "@/api/index";
import { buyBook } from "@/api/user";
// import { getBookDetail } from "@/api/book";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      loginType: false,
      bookType: "man",
      indexBanner: []
    };
  }
  componentDidMount() {
    this.getBanner();
    this.getBook();
    // this.getDetail();
    this.buyBookTest();
  }
  changeType(type) {
    console.log(type);
    this.setState({
      bookType: type
    });
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
  getBook() {
    let data = {
      renqun_type: "M"
    };
    getIndexBookList(data).then(res => {});
  }

  buyBookTest() {
    let data = {
      book_id: 12
    };
    buyBook(data).then(res => {
      console.log(res);
    });
  }

  // getDetail() {
  //   getBookDetail({ id: 1 }).then(res => {});
  // }
  render() {
    return (
      <section className="index">
        {/* 首页头部 */}
        <Header
          loginType={this.state.loginType}
          bookType={this.state.bookType}
          changeType={this.changeType.bind(this)}
        ></Header>
        {/*首页 banner */}
        <div className="index-swiper">
          <Swiper indexBanner={this.state.indexBanner}></Swiper>
        </div>
        <TitleNav></TitleNav>
        <Search></Search>
      </section>
    );
  }
}

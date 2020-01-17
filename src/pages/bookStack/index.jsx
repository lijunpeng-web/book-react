import React, { Component } from "react";
import { getSortType } from "@/api/book";
import { Link } from "react-router-dom";
import Header from "@/components/header";

import "./index.scss";
export default class BookStack extends Component {
  constructor() {
    super();
    this.state = {
      sortData: [],
      edit: false,
      index: 0
    };
  }
  componentDidMount() {
    this.getSort();
  }
  getSort() {
    getSortType().then(res => {
      if (res.code === 0) {
        this.setState({
          sortData: res.data
        });
      }
    });
  }
  render() {
    return (
      <section className="book-stack">
        <Header headerName="分类" rightIcon={false}></Header>
        <div className="stack-title">
          <div className="title">
            <span className="iconfont icon-nan"></span>
          </div>
          <div className="list">
            {this.state.sortData.map((item, index) => (
              <Link
                key={index}
                to={`/booklist/0?title=${item.sortname}&is_free=0&sortid=${item.id}`}
                className="li"
              >
                {item.sortname}
              </Link>
            ))}
          </div>
        </div>
        <div className="stack-title girl ">
          <div className="title">
            <span className="iconfont icon-nv"></span>
          </div>
          <div className="list">
            {this.state.sortData.map((item, index) => (
              <Link
                key={index}
                to={`/booklist/1?title=${item.sortname}&is_free=0&sortid=${item.id}`}
                className="li"
              >
                {item.sortname}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

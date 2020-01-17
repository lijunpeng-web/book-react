import React, { Component } from "react";
import { SegmentedControl } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Header from "@/components/header";
import { PullToRefresh } from "antd-mobile";
import { getBookList } from "@/api/book";
// import { Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import httpUrl from "url";

import "./index.scss";
class BookList extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      bookList: [],
      pageNum: 1,
      totlePage: 1,
      pageSize: 20,
      refreshing: false,
      up: true,
      height: document.documentElement.clientHeight - 100,
      loadingType: false,
      is_free: 0,
      title: "",
      query: {},
      deactivate: "上拉可以加载更多",
      finish: "上拉加载"
    };
  }
  componentDidMount() {
    console.log(this.props);
    let query = httpUrl.parse(this.props.location.search, true).query;
    let is_free = query.is_free ? query.is_free : 0;

    this.setState({
      index: parseInt(this.props.match.params.index),
      is_free: is_free,
      title: query.title,
      query: query
    });
    setTimeout(() => {
      this.getBook(parseInt(this.props.match.params.index), 1);
    }, 200);
  }

  getBook(index, page) {
    let type = "M";
    if (index === 0) {
      type = "M";
    } else {
      type = "W";
    }
    let data = {
      pageNum: page,
      pageSize: this.state.pageSize,
      type: type
    };
    let parameter = { ...data, ...this.state.query };
    getBookList(parameter).then(res => {
      if (res.code === 0) {
        let listdata = this.state.bookList;
        let list = listdata.concat(res.data.list);
        let deactivate = this.state.deactivate;
        let finish = this.state.finish;
        if (list.length < 20) {
          deactivate = "";
          finish = "没有更多了~";
        }
        this.setState({
          bookList: list,
          totlePage: res.data.totalPage,
          refreshing: false,
          deactivate: deactivate,
          finish: finish
        });
      }
    });
  }

  onScrollStart() {
    let page = this.state.pageNum;
    if (page > this.state.totlePage) {
      this.setState({
        refreshing: false,
        finish: "没有更多了~",
        deactivate: "没有更多了~"
      });
      return;
    }
    page++;
    this.setState({ refreshing: true, pageNum: page });
    this.getBook(this.state.index, page);
  }

  onChange = e => {
    this.setState({
      index: e.nativeEvent.selectedSegmentIndex,
      bookList: [],
      pageNum: 1
    });
    this.getBook(e.nativeEvent.selectedSegmentIndex, 1);
  };
  render() {
    return (
      <section className="booklist-page" id="booklist">
        <Header headerName={this.state.title} rightIcon={false}></Header>
        <div className="tab">
          <SegmentedControl
            values={["男生", "女生"]}
            tintColor={"#ed424b"}
            selectedIndex={this.state.index}
            onChange={this.onChange}
            style={{ height: "30px", width: "36%" }}
          />
        </div>
        <div className="list-ul">
          <PullToRefresh
            damping={100}
            ref={el => (this.ptr = el)}
            style={{
              height: this.state.height,
              overflow: "auto"
            }}
            indicator={
              this.state.up
                ? {
                    activate: "上拉可以加载更多",
                    deactivate: " ",
                    release: " ",
                    finish: this.state.finish
                  }
                : {
                    activate: " ",
                    deactivate: this.state.deactivate,
                    release: " ",
                    finish: " "
                  }
            }
            direction="up"
            refreshing={this.state.refreshing}
            onRefresh={this.onScrollStart.bind(this)}
          >
            {this.state.bookList.map((item, index) => (
              <Link to={`/detail/${item.id}`} className="list-li" key={index}>
                <img src={item.images} alt="" />
                <div className="li-content">
                  <div className="book-name">{item.bookname}</div>
                  <div className="zuozhe">
                    <div className="author">
                      <span className="iconfont icon-zuozhe"></span>
                      <span>{item.author}</span>
                    </div>
                    <div className="title-icon">{item.sortname}</div>
                  </div>
                  <div className="desc">{item.description}</div>
                </div>
              </Link>
            ))}
          </PullToRefresh>
          {this.state.loadingType ? "" : <div></div>}
        </div>
      </section>
    );
  }
}
export default withRouter(BookList);

import React, { Component } from "react";
import { SegmentedControl } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Header from "@/components/header";
import { PullToRefresh } from "antd-mobile";
import { getRanking } from "@/api/book";
import { Toast } from "antd-mobile";
import { Link } from "react-router-dom";

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
      loadingType: false
    };
  }
  componentDidMount() {
    this.setState({
      index: parseInt(this.props.match.params.index)
    });
    this.getBookRanking(parseInt(this.props.match.params.index), 1);
  }

  getBookRanking(index, page) {
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
    getRanking(data).then(res => {
      if (res.code === 0) {
        let listdata = this.state.bookList;
        let list = listdata.concat(res.data.list);
        console.log(list, "----------list");
        this.setState({
          bookList: list,
          totlePage: res.data.totalPage,
          refreshing: false
        });
      }
    });
  }

  onScrollStart() {
    let page = this.state.pageNum;
    if (page > this.state.totlePage) {
      Toast.info("没有更多了~", 2);
      return;
    }
    page++;
    this.setState({ refreshing: true, pageNum: page });
    this.getBookRanking(this.state.index, page);
  }

  onChange = e => {
    this.setState({
      index: e.nativeEvent.selectedSegmentIndex,
      bookList: [],
      pageNum: 1
    });
    this.getBookRanking(e.nativeEvent.selectedSegmentIndex, 1);
  };
  render() {
    return (
      <section className="booklist-page" id="booklist">
        <Header headerName="榜单" rightIcon={false}></Header>
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
            damping={200}
            ref={el => (this.ptr = el)}
            style={{
              height: this.state.height,
              overflow: "auto"
            }}
            indicator={this.state.up ? {} : { deactivate: "上拉可以加载更多" }}
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
                    <span className="iconfont icon-zuozhe"></span>
                    <span>{item.author}</span>
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

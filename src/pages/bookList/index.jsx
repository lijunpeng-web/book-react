import React, { Component } from "react";
import { SegmentedControl } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Header from "@/components/header";
// import { ListView } from "antd-mobile";
import { getRanking } from "@/api/book";
import "./index.scss";
class BookList extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      bookList: [],
      pageNum: 1,
      totlePage: 1,
      pageSize: 20
    };
  }
  componentDidMount() {
    this.setState({
      index: parseInt(this.props.match.params.index)
    });
    this.getBookRanking(parseInt(this.props.match.params.index));
    let dom = document.getElementById("booklist");
    dom.addEventListener("scroll", () => this.onScroll());
  }
  onScroll() {
    let dom = document.getElementById("booklist");
    let scrollTop = dom.scrollTop; //滚动条卷去的高度
    let clientHeight = dom.clientHeight; //可视区域高度
    let scrollHeight = dom.scrollHeight; //元素总高度
    console.log(scrollTop);
    if (scrollTop + clientHeight + 30 >= scrollHeight) {
      if (this.state.pageNum <= this.state.totlePage) {
        this.getBookRanking(this.state.index);
        let pageNum = this.state.pageNum;
        pageNum++;
        this.setState({
          pageNum
        });
      }
    }
  }
  getBookRanking(index) {
    let type = "M";
    if (index === 0) {
      type = "M";
    } else {
      type = "W";
    }
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      type: type
    };
    getRanking(data).then(res => {
      if (res.code === 0) {
        let list = this.state.bookList;
        res.data.list.forEach(item => {
          list.push(item);
        });
        this.setState({
          bookList: list,
          totlePage: res.data.totalPage
        });
      }
    });
  }

  onChange = e => {
    this.setState({
      index: e.nativeEvent.selectedSegmentIndex,
      bookList: [],
      pageNum: 1
    });
    this.getBookRanking(e.nativeEvent.selectedSegmentIndex);
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
          {this.state.bookList.map((item, index) => (
            <div className="list-li" key={index}>
              <img src={item.images} alt="" />
              <div className="li-content">
                <div className="book-name">{item.bookname}</div>
                <div className="zuozhe">
                  <span className="iconfont icon-zuozhe"></span>
                  <span>{item.author}</span>
                </div>
                <div className="desc">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default withRouter(BookList);

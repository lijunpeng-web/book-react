import React, { Component } from "react";
import "./index.scss";
import { getBookDetail, spotLike, addBookshelf } from "@/api/book";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { Toast } from "antd-mobile";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      detail: {},
      content: [],
      show: false,
      bookshelf: false
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getDetail();
  }

  getDetail() {
    let data = {
      id: this.props.match.params.id
    };
    getBookDetail(data).then(res => {
      this.setState({
        detail: res.data.detail,
        content: res.data.content,
        bookshelf: res.data.bookshelf
      });
      console.log(res);
    });
  }
  onLike = (e, id) => {
    console.log(e, id);
    let data = {
      comment_id: id
    };
    spotLike(data).then(res => {
      if (res.code === 0) {
        this.getDetail();
      }
    });
  };
  addShelf = id => {
    if (this.state.bookshelf) return;
    let data = {
      book_id: id
    };
    addBookshelf(data).then(res => {
      if (res.code === 0) {
        Toast.loading("添加成功", 2, null);
      } else {
        Toast.info(res.message);
      }
    });
  };
  render() {
    return (
      <section className="detail-page">
        <div className="detail-con">
          <div className="book-detail">
            <img className="book-logo" src={this.state.detail.images} alt="" />
            <div className="book-desc">
              <div className="name">{this.state.detail.bookname}</div>
              <div className="desc">
                <span className="classname">{this.state.detail.sortname}</span>
                <div className="author">{this.state.detail.author}</div>
              </div>
            </div>
          </div>
          <div className="btns">
            <div className="book-btn read-btn">开始阅读</div>
            <div
              className="book-btn"
              onClick={this.addShelf.bind(this, this.state.detail.id)}
            >
              {this.state.bookshelf ? "已加入书架" : "加入书架"}
            </div>
            <div className="book-btn">VIP订阅</div>
          </div>
          <div className="describe">{this.state.detail.description}</div>
        </div>

        <div className="content_column">
          <div className="title">
            <div className="heng"></div>
            <div className="text">评论</div>
          </div>
          {this.state.content.map((item, index) => (
            <div className="pinlist" key={index}>
              <div className="headimg">
                <img src={item.head_portrait} alt=""></img>
              </div>
              <div className="pincon">
                <div className="pinname">{item.nick_name}</div>
                <div className="pindate">
                  {moment(item.createtime).format("YYYY-MM-DD hh:mm:ss")}
                </div>
                <div className="pintext">{item.content}</div>
                <div className={item.likeType ? "like-icon like" : "like-icon"}>
                  <span
                    className="iconfont icon-zan"
                    onClick={this.onLike.bind(this, index, item.comment_id)}
                  ></span>
                  <span className="like-num">{item.like_number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default withRouter(Detail);

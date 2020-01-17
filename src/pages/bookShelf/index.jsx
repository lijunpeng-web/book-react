import React, { Component } from "react";
import { getCollectionBook, deleteCollection } from "@/api/book";
import Header from "@/components/header";
import { Link } from "react-router-dom";
import "./index.scss";
import { Modal } from "antd-mobile";
export default class BookShelf extends Component {
  constructor() {
    super();
    this.state = {
      collectionBook: [],
      edit: false
    };
  }

  componentDidMount() {
    this.getCollection();
  }

  getCollection() {
    getCollectionBook().then(res => {
      console.log(res);
      if (res.code === 0) {
        this.setState({
          collectionBook: res.data
        });
      }
    });
  }
  changeView(e) {
    console.log(e, "-------changeView");
    this.setState({
      edit: e
    });
  }
  deleteBook(id, bookname, e) {
    e.preventDefault();
    Modal.alert("删除", `你确定要从书架中移除${bookname}?`, [
      { text: "取消", onPress: () => {}, style: "default" },
      {
        text: "确定",
        onPress: () => {
          console.log(id);
          this.deleteCollectionBook(id);
        }
      }
    ]);
  }

  deleteCollectionBook(id) {
    let data = {
      id: id
    };
    deleteCollection(data).then(res => {
      this.getCollection();
    });
  }

  render() {
    return (
      <div className="book-stack">
        <Header
          headerName="书架"
          rightIcon={true}
          changeView={this.changeView.bind(this)}
        ></Header>
        <div className="list">
          {this.state.collectionBook.map((item, index) => (
            <Link to={`/detail/${item.id}`} className="list-li" key={index}>
              <div className="book-logo">
                <img src={item.images} alt="" />
                <div
                  className="delete-book"
                  style={{ display: this.state.edit ? "block" : "none" }}
                  onClick={this.deleteBook.bind(this, item.id, item.bookname)}
                >
                  <div className="delete">
                    <span className="iconfont icon-shanchu"></span>
                  </div>
                </div>
              </div>
              <div className="book-name">{item.bookname}</div>
              <div className="author-name">{item.author}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

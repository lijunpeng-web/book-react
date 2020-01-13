import React, { Component } from "react";
import { getCollectionBook } from "@/api/book";
import Header from "@/components/header";
import { Link } from "react-router-dom";
import "./index.scss";
export default class BookShelf extends Component {
  constructor() {
    super();
    this.state = {
      collectionBook: []
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
  render() {
    return (
      <div className="book-stack">
        <Header headerName="书架" rightIcon={true}></Header>
        <div className="list">
          {this.state.collectionBook.map((item, index) => (
            <Link to={`/detail/${item.id}`} className="list-li" key={index}>
              <img src={item.images} alt="" />
              <div className="book-name">{item.bookname}</div>
              <div className="author-name">{item.author}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

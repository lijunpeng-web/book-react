import React, { Component } from "react";
export default class BookList extends Component {
  render() {
    return (
      <section className="book-list">
        <div className="list-header">
          <div className="list-title">
            <div className="list-icon"></div>
            <div className="title">{this.props.listData.title}</div>
          </div>
          <div className="goto">
            <span>更多</span>
          </div>
        </div>
        <div className="list">
          {this.props.listData.list.map((item, index) => (
            <div className="list-li" key={index}>
              <img src={item.images} alt="" />
              <div className="book-name">{item.bookname}</div>
              <div className="author-name">{item.author}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

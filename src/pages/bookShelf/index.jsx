import React, { Component } from "react";
import { getCollectionBook } from "@/api/book";
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
    return <div className="book-stack"></div>;
  }
}

import React, { Component } from "react";
import { getSearch } from "@/api/book";
export default class Search extends Component {
  componentDidMount() {
    let data = {
      title: "我的"
    };
    getSearch(data).then(res => {
      if (res.code === 0) {
        console.log(res);
      }
    });
  }

  render() {
    return <div></div>;
  }
}

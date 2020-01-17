import React, { Component } from "react";
import httpUrl from "url";
import { withRouter } from "react-router-dom";
import Header from "@/components/header";
import { getChapter, getChapterList } from "@/api/book";

class Read extends Component {
  constructor() {
    super();
    this.state = {
      chapterid: "",
      bookid: "",
      title: "",
      chapterContent: ""
    };
  }

  componentDidMount() {
    let query = httpUrl.parse(this.props.location.search, true).query;
    this.setState({
      chapterid: query.chapterid,
      bookid: query.bookid
    });
    let params = {
      chapterid: query.chapterid,
      bookid: query.bookid
    };
    this.getChapterData(params);
    this.getChapterListData(params);
  }
  getChapterData(params) {
    getChapter(params).then(res => {
      if (res.code === 0) {
        console.log(res);
        res.data.content = res.data.content.replace(/\n/g, "<br/>");
        this.setState({
          chapterContent: res.data
        });
      }
    });
  }
  getChapterListData(params) {
    getChapterList(params).then(res => {
      if (res.code === 0) {
        console.log(res);
      }
    });
  }
  render() {
    return (
      <div className="read">
        <Header headerName={this.state.title} rightIcon={false}></Header>
        <div>{this.state.chapterContent.chapter_name}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.chapterContent.content
          }}
        ></div>
      </div>
    );
  }
}
export default withRouter(Read);

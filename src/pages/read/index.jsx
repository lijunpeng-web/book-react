import React, { Component } from "react";
import httpUrl from "url";
import { withRouter } from "react-router-dom";
import Header from "@/components/header";
import { getChapter, getChapterList } from "@/api/book";
import "./index.scss";
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
        let title = res.data.chapter_name;
        if (title.length > 14) {
          title = res.data.chapter_name.slice(0, 14) + "...";
        }
        this.setState({
          chapterContent: res.data,
          title: title
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
        <div className="content">
          <div>{this.state.chapterContent.chapter_name}</div>
          <div
            className="read-conetne"
            dangerouslySetInnerHTML={{
              __html: this.state.chapterContent.content
            }}
          ></div>
        </div>
      </div>
    );
  }
}
export default withRouter(Read);

import React, { Component } from "react";
import httpUrl from "url";
import { withRouter } from "react-router-dom";
import { getChapter, getChapterList } from "@/api/book";
import "./index.scss";
import { setReadSet, getReadSet } from "@/utils/local";
import { Link } from "react-router-dom";
const bgColor = ["#d9bd81", "#ececec", "#c2dfc3", "#debebf"];
class Read extends Component {
  constructor() {
    super();
    this.state = {
      chapterid: "",
      bookid: "",
      title: "",
      chapterContent: {
        title: "",
        content: ""
      },
      open: false,
      chapterList: [],
      readset: false,
      selectColor: "#d9bd81",
      fontSize: 16,
      chartType: false,
      chapterIndex: 0,
      loading: true
    };
  }
  componentDidMount() {
    let read = getReadSet();
    if (read) {
      this.setState({
        fontSize: parseInt(read.fontSize),
        selectColor: read.selectColor
      });
    }
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
    let readDom = document.getElementById("read");
    window.addEventListener("scroll", () => {
      let scrollTop = document.body.scrollTop; //滚动条卷去的高度
      let clientHeight = document.body.clientHeight; //可视区域高度
      let scrollHeight = document.body.scrollHeight; //元素总高度
      if (
        scrollTop + clientHeight + 2 >= scrollHeight &&
        this.state.chapterIndex < this.state.chapterList.length - 1 &&
        !this.state.loading
      ) {
        let index = this.state.chapterIndex + 1;
        let chapter_id = this.state.chapterList[index].chapter_id;
        this.readChart(chapter_id, false);
        this.setState({
          chapterIndex: index,
          loading: true
        });
        this.props.history.push(
          `/read?chapterid=${chapter_id}&bookid=${this.state.bookid}`
        );
      }
    });
  }

  // 获取章节详情
  getChapterData(params) {
    getChapter(params).then(res => {
      if (res.code === 0) {
        let title = res.data.chapter_name;
        if (title.length > 14) {
          title = res.data.chapter_name.slice(0, 14) + "...";
        }
        let chapterContent = this.state.chapterContent;
        chapterContent.content += "<div style='width:100%;height:60px;'></div>";
        chapterContent.content += res.data.content;
        chapterContent.title += res.data.title;
        this.setState({
          chapterContent: chapterContent,
          title: title,
          loading: false
        });
      }
    });
  }
  // 获取目录列表
  getChapterListData(params) {
    getChapterList(params).then(res => {
      if (res.code === 0) {
        let index = 0;
        res.data.forEach((item, i) => {
          if (item.chapter_id === parseInt(this.state.chapterid)) {
            index = i;
          }
        });
        this.setState({
          chapterList: res.data,
          chapterIndex: index
        });
      }
    });
  }
  // 显示目录
  showChaperList() {
    let chartType = !this.state.chartType;
    let readset = this.state.readset;
    if (chartType) {
      readset = false;
    }
    this.setState({
      chartType,
      readset
    });
  }
  // 修改背景颜色
  changeColor(e) {
    if (e === this.state.selectColor) return;
    this.setState({
      selectColor: e
    });
    let params = {
      fontSize: this.state.fontSize,
      selectColor: e
    };
    setReadSet(params);
  }
  // 修改字体大小
  changeSize(e) {
    let fontSize = this.state.fontSize;
    if (e === "+" && fontSize < 20) {
      fontSize++;
    }
    if (e === "-" && fontSize > 14) {
      fontSize--;
    }
    this.setState({
      fontSize
    });
    let params = {
      fontSize: fontSize,
      selectColor: this.state.selectColor
    };
    setReadSet(params);
  }
  // 设置显示
  changeSet() {
    let readset = this.state.readset;
    if (readset) {
      readset = false;
    } else {
      readset = true;
    }
    this.setState({
      readset
    });
  }
  // 隐藏目录
  hideChartList(e) {
    e.preventDefault();
    this.setState({
      chartType: false
    });
  }
  //
  readChart(id, type) {
    if (id === this.state.chapterid) return;
    let params = {
      chapterid: id,
      bookid: this.state.bookid
    };

    this.getChapterData(params);
    let index = 0;
    this.state.chapterList.forEach((item, i) => {
      if (item.chapter_id === id) {
        index = i;
      }
    });

    this.setState({
      chartType: false,
      readset: false,
      chapterid: id,
      chapterIndex: index
    });
    if (type) {
      this.setState({
        chapterContent: { title: "", content: "" }
      });
    }
  }
  render() {
    return (
      <div
        id="read"
        className="read"
        style={{ background: this.state.selectColor }}
      >
        <div className="hide-div" onClick={e => this.changeSet()}></div>
        <div
          className="mask"
          onClick={this.hideChartList.bind(this)}
          style={
            this.state.chartType ? { display: "block" } : { display: "none" }
          }
        ></div>
        <div
          className={
            this.state.chartType ? "chart-list" : "chart-list hide-chart"
          }
          style={{ background: this.state.selectColor }}
        >
          {this.state.chapterList.map((item, index) => (
            <Link
              to={`/read?chapterid=${item.chapter_id}&bookid=${this.state.bookid}`}
              className={
                parseInt(this.state.chapterid) === item.chapter_id
                  ? "li select"
                  : "li"
              }
              key={index}
              onClick={e => this.readChart(item.chapter_id, true)}
            >
              {item.chapter_name}
            </Link>
          ))}
        </div>
        <div
          className={this.state.readset ? "bottom-set" : "bottom-set hide-set"}
        >
          <div className="btns">
            <div className="bigsize" onClick={e => this.showChaperList()}>
              目录
            </div>
          </div>
          <div className="fontsize">
            <div className="bigsize" onClick={e => this.changeSize("+")}>
              A+
            </div>
            <div className="smallsize" onClick={e => this.changeSize("-")}>
              A-
            </div>
          </div>

          <div className="bg-color">
            {bgColor.map((item, index) => (
              <div
                className={
                  item === this.state.selectColor ? "border select" : "border"
                }
                key={index}
              >
                <div
                  className="color-list"
                  style={{ background: item }}
                  onClick={e => this.changeColor(item)}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="content"
          id="content"
          style={{ fontSize: this.state.fontSize + "px" }}
        >
          {/* <div>{this.state.chapterContent.chapter_name}</div> */}
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

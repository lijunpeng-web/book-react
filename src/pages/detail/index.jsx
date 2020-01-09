import React, { Component } from "react";
import "./index.scss";
import { getBookDetail } from "@/api/book";
import { withRouter } from "react-router-dom";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      detail: {},
      content: [],
      show: false
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    let data = {
      id: this.props.match.params.id
    };
    this.getDetail(data);
  }

  getDetail(data) {
    getBookDetail(data).then(res => {
      res.data.detail.category_name = `类别`;
      this.setState({
        detail: res.data.detail,
        content: res.data.content
      });
      console.log(res);
    });
  }

  render() {
    return (
      <section className="detail-page">
        {/* <div className="content_column">
          <div className="title">
            <div className="heng"></div>
            <div className="text">评论</div>
          </div>
          {this.state.content.map((item, index) => (
            <div className="pinlist" key={index}>
              <div className="headimg">
                <img src={item.user_img}></img>
              </div>
              <div className="pincon">
                <div className="pinname">{item.nick_name}</div>
                <div className="pindate">{item.create_date}</div>
                <div className="pintext">{item.content}</div>
              </div>
            </div>
          ))}
        </div> */}
      </section>
    );
  }
}
export default withRouter(Detail);

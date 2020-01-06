import React, { Component } from "react";
import { Carousel, WingBlank } from "antd-mobile";

export default class Swiper extends Component {
  state = {
    imgHeight: 176
  };
  componentDidMount() {}
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          // beforeChange={(from, to) =>
          //   console.log(`slide from ${from} to ${to}`)
          // }
          afterChange={index => console.log("slide to", index)}
        >
          {this.props.indexBanner.map((val, indxe) => (
            <a
              key={indxe}
              href="http://www.alipay.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={val.banner_img}
                alt=""
                style={{ width: "100%", verticalAlign: "top", height: "140px" }}
                onLoad={() => {
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

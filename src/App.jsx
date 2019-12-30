import React, { Component, Fragment } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import routes from "@/router";
import history from "@/config/history";
import "@/styles/App.css";

// import createHistory from "history/createHashHistory";
// import { ActivityIndicator } from "antd-mobile";
// const tabList = [
//   { icon: "iconfont icon-caidaniconshouyehui", name: "首页", url: "/home" },
//   { icon: "iconfont icon-clone", name: "专题", url: "/topic" },
//   { icon: "iconfont icon-sort", name: "分类", url: "/catelog" },
//   { icon: "iconfont icon-cart", name: "购物车", url: "/cart" },
//   { icon: "iconfont icon-mine", name: "我的", url: "/mine" }
// ];

console.log(history);
function RenderRouters({ routes }) {
  return routes.map(item => {
    return (
      <Route
        path={item.link}
        key={item.name}
        render={() => (
          <div className={item.isTab ? "tabPageContent" : "noTabPageContent"}>
            <item.component />
          </div>
        )}
      />
    );
  });
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Fragment>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <RenderRouters routes={routes}></RenderRouters>
          </Fragment>
        </Router>
      </div>
    );
  }
}
export default App;

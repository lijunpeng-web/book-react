import React, { Component, Fragment } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import routes from "@/router";
import history from "@/config/history";
import "@/styles/App.css";
import TabNav from "@/components/tabNav";

// import createHistory from "history/createHashHistory";
// import { ActivityIndicator } from "antd-mobile";
const tabList = [
  { icon: "iconfont icon-shouye", name: "首页", url: "/home" },
  { icon: "iconfont icon-all", name: "书库", url: "/bookstack" },
  { icon: "iconfont icon-shujia", name: "书架", url: "/bookshelf" },
  { icon: "iconfont icon-wode", name: "我的", url: "/me" }
];

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
            <TabNav tabList={tabList}></TabNav>
          </Fragment>
        </Router>
      </div>
    );
  }
}
export default App;

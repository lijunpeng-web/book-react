import React, { Component, Fragment } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import routes from "@/router";
import history from "@/config/history";
import "@/styles/App.css";
import TabNav from "@/components/tabNav";
const tabList = [
  { icon: "iconfont icon-shouye", name: "首页", url: "/home" },
  { icon: "iconfont icon-all", name: "分类", url: "/bookstack" },
  { icon: "iconfont icon-books", name: "书架", url: "/bookshelf" },
  { icon: "iconfont icon-wode", name: "我的", url: "/me" }
];

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

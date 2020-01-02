import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import routes from "../../router";
import { withRouter } from "react-router-dom";

class TabNav extends Component {
  render() {
    const {
      tabList,
      history: {
        location: { pathname }
      }
    } = this.props;
    let showTab = false;
    routes.forEach((item, index) => {
      if (item.link === pathname) {
        showTab = item.isTab;
      }
    });
    return showTab ? (
      <nav className="bottom-nav">
        {tabList.map((item, index) => (
          <Link
            to={item.url}
            className={pathname === item.url ? "nav-link active" : "nav-link"}
            key={index}
          >
            <span className={item.icon}></span>
            <span className="nav-name">{item.name}</span>
          </Link>
        ))}
      </nav>
    ) : null;
  }
}

export default withRouter(TabNav);

import React, { Component } from "react";
import { Popover, NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import "./index.scss";
const Item = Popover.Item;
class Header extends Component {
  state = {
    visible: false,
    selected: "",
    edit: false
  };
  goBack() {
    this.props.history.goBack();
  }
  onSelect = opt => {
    let edit = false;
    if (opt.props.value === "edit") {
      edit = true;
    } else {
      edit = false;
    }
    this.setState({
      visible: false,
      selected: opt.props.value,
      edit
    });
    this.props.changeView(edit);
  };
  handleVisibleChange = visible => {
    this.setState({
      visible
    });
  };

  render() {
    return (
      <header className="header-component">
        <NavBar
          mode="light"
          className="navbar"
          icon={<Icon type="left" />}
          onLeftClick={e => this.goBack()}
          rightContent={
            this.props.rightIcon ? (
              <Popover
                overlayClassName="fortest"
                overlayStyle={{ color: "currentColor" }}
                visible={this.state.visible}
                overlay={[
                  <Item
                    key="0"
                    value="edit"
                    className={this.state.edit ? "hide" : ""}
                  >
                    编辑
                  </Item>,
                  <Item
                    key="1"
                    value="complete"
                    className={this.state.edit ? "" : "hide"}
                  >
                    完成
                  </Item>
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-10, 0]
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
              >
                <div
                  style={{
                    height: "100%",
                    padding: "0 15px",
                    marginRight: "-15px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Icon type="ellipsis" />
                </div>
              </Popover>
            ) : null
          }
        >
          {this.props.headerName}
        </NavBar>
      </header>
    );
  }
}
export default withRouter(Header);

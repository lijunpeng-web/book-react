import React, { Component } from 'react'
import { getToken, getUser, removeToken } from '@/utils/local'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Toast } from 'antd-mobile'

import './index.scss'
class Me extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: {}
    }
  }
  componentDidMount() {
    let token = getToken()
    if (!token) {
      this.props.history.push(`/login`)
      return
    } else {
      let userInfo = getUser()
      this.setState({
        userInfo
      })
      console.log(userInfo)
    }
  }
  logout() {
    removeToken()
    Toast.info('退出成功', 2, null)
    setTimeout(() => {
      this.props.history.push(`/`)
    }, 1000)
  }
  render() {
    return (
      <div className="me">
        <div className="top-bg">
          <img
            className="me-bg"
            src={require('@/assets/images/currency-me-bg.png')}
            alt=""
          />
          <div className="userinfo">
            <div className="head-img">
              <img src={this.state.userInfo.head_portrait} alt="" />
            </div>
            <div className="name">{this.state.userInfo.nickname} </div>
          </div>
        </div>
        <div className="me-con-one ">
          <Link to="" className="nav-list borderbototm">
            <div className="title-left">
              <img
                src={require('@/assets/images/icon-collection.png')}
                alt=""
              />
              <span>推荐</span>
            </div>
            <div className="title-right">
              <img src={require('@/assets/images/icon-arrow.png')} alt="" />
            </div>
          </Link>
          <Link to="" className="nav-list borderbototm">
            <div className="title-left">
              <img src={require('@/assets/images/icon-follow.png')} alt="" />
              <span>书架</span>
            </div>
            <div className="title-right">
              <img src={require('@/assets/images/icon-arrow.png')} alt="" />
            </div>
          </Link>
          <Link to="" className="nav-list">
            <div className="title-left">
              <img src={require('@/assets/images/icon-help.png')} alt="" />
              <span>帮助</span>
            </div>
            <div className="title-right">
              <img src={require('@/assets/images/icon-arrow.png')} alt="" />
            </div>
          </Link>
        </div>
        <Link to="/register?modify=1" className="logout-btn user">
          修改密码
        </Link>
        <div className="logout-btn" onClick={e => this.logout()}>
          退出登陆
        </div>
      </div>
    )
  }
}
export default withRouter(Me)

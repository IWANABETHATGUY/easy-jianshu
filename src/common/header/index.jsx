import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Button,
  NavSearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  HeaderBox,
  AvatorContainer,
  WriteArticle,
} from './style';
import { actionCreater as headerActionCreater } from './store';
import { actionCreater as homeActionCreater } from '../../pages/home/store';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { actionCreater as loginActionCreater } from '../../pages/login/store';
import { connect } from 'react-redux';
import DropList from './components/DropList';
import io from 'socket.io-client';
import { checkLogin, logout } from './utils';
import { HOST } from '../../libs/config';

const styles = theme => ({
  badge: {
    lineHeight: '52px',
    height: '100%',
    '& span': {
      top: '10px',
      right: '-25px',
    },
  },
});
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
    };
  }

  componentDidMount() {
    const { handleCheckLogin, initHomeData, initSocket, updateNotification } = this.props;
    initHomeData();
    // const socket = io.connect(HOST);
    // socket.on('update', data => {
    //   updateNotification();
    // });
    handleCheckLogin();
    // initSocket(socket);
  }
  shouldComponentUpdate(nextProps) {
    const { userInfo } = this.props;
    let beforeLength = userInfo.ucNotification && userInfo.ucNotification.length;
    let afterLength = nextProps.userInfo.ucNotification && nextProps.userInfo.ucNotification.length;
    if (beforeLength < afterLength) {
      if (this.NotificationBlock) {
        this.NotificationBlock.classList.remove('tada');
        setTimeout(() => {
          this.NotificationBlock.classList.add('tada');
        }, 10);
      }
    }
    // console.log(nextProps.userInfo.ucNotification.length === userInfo.ucNotification.length);
    return true;
  }
  handlePersonalCenter = () => {
    this.props.history.push('/user/personalCenter');
  };

  render() {
    const {
      focus,
      list,
      userInfo,
      socketInstance,
      isLogin,
      handleInputFocused,
      handleInputBlur,
      handleLogOut,
      classes,
    } = this.props;
    return (
      <HeaderWrapper>
        <HeaderBox>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/writeArticle">
            {' '}
            <WriteArticle className="write-article">
              <i className="iconfont pen">&#xe6a4;</i>
              写文章
            </WriteArticle>
          </Link>

          {!isLogin ? (
            <Link to="signIn">
              {' '}
              <Button className="register">注册</Button>
            </Link>
          ) : (
            <AvatorContainer>
              <img src={userInfo.avatar} alt="" />
              <i className="iconfont">&#xe6e9;</i>
              <DropList
                listClassName="drop-list"
                itemClassName="drop-list-item"
                listData={[
                  {
                    tag: '个人中心',
                    icon: '&#xe66c;',
                  },
                  {
                    tag: '注销',
                    icon: '&#xef05;',
                  },
                ]}
                actionList={[this.handlePersonalCenter, handleLogOut.bind(this, socketInstance)]}
              />
            </AvatorContainer>
          )}
          {!isLogin && (
            <Link to="/login">
              <NavItem className="right active" to="/login">
                登录
              </NavItem>
            </Link>
          )}
          <Nav>
            {!isLogin ? (
              <Fragment>
                <Link to="/">
                  <NavItem className="left active">首页</NavItem>
                </Link>

                <NavItem className="left download">下载App</NavItem>
              </Fragment>
            ) : (
              <Fragment>
                <NavItem className="left active">
                  <i className="iconfont menu">&#xe711;</i>发现
                </NavItem>
                <NavItem className="left download">
                  <i className="iconfont menu">&#xe748;</i>关注
                </NavItem>
                <NavItem
                  className={[
                    'left',
                    'download',
                    'animated',
                    userInfo.ucNotification && userInfo.ucNotification.length ? 'tada' : '',
                  ].join(' ')}
                  onClick={() => this.props.history.push('/notification')}
                  innerRef={noti => {
                    this.NotificationBlock = noti;
                  }}
                >
                  {userInfo.ucNotification && userInfo.ucNotification.length ? (
                    <Badge badgeContent={userInfo.ucNotification.length} color="secondary" className={classes.badge}>
                      <i className="iconfont menu">&#xe65e;</i>消息
                    </Badge>
                  ) : (
                    <Fragment>
                      <i className="iconfont menu">&#xe65e;</i>消息
                    </Fragment>
                  )}
                </NavItem>
              </Fragment>
            )}

            <NavItem className="right icon">
              <i className="iconfont">&#xe636;</i>
            </NavItem>
            <NavSearchWrapper>
              <NavSearch
                className={focus ? 'focused' : ''}
                onFocus={handleInputFocused.bind(null, list)}
                onBlur={handleInputBlur}
              />

              <i className="iconfont theme">&#xe627;</i>
              {this.getSerachArea()}
            </NavSearchWrapper>
          </Nav>
        </HeaderBox>
      </HeaderWrapper>
    );
  }

  // 事件处理函数
  getSerachArea = () => {
    const { focus, list, mouseIn, page, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;

    return focus || mouseIn ? (
      <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoSwitch onClick={handleChangePage.bind(this, this.spin)}>
            <i
              className="iconfont spin"
              ref={spin => {
                this.spin = spin;
              }}
            >
              &#xe851;
            </i>
            换一批
          </SearchInfoSwitch>
        </SearchInfoTitle>
        <div>
          {list.slice(page * 10, (page + 1) * 10).map(item => (
            <SearchInfoItem key={item}>{item}</SearchInfoItem>
          ))}
        </div>
      </SearchInfo>
    ) : null;
  };
}

const mapStateToProps = state => {
  return {
    focus: state.header.focus,
    list: state.header.list,
    mouseIn: state.header.mouseIn,
    page: state.header.page,
    totalPage: state.header.totalPage,
    isLogin: state.login.isLogin,
    userInfo: state.login.userInfo,
    socketInstance: state.login.socketInstance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleInputFocused(list) {
      if (list.length <= 0) {
        dispatch(headerActionCreater.initSearchList());
      }
      const action = headerActionCreater.changeSearchFoucsed(true);
      dispatch(action);
    },
    handleInputBlur() {
      const action = headerActionCreater.changeSearchFoucsed(false);
      dispatch(action);
    },
    handleMouseEnter() {
      const action = headerActionCreater.changeSearchMouseIn(true);
      dispatch(action);
    },
    handleMouseLeave() {
      const action = headerActionCreater.changeSearchMouseIn(false);
      dispatch(action);
    },
    handleChangePage(spin) {
      const action = headerActionCreater.changeSearchInfoPage();
      spin.classList.add('active');
      setTimeout(() => {
        spin.classList.remove('active');
      }, 200);
      dispatch(action);
    },
    handleCheckLogin(socket) {
      checkLogin(dispatch, socket)();
    },
    handleLogOut(socket) {
      logout(dispatch, socket)();
    },
    initHomeData() {
      dispatch(homeActionCreater.initHomeData());
    },
    initSocket(socket) {
      dispatch(loginActionCreater.initSocket(socket));
    },
    updateNotification() {
      dispatch(loginActionCreater.updateNotification());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withStyles(styles)(Header)));

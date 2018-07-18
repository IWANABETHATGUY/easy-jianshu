import React, { Component } from 'react';
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
  AvatorContainer
} from './style';
import { 
  actionCreater as headerActionCreater
} from './store';
import {
  actionCreater as loginActionCreater
} from '../../pages/login/store'
import { connect } from 'react-redux';
import DropList from './components/DropList';

class Header extends Component {

  componentWillMount() {
    const { handleCheckLogin } = this.props;
    handleCheckLogin();
  }

  render() {
    const { 
      focus,
      list,
      isLogin,
      handleInputFocused,
      handleInputBlur,
      handleLogOut,
      handleChangeLoginPage
    } = this.props;
    // this.props.history !== '/login' ?
    return  (
      <HeaderWrapper>
        <HeaderBox>
          <Link to="/">
            <Logo/>
          </Link>
          <Link to="/writeArticle">
            <Button className="write-article">
              <i className="iconfont pen">&#xe6a4;</i>
              写文章
            </Button>
          </Link>
          
          {
            !isLogin ? (
              <Link to="/login">
                <Button className="register"
                  onClick={() => handleChangeLoginPage(1)}
                >注册</Button>
              </Link>

              
            ) : (
              <AvatorContainer>
                <img 
                  src="http://upload.jianshu.io/users/upload_avatars/4802726/52eb8675-453d-4822-95ef-4e3db9610866?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" 
                  alt=""
                />
                ▽
                <DropList
                  listClassName="drop-list"
                  itemClassName="drop-list-item"
                  listData={['注销']}
                  actionList={[() => handleLogOut()]}
                />
              </AvatorContainer>
            )
          }
          { !isLogin ? (
            <Link to="/login">
              <NavItem 
                className="right active" 
                to="/login"
                onClick={() => handleChangeLoginPage(0)}
              >登录</NavItem>
            </Link>
            ) : null 
          }
          <Nav>
            <Link to="/">
              <NavItem className="left active">首页</NavItem>
            </Link>
            <NavItem className="left download">下载App</NavItem>
            
            <NavItem className="right icon">
              <i className="iconfont">&#xe636;</i>
            </NavItem>
            <NavSearchWrapper>
              <NavSearch className={focus ? 'focused' : ''} onFocus={handleInputFocused.bind(null, list)} onBlur={handleInputBlur} />

              <i className="iconfont theme">&#xe627;</i>
              { this.getSerachArea() }
            </NavSearchWrapper>

          </Nav>
          
        </HeaderBox>

      </HeaderWrapper>)
      // : (
      //   <HeaderWrapper style={{background: '#eee'}}/>
      // )
  }
  // 事件处理函数
  getSerachArea = () => {
    const { 
      focus, 
      list, 
      mouseIn,
      page,
      handleMouseEnter,
      handleMouseLeave,
      handleChangePage,
    } = this.props;

    return focus || mouseIn ? 
    (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={handleChangePage.bind(this, this.spin)}
            >
              <i className="iconfont spin" ref={(spin) => {this.spin = spin}}>&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <div>
            {
              list
                .slice(page * 10, (page + 1) * 10)
                .map(item => <SearchInfoItem key={item}>{item}</SearchInfoItem>)
            }
          </div>
        </SearchInfo>
     
    ) : null;
  }
}


const mapStateTOProps = (state) => {
  return {
    focus: state.header.focus,
    list: state.header.list,
    mouseIn: state.header.mouseIn,
    page: state.header.page,
    totalPage: state.header.totalPage,
    isLogin: state.login.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocused(list) {
      if (list.length <= 0) {
        console.log(headerActionCreater);
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
      }, 200)
      dispatch(action);
    },
    handleCheckLogin() {
      loginActionCreater
      dispatch(loginActionCreater.checkLogin());
    },
    handleLogOut() {
      dispatch(loginActionCreater.logout())
    },
    handleChangeLoginPage(index) {
      dispatch(loginActionCreater.changeLoginPage(index));
    }
  }
}
export default connect(mapStateTOProps, mapDispatchToProps)(withRouter(Header));
import React, { Component, Fragment } from 'react';
import { 
  LoginWrapper,
  LoginBox,
  Input,
  Button,
  TabList,
  TabListItem,
  TabPage,
  TabPageWrapper,
  TabPageBox
} from './style';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import { Redirect } from 'react-router-dom';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageItemList: ['登录', '注册']
    }
  }

  render() {
    const { 
      handleLogin,
      handleSignIn,
      isLogin,
      loginPageIndex,
      handleTabListItemClick
    } = this.props;
    const {
      pageItemList
    } = this.state;
    return isLogin ? <Redirect to="/"/> : (
      <LoginWrapper>
        <LoginBox>
          <TabList>
            {
              pageItemList.map((item, index) => {
                return (
                  <Fragment
                    key={index}
                  >
                    <TabListItem
                      className={ loginPageIndex === index ? 'active' : ''}
                      onClick={() => {handleTabListItemClick(index)}}
                    >
                      {item}
                    </TabListItem>
                    {index !== pageItemList.length - 1 ? <b>·</b> : null}
                  </Fragment>
                )
                
              })
            }
          </TabList>
          <TabPageBox 
            className="box">
            <TabPageWrapper
              style={{transform: `translateX(-${loginPageIndex * 400}px)`}}
            >
              <TabPage>
                <Input placeholder="用户名"
                  innerRef={(username) => this.loginUsername = username}
                  />
                <Input placeholder="密码"
                  innerRef={(password) => this.loginPassword = password}
                  type="password"
                  />
                <Button
                  onClick={() => handleLogin(this.loginUsername, this.loginPassword)}
                >登录</Button>
              </TabPage>
              <TabPage>
                <Input placeholder="用户名"
                  innerRef={(username) => this.signUsername = username}
                />
                <Input placeholder="密码"
                  innerRef={(password) => this.signPassword = password}
                  type="password"
                />
                <Input placeholder="确认密码"
                  innerRef={(confirmPassword) => this.signConfirmPassword = confirmPassword}
                  type="password"
                />
                <Button
                  onClick={() => handleSignIn(this.signUsername, this.signPassword, this.signConfirmPassword)}
                >注册</Button>
              </TabPage>

            </TabPageWrapper>
          </TabPageBox>
          
        </LoginBox>
      </LoginWrapper>
    );

  }

  handleTabListItemClick = (index) => {
    this.setState({
      pageIndex: index
    })
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
  loginPageIndex: state.login.loginPageIndex
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin(usernameEle, passwordEle) {
    dispatch(actionCreater.login(usernameEle.value, passwordEle.value));
  },
  handleSignIn(usernameEle, passwordEle, confirmPasswordEle) {
    const username = usernameEle.value;
    const password = passwordEle.value;
    const confirmPassword = confirmPasswordEle.value;
    if (password === '' || password !== confirmPassword) {
      alert("密码和确认密码需要一致");
      return ;
    }
    dispatch(actionCreater.signIn(username, password, confirmPassword));
  },
  handleTabListItemClick(index) {
    dispatch(actionCreater.changeLoginPage(index));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
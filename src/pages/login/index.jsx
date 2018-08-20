import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { HOST } from '../../libs/config';
import { 
  LoginWrapper,
  LoginBox,
  TabList,
  TabListItem,
  TabPageBox
} from './style';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageItemList: [
        {
          tag: '登录',
          active: true,
          url: '/login'
        }, 
        {
          tag: '注册',
          active: false,
          url: '/signIn'
        },],
      showPassword: false,
      userName: '',
      password: '',
      errorText: ['', ''],
      errorStatus: [false, false],
    }
  }

  handleChange = props => event => {
    this.setState({
      [props]: event.target.value
    });
  }


  render() {
    const { 
      isLogin,
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
                      className={ item.active ? 'active' : ''}
                      onClick={() => {this.handleTabListItemClick(item.url)}}
                    >
                      {item.tag}
                    </TabListItem>
                    {index !== pageItemList.length - 1 ? <b>·</b> : null}
                  </Fragment>
                )
                
              })
            }
          </TabList>
          <TabPageBox 
            className="box">
            <FormControl style={{width:'250px', marginBottom: '10px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-user">用户名</InputLabel>
              <Input
                id="adornment-user"
                error={this.state.errorStatus[0]}
                value={this.state.userName}
                onFocus={this.handleInputFocus}
                onChange={this.handleChange('userName')}
              />
              <FormHelperText className="error" style={{visibility: this.state.errorStatus[0] ? 'visible' : 'hidden'}}>{this.state.errorText[0]}</FormHelperText>
            </FormControl>
            <FormControl style={{width:'250px', marginBottom: '30px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-password">密码</InputLabel>
              <Input
                error={this.state.errorStatus[1]}
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onFocus={this.handleInputFocus}
                onChange={this.handleChange('password')}
                onKeyDown={this.handleLoginKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleToggleShowPassword}
                    >
                    <i className="iconfont" 
                      style={{fontSize: '20px'}} 
                      dangerouslySetInnerHTML={{__html: this.state.showPassword ? '&#xe724;' : '&#xe723;'}}
                    >
                    </i>
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="error" style={{visibility: this.state.errorStatus[1] ? 'visible' : 'hidden'}}>{this.state.errorText[1]}</FormHelperText>
            </FormControl>
            <FormControl style={{width: '200px'}}>
              <Button variant="contained" color="primary" 
                onClick={this.handleClickLogin}
              >
                登录
              </Button>
            </FormControl>
          </TabPageBox>
          
        </LoginBox>
      </LoginWrapper>
    );

    
  }
  handleInputFocus = () => {
    this.changeErrorOptions(['', ''], [false, false]);
  }
  handleClickLogin = () => {
    if (this.validate()) {
      this.handleLogin(this.state.userName, this.state.password)
    }
  }
  handleTabListItemClick = (url) => {
    const { match, history } = this.props;
    if (match.url !== url) {
      history.push(url);
    }
  }
  handleToggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }
  handleLoginKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin(this.state.userName, this.state.password);
    }
  }
  handleLogin = (username, password) => {
    axios.post(`${HOST}/user/login`, {
      username,
      password
    }, {
      withCredentials: true
    })
    .then(res => {
      switch (res.data.msg) {
        case 'success':
          const { handleLoginSuccess, socket } = this.props;
          const userInfo = res.data.data.userInfo;
          handleLoginSuccess(userInfo);
          if (socket) {
            socket.emit('init', {uid: userInfo.userID});
          }
        break;
        case 'failed':
          this.changeErrorOptions(['', `输入密码错误，还剩${5 - res.data.data.time}次机会`], [false, true]);
        break;
        case 'locked':
          this.changeErrorOptions(['', '该账户已经被锁定，请稍后再试'], [false, true]);
        break;
        case 'not exist':
          this.changeErrorOptions(['', '该账户不存在'], [false, true]);
        break;
        default:
        break;
      }
    }) 
  }
  changeErrorOptions = (texts, status) => {
    this.setState({
      errorText: texts,
      errorStatus: status
    })
  }

  validate = () => {
    const {userName, password} = this.state;
    const texts = [];
    const status = [];
    let pass = true;
    if (userName === '') {
      texts[0] = '请输入用户名';
      status[0] = true;
      pass = false;
    }
    if (password === '') {
      texts[1] = '请输入密码';
      status[1] = true;
      pass = false;
    }
    this.changeErrorOptions(texts, status);
    return pass;
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
  socket: state.login.socketInstance
})

const mapDispatchToProps = (dispatch) => ({
  handleLoginSuccess(userInfo) {
    dispatch(actionCreater.changeLoginStatus(true));
    dispatch(actionCreater.changeUserInfo(userInfo));
  },
  handleTabListItemClick(index) {
    dispatch(actionCreater.changeLoginPage(index));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Login)
);
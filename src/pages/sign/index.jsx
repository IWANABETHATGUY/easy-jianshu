import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { HOST } from '../../libs/config';
import { connect } from 'react-redux';
import { actionCreater } from '../login/store';
import { Redirect, withRouter } from 'react-router-dom';
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


class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageItemList: [
        {
          tag: '登录',
          active: false,
          url: '/login'
        }, 
        {
          tag: '注册',
          active: true,
          url: '/signIn'
        },],
      showPassword: false,
      showConfirmPassword: false,
      userName: '',
      password: '',
      confirmPassword: '',
      errorText: ['', '', ''],
      errorStatus: [false, false, false]
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
                onChange={this.handleChange('userName')}
                onFocus={this.handleInputFocus}
              />
              <FormHelperText className="error" style={{visibility: this.state.errorStatus[0] ? 'visible' : 'hidden'}}>{this.state.errorText[0]}</FormHelperText>
              
            </FormControl>
            <FormControl style={{width:'250px', marginBottom: '10px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-password">密码</InputLabel>
              <Input
                id="adornment-password"
                error={this.state.errorStatus[1]}
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                onFocus={this.handleInputFocus}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleToggleShowPassword('showPassword')}
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
            <FormControl style={{width:'250px', marginBottom: '30px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-confirmPassword">确认密码</InputLabel>
              <Input
                id="adornment-confirmPassword"
                error={this.state.errorStatus[2]}
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.confirmPassword}
                onFocus={this.handleInputFocus}
                onChange={this.handleChange('confirmPassword')}
                onKeyDown={this.handleSignInKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleToggleShowPassword('showConfirmPassword')}
                    >
                    <i className="iconfont" 
                      style={{fontSize: '20px'}} 
                      dangerouslySetInnerHTML={{__html: this.state.showConfirmPassword ? '&#xe724;' : '&#xe723;'}}
                    >
                    </i>
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="error" style={{visibility: this.state.errorStatus[2] ? 'visible' : 'hidden'}}>{this.state.errorText[2]}</FormHelperText>

            </FormControl>
            <FormControl style={{width: '200px'}}>
              <Button variant="contained" color="primary" 
                onClick={this.handleClickSignIn}
              >
                注册
              </Button>

            </FormControl>
          </TabPageBox>
          
        </LoginBox>
      </LoginWrapper>
    );

    
  }

  handleSignIn = () => {
    if (this.validate()) {
      const { userName, password } = this.state;
      axios.post(`${HOST}/user/signIn`, {
        username: userName,
        password
      })
      .then(res => {
        switch(res.data.msg) {
          case 'success':
            const { history } = this.props;
            history.push('/login');
          break;
          case 'failed':
            this.changeErrorOptions(
              ['', '', '注册失败'],
              [false, false, true]
            );
          break;
          case 'registered':
            this.changeErrorOptions(
              ['', '', '该账号已经被注册'],
              [false, false, true]
            );
          break;
        }
      }) 
    }
    
  }
  
  handleClickSignIn = () => {
    this.handleSignIn();
  }

  handleInputFocus = () => {
    this.changeErrorOptions(['', '', ''], [false, false, false]);
  }

  handleTabListItemClick = (url) => {
    const { match, history } = this.props;
    if (match.url !== url) {
      history.push(url);
    }
  }
  handleToggleShowPassword = props => () => {
    this.setState({
      [props]: !this.state[props]
    });
  }
  handleSignInKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleSignIn();
    }
  }

  changeErrorOptions = (texts, status) => {
    this.setState({
      errorText: texts,
      errorStatus: status
    })
  }

  validate = () => {
    const { userName, password, confirmPassword } = this.state;
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
    if (confirmPassword !== password) {
      texts[2] = '确认密码和密码不一致';
      status[2] = true;
      pass = false;
    }
    if (confirmPassword === '') {
      texts[2] = '请输入确认密码';
      status[2] = true;
      pass = false;
    }
    this.changeErrorOptions(texts, status);
    return pass;
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
})

export default connect(mapStateToProps, null)(
  withRouter(SignIn)
);
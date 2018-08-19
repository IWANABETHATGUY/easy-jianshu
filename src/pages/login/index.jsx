import React, { Component, Fragment } from 'react';
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
import { connect } from 'react-redux';
import { actionCreater } from './store';
import { Redirect, withRouter } from 'react-router-dom';

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
      password: ''
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
                value={this.state.userName}
                onChange={this.handleChange('userName')}
              />
              
            </FormControl>
            <FormControl style={{width:'250px', marginBottom: '30px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-password">密码</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
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

  handleClickLogin = () => {
    const { handleLogin } = this.props;
    handleLogin(this.state.userName, this.state.password)
  }
  handleTabListItemClick = (url) => {
    const { match, history } = this.props;
    if (match.url !== url) {
      this.props.history.push(url);
    }
  }
  handleToggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }
  handleLoginKeyDown = (e) => {
    const { handleLogin } = this.props;
    if (e.keyCode === 13) {
      handleLogin(this.state.userName, this.state.password)
    }
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
  loginPageIndex: state.login.loginPageIndex
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin(userName, password) {
    dispatch(actionCreater.login(userName, password));
  },
  handleTabListItemClick(index) {
    dispatch(actionCreater.changeLoginPage(index));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Login)
);
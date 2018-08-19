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
import { actionCreater } from '../login/store';
import { Redirect, withRouter } from 'react-router-dom';

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
      confirmPassword: ''
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
            <FormControl style={{width:'250px', marginBottom: '10px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-password">密码</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
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
            </FormControl>
            <FormControl style={{width:'250px', marginBottom: '30px'}}>
              {/* className={classNames(classes.margin, classes.textField)} */}
              <InputLabel htmlFor="adornment-confirmPassword">确认密码</InputLabel>
              <Input
                id="adornment-confirmPassword"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                onKeyDown={this.handleSignKeyDown}
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
            </FormControl>
            <FormControl style={{width: '200px'}}>
              <Button variant="contained" color="primary" 
                onClick={this.handleClickLogin}
              >
                注册
              </Button>
            </FormControl>
          </TabPageBox>
          
        </LoginBox>
      </LoginWrapper>
    );

    
  }

  handleClickLogin = () => {
    const { handleSignIn } = this.props;
    handleSignIn(this.state.userName, this.state.password, this.state.confirmPassword);
  }

  handleTabListItemClick = (url) => {
    const { match, history } = this.props;
    if (match.url !== url) {
      this.props.history.push(url);
    }
  }
  handleToggleShowPassword = props => () => {
    this.setState({
      [props]: !this.state[props]
    });
  }
  handleSignInKeyDown = (e) => {
    const { handleSignIn } = this.props;
    if (e.keyCode === 13) {
      handleSignIn(this.state.userName, this.state.password, this.state.confirmPassword);
    }
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
})

const mapDispatchToProps = (dispatch) => ({
  handleSignIn(userName, password, confirmPassword) {
    dispatch(actionCreater.signIn(userName, password, confirmPassword));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(SignIn)
);
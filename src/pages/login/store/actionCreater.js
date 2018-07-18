import axios from 'axios';
import { HOST } from '../../../libs/config';
import { 
  CHANGE_LOGIN_STATUS,
  CHANGE_LOGIN_PAGE,
  CHANGE_USER_INFO
} from './action';

const changeLoginStatus = (status) => {
  return {
    type: CHANGE_LOGIN_STATUS,
    status
  }
}

const changeUserInfo = (userInfo) => {
  return {
    type: CHANGE_USER_INFO,
    userInfo
  }
}

export const changeLoginPage = (index) => {
  return {
    type: CHANGE_LOGIN_PAGE,
    index
  }
}

export const login = (username, password) => {
  return (dispatch) => {
    axios.post(`${HOST}/user/login`, {
      username,
      password
    }, {
      withCredentials: true
    })
    .then(res => {
      if (res.data.msg === 'success') {
        dispatch(changeLoginStatus(true));
        dispatch(changeUserInfo(res.data.data.userInfo));
      }
    })   
  }
}

export const checkLogin = () => {
  return (dispatch) => {
    axios.get(`${HOST}/user/checkLogin`, {
      withCredentials: true
    })
    .then(res => {
      if (res.data.msg === 'success') {
        dispatch(changeLoginStatus(true));
        dispatch(changeUserInfo(res.data.data.userInfo));
      } else {
        dispatch(changeLoginStatus(false));
      }
    })   
  }
}

export const logout = () => {
  return (dispatch) => {
    axios.get(`${HOST}/user/logout`, {
      withCredentials: true
    })
    .then(res => {
      if (res.data.msg === 'success') {
        dispatch(changeLoginStatus(false));
        dispatch(changeUserInfo({}));
      }
    })
  }
}

export const signIn = (username, password, confirmPassword) => {
  return (dispatch) => {
    axios.post(`${HOST}/user/signIn`, {
      username,
      password
    })
    .then(res => {
      if (res.data.msg === 'success') {
        dispatch(changeLoginPage(0));
      } else {
        alert("some thing wrong , register failed");
      }
    })   
  }
}
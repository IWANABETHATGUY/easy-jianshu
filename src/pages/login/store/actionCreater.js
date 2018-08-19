import axios from 'axios';
import { HOST } from '../../../libs/config';
import { 
  CHANGE_LOGIN_STATUS,
  CHANGE_LOGIN_PAGE,
  CHANGE_USER_INFO
} from './action';

export const changeLoginStatus = (status) => {
  return {
    type: CHANGE_LOGIN_STATUS,
    status
  }
}

export const changeUserInfo = (userInfo) => {
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

import axios from 'axios';
import { HOST } from '../../../libs/config';
import { 
  CHANGE_LOGIN_STATUS,
  CHANGE_LOGIN_PAGE,
  CHANGE_USER_INFO,
  INIT_SOCKET,
  CHANGE_NOTIFICATION
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


export const initSocket = (socket) => {
  return {
    type: INIT_SOCKET,
    socketInstance: socket
  }
}

const changeNotification = (notification) => {
  return {
    type: CHANGE_NOTIFICATION,
    notification
  }
}

export const updateNotification = () => {
  return (dispatch) => {
    axios.get(`${HOST}/user/updateUcNotification`, {
      withCredentials: true
    })
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch(changeNotification(res.data.data.ucNotification));
        }
      })
    
  }
}
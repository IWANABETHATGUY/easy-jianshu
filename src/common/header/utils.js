import axios from 'axios';
import { HOST } from '../../libs/config';
import { actionCreater as loginActionCreater } from '../../pages/login/store';

export const checkLogin = (dispatch, socket) => () => {
  axios
    .get(`${HOST}/user/checkLogin`, {
      withCredentials: true,
    })
    .then(res => {
      if (res.data.msg === 'success') {
        const { userInfo } = res.data.data;
        dispatch(loginActionCreater.changeLoginStatus(true));
        dispatch(loginActionCreater.changeUserInfo(userInfo));
        // socket.emit('init', {uid: userInfo.userID});
      } else {
        dispatch(loginActionCreater.changeLoginStatus(false));
      }
    });
};

export const logout = (dispatch, socket) => () => {
  axios
    .get(`${HOST}/user/logout`, {
      withCredentials: true,
    })
    .then(res => {
      if (res.data.msg === 'success') {
        dispatch(loginActionCreater.changeLoginStatus(false));
        dispatch(loginActionCreater.changeUserInfo({}));
        if (socket) {
          socket.emit('logout');
        }
      }
    });
};

import {
  CHANGE_LOGIN_STATUS, 
  CHANGE_LOGIN_PAGE,
  CHANGE_USER_INFO,
  INIT_SOCKET,
  CHANGE_NOTIFICATION
} from './action';

const defaultState = {
  isLogin: false,
  loginPageIndex: 0,
  userInfo: {
    ucNotification: []
  },
  socketInstance: null
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_LOGIN_STATUS:
      return {
        ...state,
        isLogin: action.status
      }
    case CHANGE_LOGIN_PAGE:
      return {
        ...state,
        loginPageIndex: action.index
      }
    case CHANGE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case INIT_SOCKET:
      return {
        ...state,
        socketInstance: action.socketInstance
      }
    case CHANGE_NOTIFICATION:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ucNotification: action.notification
        }
      }
    default:
      return state;
  }
}

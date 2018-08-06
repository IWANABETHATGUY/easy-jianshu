import {
  CHANGE_LOGIN_STATUS, 
  CHANGE_LOGIN_PAGE,
  CHANGE_USER_INFO
} from './action';

const defaultState = {
  isLogin: false,
  loginPageIndex: 0,
  userInfo: {
    ucNotification: []
  }
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
    default:
      return state;
  }
}

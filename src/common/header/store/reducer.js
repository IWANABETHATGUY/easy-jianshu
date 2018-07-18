import {  
  CHANGE_SEARCH_FOCUSED,
  CHANGE_SEARCH_LIST,
  CHANGE_SEARCH_MOUSEIN,
  CHAGNE_SERCH_INFOPAGE
} from './action';

const defaultState = {
  focus: false,
  mouseIn: false,
  list: [],
  page: 0,
  totalPage: 0
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_SEARCH_FOCUSED:
      return {
        ...state,
        focus: action.status
      }
    case CHANGE_SEARCH_LIST: 
      return {
        ...state,
        list: action.data,
        totalPage: Math.ceil(action.data.length / 10)
      }
    case CHANGE_SEARCH_MOUSEIN:
      return {
        ...state,
        mouseIn: action.status
      }
    case CHAGNE_SERCH_INFOPAGE:
    return {
      ...state,
      page: (state.page + 1) % state.totalPage
    }
    default:
      return state;
  }
}

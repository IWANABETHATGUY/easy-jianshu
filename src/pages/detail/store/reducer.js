import { 
  CHANGE_COMMENT_INPUT_FOCUS_INDEX,
  CHANGE_ARTICLE_ID,
  GET_COMMENT_LIST,
  CHANGE_COMMENT_PAGE
} from './action';

const defaultState = {
  commentIndex: -1,
  articleId: 0,
  commentPage: 1,
  commentList: []
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_COMMENT_INPUT_FOCUS_INDEX:
      return {
        ...state,
        commentIndex: action.index
      }
    case CHANGE_ARTICLE_ID:
      return {
        ...state,
        articleId: action.id
      }
    case GET_COMMENT_LIST:
      return {
        ...state,
        commentList: action.commentList
      }
    case CHANGE_COMMENT_PAGE: {
      return {
        ...state,
        commentPage: action.page
      }
    }
    default:
      return state;
  }
}

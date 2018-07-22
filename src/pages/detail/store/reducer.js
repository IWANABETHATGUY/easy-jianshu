import { 
  CHANGE_COMMENT_INPUT_FOCUS_INDEX,
  CHANGE_ARTICLE_ID,
  GET_COMMENT_LIST,
  CHANGE_COMMENT_PAGE,
  GET_TOTAL_COMMENT,
  CHANGE_ARTICLE,
  CHANGE_IS_FOLLOWED
} from './action';

const defaultState = {
  commentIndex: -1,
  articleId: 0,
  commentPage: 1,
  commentList: [],
  totalComment: 0,
  article: null,
  isFollowed: false
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
    case GET_TOTAL_COMMENT: {
      return {
        ...state,
        totalComment: action.total
      }
    }
    case CHANGE_ARTICLE: {
      return {
        ...state,
        article: action.article
      }
    }
    case CHANGE_IS_FOLLOWED: {
      return {
        ...state,
        isFollowed: action.isFollowed
      }
    }
    default:
      return state;
  }
}

import { 
  CHANGE_HOME_ARTICLE, 
  LOAD_MORE_ARTICLELIST,
  INIT_ARTICLE_LIST 
} from './action';

const defaultState = {
  picList: [], 
  articleList: [],
  recommendList: [],
  writerList:[],
  hasMore: true
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_HOME_ARTICLE:
      return {
        ...state,
        picList: action.picList,
        recommendList: action.recommendList,
        writerList: action.writerList,
        hasMore: true
      }
    case LOAD_MORE_ARTICLELIST:
      return {
        ...state,
        articleList: state.articleList.concat(action.articleList),
        hasMore: action.hasMore
      }
    case INIT_ARTICLE_LIST:
      return {
        ...state,
        articleList: []
      }
    default:
      return state;
  }
}

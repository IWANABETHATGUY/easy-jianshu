import { 
  CHANGE_HOME_ARTICLE, 
  LOAD_MORE_ARTICLELIST 
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
        articleList: action.articleList,
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
    default:
      return state;
  }
}

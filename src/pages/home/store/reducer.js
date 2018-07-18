import { 
  CHANGE_HOME_ARTICLE, 
  LOAD_MORE_ARTICLELIST 
} from './action';

const defaultState = {
  picList: [], 
  articleList: [],
  recommendList: [],
  writerList:[]
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_HOME_ARTICLE:
      return {
        ...state,
        articleList: action.articleList,
        picList: action.picList,
        recommendList: action.recommendList,
        writerList: action.writerList
      }
    case LOAD_MORE_ARTICLELIST:
      return {
        ...state,
        articleList: state.articleList.concat(action.articleList)
      }
    default:
      return state;
  }
}

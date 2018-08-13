import {
  CHANGE_HOME_ARTICLE,
  LOAD_MORE_ARTICLELIST,
  INIT_ARTICLE_LIST
} from './action';
import axios from 'axios';
import { HOST } from '../../../libs/config';


const changeHomeData = (data) => {
  return {
    type: CHANGE_HOME_ARTICLE,
    picList: data.picList,
    recommendList: data.recommendList,
    writerList: data.writerList
  }
}

export const initArticleList = () => {
  return {
    type: INIT_ARTICLE_LIST
  }
}

const loadMoreArticleList = (data, hasMore) => {
  return {
    type: LOAD_MORE_ARTICLELIST,
    articleList: data.articleList,
    hasMore
  }
}

export const loadMoreArticle = (page) => {
  return (dispatch) => {
    axios.get(`${HOST}/article/articleList?page=${page}`)
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch(loadMoreArticleList(res.data.data, true));
        } else {
          dispatch(loadMoreArticleList(res.data.data, false))
        }
        
      })
      .catch(err => {
        console.log(err);
      })
  }
}



export const initHomeData = () => {
  return (dispatch) => {
    axios.get(`${HOST}/user/init`)
      .then(res => {
        dispatch(changeHomeData(res.data.data));
      })
      .catch(err => {
        console.warn(err);
      })
  }
}

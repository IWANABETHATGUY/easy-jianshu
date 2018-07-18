import {
  CHANGE_HOME_ARTICLE,
  LOAD_MORE_ARTICLELIST
} from './action';
import axios from 'axios';
import { HOST } from '../../../libs/config';


const changeHomeData = (data) => {
  return {
    type: CHANGE_HOME_ARTICLE,
    articleList: data.articleList,
    picList: data.picList,
    recommendList: data.recommendList,
    writerList: data.writerList
  }
}

const loadMoreArticleList = (data) => {
  return {
    type: LOAD_MORE_ARTICLELIST,
    articleList: data.articleList
  }
}

export const loadMoreArticle = (page) => {
  return (dispatch) => {
    axios.get(`${HOST}/article/articleList?page=${page}`)
      .then(res => {
        dispatch(loadMoreArticleList(res.data.data));
      })
      .catch(err => {
        console.log(err);
      })
  }
}



export const initHomeData = () => {
  return (dispatch) => {
    axios.get('/api/home.json')
      .then(res => {
        dispatch(changeHomeData(res.data.data));
      })
      .catch(err => {
        console.warn(err);
      })
  }
}

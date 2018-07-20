import axios from 'axios';
import { HOST } from '../../../libs/config';

import {
  CHANGE_COMMENT_INPUT_FOCUS_INDEX,
  CHANGE_ARTICLE_ID,
  GET_COMMENT_LIST,
  CHANGE_COMMENT_PAGE,
  GET_TOTAL_COMMENT,
  CHANGE_ARTICLE
} from './action';

const CommentListAction = (commentList) => {
  return {
    type: GET_COMMENT_LIST,
    commentList
  }
}

const changeArticle = (article) => {
  return {
    type: CHANGE_ARTICLE,
    article
  }
}

export const changeTotalComment = (total) => {
  return {
    type: GET_TOTAL_COMMENT,
    total
  }
}

export const changeInputIndex = (index) => {
  return {
    type: CHANGE_COMMENT_INPUT_FOCUS_INDEX,
    index
  }
}

export const changeArticleId = (id) => {
  return {
    type: CHANGE_ARTICLE_ID,
    id
  }
}

export const changeCommentPage = (page) => {
  return {
    type: CHANGE_COMMENT_PAGE,
    page
  }
}

export const getCommentList = (articleId, page) => {
  return (dispatch) => {
    axios.get(`${HOST}/comment/commentList?page=${page}&id=${articleId}`)
      .then(res => {
        let commentList = res.data.data.commentList;
        if (commentList.length) {
          dispatch(CommentListAction(commentList));
        } else {
          dispatch(CommentListAction([]));
        }
      })
  }
}

export const getTotalComment = (articleId) => {
  return (dispatch) => {
    axios.get(`${HOST}/article/getTotalComment?id=${articleId}`)
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch(changeTotalComment(res.data.data.total));
        }
      })
  }
}

export const getArticle = (articleId) => {
  return (dispatch) => {
    axios.get(`${HOST}/article/getArticle?id=${articleId}`, {
      withCredentials: true
    })
      .then((res) => {
        if (res.data.msg === 'success') {
          let article = res.data.data.article
          dispatch(changeArticle(article));
          dispatch(changeTotalComment(article.comment));
        }
      })
  }
}

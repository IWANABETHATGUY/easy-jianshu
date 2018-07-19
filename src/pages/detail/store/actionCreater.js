import axios from 'axios';
import { HOST } from '../../../libs/config';

import {
  CHANGE_COMMENT_INPUT_FOCUS_INDEX,
  CHANGE_ARTICLE_ID,
  GET_COMMENT_LIST,
  CHANGE_COMMENT_PAGE
} from './action';

const CommentList = (commentList) => {
  return {
    type: GET_COMMENT_LIST,
    commentList
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
          dispatch(CommentList(commentList));
        } else {
          dispatch(CommentList([]));
        }
      })
  }
}




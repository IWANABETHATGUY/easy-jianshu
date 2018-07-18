import axios from 'axios';
import {
  CHANGE_SEARCH_MOUSEIN,
  CHANGE_SEARCH_FOCUSED,
  CHAGNE_SERCH_INFOPAGE,
  CHANGE_SEARCH_LIST
} from './action';

export const changeSearchMouseIn = (status) => {
  return {
    type: CHANGE_SEARCH_MOUSEIN,
    status
  }
}

export const changeSearchFoucsed = (status) => {
  return {
    type: CHANGE_SEARCH_FOCUSED,
    status
  }
}

export const changeSearchInfoPage = () => {
  return {
    type: CHAGNE_SERCH_INFOPAGE
  }
}

const changeHeaderSearchList = (data) => {
  return {
    type: CHANGE_SEARCH_LIST,
    data
  }
}

export const initSearchList = () => {
  return (dispatch) => {
    axios.get('/api/searchInfoList.json')
      .then(res => {
        dispatch(changeHeaderSearchList(res.data.data));
      })
      .catch(err => {
        console.log(err);
      })
  }
}
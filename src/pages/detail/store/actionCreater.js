import {
  CHANGE_COMMENT_INPUT_FOCUS_INDEX
} from './action';


export const changeInputIndex = (index) => {
  return {
    type: CHANGE_COMMENT_INPUT_FOCUS_INDEX,
    index
  }
}




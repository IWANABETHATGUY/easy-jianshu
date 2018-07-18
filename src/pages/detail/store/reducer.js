import { 
  CHANGE_COMMENT_INPUT_FOCUS_INDEX
} from './action';

const defaultState = {
  commentIndex: -1
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_COMMENT_INPUT_FOCUS_INDEX:
      return {
        ...state,
        commentIndex: action.index
      }
    default:
      return state;
  }
}

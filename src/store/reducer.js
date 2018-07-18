import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as headerReducer} from '../common/header/store';
import { reducer as writeReducer } from '../pages/WriteArticle/store';
import { reducer as detailReducer } from '../pages/detail/store';
const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  login: loginReducer,
  write: writeReducer,
  detail: detailReducer
})

export default reducer;
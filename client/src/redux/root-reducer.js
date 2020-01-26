import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import questionReducer from './question/question.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer
});

export default persistReducer(persistConfig, rootReducer) ;
import { combineReducers } from 'redux';
import user from './user';
import { UserData } from '../actions';
// import wallet from './wallet';

const rootReducer = combineReducers({
  user: UserData,
  // wallet,
});

export default rootReducer;

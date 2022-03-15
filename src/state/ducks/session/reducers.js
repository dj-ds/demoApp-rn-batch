import * as types from './types';

import {combineReducers} from 'redux';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  login: loginReducer,
});

export default reducer;

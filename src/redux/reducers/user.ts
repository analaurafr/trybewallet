// Esse reducer será responsável por tratar as informações da pessoa usuária

import { AnyAction } from 'redux';
import { UserReducer } from '../../types';
import { SUBMIT_USER_DATA } from '../actions';

const INITIAL_STATE: UserReducer = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SUBMIT_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default user;

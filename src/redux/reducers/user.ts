// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (
  state = INITIAL_STATE,
  action: { type: string, payload: { email: string } },
) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária

import { AnyAction } from 'redux';
import { User } from '../../services/types';
import { LOGIN } from '../actions';

// Estado inicial do usuário
const INITIAL_STATE: User = {
  email: '', // E-mail do usuário
  password: '', // Senha do usuário
};

// Reducer do usuário
const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    // Ação para realizar o login
    case LOGIN:
      // Atualiza o estado do usuário com os dados do login
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default user;

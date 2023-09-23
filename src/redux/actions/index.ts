// Coloque aqui suas actions
import { UserReducer } from '../../types';

export const SUBMIT_USER_DATA = 'SUBMIT_USER_DATA';

export const submitUserData = (user: UserReducer) => ({
  type: SUBMIT_USER_DATA,
  payload: user,
});

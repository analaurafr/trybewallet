// Coloque aqui suas actions

export const USER_DATA = 'USER_DATA';

export const UserData = (email: string) => ({
  type: USER_DATA,
  payload: {
    email,
  },
});

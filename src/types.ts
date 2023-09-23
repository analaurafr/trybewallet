import React from 'react';

export type UserType = {
  type: string;
  payload: any;
};

export type GlobalState = {
  user: {
    email: string, // armazena o e-mail
  }
};

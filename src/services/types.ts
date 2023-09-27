import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type User = {
  email: string,
  password: string,
};

export type Wallet = {
  currencies: string[]; // array de strings
  expenses: Expenses[]; // array de despesas
  editor: boolean;
  idToEdit: number;
};

export type GlobalState = {
  user: User;
  wallet: Wallet;
};

export type Expenses = {
  id: number,
  value:string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: CurrencyKeys;
};

export type CurrencyKeys = {
  [key: string]: {
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };
};

export type Currencies = object;

export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;

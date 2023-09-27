import { Dispatch } from 'redux';
import { APIfetch } from '../../services/requestAPI';
import { User, Currencies, Expenses } from '../../services/types';

// Defina as constantes das ações
export const LOGIN = 'LOGIN';
export const REQ_CURR_SUCCESS = 'REQ_CURR_SUCCESS';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DLT = 'DLT';
export const EDIT = 'EDIT';
export const UPDATE = 'UPDATE';

// Ação para realizar o login
export const login = (userData: User) => ({
  type: LOGIN,
  payload: userData,
});

// Ação para adicionar moedas no estado global
export const reqCurrSuccess = (currencies: Currencies) => ({
  type: REQ_CURR_SUCCESS,
  payload: currencies,
});

// Ação para buscar e definir as moedas disponíveis
export const fetchCurrencies = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const data = await APIfetch();
      // Filtra as moedas e remove 'USDT'
      const dataCurrencies = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(reqCurrSuccess(dataCurrencies));
    } catch (error) {
      // Trate erros aqui (por exemplo, dispare uma ação de erro)
      console.error('Erro ao buscar moedas:', error);
    }
  };
};

// Ação para adicionar uma despesa no estado global
export const addExpense = (expense: Expenses) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

// Ação para buscar a taxa de câmbio de uma moeda
export const fetchExchangeRateForCurrency = async (currency: string) => {
  try {
    const currencyExchange = await APIfetch();
    return currencyExchange[currency]?.ask || 1;
  } catch (error) {
    // Trate erros aqui (por exemplo, dispare uma ação de erro)
    console.error('Erro ao buscar taxa de câmbio para', currency, ':', error);
    return 1; // Retorne um valor padrão em caso de erro
  }
};

// Ação para excluir uma despesa
export const dlt = (id: number) => ({
  type: DLT,
  payload: id,
});

// Ação para iniciar a edição de uma despesa
export const edit = (id: number) => ({
  type: EDIT,
  payload: id,
});

// Ação para atualizar uma despesa editada
export const update = (editedExpense: Expenses) => ({
  type: UPDATE,
  payload: editedExpense,
});

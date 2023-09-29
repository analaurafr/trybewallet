import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as actions from '../redux/actions';
import Header from '../components/Header';

const valor = 'value-input';
const descricao = 'description-input';
const moeda = 'currency-input';
const metodo = 'method-input';
const string = 'Alimentação';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockData,
  } as Response);
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Header', () => {
  test('Teste email', () => {
    renderWithRouterAndRedux(<Header />);
    screen.getByTestId('email-field');
  });

  test('Verifique funções', () => {
    renderWithRouterAndRedux(<Header />);
    expect(typeof Header).toBe('function');
  });

  test('Verifique se o total é renderizado corretamente na tela', () => {
    renderWithRouterAndRedux(<Header />);
    screen.getByTestId('total-field');
  });
});

describe('API', () => {
  test('Verifica se a API é chamada', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const walletAPI = 'https://economia.awesomeapi.com.br/json/all';
    const expenseButton = await screen.findByRole('button');
    await userEvent.click(expenseButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(walletAPI);
  });
});

describe('Verifica input', () => {
  test('Verifica input "Valor da despesa:"', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const expenseValueInput = screen.getByText(/valor da despesa:/i);
    expect(expenseValueInput).toBeInTheDocument();
  });
});

describe('WalletForm', () => {
  test('Verifica título "WalletForm"', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const title = screen.getByRole('heading', { name: /WalletForm/i });
    expect(title).toBeInTheDocument();
  });
});

describe('login', () => {
  test('Verifica a rota /carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(emailInput, 'test@trybe.com');
    await userEvent.type(passwordInput, 'trybe6');
    await userEvent.click(enterButton);

    expect(screen.getByText(/test@trybe.com/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: /moeda:/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});

describe('Table', () => {
  test('Verifica componente Table', () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionCell = screen.getByRole('columnheader', { name: /descrição/i });
    expect(descriptionCell).toBeInTheDocument();
    const rateCell = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    expect(rateCell).toBeInTheDocument();
  });
});

describe('Adicionar uma despesa', () => {
  test('Verifica se adiciona após click', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseIpt = screen.getByTestId(valor);
    const descriptionIpt = screen.getByTestId(descricao);
    const selectCurrency = screen.getByTestId(moeda);
    const selectMethod = screen.getByTestId(metodo);
    const selectTag = screen.getByTestId('tag-input');
    const expenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(expenseIpt, '200');
    await userEvent.type(descriptionIpt, 'lanche');
    await userEvent.selectOptions(selectTag, string);
    await userEvent.selectOptions(selectCurrency, 'USD');
    await userEvent.selectOptions(selectMethod, 'Dinheiro');
    await userEvent.click(expenseButton);
    screen.debug();
    expect(await screen.findByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
  });
});

describe('Função handleDeleteExpense', () => {
  test('Verifica se função handleDeleteExpense atualiza o estado', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseIpt = screen.getByTestId(valor);
    const descriptionIpt = screen.getByTestId(descricao);
    const selectCurrency = screen.getByTestId(moeda);
    const selectMethod = screen.getByTestId(metodo);
    const selectTag = screen.getByTestId('tag-input');
    const expenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(expenseIpt, '200');
    await userEvent.type(descriptionIpt, 'lanche');
    await userEvent.selectOptions(selectTag, string);
    await userEvent.selectOptions(selectCurrency, 'USD');
    await userEvent.selectOptions(selectMethod, 'Dinheiro');
    await userEvent.click(expenseButton);
    await userEvent.click(screen.getByRole('button', { name: /excluir/i }));
    await userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
  });
});

describe('Table', () => {
  test('Verifica botão Editar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseIpt = screen.getByTestId(valor);
    const descriptionIpt = screen.getByTestId(descricao);
    const selectCurrency = screen.getByTestId(moeda);
    const selectMethod = screen.getByTestId(metodo);
    const selectTag = screen.getByTestId('tag-input');
    const expenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(expenseIpt, '200');
    await userEvent.type(descriptionIpt, 'lanche');
    await userEvent.selectOptions(selectTag, 'Alimentação');
    await userEvent.selectOptions(selectCurrency, 'USD');
    await userEvent.selectOptions(selectMethod, 'Dinheiro');
    await userEvent.click(expenseBtn);
    await userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));
  });
});

describe('Verifica o componente', () => {
  test('Moeda ou "N/A"', async () => {
    renderWithRouterAndRedux(<Wallet />);
  });
});

describe('reqCurrSuccess action', () => {
  test('Teste para a action de adicionar moedas', () => {
    const currencies = ['USD', 'EUR', 'GBP'];
    const expectedAction = {
      type: actions.REQ_CURR_SUCCESS,
      payload: currencies,
    };
    expect(actions.reqCurrSuccess(currencies)).toEqual(expectedAction);
  });
});

describe('dlt action', () => {
  test('Teste para a action de excluir despesas', () => {
    const id = 1;
    const expectedAction = {
      type: actions.DLT,
      payload: id,
    };
    expect(actions.dlt(id)).toEqual(expectedAction);
  });
});

describe('edit action', () => {
  test('Teste para a action de iniciar a edição de uma despesa', () => {
    const id = 1;
    const expectedAction = {
      type: actions.EDIT,
      payload: id,
    };
    expect(actions.edit(id)).toEqual(expectedAction);
  });
});

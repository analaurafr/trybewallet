import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tela de Login', () => {
  const email = 'email-input';
  const password = 'password-input';
  const emailTest = 'alguem@alguem.com';
  const passwordTest = '123456';

  it('Verifique se os campos de email e senha aparecem corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const campoEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
  });

  it('Verifica se existe um botão para o login', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getAllByRole('button');
    expect(button).toHaveLength(1);
  });

  it('Verifica se o botão Entrar está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('Verifica se o botão Entrar será habilitado', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);

    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveProperty('disabled', false);
  });
});

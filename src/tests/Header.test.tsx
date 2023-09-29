import { screen } from '@testing-library/dom';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Header', () => {
  it('Verifique se o email é renderizado corretamente na tela', () => {
    renderWithRouterAndRedux(<Header />);
    screen.getByTestId('email-field');
  });

  it('Verifique funções', () => {
    renderWithRouterAndRedux(<Header />);
    expect(typeof Header).toBe('function');
  });

  it('Verifique se o total é renderizado corretamente na tela', () => {
    renderWithRouterAndRedux(<Header />);
    screen.getByTestId('total-field');
  });
});

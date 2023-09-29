import LoginPage from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login', () => {
  it('Verifique funções', () => {
    renderWithRouterAndRedux(<LoginPage />);
    expect(typeof LoginPage).toBe('function');
  });
});

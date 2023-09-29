import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Wallet', () => {
  it('Verifique funções', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(typeof Wallet).toBe('function');
  });
});

import { fireEvent, screen } from '@testing-library/react';
import WalletForm from '../components/WalletForm';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tabela de gastos', () => {
  it('Verifique se o nome aparece corretamente', () => {
    renderWithRouterAndRedux(<WalletForm />);
    screen.getByRole('heading', {
      name: /walletform/i,
    });
  });

  it('deve permitir a interação com os campos do formulário', () => {
    const { getByTestId } = renderWithRedux(<WalletForm />);

    // Simule a interação com os campos do formulário
    fireEvent.change(getByTestId('value-input'), { target: { value: '100' } });
    fireEvent.change(getByTestId('description-input'), { target: { value: 'Teste de descrição' } });
    fireEvent.change(getByTestId('method-input'), { target: { value: 'Cartão de crédito' } });
    fireEvent.change(getByTestId('tag-input'), { target: { value: 'Lazer' } });

    // Verifique se os valores dos campos foram atualizados corretamente
    expect(getByTestId('value-input')).toHaveValue('100');
    expect(getByTestId('description-input')).toHaveValue('Teste de descrição');
    expect(getByTestId('method-input')).toHaveValue('Cartão de crédito');
    expect(getByTestId('tag-input')).toHaveValue('Lazer');
  });
});

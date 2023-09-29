import { fireEvent, getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tabela de gastos', () => {
  it('Verifique se os campos aparecem corretamente', () => {
    renderWithRouterAndRedux(<Table />);
    const cmpDescricao = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
  });
});

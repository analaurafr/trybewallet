import { useDispatch, useSelector } from 'react-redux';
import { dlt, edit } from '../redux/actions';
import { Expenses, GlobalState } from '../services/types';

function Table() {
  const dispatch = useDispatch();

  // Função para lidar com a exclusão de uma despesa
  const handleDeleteExpense = (expenseId: number) => {
    dispatch(dlt(expenseId)); // Chama a ação de exclusão com o ID da despesa
  };

  // Função para lidar com a edição de uma despesa
  const handleEditExpense = (expenseId: number) => {
    dispatch(edit(expenseId)); // Chama a ação de edição com o ID da despesa
  };

  // Obtém a lista de despesas do estado global
  const expenses = useSelector((state: GlobalState) => state.wallet.expenses);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: Expenses) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{parseFloat(expense.value).toFixed(2)}</td>
            <td>
              {expense.exchangeRates[expense.currency]?.name || 'N/A'}
            </td>
            <td>
              {parseFloat(expense.exchangeRates[expense.currency]
                .ask || '0.00').toFixed(2)}
            </td>
            <td>
              {(parseFloat(expense.value)
                * parseFloat(expense.exchangeRates[expense.currency]?.ask || '0.00'))
                .toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              {/* Botão para excluir a despesa */}
              <button
                data-testid="delete-btn"
                onClick={ () => handleDeleteExpense(expense.id) }
              >
                Excluir
              </button>
              {/* Botão para editar a despesa */}
              <button
                data-testid="edit-btn"
                onClick={ () => handleEditExpense(expense.id) }
              >
                Editar despesa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

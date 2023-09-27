import { AnyAction } from 'redux';
import { Expenses } from '../../services/types';
import { REQ_CURR_SUCCESS, ADD_EXPENSE, DLT, EDIT, UPDATE } from '../actions';

// Estado inicial da carteira
const INITIAL_STATE = {
  currencies: [], // Lista de moedas
  expenses: [], // Lista de despesas
  editor: false, // Indica se está em modo de edição
  idToEdit: 0, // ID da despesa em edição
};

// Reducer da carteira
const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQ_CURR_SUCCESS: { // Ação para atualizar a lista de moedas
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case ADD_EXPENSE: { // Ação para adicionar uma nova despesa
      const newId = state.expenses.length; // Gere um novo ID incremental
      const newExpense = { ...action.payload, id: newId }; // Crie uma nova despesa com o novo ID
      const update = [...state.expenses, newExpense]; // Atualize a lista de despesas com a nova despesa
      return {
        ...state,
        expenses: update,
      };
    }
    case DLT: { // Ação para excluir uma despesa
      const idToDelete = action.payload;
      const update = state.expenses.filter(// Filtra a lista de despesas para remover a despesa com o ID correspondente
        (expense: Expenses) => expense.id !== idToDelete,
      );
      return {
        ...state,
        expenses: update,
      };
    }
    case EDIT: { // Ação para iniciar a edição de uma despesa
      const edit = action.payload;
      return {
        ...state,
        editor: true, // Ativa o modo de edição
        idToEdit: edit, // Define o ID da despesa em edição
      };
    }
    case UPDATE: { // Ação para atualizar uma despesa editada
      const { payload } = action;
      return {
        ...state,
        expenses: state.expenses.map((expense: Expenses) => {
          if (expense.id === state.idToEdit) {
            return { ...expense, ...payload }; // Atualize a despesa com os novos dados
          }
          return expense;
        }),
        editor: false, // Desativa o modo de edição
        idToEdit: 0, // Redefine o ID da despesa em edição
      };
    }
    default: return state;
  }
};

export default wallet;

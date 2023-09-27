import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchCurrencies, update } from '../redux/actions';
import { APIfetch } from '../services/requestAPI';
import { GlobalState, Expenses } from '../services/types';

function WalletForm() {
  const dispatch: Dispatch<any> = useDispatch();

  // Estados para guardar os valores dos campos do formulário
  const [expenseValue, setExpenseValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  // Estados para guardar as opções de moeda e obter as opções do estado global
  const [currenciesOptions, setCurrenciesOptions] = useState<string[]>([]);
  const currencies = useSelector((state: GlobalState) => state.wallet.currencies);

  // Estados do editor e ID para edição
  const editor = useSelector((state: GlobalState) => state.wallet.editor);
  const idToEdit = useSelector((state: GlobalState) => state.wallet.idToEdit);
  const expenses = useSelector((state: GlobalState) => state.wallet.expenses);

  // Função para atualizar uma despesa existente
  const handleUpdate = async () => {
    const exchangeRate = await APIfetch();

    const updatedExpenseDetails = {
      id: idToEdit,
      value: expenseValue,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRate,
    };

    dispatch(update(updatedExpenseDetails)); // Chama a ação de atualização
  };

  // Efeito para preencher os campos com os valores da despesa a ser editada
  useEffect(() => {
    if (editor === true) {
      const expenseToEdit = expenses.find((expense: Expenses) => expense.id === idToEdit);
      if (expenseToEdit) {
        setExpenseValue(expenseToEdit.value);
        setDescription(expenseToEdit.description);
        setCurrency(expenseToEdit.currency);
        setMethod(expenseToEdit.method);
        setTag(expenseToEdit.tag);
      }
    }
  }, [editor, idToEdit, expenses]);

  // Efeito para buscar as moedas disponíveis ao carregar o componente
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  // Efeito para atualizar as opções de moeda
  useEffect(() => {
    setCurrenciesOptions(currencies);
  }, [currencies]);

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exchangeRate = await APIfetch();
    const expenseData = {
      id: 0, // Defina o ID conforme sua lógica
      value: expenseValue,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRate,
    };

    dispatch(addExpense(expenseData)); // Chama a ação para adicionar a despesa

    // Limpa os campos do formulário após a adição da despesa
    setExpenseValue('');
    setDescription('');
    setCurrency('USD');
    setMethod('Dinheiro');
    setTag('Alimentação');
  };

  return (
    <>
      <h3>WalletForm</h3>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="value-input">Valor da despesa:</label>
          <input
            type="text"
            name="expensevalue"
            value={ expenseValue }
            data-testid="value-input"
            onChange={ (e) => setExpenseValue(e.target.value) }
            required
          />
          <label htmlFor="description-input">Descrição da despesa:</label>
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ (e) => setDescription(e.target.value) }
            required
          />
          <label>
            Moeda:
            <select
              value={ currency }
              data-testid="currency-input"
              onChange={ (e) => setCurrency(e.target.value) }
            >
              {currenciesOptions.map((option) => (
                <option key={ option } value={ option }>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">Método de pagamento:</label>
          <select
            value={ method }
            data-testid="method-input"
            onChange={ (e) => setMethod(e.target.value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <label htmlFor="tag">Categoria da despesa:</label>
          <select
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ (e) => setTag(e.target.value) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          {/* Botão para adicionar ou editar a despesa */}
          { !editor ? (
            <button type="submit">Adicionar Despesa</button>
          ) : (
            <button type="button" onClick={ handleUpdate }>Editar Despesa</button>
          )}
        </div>
      </form>
    </>
  );
}

export default WalletForm;

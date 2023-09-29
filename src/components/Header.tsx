import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Currencies, Expenses, GlobalState } from '../services/types';

function Header() {
  // Obtenha o e-mail do estado global
  const userEmail = useSelector((state: GlobalState) => state.user.email);

  // Obtenha as despesas e moedas do estado global
  const expenses: Expenses[] = useSelector((state: GlobalState) => state.wallet.expenses);
  const currencies: Currencies = useSelector(
    (state: GlobalState) => state.wallet.currencies,
  );

  // Calcule o total das despesas
  const totalExp = (expensesData: Expenses[]) => {
    const total = expensesData.reduce((acc, { value, currency, exchangeRates }) => {
      const exchangeRateCurrency = parseFloat(exchangeRates[currency]?.ask || '1');
      return acc + parseFloat(value) * exchangeRateCurrency;
    }, 0);
    return total.toFixed(2);
  };

  // Estado para armazenar o total das despesas formatado
  const [totalExpense, setTotalExpense] = useState(totalExp(expenses));

  // Atualize o total das despesas quando as despesas mudarem
  useEffect(() => {
    const totalConverted = totalExp(expenses);
    setTotalExpense(totalConverted);
  }, [expenses]);

  // Formate o total para exibição
  const totalDisplay = `${totalExpense}`;

  return (
    <header>
      {/* Exiba o e-mail com o atributo data-testid */}
      <div data-testid="email-field">{userEmail}</div>

      {/* Exiba o total das despesas com o atributo data-testid */}
      <div data-testid="total-field">{totalDisplay}</div>

      {/* Exiba a moeda atual com o atributo data-testid */}
      <div data-testid="header-currency-field">BRL</div>
    </header>
  );
}

export default Header;

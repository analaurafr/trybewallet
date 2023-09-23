import { useSelector } from 'react-redux';
import { UserReducer } from '../types';

type UserData = {
  user: UserReducer;
};

function Header() {
  const data = useSelector((globalState: UserData) => ({
    ...globalState.user,
  }));

  const { email } = data;

  return (
    <header>
      {/* Elemento para exibir o email da pessoa usuária */}
      <div data-testid="email-field">
        Email:
        {' '}
        { email }
      </div>

      {/* Elemento para a despesa total (inicialmente 0) */}
      <div data-testid="total-field">Despesa Total: 0</div>

      {/* Elemento para mostrar o câmbio (BRL) */}
      <div data-testid="header-currency-field">Câmbio: BRL</div>
    </header>
  );
}

export default Header;

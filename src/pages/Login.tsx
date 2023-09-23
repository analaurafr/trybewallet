import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserData } from '../redux/actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export type DataTypes = {
  email: string,
  password: string,
};

function Login() {
  const [formData, setFormData] = useState<DataTypes>(INITIAL_STATE);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Função para verificar se os dados são válidos
  const validData = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailValid = emailRegex.test(formData.email);
    const passwordValid = formData.password.length >= 6;
    return emailValid && passwordValid;
  };

  const isValidData = validData();

  const { email } = formData;

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(UserData(email));
        navigate('/carteira');
      } }
    >
      <input
        type="text"
        data-testid="email-input"
        placeholder="Digite seu email"
        name="email"
        value={ formData.email }
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        name="password"
        value={ formData.password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        disabled={ !isValidData }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;

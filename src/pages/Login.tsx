import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitUserData } from '../redux/actions';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setForm({ ...form, [targetName]: value });
  };

  // Função para verificar se os dados são válidos
  const validData = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailValid = emailRegex.test(form.email);
    const passwordValid = form.password.length >= 6;
    return emailValid && passwordValid;
  };

  const isValidData = validData();

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(submitUserData(form));
        navigate('/carteira');
      } }
    >
      <input
        type="email"
        data-testid="email-input"
        placeholder="Digite seu email"
        name="email"
        value={ form.email }
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        name="password"
        value={ form.password }
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

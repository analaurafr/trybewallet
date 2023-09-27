import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const EmailValid = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const PasswordValid = () => {
    return password.length >= 6;
  };

  const FormValid = EmailValid() && PasswordValid();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (FormValid) {
      dispatch(login(formData));
      navigate('/carteira');
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        data-testid="email-input"
        placeholder="Digite seu email"
        name="email"
        value={ email }
        onChange={ handleChange }
      />
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        name="password"
        value={ password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        disabled={ !FormValid }
      >
        Entrar
      </button>
    </form>
  );
}

export default LoginPage;

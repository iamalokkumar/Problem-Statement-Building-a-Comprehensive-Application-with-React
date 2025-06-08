import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialForm = { email: '', password: '' };
function formReducer(state, action) {
  return { ...state, [action.name]: action.value };
}

const Login = () => {
  const [formState, dispatchForm] = useReducer(formReducer, initialForm);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN', payload: 'fake-jwt-token' });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={(e) => dispatchForm(e.target)} placeholder="Email" />
      <input name="password" type="password" onChange={(e) => dispatchForm(e.target)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
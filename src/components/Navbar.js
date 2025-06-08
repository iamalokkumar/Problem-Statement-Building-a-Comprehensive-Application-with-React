import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: themeState, dispatch: themeDispatch } = useTheme();

  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/dashboard">Dashboard</Link>
      {authState.isAuth && <button onClick={() => authDispatch({ type: 'LOGOUT' })}>Logout</button>}
      <button onClick={() => themeDispatch({ type: 'TOGGLE' })}>
        Theme: {themeState.theme}
      </button>
    </nav>
  );
};

export default Navbar;
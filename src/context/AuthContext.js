import React, { createContext, useReducer, useContext } from 'react';
const AuthContext = createContext();

const initialState = {
  isAuth: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') || null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload);
      return { ...state, isAuth: true, token: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, isAuth: false, token: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
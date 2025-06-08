import React, { createContext, useReducer, useContext, useEffect } from 'react';
const ThemeContext = createContext();

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    default:
      return state;
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
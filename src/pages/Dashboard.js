import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const initialState = {
  search: '',
  results: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH': return { ...state, search: action.payload };
    case 'SET_RESULTS': return { ...state, results: action.payload, loading: false };
    case 'LOADING': return { ...state, loading: true };
    case 'ERROR': return { ...state, loading: false, error: action.payload };
    default: return state;
  }
}


const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCountries = debounce(async (query) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await axios.get('https://api.first.org/data/v1/countries');
      const filtered = Object.values(res.data.data).filter((item) =>
        item.country.toLowerCase().includes(query.toLowerCase())
      );
      dispatch({ type: 'SET_RESULTS', payload: filtered });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: 'Failed to fetch' });
    }
  }, 500);

  useEffect(() => {
    if (state.search) fetchCountries(state.search);
  }, [state.search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
      />
      {state.loading && <p>Loading...</p>}
      {state.error && <p>{state.error}</p>}
      <ul>
        {state.results.map((item, idx) => (
          <li key={idx}>{item.country}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
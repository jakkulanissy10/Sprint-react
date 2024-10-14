import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';import ProtectedRoute from './ProtectedRoute';
import Portfolio from './components/Portfolio';

import { ThemeContext, themes } from './components/ThemeContext';

// Reducer for authentication
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const App = () => {
  const [authState, dispatch] = useReducer(authReducer, { isAuthenticated: false, user: null });
  const [theme, setTheme] = useState(themes.light);

  // Effect to check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(loggedInUser) });
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Switch>
          <Route path="/login">
            {authState.isAuthenticated ? <Redirect to="/portfolio" /> : <Login dispatch={dispatch} />}
          </Route>
          <Route path="/signup">
            {authState.isAuthenticated ? <Redirect to="/portfolio" /> : <Signup dispatch={dispatch} />}
          </Route>
          {/* Protected route: Only accessible if logged in */}
          <ProtectedRoute path="/portfolio" isAuthenticated={authState.isAuthenticated}>
            <Portfolio />
          </ProtectedRoute>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
 
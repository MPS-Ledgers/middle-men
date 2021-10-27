import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={LoginPage} />
    </BrowserRouter>
  );
}

export default App;

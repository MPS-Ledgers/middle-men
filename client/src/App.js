import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import User from './pages/Users';
import Insurance from './pages/Insurance';
import Hospital from './pages/Hospital';
function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={LoginPage} />
      <Route path='/user' exact component={User} />
      <Route path='/insurance' exact component={Insurance} />
      <Route path='/Hospital' exact component={Hospital} />
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import User from './pages/Users';
import Insurance from './pages/Insurance';
import Hospital from './pages/Hospital';
import forgotPassword from './pages/ForgotPswd';
import Signup from './pages/Signup';
function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={LoginPage} />
      <Route path='/user' exact component={User} />
      <Route path='/insurance' exact component={Insurance} />
      <Route path='/Hospital' exact component={Hospital} />
      <Route path="/forgotpassword" exact component={forgotPassword} />
      <Route path="/signup" exact component={Signup}/>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { Route, Router } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import User from './pages/Users';
import Insurance from './pages/Insurance';
import Hospital from './pages/Hospital';
import forgotPassword from './pages/ForgotPswd';
import Signup from './pages/Signup';
import Chat from "./pages/chat";
import MoneyGrant from './pages/MoneyGrant';
import { history } from './history'
import SignOut from './utils/SignOut';

const App = () => {
  return (
    <>
      <SignOut />
      <Router history={history}>
        <Route path='/' exact component={LoginPage} />
        <Route path='/user' exact component={User} />
        <Route path='/insurance' exact component={Insurance} />
        <Route path='/Hospital' exact component={Hospital} />
        <Route path="/forgotpassword" exact component={forgotPassword} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/chat" exact component={Chat} />
        <Routr path="/grant" exact component={MoneyGrant}/>
      </Router></>
  );
}

export default App;

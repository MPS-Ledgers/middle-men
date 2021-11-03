import React,{useEffect} from 'react';
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
import Userinsaccept from './pages/Userinsaccept';
import insProfile from './pages/insprofile';
import hospProfile from './pages/hospprofile';
import Web3 from 'web3';

const App = () => {
  useEffect(async () => {
    const provider = new Web3.providers.HttpProvider("http://172.26.48.1:7545");
    const web3 = new Web3(provider);
    let accounts = await web3.eth.getAccounts();
    console.log(accounts,'hi')
  }, []);

  return (
    <>
      <Router history={history}>
        <Route path='/' exact component={LoginPage} />
        <Route path='/user' exact component={User} />
        <Route path='/insurance' exact component={Insurance} />
        <Route path='/Hospital' exact component={Hospital} />
        <Route path="/forgotpassword" exact component={forgotPassword} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/insurance/grant" exact component={MoneyGrant} />
        <Route path="/user/accept" exact component={Userinsaccept} />
        <Route path="/insurance/profile" exact component={insProfile} />
        <Route path="/hospital/profile" exact component={hospProfile}/>
      </Router>
    </>
  );
}

export default App;

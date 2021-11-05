import React, { useEffect, useState } from "react";
import { Route, Router, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import User from "./pages/Users";
import Insurance from "./pages/Insurance";
import Hospital from "./pages/Hospital";
import forgotPassword from "./pages/ForgotPswd";
import Signup from "./pages/Signup";
import Chat from "./pages/chat";
import MoneyGrant from "./pages/MoneyGrant";
import { history } from "./history";
import Userinsaccept from "./pages/Userinsaccept";
import insProfile from "./pages/insprofile";
import hospProfile from "./pages/hospprofile";
import insTrans from "./pages/insTransaction";
import hospTrans from "./pages/hospTransaction";
import HosIns from "./pages/hospitalins";
import InsuranceBill from "./pages/insurancebill";
import Web3 from "web3";
import { getFirestore } from "firebase/firestore";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const [type, setType] = useState();

  const state = useSelector((state) => state.auth);
  console.log(state.type);
  useEffect(() => {
    setType(state.type);
    console.log(state.type);
    // const provider = new Web3.providers.HttpProvider("http://172.26.48.1:7545");
    // const web3 = new Web3(provider);
    // let accounts = await web3.eth.getAccounts();
  }, [state]);
  return (
    <>
      <Router history={history}>
        <Route path="/" exact component={LoginPage} />
        {type == "0" ? (
          <Route path="/admin" exact component={Admin} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "1" ? (
          <Route path="/user" exact component={User} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "2" ? (
          <Route path="/insurance" exact component={Insurance} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "3" ? (
          <Route path="/hospital" exact component={Hospital} />
        ) : (
          <Redirect path="/" />
        )}
        <Route path="/forgotpassword" exact component={forgotPassword} /> :{" "}
        <Redirect path="/" />
        <Route path="/signup" exact component={Signup} />
        <Route path="/chat" exact component={Chat} />
        {type == "2" ? (
          <Route path="/insurance/grant" exact component={MoneyGrant} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "1" ? (
          <Route path="/user/accept" exact component={Userinsaccept} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "2" ? (
          <Route path="/insurance/profile" exact component={insProfile} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "3" ? (
          <Route path="/hospital/profile" exact component={hospProfile} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "2" ? (
          <Route path="/insurance/transactions" exact component={insTrans} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "3" ? (
          <Route path="/hospital/transactions" exact component={hospTrans} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "3" ? (
          <Route path="/hospital/bill" exact component={HosIns} />
        ) : (
          <Redirect path="/" />
        )}
        {type == "2" ? (
          <Route
            path="/insurance/bill"
            exact
            path="/insurance/bill"
            component={InsuranceBill}
          />
        ) : (
          <Redirect path="/" />
        )}
      </Router>
      <Footer/>
    </>
  );
};

export default App;

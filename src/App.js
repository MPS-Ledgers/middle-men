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
import Footer from "./components/Footer";
import Record from "./ethereum/build/Record.json";
import { contractAddress } from "./ethereum/contractAddress";
import InsAadhar from "./pages/insAadhar";
import HospView from "./pages/hospView";
import Report from "./pages/Report";
const App = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState();
  const state = useSelector((state) => state.auth);
  console.log(state.type);
  useEffect(() => {
    setType(state.type);
    console.log(state.user);
  }, [state]);
  useEffect(() => {
    const getContract = async () => {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = new Web3(provider);
      const instance = new web3.eth.Contract(
        JSON.parse(Record.interface),
        contractAddress
      );
      let accounts = await web3.eth.getAccounts();
      dispatch({ type: "WEB3", payload: web3 });
      dispatch({ type: "ALL_ACCOUNTS", payload: accounts });
      dispatch({ type: "CONTRACT", payload: instance });
    };
    getContract();
  }, []);

  return (
    <>
      <Router history={history}>
        <Route path="/" exact component={LoginPage} />
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
            component={InsuranceBill}
          />
        ) : (
          <Redirect path="/" />
        )}
        {type == '2' ? (
          <Route
            path="/insurance/add"
            exact
            component={InsAadhar}
          />
        ) :
          <Redirect path="/"/>
        }
        {type == "3" ? (
          <Route path="/hospital/view" exact component={HospView} />
        ) : (
          <Redirect path="/" />
        )}
        <Route path="/report" exact component={Report}/>
      </Router>
      <Footer />
    </>
  );
};

export default App;

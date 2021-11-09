import React, { useEffect, useState } from "react";
import { Route, Router, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import User from "./pages/Users";
import Insurance from "./pages/Insurance";
import Hospital from "./pages/Hospital";
import forgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import MoneyGrant from "./pages/MoneyGrant";
import { history } from "./history";
import Userinsaccept from "./pages/Userinsaccept";
import InsuranceProfile from "./pages/InsuranceProfile";
import HospitalProfile from "./pages/Hospitalprofile";
import InsuranceTransaction from "./pages/InsuranceTransaction";
import HospitalTransactions from "./pages/HospitalTransaction";
import HospitalInsuranceConnect from "./pages/HospitalInsuranceConnect";
import InsuranceBill from "./pages/Insurancebill";
import web3 from "./ethereum/web3"
import Footer from "./components/Footer";
import Record from "./ethereum/build/Record.json";
import { contractAddress } from "./ethereum/contractAddress";
import InsuranceAadhar from "./pages/InsuranceAadhar";
import HospitalView from "./pages/HospitalView";
import Report from "./pages/Report";

const App = () => {
    const dispatch = useDispatch();
    const [localType, setType] = useState();
    const state = useSelector((state) => state.auth);
    const { type } = useSelector((state) => state);

    useEffect(() => {
        setType(state.type);
    }, [state]);

    useEffect(async() => {
        const getContract = async () => {
            // const provider = new Web3.providers.HttpProvider(
            //     "http://127.0.0.1:7545"
            // );
            // const web3 = new Web3(provider);
            const instance = new web3.eth.Contract(
                JSON.parse(Record.interface),
                contractAddress
            );
            let accounts = await web3.eth.getAccounts();
            console.log(accounts,instance)
            dispatch({ type: "WEB3", payload: web3 });
            dispatch({ type: "ALL_ACCOUNTS", payload: accounts });
            dispatch({ type: "CONTRACT", payload: instance });
        };
        await getContract();
    }, []);
    return (
        <>
            <Router history={history}>
                <Route path="/" exact component={LoginPage} />
                {localType === 1 ? (
                    <Route path="/user" exact component={User} />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 2 ? (
                    <Route path="/insurance" exact component={Insurance} />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 3 ? (
                    <Route path="/hospital" exact component={Hospital} />
                ) : (
                    <Redirect to="/" />
                )}
                <Route
                    path="/forgotpassword"
                    exact
                    component={forgotPassword}
                />
                : <Redirect to="/" />
                <Route path="/signup" exact component={Signup} />
                <Route path="/chat" exact component={Chat} />
                {localType === 2 ? (
                    <Route
                        path="/insurance/grant"
                        exact
                        component={MoneyGrant}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 1 ? (
                    <Route
                        path="/user/accept"
                        exact
                        component={Userinsaccept}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 2 ? (
                    <Route
                        path="/insurance/profile"
                        exact
                        component={InsuranceProfile}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 3 ? (
                    <Route
                        path="/hospital/profile"
                        exact
                        component={HospitalProfile}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 2 ? (
                    <Route
                        path="/insurance/transactions"
                        exact
                        component={InsuranceTransaction}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 3 ? (
                    <Route
                        path="/hospital/transactions"
                        exact
                        component={HospitalTransactions}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 3 ? (
                    <Route
                        path="/hospital/bill"
                        exact
                        component={HospitalInsuranceConnect}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 2 ? (
                    <Route
                        path="/insurance/bill"
                        exact
                        component={InsuranceBill}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 2 ? (
                    <Route
                        path="/insurance/add"
                        exact
                        component={InsuranceAadhar}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                {localType === 3 ? (
                    <Route
                        path="/hospital/view"
                        exact
                        component={HospitalView}
                    />
                ) : (
                    <Redirect to="/" />
                )}
                <Route path="/report" exact component={Report} />
            </Router>
            <Footer />
        </>
    );
};

export default App;

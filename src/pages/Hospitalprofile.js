import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import hosppro from "../images/hosppro.png";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { useSelector } from 'react-redux'
import { BsChatFill } from "react-icons/bs";
import web3 from '../ethereum/web3'
import axios from 'axios'

const HospitalProfile = () => {
    const { accounts } = useSelector((state) => state);
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        console.log(accounts)
        const getBal = async () => {
        const response = await axios.get(
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR"
            );
            console.log(response.data)
            let bal = await web3.eth.getBalance(accounts[0])/1e18;
            setBalance(bal*response.data.INR)
        }
        getBal()
    }, [])
    return (
        <>
            <SignOut />
            <GoBack />
            <div
                className="h-screen w-screen text-white"
                style={{
                    background:
                        "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                }}
            >
                <div className="inline float-right">
                    <Link to="/hospital/profile">
                        <CgProfile className="inline text-3xl mt-2 mr-5" />
                    </Link>
                    <Link to="/hospital/bill">
                        <GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" />
                    </Link>
                    <Link to="/chat">
                        <BsChatFill className="inline text-3xl mt-2 mr-10" />
                    </Link>
                </div>
                <div class="w-full flex flex-col justify-center items-center">
                    <div class="flex relative h-60 justify-center items-center">
                        <img
                            class="h-full"
                            src={hosppro}
                            alt="pto-pho"
                        />
                    </div>
                    <div class="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                        <GiTakeMyMoney class="object-cover w-full h-full bg-white text-black" />
                    </div>
                    <div class="mt-16">
                        <h1 class="text-white text-4xl text-center font-semibold">
                            Hospital Mail
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <div className="justify-center align-center my-7 text-center">
                            <h1 className="text-white text-3xl my-5">
                                Balance : {balance.toFixed(2)} Rs
                            </h1>
                            <Link to="/hospital/transactions">
                                <h1 className="text-white text-3xl my-2 text-center">
                                    Your Transactions
                                </h1>
                            </Link>
                            <Link to="/chat">
                                <h1 className="text-white text-3xl my-5 text-center">
                                    Chat
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HospitalProfile;

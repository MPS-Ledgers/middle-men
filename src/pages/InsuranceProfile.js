import React,{useState,useEffect} from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import inspro from "../images/inspro.webp";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { CgProfile } from "react-icons/cg";
import { BsChatFill } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { MdApproval } from "react-icons/md";
import { useSelector } from 'react-redux'
import axios from "axios"
import web3 from '../ethereum/web3'
const InsuranceProfile = () => {
    const { accounts } = useSelector((state) => state);
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        console.log(accounts)
        const getBal = async () => {
            const response = await axios.get(
                "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR"
            );
            console.log(response.data)
            let bal = await web3.eth.getBalance(accounts[0]) / 1e18;
            setBalance(bal * response.data.INR)
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
                    <Link to="/insurance/profile">
                        <CgProfile className="inline text-3xl mt-2 mr-5" />
                    </Link>
                    <Link to="/insurance/bill">
                        <GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" />
                    </Link>
                    <Link to="/chat">
                        <BsChatFill className="inline text-3xl mt-2 mr-10" />
                    </Link>
                    <Link to="/insurance/grant">
                        <MdApproval className="inline text-3xl mr-4 mt-2 float-left" />
                    </Link>
                    <Link to="/insurance/add">
                        <GrAdd className="inline rounded-md text-3xl mr-4 mt-2 float-left bg-white" />
                    </Link>
                </div>
                <div class="w-full justify-center items-center">
                    <div class="flex relative h-60 justify-center">
                        <img
                            class="absolute h-full w-1/2"
                            src={inspro}
                            alt="pto-pho"
                        />
                    </div>
                    <div class="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                        <GiTakeMyMoney class="object-cover w-full h-full bg-white text-black" />
                    </div>
                    <div class="mt-16">
                        <h1 class="text-white text-4xl text-center font-semibold">
                            Insurance Company Mail
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <div className="justify-center align-center my-7">
                            <h1 className="text-white text-3xl my-5">
                                Balance : {balance.toFixed(2)} Rs
                            </h1>
                            <Link to="/insurance/transactions">
                                <h1 className="text-white text-3xl my-2 my-5">
                                    Your Transactions
                                </h1>
                            </Link>
                            <Link to="/insurance/grant">
                                <h1 className="text-white text-3xl ml-12 my-5">
                                    Approvals
                                </h1>
                            </Link>
                            <Link to="/chat">
                                <h1 className="text-white text-3xl ml-20 my-5">
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

export default InsuranceProfile;

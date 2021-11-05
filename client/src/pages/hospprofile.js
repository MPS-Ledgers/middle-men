import React from "react";
import { CgProfile } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi"
import { Link } from "react-router-dom"
import hosppro from "../images/hosppro.png"
import SignOut from "../utils/SignOut";
import { BsChatFill } from "react-icons/bs";
const hospProfile = () => {
    return (
        <>
            <SignOut/>
            <div className="h-screen w-screen text-white" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
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
                <div class="w-full justify-center items-center">
                    <div class="flex relative h-60 justify-center">
                        <img class="absolute h-full w-1/2" src={hosppro} alt="pto-pho" />
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
                        <div className="justify-center align-center my-7">
                            <h1 className="text-white text-3xl my-5">Balance : 10000 Rs</h1>
                            <Link to="/hospital/transactions"><h1 className="text-white text-3xl my-2 my-5">Your Transactions</h1></Link>
                            <Link to="/chat"><h1 className="text-white text-3xl ml-20 my-5">Chat</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default hospProfile;
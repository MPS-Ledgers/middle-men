import React, { useEffect, useState } from "react";
import { MdApproval } from "react-icons/md";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { GiTakeMyMoney } from "react-icons/gi";
const User = () => {
    const auth = useSelector((state) => state.auth);
    const [Requ, setRequ] = useState([]);
    let id = 0;
    useEffect(async () => {
        let reqs = [];
        const db = getFirestore();
        const usersRef = collection(db, "transactions");
        const q = query(usersRef, where("cust", "==", auth.user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            reqs.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        setRequ(reqs);
    }, []);
    return (
        <>
            <SignOut />
            <GoBack />
            <div
                className="h-screen w-screen text-white font-serif"
                style={{
                    background:
                        "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                }}
            >
                <div className="inline float-right">
                    <Link to="/user/send"><GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" /></Link>
                    <Link to="/chat">
                        <BsChatFill className="inline text-3xl mt-2 mr-10" />
                    </Link>
                    <Link to="/user/accept">
                        <MdApproval className="inline text-3xl mr-4 mt-2 float-left" />
                    </Link>
                </div>
                <div className="flex justify-center content-center w-full">
                    <h1 className="text-5xl font-serif mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center w-full">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <div className="flex justify-center content-center w-full my-10">
                    <p className="text-3xl font-serif">Your Transactions</p>
                </div>
                <ul className="mt-10">
                    <li>
                        <div className="ml-10 grid grid-cols-3 mb-10">
                            <h1 className="text-white text-2xl">Insurance</h1>
                            <h1 className="text-white text-2xl">Hospital</h1>
                            <h1 className="text-white text-2xl">Amount</h1>
                        </div>
                    </li>
                    {Requ.map((grant) => {
                        return (
                            <li>
                                <div className="ml-10 grid grid-cols-3 mb-5">
                                    <h1 className="text-white text-xl">
                                        {grant.data.insu}
                                    </h1>
                                    <h1 className="text-white text-xl">
                                        {grant.data.hosp}
                                    </h1>
                                    <h1 className="text-white text-xl">
                                        {grant.data.money}
                                    </h1>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <Link to="/report">
                    <button className="bg-red-500 h-20 w-20 rounded-full float-right mr-20">
                        Report
                    </button>
                </Link>
            </div>
        </>
    );
};

export default User;

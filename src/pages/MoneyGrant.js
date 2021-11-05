import React, { useEffect, useState } from "react";
import ListGrant from "./ListGrant";
import { BsChatFill } from "react-icons/bs";
import { MdApproval } from "react-icons/md";
import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import "firebase/firestore";
import SignOut from "../utils/SignOut";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const MoneyGrant = () => {
    const auth = useSelector((state) => state.auth);
    const [Requ, setRequ] = useState([]);
    let id = 0;
    useEffect(() => {
        const setRequests = async () => {
            let reqs = [];
            const db = getFirestore();
            const usersRef = collection(db, "insurance");
            const q = query(usersRef, where("email", "==", auth.user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                reqs.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setRequ(reqs);
        };
        setRequests();
    }, []);
    return (
        <>
            <SignOut />
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
                    <Link to="/chat">
                        <BsChatFill className="inline text-3xl mt-2 mr-10" />
                    </Link>
                    <Link to="/insurance/bill">
                        <GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" />
                    </Link>
                    <Link to="/insurance/grant">
                        <MdApproval className="inline text-3xl mr-4 mt-2 float-left" />
                    </Link>
                </div>
                <div className="flex justify-center content-center">
                    <h1 className="text-5xl font-serif mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center">
                    <p className="text-3xl mt-5 font-serif">
                        You have {Requ.length} Requests
                    </p>
                </div>
                <ul className="mt-10">
                    <li>
                        <div className="ml-10 grid grid-cols-6 mb-10">
                            <h1 className="text-white text-2xl">AADHAR NO</h1>
                            <h1 className="text-white text-2xl">Amount</h1>
                            <h1 className="text-white text-2xl text-center">
                                Discharge Summary
                            </h1>
                            <h1 className="text-white text-2xl text-center">
                                Aadhaar Card
                            </h1>
                            <h1 class="text-white text-2xl ">Accept</h1>
                            <h1 class="text-white text-2xl ">Reject</h1>
                        </div>
                    </li>
                    {Requ.map((grant) => {
                        id++;
                        return <ListGrant key={id} grants={grant} />;
                    })}
                </ul>
            </div>
        </>
    );
};

export default MoneyGrant;

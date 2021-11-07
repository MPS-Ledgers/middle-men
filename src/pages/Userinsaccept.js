import React, { useState, useEffect } from "react";
import ListGrant1 from "./ListGrant1";
import { BsChatFill } from "react-icons/bs";
import { MdApproval } from "react-icons/md";
import { Link } from "react-router-dom";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const Userinsaccept = () => {
    const auth = useSelector((state) => state.auth);
    const [Requ, setRequ] = useState([]);
    let id = 0;
    useEffect(async () => {
        let reqs = [];
        const db = getFirestore();
        const usersRef = collection(db, "customers");
        const q = query(usersRef, where("email", "==", auth.user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            reqs.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        setRequ(reqs);
    }, [Requ]);
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
                    <Link to="">
                        <BsChatFill className="inline text-3xl mt-2 mr-10" />
                    </Link>
                    <Link to="/insurancegrant">
                        <MdApproval className="inline text-3xl mr-4 mt-2 float-left" />
                    </Link>
                </div>
                <div className="flex justify-center content-center w-full">
                    <h1 className="text-5xl font-serif mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center w-full">
                    <p className="text-3xl mt-5 font-serif">
                        You have {Requ.length} Request{" "}
                    </p>
                </div>
                <ul className="mt-10">
                    <li>
                        <div className="ml-10 grid grid-cols-5 mb-10">
                            <h1 className="text-white text-2xl">
                                Company Name
                            </h1>
                            <h1 className="text-white text-2xl">Request</h1>

                            <h1 className="text-white text-2xl">Accept</h1>
                            <h1 className="text-white text-2xl">Reject</h1>
                        </div>
                    </li>
                    {Requ.map((grant) => {
                        id++;
                        return <ListGrant1 key={id} grants={grant} />;
                    })}
                </ul>
            </div>
        </>
    );
};

export default Userinsaccept;

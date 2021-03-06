import React, { useState } from "react";
import { MdApproval } from "react-icons/md";
import { BsChatFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import firebase from "../firebaseConfig";
import { useSelector } from "react-redux";
import FullPageLoader from "../components/FullPageLoader";
import "firebase/firestore";
import { GrAdd } from "react-icons/gr";
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
} from "@firebase/firestore";

const Insurance = () => {
    const auth = useSelector((state) => state.auth);
    const [customer, setCustomer] = useState("");
    const [error, setError] = useState("");
    const [Requ, setRequ] = useState();
    const [loaderShow, setLoaderShow] = useState(false);

    const formHandler = async (event) => {
        setLoaderShow(true);
        event.preventDefault();
        setError("");
        if (customer.length == 0) {
            setError("Enter Customer Mail");
        } else {
            let reqs = [];
            const setRequests = async () => {
                const db = getFirestore();
                const usersRef = collection(db, "customers");
                const q = query(
                    usersRef,
                    where("email", "==", customer),
                    where("from", "==", auth.user.email),
                    where("money", "==", -1)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    reqs.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setRequ(reqs);
            };
            let reqs1 = [];
            const setRequests1 = async () => {
                const db1 = getFirestore();
                const usersRef1 = collection(db1, "InsuranceWrite");
                const q1 = query(
                    usersRef1,
                    where("email", "==", customer),
                    where("from", "==", auth.user.email)
                );
                const querySnapshot1 = await getDocs(q1);
                querySnapshot1.forEach((doc) => {
                    reqs1.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setRequ(reqs1);
            };
            let reqs2 = [];
            const setRequests2 = async () => {
                const db2 = getFirestore();
                const usersRef2 = collection(db2, "users");
                const q2 = query(
                    usersRef2,
                    where("email", "==", customer),
                    where("type", "==", 1)
                );
                const querySnapshot2 = await getDocs(q2);
                querySnapshot2.forEach((doc) => {
                    reqs2.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setRequ(reqs2);
            };
            await setRequests();
            await setRequests1();
            await setRequests2();
            console.log(reqs2);
            if (reqs.length == 0 && reqs1.length == 0 && reqs2.length != 0) {
                await firebase
                    .firestore()
                    .collection("customers")
                    .doc()
                    .set({
                        email: customer,
                        from: auth.user.email,
                        info: "Write Access",
                        type: "I",
                        money: -1,
                    })
                    .then(() => {});
            } else if (reqs2.length == 0) {
                setError("Invalid Customer Mail");
            } else if (reqs.length > 0) {
                setError("Request Already Sent!!!");
            } else {
                setError("You already have Write Access of this customer");
            }
            setCustomer("");
        }
        setLoaderShow(false);
    };
    return (
        <>
            <FullPageLoader show={loaderShow} />
            <SignOut />
            <GoBack />
            <div className="h-screen w-screen text-white font-montserrat">
                <div className="inline float-right">
                    <Link to="/insurance/profile">
                        <CgProfile className="inline text-3xl mt-2 mr-5" />
                    </Link>
                    <Link to="/chat">
                        <BsChatFill className="inline text-3xl mt-2 mr-5" />
                    </Link>
                    <Link to="/insurance/bill">
                        <GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" />
                    </Link>
                    <Link to="/insurance/grant">
                        <MdApproval className="inline text-3xl mr-4 mt-2 float-left" />
                    </Link>
                    <Link to="/insurance/add">
                        <GrAdd className="inline rounded-md text-3xl mr-4 mt-2 float-left bg-white" />
                    </Link>
                </div>
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-5xl font-montserrat text-center mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-3xl font-montserrat">Secure Solutions</p>
                </div>
                <div className="mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div
                            className="flex"
                            style={{
                                background:
                                    "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                            }}
                        >
                            <div className="p-10 rounded-lg lg:rounded-l-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-5 text-4xl text-white">
                                        Add Customers
                                    </h3>
                                    <p className="mb-4 text-sm text-white">
                                        Connect with Customers with their Email.
                                        Enter Customer mail and add them to your
                                        enterprise
                                    </p>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-white"
                                            htmlFor="AADHAR"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            value={customer}
                                            onChange={(event) => {
                                                setCustomer(event.target.value);
                                            }}
                                            placeholder="Enter Customer Email..."
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-white text-lg">
                                            {error}
                                        </p>
                                    </div>
                                    <hr className="mt-3 mb-6 border-t" />
                                    <div className="mb-6 text-center">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={formHandler}
                                        >
                                            Add User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/report">
                    <button className="bg-red-500 h-20 w-20 rounded-full float-right mr-20">
                        Report
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Insurance;

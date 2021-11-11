import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import "firebase/firestore";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsChatFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
const HospitalView = () => {
    const auth = useSelector((state) => state.auth);
    const [error, setError] = useState();
    const [x, setX] = useState(false);
    const [Requ, setRequ] = useState([]);
    const [Requ1, setRequ1] = useState([]);
    const [patientmail, setPatientMail] = useState("");
    const formHandler = async () => {
        setError("");
        let reqs = [];
        const setRequests = async () => {
            const db1 = getFirestore();
            const usersRef1 = collection(db1, "HospitalRead");
            const q1 = query(
                usersRef1,
                where("email", "==", patientmail),
                where("from", "==", auth.user.email)
            );
            const querySnapshot = await getDocs(q1);
            querySnapshot.forEach((doc) => {
                reqs.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setRequ1(reqs);
        };
        await setRequests();
        if (reqs.length > 0) {
            setX(true);
        } else if (patientmail.length == 0) {
            setError("Enter Patient Mail");
        } else {
            setError("You dont have Read Access of this patient");
        }
    };
    useEffect(() => {
        const setRequests = async () => {
            let reqs = [];
            const db = getFirestore();
            const usersRef = collection(db, "InsuranceWrite");
            const q = query(usersRef, where("email", "==", patientmail));
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
    }, [x, patientmail]);
    console.log(x);
    if (x)
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
                    <div className="flex justify-center content-center w-full">
                        <h1 className="text-5xl font-montserrat mt-10">
                            Welcome to Middlemen
                        </h1>
                    </div>
                    <div className="flex justify-center content-center w-full">
                        <p className="text-3xl font-montserrat">
                            Secure Solutions
                        </p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <h1 className="text-xl">User : {patientmail}</h1>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <ul>
                            <li>
                                <div className="ml-10 grid grid-cols-1 mb-4">
                                    <h1 className="text-white text-2xl">
                                        Insurance
                                    </h1>
                                    <hr className="text-white w-24" />
                                </div>
                            </li>
                            {Requ.map((grant) => {
                                return (
                                    <li>
                                        <div className="ml-10 grid grid-cols-1 mb-2">
                                            <h1 className="text-white text-xl">
                                                {grant.data.from}
                                            </h1>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    else {
        return (
            <>
                <SignOut />
                <GoBack />
                <div className="h-screen w-screen text-white font-montserrat">
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
                    <div className="flex justify-center content-center w-full">
                        <h1 className="text-5xl font-montserrat mt-10">
                            Welcome to Middlemen
                        </h1>
                    </div>
                    <div className="flex justify-center content-center w-full">
                        <p className="text-3xl font-montserrat">
                            Secure Solutions
                        </p>
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
                                            Search Patient Insurance Details
                                        </h3>
                                        <p className="mb-4 text-sm text-white">
                                            Know the Patient's Insurance Company
                                            details. Enter the patient mail and
                                            get the info!!!
                                        </p>
                                    </div>
                                    <form className="px-8 pt-6 pb-8 mb-4 rounded">
                                        <div className="mb-4">
                                            <label
                                                className="block mb-2 text-sm font-bold text-white"
                                                for="AADHAR"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="email"
                                                type="email"
                                                value={patientmail}
                                                onChange={(event) => {
                                                    setPatientMail(
                                                        event.target.value
                                                    );
                                                }}
                                                placeholder="Enter Patient Email..."
                                            />
                                        </div>
                                        <div className="mb-6 text-center">
                                            <button
                                                className="px-4 py-2 font-bold text-white bg-pink-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={formHandler}
                                            >
                                                Request
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="text-white text-lg">
                                                {error}
                                            </p>
                                        </div>
                                        <hr className="mb-6 border-t" />
                                    </form>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/hospital"
                                            className="text-xl"
                                        >
                                            Add New Users Get Read Access!!!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default HospitalView;

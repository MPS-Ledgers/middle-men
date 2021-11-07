import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsChatFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdApproval } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import SignOut from "../utils/SignOut";
import { collection, query, where, getDocs } from "firebase/firestore";
import IPFS from "../IPFS";
import { useSelector } from "react-redux";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const InsuranceAadhar = () => {
    const auth = useSelector((state) => state.auth);
    const [customer, setCustomer] = useState();
    const [aadhaar, setAadhaar] = useState("");
    const { accounts, contract } = useSelector((state) => state);
    const [Requ1, setRequ1] = useState([]);
    const formHandler = async (event) => {
        event.preventDefault();

        // To get the address of the user
        // const db = getFirestore();
        // const usersRef = collection(db, "users");
        // const q = query(usersRef, where("email", "==", customer));
        // const querySnapshot = await getDocs(q);
        // let address = -1;
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        //     if (doc.data().email == customer) {
        //         address = doc.data().address;
        //     }
        // });
        const setRequests = async () => {
            let reqs = [];
            const db1 = getFirestore();
            const usersRef1 = collection(db1, "InsuranceWrite");
            const q1 = query(
                usersRef1,
                where("email", "==", customer),
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
        if (Requ1.length > 0) {
            const response = await IPFS.add(aadhaar);
            console.log(response.path);
            let asciiArray = [];
            for (let i = 0; i < response.path.length; ++i)
                asciiArray.push(response.path.charCodeAt(i));
            await contract.methods
                .addAadhar(accounts[1], asciiArray)
                .send({ from: accounts[2], gas: "6100000" });
            // let arr = await contract.methods
            //     .getAadhar(accounts[1])
            //     .call({ from: accounts[2] });
            // console.log(arr);
        }
    };
    return (
        <>
            <SignOut />
            <div className="h-screen w-screen text-white font-serif">
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
                <div className="flex justify-center content-center">
                    <h1 className="text-5xl font-serif mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center">
                    <p className="text-3xl font-serif">Secure Solutions</p>
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
                                        Add Aadhar
                                    </h3>
                                    <p className="mb-4 text-sm text-white">
                                        Link Aadhar of the customers. Enter
                                        Customer mail and Aadhar to their
                                        BlockChain
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
                                            value={customer}
                                            onChange={(event) => {
                                                setCustomer(event.target.value);
                                            }}
                                            placeholder="Enter Customer Email..."
                                        />
                                    </div>
                                    <label
                                        className="block mb-2 text-sm font-bold text-white"
                                        for="money"
                                    >
                                        User AADHAR
                                    </label>
                                    <input
                                        className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="discharge"
                                        type="file"
                                        onChange={(e) =>
                                            setAadhaar(e.target.files[0])
                                        }
                                        placeholder="Upload User Aadhar..."
                                    />
                                    <hr className="mt-3 mb-6 border-t" />
                                    <div className="mb-6 text-center">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={formHandler}
                                        >
                                            Add Aadhar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InsuranceAadhar;

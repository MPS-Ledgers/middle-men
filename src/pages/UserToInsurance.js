import React,{useState} from "react";
import {where,getDocs,getFirestore,query,collection} from "firebase/firestore"
import { Link } from "react-router-dom"
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { CgProfile } from "react-icons/cg";
import { MdApproval } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsChatFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const UserToInsurance = () => {
    const auth = useSelector((state) => state.auth);
    const [Insmail, setInsmail] = useState("");
    const [Requ,setRequ]=useState()
    const [money, setMoney] = useState("");
    const [error, setError] = useState("");
    const formHandler = async (event) => {
        setError("")
        event.preventDefault();
        if (Insmail.length == 0) {
            setError("Enter Insurance Mail")
        }
        else if (money <= 0) {
            setError("Enter Valid Money")
        }
        else if (money.length <= 0) {
            setError("Enter Money")
        }
        else {
            let reqs = [];
            let reqs1=[]
            const setRequests = async () => {
                const db = getFirestore();
                const usersRef = collection(db, "users");
                const q = query(
                    usersRef,
                    where("email", "==", Insmail)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    reqs.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setRequ(reqs1);
            }

            const setRequests1 = async () => {
                const db1 = getFirestore();
                const usersRef1 = collection(db1, "InsuranceWrite");
                const q1 = query(
                    usersRef1,
                    where("email", "==", auth.user.email),
                    where("from", "==", Insmail)
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
            await setRequests();
            await setRequests1();
            if (reqs.length == 0) {
                setError("Insurance Company Doesnot Exist")
            }
            else if (reqs1.length == 0) {
                setError("You dont have Insurance in this Company")
            }
            if (reqs.length > 0 && reqs1.length > 0) {
                //Code to send money from User Account to Insurance
            }
        }
    }
    return (
        <>
            <SignOut />
            <GoBack />
            <div className="h-screen w-screen text-white" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
                <div className="inline float-right">
                    <Link to="/user/send"><GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" /></Link>
                    <Link to="/chat"><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
                    <Link to="/user/accept"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
                </div>
                <div className="flex justify-center content-center w-full">
                    <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
                </div>
                <div className="flex justify-center content-center w-full">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <div className="mx-auto">
                    <div className="flex justify-center px-6">
                        <div className="flex">
                            <div className="p-10 rounded-lg lg:rounded-l-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-5 text-4xl text-white">Customer Bill</h3>
                                    <p className="mb-4 text-sm text-white">
                                        Enter customer mail and bill details! Get their approval for granting money
                                    </p>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-white" for="email">
                                            Insurance Email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            value={Insmail}
                                            onChange={(event) => {
                                                setInsmail(event.target.value)
                                            }}
                                            placeholder="Enter Insurance Email..."
                                        />
                                        <label className="block mb-2 text-sm font-bold text-white" for="money">
                                            Money
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="money"
                                            type="text"
                                            value={money}
                                            onChange={(event) => {
                                                setMoney(event.target.value)
                                            }}
                                            placeholder="Enter Bill Amount..."
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={formHandler}
                                        >
                                            Send
                                        </button>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-white text-lg mb-2">{error}</p>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserToInsurance;
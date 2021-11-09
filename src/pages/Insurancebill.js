import React,{useState} from "react";
import { Link } from "react-router-dom"
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsChatFill } from "react-icons/bs";
import firebase from '../firebaseConfig'
import "firebase/firestore";
import { useSelector } from "react-redux";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { collection,query,where,getDocs,getFirestore } from "@firebase/firestore";
import { MdApproval } from "react-icons/md";
const InsuranceBill = () => {
    const [Requ0, setRequ0] = useState();
    const [Requ, setRequ] = useState()
    const [Req1, setRequ1] = useState();
    const [error, setError] = useState("");
    const [custmail, setCustmail] = useState("")
    const [hospmail, setHospmail] = useState("")
    const [money, setMoney] = useState("")
    const auth = useSelector((state) => state.auth);
    const formHandler = async (event) => {
        setError("")
        event.preventDefault()
        if (custmail.length == 0) {
            setError("Enter Customer Mail")
        }
        else if (hospmail.length == 0) {
            setError("Enter Hospital Mail")
        }
        else if (money <= 0) {
            setError("Enter Valid Money")
        }
        else {
            let reqs = []
            const setRequests = async () => {
                const db = getFirestore();
                const usersRef = collection(db, "InsuranceWrite");
                const q = query(
                    usersRef,
                    where("email", "==", custmail),
                    where("from", "==", auth.user.email),
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
            let reqs0 = []
            const setRequests1 = async () => {
                const db0 = getFirestore();
                const usersRef0 = collection(db0, "users");
                const q0 = query(
                    usersRef0,
                    where("email", "==", hospmail),
                    where("type", "==", 3),
                );
                const querySnapshot0 = await getDocs(q0);
                querySnapshot0.forEach((doc) => {
                    reqs0.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setRequ0(reqs0);
            };
            await setRequests();
            await setRequests1();
            if (money <= 0) {
                setError('Enter Valid Money')
            }
            else if (reqs0.length == 0) {
                setError("Invalid Hospital")
            }
            else if (reqs.length == 1) {
                let reqs1 = []
                const setRequests1 = async () => {
                    const db1 = getFirestore();
                    const usersRef1 = collection(db1, "customers");
                    const q1 = query(
                        usersRef1,
                        where("email", "==", custmail),
                        where("from", "==", auth.user.email),
                        where("money", "==", money)
                    );
                    const querySnapshot1 = await getDocs(q1);
                    querySnapshot1.forEach((doc) => {
                        reqs1.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });
                    setRequ1(reqs1);
                };
                await setRequests1();
                if (reqs1.length == 0) {
                    await firebase.firestore().collection('customers').doc().set({
                        email: custmail,
                        from: auth.user.email,
                        hosp: hospmail,
                        info: 'Grant Money: ' + money + " Rs to " + hospmail,
                        type: 'I',
                        money: money
                    }).then(() => {
                    })
                }
                else {
                    setError("Request Already Sent!!!")
                }
            }
            else {
                setError('Specified Email Id is not your Customer')
            }
            setCustmail("")
            setHospmail("")
            setMoney("")
        }
    }
    return (
        <>
            <SignOut />
            <GoBack/>
            <div className="h-screen w-screen text-white" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
                <div className="inline float-right">
                    <Link to="/insurance/profile"><CgProfile className="inline text-3xl mt-2 mr-5" /></Link>
                    <Link to="/insurance/bill"><GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" /></Link>
                    <Link to="/chat"><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
                    <Link to="/insurance/grant"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
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
                                            Customer Email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            value={custmail}
                                            onChange={(event) => {
                                                setCustmail(event.target.value)
                                            }}
                                            placeholder="Enter Insurance Email..."
                                        />
                                        <label className="block mb-2 text-sm font-bold text-white" for="aadhar">
                                            Hospital email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="aadhar"
                                            type="text"
                                            value={hospmail}
                                            onChange={(event) => {
                                                setHospmail(event.target.value)
                                            }}
                                            placeholder="Enter Patient Aadhar..."
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
                                            Request
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

export default InsuranceBill;

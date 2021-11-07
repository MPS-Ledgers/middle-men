import React,{useEffect,useState} from "react";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";
import { useSelector } from "react-redux";
import { collection,query,where,getDocs } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
const HospitalTransactions = () => {
    const auth = useSelector((state) => state.auth);
    const [Requ, setRequ] = useState([]);
    useEffect(async () => {
        let reqs = [];
        const db = getFirestore();
        const usersRef = collection(db, "transactions");
        const q = query(usersRef, where("hosp", "==", auth.user.email));
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
                className="h-screen w-screen text-white"
                style={{
                    background:
                        "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                }}
            >
                <div className="flex justify-center content-center w-full">
                    <h1 className="text-5xl font-serif mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center w-full">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <ul className="mt-10">
                    <li>
                        <div className="ml-10 grid grid-cols-3 mb-10">
                            <h1 className="text-white text-2xl">User</h1>
                            <h1 className="text-white text-2xl">Insurance</h1>
                            <h1 className="text-white text-2xl">Amount</h1>
                        </div>
                    </li>
                    {Requ.map((grant) => {
                        return (
                            <li>
                                <div className="ml-10 grid grid-cols-3 mb-5">
                                    <h1 className="text-white text-xl">
                                        {grant.data.cust}
                                    </h1>
                                    <h1 className="text-white text-xl">
                                        {grant.data.insu}
                                    </h1>
                                    <h1 className="text-white text-xl">
                                        {grant.data.money}
                                    </h1>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default HospitalTransactions;

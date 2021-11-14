import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import firebase from "../firebaseConfig";
import "firebase/firestore";
import { useSelector } from "react-redux";
import FullPageLoader from "../components/FullPageLoader";
import "firebase/firestore";
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
} from "@firebase/firestore";

const ListGrant1 = (props) => {
    console.log(props.grants.data.type);
    console.log(props);
    const auth = useSelector((state) => state.auth);
    const [loaderShow, setLoaderShow] = useState(false);

    const tickClick = async () => {
        setLoaderShow(true);
        await firebase
            .firestore()
            .collection("customers")
            .doc(props.grants.id)
            .delete();
        console.log("hello");
        if (props.grants.data.type == "H") {
            await firebase
                .firestore()
                .collection("HospitalRead")
                .doc()
                .set({
                    email: props.grants.data.email,
                    from: props.grants.data.from,
                })
                .then(() => {});
        } else if (
            props.grants.data.type == "I" &&
            props.grants.data.money < 0
        ) {
            console.log("hello");
            await firebase
                .firestore()
                .collection("InsuranceWrite")
                .doc()
                .set({
                    email: props.grants.data.email,
                    from: props.grants.data.from,
                })
                .then(() => {});
        }
        let phoneNum = [];
        const getPhoneNum = async () => {
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(
                usersRef,
                where("email", "==", props.grants.data.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                phoneNum.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
        };
        await getPhoneNum();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", process.env.REACT_APP_RAPID_PASSWORD);
        let raw = JSON.stringify({
            phone: phoneNum[0].data.phone,
            text:
                auth.user.email +
                " has accepted your " +
                props.grants.data.info +
                " request",
        });
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://rapidapi.rmlconnect.net/wbm/v1/message", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        setLoaderShow(false);
    };
    const wrongClick = async () => {
        let phoneNum = [];
        const getPhoneNum = async () => {
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", auth.user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                phoneNum.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
        };
        await getPhoneNum();
        setLoaderShow(true);
        await firebase
            .firestore()
            .collection("customers")
            .doc(props.grants.id)
            .delete();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "617bf1c8245383001100f7de");
        let raw = JSON.stringify({
            phone: phoneNum[0].data.phone,
            text:
                auth.user.email +
                " has rejected your " +
                props.grants.data.info +
                " request",
        });
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://rapidapi.rmlconnect.net/wbm/v1/message", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        setLoaderShow(false);
    };
    return (
        <li>
            <FullPageLoader show={loaderShow} />
            <div className="ml-10 grid grid-cols-5 mb-5">
                <h1 className="text-white text-xl">{props.grants.data.from}</h1>
                <h1 className="text-white text-xl">{props.grants.data.info}</h1>
                <button
                    className="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl"
                    onClick={tickClick}
                >
                    <TiTick />
                </button>
                <button
                    className="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-2 text-xs"
                    onClick={wrongClick}
                >
                    <ImCross />
                </button>
            </div>
        </li>
    );
};

export default ListGrant1;

import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import firebase from "../firebaseConfig";
import { useSelector } from "react-redux";
import "firebase/firestore";
import axios from "axios";
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
} from "@firebase/firestore";
import FullPageLoader from "../components/FullPageLoader";

const ListGrant = (props) => {
    // console.log(props.grants.data.email)
    // console.log(props.grants.data.from)
    // console.log(props.grants.data.patient)
    // console.log(props.grants.data.money)
    // let file_link

    let acc = [];
    let acc1 = [];
    const { contract, accounts, web3 } = useSelector((state) => state);
    const auth = useSelector((state) => state.auth);
    const [loader, setLoader] = useState(false);

    const convertToString = (asciiArray) => {
        let res = "";
        for (let ele of asciiArray) {
            res += String.fromCharCode(parseInt(ele));
        }
        return res;
    };

    const downloadDS = async () => {
        setLoader(true);
        //console.log(props.grants.data.patient)
        acc = [];
        acc1 = [];
        const fn = async () => {
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(
                usersRef,
                where("email", "==", props.grants.data.from)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                acc.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
        };
        const fn1 = async () => {
            const db1 = getFirestore();
            const usersRef1 = collection(db1, "users");
            const q1 = query(
                usersRef1,
                where("email", "==", props.grants.data.patient)
            );
            const querySnapshot1 = await getDocs(q1);
            querySnapshot1.forEach((doc1) => {
                acc1.push({
                    id: doc1.id,
                    data: doc1.data(),
                });
            });
        };
        await fn();
        await fn1();
        let asciiArray = await contract.methods
            .getDS(acc1[0].data.address, acc[0].data.address)
            .call({ from: accounts[0] });
        console.log(acc, accounts, asciiArray);
        const cid = convertToString(asciiArray);
        const url = `https://ipfs.io/ipfs/${cid}`;
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
        setLoader(false);
    };

    const downloadAadhaar = async () => {
        setLoader(true);
        const db = getFirestore();
        console.log(props.grants.data.patient);
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            where("email", "==", props.grants.data.patient)
        );
        let acc = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            acc.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        console.log(acc);
        console.log(acc[0].data.address, accounts[0]);
        let asciiArray = await contract.methods
            .getAadhar(acc[0].data.address)
            .call({ from: accounts[0] });
        console.log(asciiArray);
        const cid = convertToString(asciiArray);
        const url = `https://ipfs.io/ipfs/${cid}`;
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
        setLoader(false);
    };
    const tickClick = async () => {
        setLoader(true);
        let accc = [];
        const fn = async () => {
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(
                usersRef,
                where("email", "==", props.grants.data.from)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                accc.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
        };
        await fn();
        console.log(accc[0].data.address);
        await firebase
            .firestore()
            .collection("transactions")
            .doc()
            .set({
                cust: props.grants.data.patient,
                insu: auth.user.email,
                hosp: props.grants.data.from,
                money: props.grants.data.money,
            })
            .then(() => {});
        const response = await axios.get(
            "https://min-api.cryptocompare.com/data/price?fsym=INR&tsyms=ETH"
        );

        console.log(
            props.grants.data.money * response.data.ETH * 1000000000000000000,
            response.data.ETH
        );
        await contract.methods.transferMoney(accc[0].data.address).send({
            from: accounts[0],
            value: web3.utils.toWei(
                (props.grants.data.money * response.data.ETH).toString(),
                "ether"
            ),
        });

        await firebase
            .firestore()
            .collection("insurance")
            .doc(props.grants.id)
            .delete();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", process.env.REACT_APP_RAPID_PASSWORD);
        let raw = JSON.stringify({
            phone: "+916381801176",
            text:
                auth.user.email +
                " has accepted your Money Grant " +
                props.grants.data.money +
                "Rs request",
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
        const config = {
            body: {
                "Content-Type": "application/json",
            },
        };
        const obj = {
            usermail: props.grants.data.patient,
            insmail: props.grants.data.email,
            hospmail: props.grants.data.from,
            amount: props.grants.data.money,
        };
        let phoneNum = [];
        const getPhoneNum = async () => {
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(
                usersRef,
                where("email", "==", props.grants.data.from)
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
        axios.post("http://localhost:8000/grants", obj, config);
        const url = await axios.get("http://localhost:8000/");
        console.log(url.data);
        let raw1 = JSON.stringify({
            phone: phoneNum[0].data.phone,
            text:
                "Hello " +
                props.grants.data.patient +
                ", \nYour payment invoice has been attached below.\nThank You\n\n" +
                url.data,
        });
        console.log(raw1);
        let requestOptions1 = {
            method: "POST",
            headers: myHeaders,
            body: raw1,
            redirect: "follow",
        };
        fetch("https://rapidapi.rmlconnect.net/wbm/v1/message", requestOptions1)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

        setLoader(false);
    };

    const wrongClick = async () => {
        setLoader(true);
        console.log(auth.user.email);
        await firebase
            .firestore()
            .collection("insurance")
            .doc(props.grants.id)
            .delete();
        await firebase
            .firestore()
            .collection("customers")
            .doc(props.grants.id)
            .delete();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", process.env.REACT_APP_RAPID_PASSWORD);
        let raw = JSON.stringify({
            phone: "+916381801176",
            text:
                auth.user.email +
                " has rejected your Money Grant: " +
                props.grants.data.money +
                " Rs request",
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

        setLoader(false);
    };
    return (
        <li>
            <FullPageLoader show={loader} />
            <div className="ml-10 grid grid-cols-6 mb-5">
                <h1 className="text-white text-xl">
                    {props.grants.data.aadhar}
                </h1>
                <h1 className="text-white text-xl">
                    {props.grants.data.money}Rs
                </h1>
                <button className="text-white text-xl" onClick={downloadDS}>
                    View
                </button>
                <button
                    className="text-white text-xl"
                    onClick={downloadAadhaar}
                >
                    View
                </button>
                <button
                    class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl"
                    onClick={tickClick}
                >
                    <TiTick />
                </button>
                <button
                    class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-2 text-xs"
                    onClick={wrongClick}
                >
                    <ImCross />
                </button>
            </div>
        </li>
    );
};

export default ListGrant;

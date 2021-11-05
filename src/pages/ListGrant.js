import React from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import firebase from "../firebaseConfig";
import { useSelector } from "react-redux";
import "firebase/firestore";

const ListGrant = (props) => {
  const { contract, accounts } = useSelector((state) => state);

  const convertToString = (asciiArray) => {
    let res = "";
    for (let ele of asciiArray) {
      res += String.fromCharCode(parseInt(ele));
    }
    return res
  };

  const downloadDS = async () => {
    let asciiArray = await contract.methods
      .getDS(accounts[1])
      .call({ from: accounts[3] });
    const cid = convertToString(asciiArray);
    const url = `https://ipfs.io/ipfs/${cid}`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", "file.pdf"); 
    document.body.appendChild(link);
    link.click();
  };

  const tickClick = async () => {
    await firebase
      .firestore()
      .collection("insurance")
      .doc(props.grants.id)
      .delete();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "617bf1c8245383001100f7de");
    let raw = JSON.stringify({
      phone: "+916381801176",
      text: "a@a.com has accepted your " + props.grants.data.info + " request",
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
  };
  const wrongClick = async () => {
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
    myHeaders.append("Authorization", "617bf1c8245383001100f7de");
    let raw = JSON.stringify({
      phone: "+916381801176",
      text:
        "a@a.com has rejected your Grant Money: " +
        props.grants.data.money +
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
  };
  // console.log(props)
  return (
    <li>
      <div className="ml-10 grid grid-cols-5 mb-5">
        <h1 className="text-white text-xl">{props.grants.data.aadhar}</h1>
        <h1 className="text-white text-xl">{props.grants.data.money}Rs</h1>
        <button className="text-white text-xl" onClick={downloadDS}>
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
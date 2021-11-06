import React from 'react';
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import firebase from '../firebaseConfig'
import "firebase/firestore";
import { useSelector } from "react-redux";
const ListGrant1 = (props) => {
  console.log(props.grants.data.type)
  console.log(props)
  const auth = useSelector((state) => state.auth);
  const tickClick = async () => {
    console.log('hello')
    if (props.grants.data.type == 'H') {
      await firebase
        .firestore()
        .collection("HospitalRead")
        .doc()
        .set({
          email: props.grants.data.email,
          from: props.grants.data.from,
        })
        .then(() => {
        });
    }
    else if (props.grants.data.type == 'I' && props.grants.data.money < 0) {
      console.log('hello')
      await firebase
        .firestore()
        .collection("InsuranceWrite")
        .doc()
        .set({
          email: props.grants.data.email,
          from: props.grants.data.from,
        })
        .then(() => {
        });
    }
    await firebase.firestore().collection('customers').doc(props.grants.id).delete()
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", process.env.REACT_APP_RAPID_PASSWORD);
    let raw = JSON.stringify({
      "phone": "+916381801176",
      "text": auth.user.email+" has accepted your " + props.grants.data.info+" request"
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  fetch("https://rapidapi.rmlconnect.net/wbm/v1/message", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  const wrongClick = async() => {
    await firebase.firestore().collection('customers').doc(props.grants.id).delete()
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "617bf1c8245383001100f7de");
    let raw = JSON.stringify({
      "phone": "+916381801176",
      "text": auth.user.email+" has rejected your " + props.grants.data.info + " request"
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://rapidapi.rmlconnect.net/wbm/v1/message", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
      <li>
        <div className="ml-10 grid grid-cols-5 mb-5">
          <h1 className="text-white text-xl">{props.grants.data.from}</h1>
          <h1 className="text-white text-xl">{props.grants.data.info}</h1>
          <button className="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl" onClick={tickClick}><TiTick /></button>
          <button className="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-2 text-xs" onClick={wrongClick}><ImCross /></button>
        </div>
      </li>
    )
}

export default ListGrant1;
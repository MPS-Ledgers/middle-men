import React from 'react';
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import firebase from '../firebaseConfig'
import "firebase/firestore";
const ListGrant1 = (props) => {
  const tickClick = () => {
    console.log(props.grants.data.from);
    firebase.firestore().collection('Users').doc(props.grants.id).delete()
  }
  const wrongClick = () => {
    firebase.firestore().collection('Users').doc(props.grants.id).delete()
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
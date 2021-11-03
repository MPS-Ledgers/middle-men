import React from 'react';
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import firebase from '../firebaseConfig'
import "firebase/firestore";
const ListGrant = (props) => {
  const tickClick = async() => {
    await firebase.firestore().collection('insurance').doc(props.grants.id).delete()
    //Element should be removed
  }
  const wrongClick = async() => {
    await firebase.firestore().collection('insurance').doc(props.grants.id).delete()
    //Element should be removed
  }
  console.log(props)
  return (
      <li>
      <div className="ml-10 grid grid-cols-5 mb-5">
        <h1 className="text-white text-xl">{props.grants.data.aadhar}</h1>
        <h1 className="text-white text-xl">{ props.grants.data.money}Rs</h1>
          <h1 className="text-white text-xl">View</h1>
          <button class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl" onClick={tickClick}><TiTick /></button>
          <button class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-2 text-xs" onClick={wrongClick}><ImCross /></button>
        </div>
      </li>
    )
}

export default ListGrant;
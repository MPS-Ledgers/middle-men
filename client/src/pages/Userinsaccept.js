import React, { useState, useEffect } from "react";
import ListGrant1 from "./ListGrant1";
import { BsChatFill } from "react-icons/bs";
import { MdApproval } from "react-icons/md";
import { Link } from "react-router-dom";
import SignOut from "../utils/SignOut";
import firebase from '../firebaseConfig'
import "firebase/firestore";
const Userinsaccept = () => {
  const [Requ, setRequ] = useState([])
  let id = 0;
  useEffect(() => {
    let reqs = []
    const doOnSnapShot = (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        reqs.push({
          'id': doc.id,
          'data':doc.data()
        });
      })
      setRequ(reqs)
    }
    const getdata = async() => {
      const ref = firebase.firestore().collection("customers");
      ref.onSnapshot(doOnSnapShot)
    }
    getdata()
  }, [Requ])
  return (
    <>
      <SignOut />
      <div className="h-screen w-screen text-white" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
        <div className="inline float-right">
          <Link to=""><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
          <Link to="/insurancegrant"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
        </div>
        <div className="flex justify-center content-center">
          <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
        </div>
        <div className="flex justify-center content-center">
          <p className="text-3xl mt-5 font-serif">You have {Requ.length} Request </p>
        </div>
        <ul className="mt-10">
          <li>
            <div className="ml-10 grid grid-cols-5 mb-10">
              <h1 className="text-white text-2xl">Hospital Name</h1>
              <h1 className="text-white text-2xl">Request</h1>

              <h1 className="text-white text-2xl">Accept</h1>
              <h1 className="text-white text-2xl">Reject</h1>
            </div>
          </li>
          {Requ.map((grant) => {
            id++;
            return <ListGrant1 key={id} grants={grant} />
          })}
        </ul>
      </div>
    </>
  )
}

export default Userinsaccept;
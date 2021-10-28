import React from "react";
import ListGrant from "./ListGrant";
import { BsChatFill } from "react-icons/bs";
import { MdApproval } from "react-icons/md";
import { Link } from "react-router-dom";
const MoneyGrant = () => {
    const Requests = [
        {
            aadhar: "123456781234",
            discharge: "file_hash",
            req_money: 50000
        },
        {
            aadhar: "176778781234",
            discharge: "file_hash",
            req_money: 75000
        }
    ]
    return (
        <>
        <div className="h-screen w-screen text-white" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
          <div className="inline float-right">
            <Link><BsChatFill className="inline text-3xl mt-2 mr-10"/></Link>
            <Link to="/insurancegrant"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
          </div>
          <div className="flex justify-center content-center">
            <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
          </div>
          <div className="flex justify-center content-center">
            <p className="text-3xl mt-5 font-serif">You have some Requests</p>
          </div>
          <ul className="mt-10">
            <li>
              <div className="ml-10 grid grid-cols-5 mb-10">
                <h1 className="text-white text-2xl">AADHAR NO</h1>
                <h1 className="text-white text-2xl">Amountt</h1>
                <h1 className="text-white text-2xl">Discharge Summary</h1>
                <h1 class="text-white text-2xl">Accept</h1>
                <h1 class="text-white text-2xl">Reject</h1>
              </div>
            </li>
            {Requests.map((grant) => {
                return <ListGrant grants={grant}/>
              })}
            </ul>
          </div>
        </>
    )
}

export default MoneyGrant;
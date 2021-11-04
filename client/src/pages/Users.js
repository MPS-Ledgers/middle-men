import React from "react";
import { MdApproval } from "react-icons/md"
import { BsChatFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import redirectUser from '../utils/redirectUser'
import SignOut from '../utils/SignOut';
import { useSelector, useDispatch } from "react-redux";
const User = () => {
  redirectUser();
  const Requests = [
    {
      hosp: "appolo@a.com",
      ins: "oneindia@a.com",
      money: 50000
    },
    {
      hosp: "mgm@x.com",
      ins: "lic@a.com",
      money: 75000
    }
  ]
  return (
    <>
    <SignOut />
      <div className="h-screen w-screen text-white font-serif" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
      <div className="inline float-right">
        <Link to="/chat"><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
          <Link to="/user/accept"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
      </div>
      <div className="flex justify-center content-center">
        <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
      </div>
      <div className="flex justify-center content-center">
        <p className="text-3xl font-serif">Secure Solutions</p>
      </div>
      <div className="flex justify-center content-center my-10">
        <p className="text-3xl font-serif">Your Transactions</p>
      </div>
      <ul className="mt-10">
          <li>
            <div className="ml-10 grid grid-cols-3 mb-10">
              <h1 className="text-white text-2xl">User</h1>
              <h1 className="text-white text-2xl">Insurance</h1>
              <h1 className="text-white text-2xl">Amount</h1>
            </div>
          </li>
          {Requests.map((grant) => {
            return (
              <li>
                <div className="ml-10 grid grid-cols-3 mb-5">
                  <h1 className="text-white text-xl">{grant.ins}</h1>
                  <h1 className="text-white text-xl">{grant.hosp}</h1>
                  <h1 className="text-white text-xl">{grant.money}</h1>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
    </>
  )
}

export default User;
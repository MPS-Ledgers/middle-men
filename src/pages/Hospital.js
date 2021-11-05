import React, { useState } from "react";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SignOut from "../utils/SignOut";
import firebase from "../firebaseConfig";
import "firebase/firestore";
import { CgProfile } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi";
import { useSelector } from "react-redux";
const Hospital = () => {
  const auth = useSelector((state) => state.auth);
  const [patientmail, setPatientMail] = useState();
  const formHandler = async (event) => {
    event.preventDefault();
    await firebase
      .firestore()
      .collection("customers")
      .doc()
      .set({
        email: patientmail,
        from: auth.user.email,
        info: "Read Access",
        type: "H",
        money: -1,
      })
      .then(() => {
      });
  };
  return (
    <>
      <SignOut />
      <div className="h-screen w-screen text-white font-serif">
        <div className="inline float-right">
          <Link to="/hospital/profile">
            <CgProfile className="inline text-3xl mt-2 mr-5" />
          </Link>
          <Link to="/hospital/bill">
            <GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" />
          </Link>
          <Link to="/chat">
            <BsChatFill className="inline text-3xl mt-2 mr-10" />
          </Link>
        </div>
        <div className="flex justify-center content-center">
          <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
        </div>
        <div className="flex justify-center content-center">
          <p className="text-3xl font-serif">Secure Solutions</p>
        </div>
        <div className="mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div
              className="flex"
              style={{
                background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
              }}
            >
              <div className="p-10 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-5 text-4xl text-white">
                    Search Patient
                  </h3>
                  <p className="mb-4 text-sm text-white">
                    Connect with patients with their Email. Enter Patient Email
                    to view the user insurance details!
                  </p>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="AADHAR"
                    >
                      Email
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={patientmail}
                      onChange={(event) => {
                        setPatientMail(event.target.value);
                      }}
                      placeholder="Enter Patient Email..."
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={formHandler}
                    >
                      Request
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                </form>
                <div className="flex justify-center">
                  <Link to="/hospital/view" className="text-xl">View Insurance of Accepted Users </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/report"><button className="bg-red-500 h-20 w-20 rounded-full float-right mr-20">Report</button></Link>
      </div>
    </>
  );
};

export default Hospital;

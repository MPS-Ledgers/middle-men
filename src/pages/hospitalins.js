import React, { useState } from "react";
import SignOut from "../utils/SignOut";
import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import "firebase/firestore";
import { CgProfile } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsChatFill } from "react-icons/bs";
import IPFS from "../IPFS";
import { useSelector } from "react-redux";

const HosIns = () => {
  const [insMail, setInsMail] = useState();
  const [aadhar, setAadhar] = useState();
  const [money, setMoney] = useState();
  const [dsFile, setDsFile] = useState("");
  const [patientMail, setPatientMail] = useState();
  const { auth, accounts, contract } = useSelector((state) => state);

  const formHandler = async (event) => {
    event.preventDefault();
    const response = await IPFS.add(dsFile);

    // let encrypted = AES.encrypt(response.path, currentUser);
    // let encryptedString = encrypted.toString();
    let asciiArray = [];
    for (let i = 0; i < response.path.length; ++i)
      asciiArray.push(response.path.charCodeAt(i));
    await firebase
      .firestore()
      .collection("insurance")
      .doc()
      .set({
        email: insMail,
        from: auth.user.email,
        aadhar: aadhar,
        patient: patientMail,
        money: money,
      })
      .then(() => {});
    await contract.methods
      .addDS(accounts[1], asciiArray)
      .send({ from: accounts[3], gas: "6000000" });
    let arr = await contract.methods
      .getDS(accounts[1])
      .call({ from: accounts[3] });
    console.log(arr);
  };
  return (
    <>
      <SignOut />
      <div
        className="h-screen w-screen text-white"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
        }}
      >
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
          <div className="flex justify-center px-6">
            <div className="flex">
              <div className="p-10 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-5 text-4xl text-white">
                    Insurance Policy
                  </h3>
                  <p className="mb-4 text-sm text-white">
                    Connect with Insurance with their Email. Enter Patient Email Aadhar
                    to view the user insurance details!
                  </p>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="email"
                    >
                      Insurance Email
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={insMail}
                      onChange={(event) => {
                        setInsMail(event.target.value);
                      }}
                      placeholder="Enter Insurance Email..."
                    />
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="email"
                    >
                      Patient Email
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={patientMail}
                      onChange={(event) => {
                        setPatientMail(event.target.value);
                      }}
                      placeholder="Enter Patient Email..."
                    />
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="aadhar"
                    >
                      Patient AADHAR
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="aadhar"
                      type="text"
                      value={aadhar}
                      onChange={(event) => {
                        setAadhar(event.target.value);
                      }}
                      placeholder="Enter Patient Aadhar..."
                    />
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="money"
                    >
                      Money
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="money"
                      type="text"
                      value={money}
                      onChange={(event) => {
                        setMoney(event.target.value);
                      }}
                      placeholder="Enter Bill Amount..."
                    />
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="money"
                    >
                      Discharge Summary
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="discharge"
                      type="file"
                      placeholder="Upload Discharge Summary..."
                      onChange={(e) => setDsFile(e.target.files[0])}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HosIns;

import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { history } from '../history';

const SignOut = () => {
  const signOutUser = async (e) => {
    try {
      const auth = getAuth()
      await signOut(auth)
      console.log("Signout success!")
      history.replace('/')
    } catch (error) {
      console.log("Error :(");
    }
  }
  return (
    <div className="flex justify-end m-4 mt-2">
         <button className="bg-transparent text-gray-200 p-2 rounded border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " onClick={signOutUser}>Log Out</button>
    </div>
  );
};

export default SignOut;
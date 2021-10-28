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
    <div>
      <button className="signOut text-white" onClick={signOutUser}>Log Out</button>
    </div>
  );
};

export default SignOut;
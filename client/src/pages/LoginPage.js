import React, { useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { history } from "../history";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase from "../firebaseConfig";
import redirectUser from "../utils/redirectUser";

const LoginPage = (props) => {
  //redirectUser()
  const [email, setEmail] = useState();
  const [loaderShow, setLoaderShow] = useState(false);
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const db = getFirestore();
  const loginHandler = async (event) => {
    event.preventDefault();
    setLoaderShow(true);
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      let type = -1;
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        if (doc.data().email == email) {
          type = doc.data().type;
        }
      });
      console.log(type);
      dispatch({
        type: "SIGN_IN",
        payload: { user: userCredential.user, type: type },
      });

      switch (type) {
        case 1:
          history.replace("/user");
          break;
        case 2:
          history.replace("/insurance");
          break;
        case 3:
          history.replace("/hospital");
          break;
        default:
          break;
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setLoginError(() => true);
    }
    setLoaderShow(false);
  };
  return (
    <>
      <Loader show={loaderShow} />
      <div class="w-screen h-screen px-8 py-2">
        <div class="flex items-center justify-between">
          <h2 class="text-gray-200 font-bold text-2xl ">MPS LEDGERS</h2>
          <div class="auth flex items-center">
            <Link to="/">
              <button class="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button class="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-white hover:text-black">
                Sign up
              </button>
            </Link>
          </div>
        </div>
        <div class="mt-20 mx-8">
          <div class="md:flex items-center justify-between">
            <div
              class="w-full md:w-1/2 max-w-md mr-auto p-8"
              style={{
                background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
              }}
            >
              <h1 class="text-4xl font-bold text-white tracking-wide">
                Welcome to
              </h1>
              <h1 class="text-5xl p-2 font-bold text-white tracking-wide">
                Middle-Men
              </h1>
              <p class="text-white p-2">
                We Can't Predict Future But We can Protect It
              </p>
              <span class="text-white">
                Create New Account?
                <Link
                  to="/signup"
                  className="text-white text-lg ml-2 font-bold hover:text-red-500"
                >
                  Sign Up
                </Link>
              </span>
            </div>
            <div class="w-full md:max-w-md mt-6">
              <div class="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
                <form onSubmit={loginHandler}>
                  <div class="flex items-center justify-center">
                    <h2 class="text-2xl font-bold tracking-wide">
                      Welcome back
                    </h2>
                  </div>
                  <h2 class="text-xl text-center font-semibold text-gray-800 mb-2">
                    Log In
                  </h2>
                  <input
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    type="text"
                    class="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                    placeholder="Email Number"
                  />
                  <input
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    type="password"
                    class="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                    placeholder="Password"
                  />
                  <div class="flex items-center justify-between">
                    <Link to="/forgotpassword" class="text-gray-600">
                      Forget Password?
                    </Link>
                    <button class="bg-gray-800 text-gray-200  px-2 py-1 rounded">
                      Log In
                    </button>
                  </div>
                </form>
                {loginError ? (
                  <div className="loginerror text-center text-red-500">
                    Invalid Email or Password
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../firebaseConfig";
import { useSelector } from "react-redux";

const Signup = () => {
  const [CurrentUser, setCurrentUser] = useState(null);
  const { accounts, contract } = useSelector((state) => state);
  console.log(accounts, contract);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, Phone, radio } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          // send verification mail.
          // userCredential.user.sendEmailVerification();
          //auth().signOut();
          // alert("Email sent");
        });
      //setCurrentUser(true);
      firebaseConfig
        .firestore()
        .collection("users")
        .add({
          address: accounts[0],
          email: email.value,
          phone: Phone.value,
          type: parseInt(radio.value),
        });
    } catch (error) {
      alert(error);
    }

    let type = parseInt(radio.value);
    switch (type) {
      case 1:
        await contract.methods.addUser(accounts[0]).send({ from: accounts[0] });
        break;
      case 2:
        await contract.methods
          .addInsurance(accounts[0])
          .send({ from: accounts[0] });
        break;
      case 3:
        await contract.methods
          .addHospitals(accounts[0])
          .send({ from: accounts[0] });
        break;
      default:
        break;
    }
  };

  if (CurrentUser) {
    return <Redirect to="/user" />;
  }
  return (
    <>
      <div>
        <div className="min-h-screen flex flex-col">
          <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div
              className="px-6 py-8 rounded shadow-md text-black w-full"
              style={{
                background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
              }}
            >
              <h1 className="mb-8 text-3xl text-center text-white">Sign up</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="Phone"
                  placeholder="Phone Number"
                />

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirm_password"
                  placeholder="Confirm Password"
                />
                <div class="mt-2">
                  <label className="text-white text-xl">Account : </label>
                  <div className="inline-flex">
                    <label class="mx-5 flex items-center">
                      <input
                        type="radio"
                        class="form-radio"
                        name="radio"
                        value="1"
                      />
                      <span class="ml-2 text-white text-xl">User</span>
                    </label>
                    <label class="mx-5 inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio"
                        name="radio"
                        value="2"
                      />
                      <span class="mx-5 ml-2 text-white text-xl">
                        Insurance
                      </span>
                    </label>
                    <label class="mx-5 inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio"
                        name="radio"
                        value="3"
                      />
                      <span class="mx-5 ml-2 text-white text-xl">Hospital</span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-3 justify-center content-center align-center text-center px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                >
                  Create Account
                </button>
              </form>
              <div className="text-center text-sm text-white mt-4">
                By signing up, you agree to the
                <Link
                  className="ml-2 no-underline border-b border-grey-dark text-white"
                  to="#"
                >
                  Terms of Service
                </Link>{" "}
                and
                <Link
                  className="ml-2 no-underline border-b border-grey-dark text-white"
                  to="#"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div class="text-white mt-6">
              Already have an account?
              <Link
                class="ml-2 no-underline border-b border-blue text-white"
                to="/"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

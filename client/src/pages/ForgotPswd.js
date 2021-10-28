import React from "react";
import { Link } from "react-router-dom";
const forgotPassword = () => {
  return (
    <>
      <div className="h-screen w-screen px-8 py-2">
        <div className="mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="mt-20 flex" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
              <div className="p-10 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-2xl text-white">Forgot Your Password?</h3>
                  <p className="mb-4 text-sm text-white">
                    We get it, stuff happens. Just enter your email address below and we'll send you a
                    link to reset your password!
                  </p>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-white" for="email">
                      Email
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Enter Email Address..."
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Reset Password
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-white align-baseline hover:text-red-500"
                      to="/signup"
                    >
                      Create an Account!
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      class="inline-block text-sm text-white align-baseline hover:text-green-500"
                      to="/"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default forgotPassword;
import React,{useState} from "react";
import { MdApproval } from "react-icons/md"
import { BsChatFill } from "react-icons/bs"
import { CgProfile} from "react-icons/cg"
import { Link } from "react-router-dom"
import redirectUser from '../utils/redirectUser'
import SignOut from '../utils/SignOut';

const Insurance = () => {
    redirectUser()
    const [customer, setCustomer] = useState()
    const formHandler = (event) => {
        event.preventDefault()
    }
    return (
        <>
         <SignOut />
            <div className="h-screen w-screen text-white font-serif">
                <div className="inline float-right">
                    <Link to="/insurance/profile"><CgProfile className="inline text-3xl mt-2 mr-5" /></Link>
                    <Link><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
                    <Link to="/insurance/grant"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
                </div>
                <div className="flex justify-center content-center">
                    <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
                </div>
                <div className="flex justify-center content-center">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <div className="mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="flex" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
                            <div className="p-10 rounded-lg lg:rounded-l-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-5 text-4xl text-white">Add Customers</h3>
                                    <p className="mb-4 text-sm text-white">
                                        Connect with Customers with their Email. Enter Customer mail and add them to your enterprise
                                    </p>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-white" for="AADHAR">
                                            Email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            value={customer}
                                            onChange={(event) => {
                                                setCustomer(event.target.value)
                                            }}
                                            placeholder="Enter Customer Email..."
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={formHandler}
                                        >
                                            Add User
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
    )
}

export default Insurance;
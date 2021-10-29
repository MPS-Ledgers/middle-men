import React from "react";
import { MdApproval } from "react-icons/md"
import { BsChatFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import redirectUser from '../utils/redirectUser'
import SignOut from '../utils/SignOut';

const Insurance = () => {
    // redirectUser()
    return (
        <>
         <SignOut />
            <div className="h-screen w-screen text-white font-serif">
                <div className="inline float-right">
                    <Link><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
                    <Link to="/insurancegrant"><MdApproval className="inline text-3xl mr-4 mt-2 float-left" /></Link>
                </div>
                <div className="flex justify-center content-center">
                    <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
                </div>
                <div className="flex justify-center content-center">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
            </div>
        </>
    )
}

export default Insurance;
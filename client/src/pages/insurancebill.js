import React,{useState} from "react";
import { Link } from "react-router-dom"
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsChatFill } from "react-icons/bs";
const InsuranceBill = () => {
    const formHandler = () => {
        
    }
    const [custmail, setCustmail] = useState()
    const [hospmail, setHospmail] = useState()
    const [money,setMoney]=useState()
    return (
        <>
            <div className="h-screen w-screen">
                <div className="inline float-right">
                    <Link to="/hospital/profile"><CgProfile className="inline text-3xl mt-2 mr-5" /></Link>
                    <Link to="/hospital/bill"><GiTakeMyMoney className="inline text-white text-3xl mt-2 mr-4" /></Link>
                    <Link to="/chat"><BsChatFill className="inline text-3xl mt-2 mr-10" /></Link>
                </div>
                <div className="flex justify-center content-center">
                    <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
                </div>
                <div className="flex justify-center content-center">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <div className="mx-auto">
                    <div className="flex justify-center px-6">
                        <div className="flex" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))" }}>
                            <div className="p-10 rounded-lg lg:rounded-l-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-5 text-4xl text-white">Search Patient</h3>
                                    <p className="mb-4 text-sm text-white">
                                        Connect with patients with their Email. Enter Patient Email to view the user insurance details!
                                    </p>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-white" for="email">
                                            Customer Email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            value={custmail}
                                            onChange={(event) => {
                                                setCustmail(event.target.value)
                                            }}
                                            placeholder="Enter Insurance Email..."
                                        />
                                        <label className="block mb-2 text-sm font-bold text-white" for="aadhar">
                                            Hospital email
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="aadhar"
                                            type="text"
                                            value={hospmail}
                                            onChange={(event) => {
                                                setHospmail(event.target.value)
                                            }}
                                            placeholder="Enter Patient Aadhar..."
                                        />
                                        <label className="block mb-2 text-sm font-bold text-white" for="money">
                                            Money
                                        </label>
                                        <input
                                            className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="money"
                                            type="text"
                                            value={money}
                                            onChange={(event) => {
                                                setMoney(event.target.value)
                                            }}
                                            placeholder="Enter Bill Amount..."
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
    )
}

export default InsuranceBill;
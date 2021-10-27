import React from "react";
import { FaSearch } from 'react-icons/fa'

const Hospital = () => {
    return (
        <div className="h-screen w-screen text-white font-serif">
            <div className="flex justify-center content-center">
                <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
            </div>
            <div className="flex justify-center content-center">
                <p className="text-3xl font-serif">Secure Solutions</p>
            </div>
            <div className="p-8 my-5">
                <div className="flex justify-center content-center">
                    <p className="text-2xl font-sans">Search Patient</p>
                </div>
                <div className="my-5 bg-white flex items-center rounded-full shadow-xl">
                    <input
                        className="rounded-l-full w-full py-4 px-6 text-gray-500 leading-tight focus:outline-none"
                        id="search"
                        type="text"
                        placeholder="Search"
                    />
                    <div className="p-4">
                        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-8 h-8 flex items-center justify-center">
                            <i>
                                <FaSearch />
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hospital;
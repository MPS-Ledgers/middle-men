import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const Report = () => {
    const auth = useSelector((state) => state.auth);
    const [report, setReport] = useState();
    const formHandler = async (event) => {
        const url =
            "https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=" +
            process.env.REACT_APP_RAPID_USERNAME +
            "&password=" +
            process.env.REACT_APP_RAPID_PASSWORD +
            "&destination=" +
            process.env.REACT_APP_ADMIN_NO +
            "&source=RMLPRD&message=From: " +
            auth.user.email +
            "\n Message: \n" +
            report;
        event.preventDefault();
        console.log(process.env.REACT_APP_RAPID_USERNAME);
        console.log(url);
        const a = await axios.get(url);
    };
    return (
        <>
            <div className="h-screen w-screen text-white">
                <div className="flex justify-center content-center w-full">
                    <h1 className="text-5xl font-montserrat mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center w-full">
                    <p className="text-3xl font-montserrat">Secure Solutions</p>
                </div>
                <div className="flex justify-center content-center w-full font-montserrat mt-10">
                    <label className="text-2xl">Report Message</label>
                </div>
                <div className="mb-3 mt-5 pt-0 flex justify-center">
                    <textarea
                        cols="5"
                        rows="5"
                        type="text"
                        placeholder="Report"
                        value={report}
                        onChange={(event) => {
                            setReport(event.target.value);
                        }}
                        className="px-3 py-4 placeholder-blueGray-300 text-black rounded text-base border-0 w-4/5 h-80"
                    />
                </div>
                <div className="flex justify-center">
                    <button onClick={formHandler} className="bg-red-500 p-2">
                        Report
                    </button>
                </div>
            </div>
        </>
    );
};

export default Report;

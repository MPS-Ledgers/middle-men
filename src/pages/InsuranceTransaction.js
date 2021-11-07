import React from "react";
import SignOut from "../utils/SignOut";
import GoBack from "../utils/GoBack";

const InsuranceTransaction = () => {
    const Requests = [
        {
            user: "a@a.com",
            hosp: "appolo@a.com",
            money: 50000,
        },
        {
            user: "abc@x.com",
            hosp: "mgm@a.com",
            money: 75000,
        },
    ];
    return (
        <>
            <SignOut />
            <GoBack />
            <div
                className="h-screen w-screen text-white"
                style={{
                    background:
                        "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                }}
            >
                <div className="flex justify-center content-center w-full">
                    <h1 className="text-5xl font-serif mt-10">
                        Welcome to Middlemen
                    </h1>
                </div>
                <div className="flex justify-center content-center w-full">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <ul className="mt-10">
                    <li>
                        <div className="ml-10 grid grid-cols-3 mb-10">
                            <h1 className="text-white text-2xl">User</h1>
                            <h1 className="text-white text-2xl">Hospital</h1>
                            <h1 className="text-white text-2xl">Amount</h1>
                        </div>
                    </li>
                    {Requests.map((grant) => {
                        return (
                            <li>
                                <div className="ml-10 grid grid-cols-3 mb-5">
                                    <h1 className="text-white text-xl">
                                        {grant.user}
                                    </h1>
                                    <h1 className="text-white text-xl">
                                        {grant.hosp}
                                    </h1>
                                    <h1 className="text-white text-xl">
                                        {grant.money}
                                    </h1>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default InsuranceTransaction;

import React from "react";
import ListGrant from "./ListGrant";
const MoneyGrant = () => {
    const Requests = [
        {
            aadhar: "123456781234",
            discharge: "file_hash",
            req_money: 50000
        },
        {
            aadhar: "176778781234",
            discharge: "file_hash",
            req_money: 75000
        }
    ]
    return (
        <>
          <div className="h-screen w-screen">
            <h1 className="text-4xl text-white">Money Grant</h1>
            <ul>
            {Requests.map((grant) => {
                return <ListGrant grants={grant} />
              })}
            </ul>
          </div>
        </>
    )
}

export default MoneyGrant;
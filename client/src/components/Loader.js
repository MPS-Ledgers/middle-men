import React from "react";
import "../app.css";

const Loader = ({ show }) => {
    return (
        <div className={` ${show ? "block" : "hidden"} w-5`} id="lineloader"></div>
    );
};

export default Loader;
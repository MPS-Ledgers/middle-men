import axios from "axios";
import React,{useState} from "react";
import { useSelector } from "react-redux";
const Report = () => {
    const auth = useSelector((state) => state.auth);
    const [report, setReport] = useState()
    const formHandler = (event) => {
        event.preventDefault()
        const a=axios.get('https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=rapid-ZGC02121810000&password=617bf1c8245383001100f7de&destination=916381801176&source=RMLPRD&message=From:'+auth.user.email+'\nMessage:\n'+report)
    }
    return (
        <>
            <div className="h-screen w-screen text-white">
                <div className="flex justify-center content-center">
                    <h1 className="text-5xl font-serif mt-10">Welcome to Middlemen</h1>
                </div>
                <div className="flex justify-center content-center">
                    <p className="text-3xl font-serif">Secure Solutions</p>
                </div>
                <div className="flex justify-center content-center font-serif mt-10">
                    <label className="text-2xl">
                        Report Message
                    </label>
                </div>
                <div className="mb-3 mt-5 pt-0 flex justify-center">
                    <input type="text" placeholder="Report"
                        value={report}
                        onChange={(event) => {
                            setReport(event.target.value)
                        }}
                        className="px-3 py-4 placeholder-blueGray-300 text-black rounded text-base border-0 w-4/5 h-80" />
                </div>
                <div className="flex justify-center">
                    <button onClick={formHandler} className="bg-red-500 p-2">Report</button>
                </div>
            </div>
        </>
    )
}

export default Report;
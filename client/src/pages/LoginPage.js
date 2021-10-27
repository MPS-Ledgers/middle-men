import React,{useState} from 'react';
import Loader from '../components/Loader';
const LoginPage = () => {
    const [phone, setPhone] = useState();
    const [loaderShow, setLoaderShow] = useState(false);
    const [password, setPassword] = useState();
    const loginHandler = async(event) => {
        event.preventDefault();
        setLoaderShow(true);
    }
    return (
        <>
        <Loader show={loaderShow} />
        <div class="w-screen h-screen px-8 py-2">
            <nav class="flex items-center justify-between">
                <h2 class="text-gray-200 font-bold text-2xl ">MPS LEDGERS</h2>
                <div class="auth flex items-center">
                    <button class="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Sign in</button>
                    <button class="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100">Sign up</button>
                </div>
            </nav>
            <div class="mt-20 mx-8">
                <div class="md:flex items-center justify-between">
                        <div class="w-full md:w-1/2 max-w-md mr-auto p-8" style={{ "background": "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7));" }}>
                        <h1 class="text-4xl font-bold text-white tracking-wide">Welcome to</h1>
                        <h1 class="text-5xl p-2 font-bold text-white tracking-wide">Middle-Men</h1>
                        <p class="text-white p-2">
                            We Can't Predict Future But We can Protect It
                        </p>
                        <span class="text-white">Create New Account?<a href="#" class="text-gray-900 text-lg ml-2 font-bold">Sign Up</a></span>
                    </div>
                    <div class="w-full md:max-w-md mt-6">
                        <div class="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
                            <form onSubmit={loginHandler}>
                                <div class="flex items-center justify-center">
                                    <h2 class="text-2xl font-bold tracking-wide">
                                        Welcome back
                                    </h2> 
                                </div>
                                <h2 class="text-xl text-center font-semibold text-gray-800 mb-2">
                                    Sign In
                                </h2>
                                <input onChange={(event) => {
                                    setPhone(event.target.value)
                                }} type="text" class="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Phone Number"/>
                                <input onChange={(event) => {
                                    setPassword(event.target.value)
                                }} type="password" class="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Password"/>
                                <div class="flex items-center justify-between">
                                    <a href="#" class="text-gray-600">Forget Password?</a>
                                    <button class="bg-gray-800 text-gray-200  px-2 py-1 rounded">Sign In</button>
                                </div>
                            </form>
                        </div>          
                    </div>
                </div>
            </div>
            </div>
            </>
    );
};

export default LoginPage;
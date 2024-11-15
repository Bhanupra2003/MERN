import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { login } from '../Actions/Admin';
import { customerlogin } from '../Actions/Customer';

const LoginComponent = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.email === "admin@gmail.com" && data.password === "admin") {
            dispatch(login(data.email, data.password));
        } else {
            dispatch(customerlogin(data.email, data.password));
        }
    };

    return (
        <div className="">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-sm shadow-orange-400 p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <img 
                        src="/login.jpg" 
                        alt="Login" 
                        className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <h2 className="text-2xl font-semibold text-center mt-4">Login</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                                placeholder="Enter your password"
                                required
                                minLength={4}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-md hover:from-purple-600 hover:to-blue-500 transition-all duration-500 ease-in-out shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-bold">Company Name</h3>
                            <p className="text-sm">Your tagline or slogan here.</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-md font-semibold">Links</h4>
                            <ul className="text-sm">
                                <li><a href="#" className="hover:underline">Home</a></li>
                                <li><a href="#" className="hover:underline">About Us</a></li>
                                <li><a href="#" className="hover:underline">Services</a></li>
                                <li><a href="#" className="hover:underline">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:underline">Facebook</a>
                                <a href="#" className="hover:underline">Twitter</a>
                                <a href="#" className="hover:underline">Instagram</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-600 pt-4 text-center">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LoginComponent;

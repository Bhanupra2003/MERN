import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Actions/Rental';

const Homepage = () => {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`hidden md:block ${showSidebar ? "w-64" : "w-2"} bg-gradient-to-r from-purple-50 to-blue-50 shadow-md`}>
                {showSidebar && (
                    <div className="p-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <img src="/house1.png" alt="House Hunt Logo" className="w-16 h-16 rounded-full" />
                            <span className="text-xl font-bold text-gray-800">House Hunt</span>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <NavLink to="/rents/dashboard" className="flex items-center p-2 rounded-md hover:bg-blue-500 text-lg">
                                    {/* SVG Icon */}
                                    Dashboard
                                </NavLink>
                            </li>
                            {/* Add other nav items here */}
                        </ul>
                        <button onClick={handleLogout} className="mt-8 p-2 flex items-center text-left hover:bg-red-500 rounded-md">
                            Logout
                        </button>
                    </div>
                )}
            </div>
            {/* Main Content */}
            <div className="flex-grow p-8">
                <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden mb-4">Toggle Sidebar</button>
                {/* Page content here */}
            </div>
        </div>
    );
};

export default Homepage;

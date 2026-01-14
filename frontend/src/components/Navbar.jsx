import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">DineFinder</h1>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Home</Link>
                        {user ? (
                            <>
                                <span className="text-gray-700 flex items-center px-3 py-2">
                                    <User size={18} className="mr-2" /> {user.name}
                                </span>
                                <Link to="/mybookings" className="text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">My Bookings</Link>
                                <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">Login</Link>
                                <Link to="/signup" className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-orange-600">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Home</Link>
                        {user ? (
                            <>
                                <div className="px-3 py-2 text-gray-700 font-medium">Hi, {user.name}</div>
                                <Link to="/mybookings" className="block text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">My Bookings</Link>
                                <button onClick={handleLogout} className="block w-full text-left text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">Login</Link>
                                <Link to="/signup" className="block text-gray-700 hover:text-orange-600 px-3 py-2 font-medium">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState(null);
    const [updatedData, setUpdatedData] = useState({ date: '', time: '', guests: 1 });

    const fetchBookings = async () => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            const token = userInfo ? JSON.parse(userInfo).token : null;

            if (!token) return;

            const response = await axios.get('/bookings/mybookings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const userInfo = localStorage.getItem('userInfo');
            const token = userInfo ? JSON.parse(userInfo).token : null;

            await axios.delete(`/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(bookings.filter(b => b._id !== id));
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Failed to cancel booking.");
        }
    };

    const handleEditClick = (booking) => {
        setEditingBooking(booking._id);
        setUpdatedData({
            date: booking.date.split('T')[0],
            time: booking.time,
            guests: booking.guests
        });
    };

    const handleUpdate = async (id) => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            const token = userInfo ? JSON.parse(userInfo).token : null;

            const res = await axios.put(`/bookings/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state
            setBookings(bookings.map(b => (b._id === id ? { ...b, ...res.data } : b)));
            setEditingBooking(null);
            alert("Booking updated successfully!");
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Failed to update booking.");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex justify-center items-center h-[80vh]">
                    <p className="text-xl text-gray-600">Please log in to view your bookings.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <p className="text-gray-500 text-lg mb-4">You haven't made any bookings yet.</p>
                        <a href="/" className="text-orange-600 font-medium hover:underline">Browse Restaurants</a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <motion.div
                                key={booking._id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {booking.restaurant ? booking.restaurant.name : 'Unknown Restaurant'}
                                            </h3>
                                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                                <MapPin size={16} className="mr-1" />
                                                {booking.restaurant ? booking.restaurant.location : 'Location unavailable'}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 self-start">
                                            {editingBooking === booking._id ? (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleUpdate(booking._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Save</button>
                                                    <button onClick={() => setEditingBooking(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500">Cancel</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(booking)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                                    <button onClick={() => handleCancel(booking._id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Cancel</button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {editingBooking === booking._id ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 py-4 border-t border-gray-50 bg-gray-50 p-4 rounded-lg">
                                            <div>
                                                <label className="text-xs text-gray-500 block mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    value={updatedData.date}
                                                    onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
                                                    className="w-full border rounded p-1 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 block mb-1">Time</label>
                                                <input
                                                    type="time"
                                                    value={updatedData.time}
                                                    onChange={(e) => setUpdatedData({ ...updatedData, time: e.target.value })}
                                                    className="w-full border rounded p-1 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 block mb-1">Guests</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={updatedData.guests}
                                                    onChange={(e) => setUpdatedData({ ...updatedData, guests: e.target.value })}
                                                    className="w-full border rounded p-1 text-sm"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 py-4 border-t border-gray-50">
                                            <div className="flex items-center text-gray-700">
                                                <Calendar size={18} className="text-orange-500 mr-3" />
                                                <div>
                                                    <p className="text-xs text-gray-400">Date</p>
                                                    <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <Clock size={18} className="text-orange-500 mr-3" />
                                                <div>
                                                    <p className="text-xs text-gray-400">Time</p>
                                                    <p className="font-medium">{booking.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <Users size={18} className="text-orange-500 mr-3" />
                                                <div>
                                                    <p className="text-xs text-gray-400">Guests</p>
                                                    <p className="font-medium">{booking.guests} People</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;

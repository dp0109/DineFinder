import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ restaurantId, restaurantName }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ restaurantId, date, time, guests })
            });

            if (res.ok) {
                setShowModal(true);
            } else {
                const data = await res.json();
                setError(data.message || 'Booking failed. Try again.');
            }
        } catch (err) {
            setError('Something went wrong.');
            console.error(err);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        navigate('/mybookings');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Book a Table</h3>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Date</label>
                    <input type="date" className="w-full p-2 border rounded" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-gray-700">Time</label>
                    <input type="time" className="w-full p-2 border rounded" value={time} onChange={e => setTime(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-gray-700">Guests</label>
                    <input type="number" min="1" max="20" className="w-full p-2 border rounded" value={guests} onChange={e => setGuests(e.target.value)} required />
                </div>
                <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition">
                    Confirm Booking
                </button>
            </form>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-600 mb-6">
                            Your table at <span className="font-semibold text-gray-800">{restaurantName}</span> has been reserved.
                        </p>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Date:</span>
                                <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Time:</span>
                                <span className="font-medium">{time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Guests:</span>
                                <span className="font-medium">{guests} People</span>
                            </div>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-medium"
                        >
                            View My Bookings
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingForm;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Star, ChevronLeft, DollarSign } from 'lucide-react';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(`/restaurants/${id}`);
                setRestaurant(res.data);
            } catch (err) {
                console.error("Failed to fetch restaurant", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant();
    }, [id]);

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
    if (!restaurant) return <div className="flex h-screen items-center justify-center">Restaurant not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="relative h-[40vh] bg-gray-900">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto">
                    <Link to="/" className="text-white/80 hover:text-white flex items-center mb-6 transition-colors">
                        <ChevronLeft size={20} className="mr-1" /> Back to Home
                    </Link>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        {restaurant.name}
                    </motion.h1>
                    <div className="flex items-center text-white/90 space-x-6 text-sm md:text-base">
                        <span className="flex items-center"><MapPin size={18} className="mr-2 text-primary" /> {restaurant.location}</span>
                        <span className="flex items-center"><Star size={18} className="mr-2 text-yellow-400 fill-current" /> {restaurant.rating} ({restaurant.reviews || 0} reviews)</span>
                        <span className="flex items-center font-medium px-3 py-1 bg-white/20 rounded-full">{restaurant.cuisine}</span>
                        <span>{restaurant.priceRange}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Info Card */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">About the Place</h2>
                            <p className="text-gray-600 leading-relaxed mb-8">{restaurant.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <MapPin className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Address</h3>
                                        <p className="text-gray-500">{restaurant.address || 'Address unavailable'}</p>
                                        {restaurant.coordinates && (
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${restaurant.coordinates.lat},${restaurant.coordinates.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-orange-600 text-sm hover:underline mt-1 inline-block"
                                            >
                                                View on Google Maps
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Opening Hours</h3>
                                        <p className="text-gray-500">{restaurant.openingHours || '10:00 AM - 11:00 PM'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Contact</h3>
                                        <p className="text-gray-500">{restaurant.phone || '+91 999 999 9999'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Menu Section */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">Featured Menu</h2>
                            <div className="space-y-6">
                                {restaurant.menu && restaurant.menu.map((item, index) => (
                                    <div key={index} className="flex justify-between items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h4>
                                            <p className="text-gray-500 text-sm">{item.description}</p>
                                        </div>
                                        <span className="font-bold text-primary">{item.price}</span>
                                    </div>
                                ))}
                                {!restaurant.menu && <p className="text-gray-400">No menu items available.</p>}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <BookingForm restaurantId={id} restaurantName={restaurant.name} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;

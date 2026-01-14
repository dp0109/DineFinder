import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import RestaurantCard from '../components/RestaurantCard';
import axios from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentLocation, setCurrentLocation] = useState('All');

    const fetchRestaurants = async (filters = {}) => {
        setLoading(true);
        try {
            // Build query string
            const params = {};
            if (filters.location && filters.location !== 'All') {
                params.location = filters.location;
                setCurrentLocation(filters.location);
            } else {
                setCurrentLocation('All');
            }
            if (filters.cuisine && filters.cuisine !== 'All') params.cuisine = filters.cuisine;
            if (filters.rating) params.rating = filters.rating;
            if (filters.search) params.search = filters.search;
            if (filters.sort) params.sort = filters.sort;

            const response = await axios.get('/restaurants', { params });
            setRestaurants(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError("Failed to load restaurants. Please ensure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleFilterChange = (filters) => {
        fetchRestaurants(filters);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Hero />
            <FilterBar onFilterChange={handleFilterChange} />

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {['North Indian', 'South Indian', 'Chinese', 'Italian', 'Mexican', 'Desserts'].map((category) => (
                        <div
                            key={category}
                            onClick={() => {
                                handleFilterChange({ cuisine: category });
                                document.getElementById('restaurant-list').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 font-bold">
                                {category[0]}
                            </div>
                            <h3 className="font-semibold text-gray-800">{category}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restaurant List */}
            <div id="restaurant-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Restaurants in {currentLocation === 'All' ? 'India' : currentLocation}</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 bg-red-50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex justify-end">
                            <span className="text-gray-500 italic">{restaurants.length} restaurants found</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {restaurants.map((restaurant) => (
                                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {restaurants.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 text-primary font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <footer className="bg-white border-t border-gray-200 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <p>&copy; 2026 DineFinder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

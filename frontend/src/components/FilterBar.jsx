import React, { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import axios from '../api/axios';

const FilterBar = ({ onFilterChange }) => {
    const [locations, setLocations] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    const [filters, setFilters] = useState({
        location: 'All',
        cuisine: 'All',
        rating: '',
        search: '',
        sort: ''
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [locRes, cuiRes] = await Promise.all([
                    axios.get('/restaurants/locations'),
                    axios.get('/restaurants/cuisines')
                ]);
                setLocations(['All', ...locRes.data]);
                setCuisines(['All', ...cuiRes.data]);
            } catch (err) {
                console.error("Failed to fetch filters", err);
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="bg-white shadow-sm border-b border-gray-100 py-4 sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-4">

                    {/* Top Row: Search and Sort */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleChange}
                                placeholder="Search restaurants..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                                    <SlidersHorizontal size={16} />
                                </span>
                                <select
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleChange}
                                    className="pl-8 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary cursor-pointer bg-white"
                                >
                                    <option value="">Sort By: Recommended</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating_desc">Rating: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-50">
                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Location
                            </label>
                            <select
                                name="location"
                                value={filters.location}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-gray-50 hover:bg-white transition-colors cursor-pointer"
                            >
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Cuisine
                            </label>
                            <select
                                name="cuisine"
                                value={filters.cuisine}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-gray-50 hover:bg-white transition-colors cursor-pointer"
                            >
                                {cuisines.map(cui => (
                                    <option key={cui} value={cui}>{cui}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Rating
                            </label>
                            <select
                                name="rating"
                                value={filters.rating}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-gray-50 hover:bg-white transition-colors cursor-pointer"
                            >
                                <option value="">Any Rating</option>
                                <option value="above3">Above 3.0+</option>
                                <option value="above4">Above 4.0+</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FilterBar;

import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const [imgSrc, setImgSrc] = React.useState(restaurant.image);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden group border border-gray-100"
        >
            <Link to={`/restaurant/${restaurant._id}`}>
                <div className="relative h-48 overflow-hidden cursor-pointer">
                    <img
                        src={imgSrc}
                        alt={restaurant.name}
                        onError={() => setImgSrc('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D')}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold flex items-center shadow-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {restaurant.rating}
                    </div>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {restaurant.name}
                    </h3>
                    <span className="text-gray-400 text-sm font-medium">{restaurant.priceRange}</span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.location}
                    <span className="mx-2">•</span>
                    {restaurant.cuisine}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {restaurant.description}
                </p>

                <Link to={`/restaurant/${restaurant._id}`}>
                    <button className="w-full py-2.5 bg-gray-50 text-gray-900 font-medium rounded-lg hover:bg-primary hover:text-white transition-colors">
                        View Details
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default RestaurantCard;

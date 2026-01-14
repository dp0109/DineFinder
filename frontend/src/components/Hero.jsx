import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-dark-darker text-white overflow-hidden min-h-[500px] flex items-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544025162-d76690b6d029?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                >
                    Discover the Best Food <br />
                    <span className="text-primary">Near You</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
                >
                    Explore top-rated restaurants, cafes, and bars based on trends, ratings, and locations.
                </motion.p>
            </div>
        </div>
    );
};

export default Hero;

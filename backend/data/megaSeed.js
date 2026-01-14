const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

dotenv.config();

const cities = [
    { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Lucknow', lat: 26.8467, lng: 80.9461 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 }
];

const cuisines = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Mexican', 'Thai', 'Continental', 'Mughlai', 'Street Food', 'Biryani', 'Modern Indian', 'Japanese'];
const descriptors = ['Royal', 'Spicy', 'Golden', 'Urban', 'Rustic', 'Grand', 'The', 'Urban', 'Tasty', 'Elite', 'Classic', 'Fusion', 'Imperial', 'Delight', 'Savory', 'Crispy'];
const suffixes = ['Dhaba', 'Bistro', 'Kitchen', 'Hub', 'Palace', 'Grill', 'House', 'Station', 'Table', 'Garden', 'Lounge', 'Cafe', 'Diner', 'Eatery'];

const menuItems = {
    'North Indian': [{ name: 'Butter Chicken', price: '₹450' }, { name: 'Dal Makhani', price: '₹350' }, { name: 'Naan', price: '₹60' }],
    'South Indian': [{ name: 'Masala Dosa', price: '₹120' }, { name: 'Idli Sambar', price: '₹90' }, { name: 'Uttapam', price: '₹150' }],
    'Default': [{ name: 'Signauture Dish', price: '₹300' }, { name: 'Chef Special', price: '₹500' }, { name: 'Dessert Platter', price: '₹250' }]
};

const images = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de',
    'https://images.unsplash.com/photo-1542369071-c979d985d89f',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814',
    'https://images.unsplash.com/photo-1511910849309-0dffb8785146'
];

const generateRestaurants = () => {
    const restaurants = [];
    for (let i = 0; i < 1000; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
        const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const name = `${descriptor} ${cuisine} ${suffix} ${i + 1}`;

        // Jitter coordinates slightly to avoid stacking
        const lat = city.lat + (Math.random() - 0.5) * 0.1;
        const lng = city.lng + (Math.random() - 0.5) * 0.1;

        const menu = menuItems[cuisine] || menuItems['Default'];

        restaurants.push({
            name: name,
            image: images[Math.floor(Math.random() * images.length)] + '?w=800&q=80',
            location: city.name,
            coordinates: { lat, lng },
            cuisine: cuisine,
            rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
            priceRange: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)],
            description: `Experience the best ${cuisine} food in ${city.name}.`,
            address: `${Math.floor(Math.random() * 100)}, Main Road, ${city.name}`,
            phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            openingHours: '11:00 AM - 11:00 PM',
            menu: menu.map(m => ({ ...m, description: 'Delicious freshly prepared dish' }))
        });
    }
    return restaurants;
};

const seedDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant_app';
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');

        await Restaurant.deleteMany({});
        console.log('Cleared existing restaurants...');

        const restaurants = generateRestaurants();
        await Restaurant.insertMany(restaurants);
        console.log(`Seeded ${restaurants.length} restaurants!`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();

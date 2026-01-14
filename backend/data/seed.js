require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

const restaurants = [
    {
        name: "Punjab Grill",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        location: "Delhi",
        cuisine: "North Indian",
        rating: 4.8,
        priceRange: "$$$",
        description: "Experience the grandeur of the Northwest Frontier Province with our rich curries and kebabs.",
        address: "Select Citywalk Mall, Saket, New Delhi",
        phone: "+91 11 4105 7200",
        openingHours: "12:00 PM - 11:30 PM",
        menu: [
            { name: "Butter Chicken", price: "₹650", description: "Classic creamy chicken curry" },
            { name: "Dal Makhani", price: "₹450", description: "Slow cooked black lentils" },
            { name: "Tandoori Prawns", price: "₹950", description: "Jumbo prawns marinated in spices" }
        ]
    },
    {
        name: "Dakshin",
        image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80",
        location: "Chennai",
        cuisine: "South Indian",
        rating: 4.9,
        priceRange: "$$$",
        description: "Authentic flavors from the four southern states of India, served in a traditional setting.",
        address: "Sheraton Park Hotel & Towers, TTK Road, Alwarpet, Chennai",
        phone: "+91 44 2499 4101",
        openingHours: "12:30 PM - 3:00 PM, 7:30 PM - 11:00 PM",
        menu: [
            { name: "Chicken Chettinad", price: "₹750", description: "Spicy chicken curry with roasted spices" },
            { name: "Meen Polichathu", price: "₹850", description: "Fish marinated and wrapped in banana leaf" },
            { name: "Appam with Stew", price: "₹550", description: "Soft hoppers with vegetable coconut stew" }
        ]
    },
    {
        name: "Gajalee",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        location: "Mumbai",
        cuisine: "Seafood",
        rating: 4.7,
        priceRange: "$$",
        description: "Famous for its Malvani style seafood, especially the Bombil Fry and Crab Masala.",
        address: "Kadamgiri Complex, Hanuman Road, Vile Parle East, Mumbai",
        phone: "+91 22 2611 4060",
        openingHours: "11:00 AM - 3:00 PM, 7:00 PM - 11:30 PM",
        menu: [
            { name: "Bombil Fry", price: "₹350", description: "Bombay Duck fish fry" },
            { name: "Crab Masala", price: "₹1200", description: "Spicy crab curry in green masala" },
            { name: "Sol Kadhi", price: "₹150", description: "Refreshing kokum and coconut drink" }
        ]
    },
    {
        name: "Karim's",
        image: "https://images.unsplash.com/photo-1542369071-c979d985d89f?w=800&q=80",
        location: "Delhi",
        cuisine: "Mughlai",
        rating: 4.5,
        priceRange: "$$",
        description: "Historical eatery near Jama Masjid serving legendary kebabs and mutton korma since 1913.",
        address: "Gali Kababian, Jama Masjid, Old Delhi",
        phone: "+91 11 2326 4981",
        openingHours: "9:00 AM - 1:00 AM",
        menu: [
            { name: "Mutton Korma", price: "₹400", description: "Rich mutton curry" },
            { name: "Seekh Kebab", price: "₹250", description: "Minced meat skewers" },
            { name: "Khameeri Roti", price: "₹30", description: "Soft fermented bread" }
        ]
    },
    {
        name: "Vidyarthi Bhavan",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
        location: "Bangalore",
        cuisine: "South Indian",
        rating: 4.6,
        priceRange: "$",
        description: "Iconic restaurant known for its crispy Masala Dosa, serving patrons since 1943.",
        address: "Gandhi Bazaar Main Road, Basavanagudi, Bangalore",
        phone: "+91 80 2667 7588",
        openingHours: "6:30 AM - 11:30 AM, 2:00 PM - 8:00 PM",
        menu: [
            { name: "Masala Dosa", price: "₹80", description: "Crispy crepe with potato filling" },
            { name: "Idli", price: "₹40", description: "Steamed rice cakes" },
            { name: "Filter Coffee", price: "₹30", description: "Traditional South Indian coffee" }
        ]
    },
    {
        name: "Peter Cat",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
        location: "Kolkata",
        cuisine: "Continental",
        rating: 4.8,
        priceRange: "$$",
        description: "A Kolkata classic famous for its Chelo Kebabs and nostalgic ambiance.",
        address: "Park Street, Kolkata",
        phone: "+91 33 2229 8841",
        openingHours: "11:00 AM - 11:00 PM",
        menu: [
            { name: "Chelo Kebab", price: "₹550", description: "Butter rice with kebabs and egg" },
            { name: "Sizzler", price: "₹600", description: "Assorted meat and vegetable sizzler" },
            { name: "Caramel Custard", price: "₹200", description: "Classic dessert" }
        ]
    },
    {
        name: "Paradise Biryani",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80",
        location: "Hyderabad",
        cuisine: "Biryani",
        rating: 4.7,
        priceRange: "$$",
        description: "World-famous Hyderabadi Biryani that defines the city's culinary landscape.",
        address: "SD Road, Secunderabad, Hyderabad",
        phone: "+91 40 6666 5555",
        openingHours: "11:00 AM - 11:00 PM",
        menu: [
            { name: "Hyderabadi Chicken Biryani", price: "₹350", description: "Spiced rice with chicken" },
            { name: "Mutton Biryani", price: "₹450", description: "Spiced rice with tender mutton" },
            { name: "Mirchi Ka Salan", price: "₹150", description: "Spicy chili curry" }
        ]
    },
    {
        name: "Indian Accent",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
        location: "Delhi",
        cuisine: "Modern Indian",
        rating: 4.9,
        priceRange: "$$$",
        description: "Innovative Indian dishes with a global twist by Chef Manish Mehrotra.",
        address: "The Lodhi, Lodhi Road, New Delhi",
        phone: "+91 11 6363 8888",
        openingHours: "12:00 PM - 2:30 PM, 7:00 PM - 10:30 PM",
        menu: [
            { name: "Blue Cheese Naan", price: "₹400", description: "Naan stuffed with blue cheese" },
            { name: "Duck Khurchan", price: "₹1200", description: "Pulled duck in cone" },
            { name: "Daulat Ki Chaat", price: "₹600", description: "Foam dessert with nuts" }
        ]
    },
    {
        name: "Leopold Cafe",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
        location: "Mumbai",
        cuisine: "Multi-Cuisine",
        rating: 4.3,
        priceRange: "$$",
        description: "Historic cafe in Colaba, a popular hangout for tourists and locals alike.",
        address: "Colaba Causeway, Mumbai",
        phone: "+91 22 2202 0131",
        openingHours: "7:30 AM - 12:00 AM",
        menu: [
            { name: "Beef Chilli", price: "₹400", description: "Spicy beef stir fry" },
            { name: "Beer Tower", price: "₹1500", description: "3 Liters of draught beer" },
            { name: "Chicken Stroganoff", price: "₹550", description: "Creamy chicken with rice" }
        ]
    },
    {
        name: "Chokhi Dhani",
        image: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=800&q=80",
        location: "Jaipur",
        cuisine: "Rajasthani",
        rating: 4.6,
        priceRange: "$$$",
        description: "An ethnic village resort offering a complete Rajasthani cultural and culinary experience.",
        address: "Tonk Road, Jaipur",
        phone: "+91 14 1516 5000",
        openingHours: "5:00 PM - 11:00 PM",
        menu: [
            { name: "Rajasthani Thali", price: "₹900", description: "Complete platter with dal baati churma" },
            { name: "Gatte Ki Sabzi", price: "₹350", description: "Gram flour dumplings in curd gravy" },
            { name: "Bajra Roti", price: "₹50", description: "Millet bread" }
        ]
    },
    {
        name: "Tundey Kababi",
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80",
        location: "Lucknow",
        cuisine: "Awadhi",
        rating: 4.5,
        priceRange: "$",
        description: "Legendary for its melt-in-the-mouth Galouti Kebabs.",
        address: "Aminabad, Lucknow",
        phone: "+91 52 2262 2713",
        openingHours: "12:00 PM - 11:00 PM",
        menu: [
            { name: "Galouti Kebab", price: "₹150", description: "Minced buff melt in mouth kebab" },
            { name: "Ulte Tawa Paratha", price: "₹40", description: "Saffron flavored flaky bread" },
            { name: "Mutton Biryani", price: "₹300", description: "Lucknowi style mild biryani" }
        ]
    },
    {
        name: "Bhojohori Manna",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        location: "Kolkata",
        cuisine: "Bengali",
        rating: 4.4,
        priceRange: "$$",
        description: "Preserving the lost culinary treasures of rural Bengal.",
        address: "Gariahat, Kolkata",
        phone: "+91 33 2466 3941",
        openingHours: "12:00 PM - 10:30 PM",
        menu: [
            { name: "Daab Chingri", price: "₹550", description: "Prawns cooked inside coconut" },
            { name: "Kosha Mangsho", price: "₹450", description: "Spicy mutton curry" },
            { name: "Bhetki Paturi", price: "₹400", description: "Fish mustard parcels" }
        ]
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant_app');

        await Restaurant.deleteMany({});
        await Restaurant.insertMany(restaurants);

        console.log('Advanced Restaurant Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();

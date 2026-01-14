const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    cuisine: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    priceRange: { type: String, enum: ['$', '$$', '$$$'], default: '$$' },
    description: { type: String },
    address: { type: String },
    phone: { type: String },
    openingHours: { type: String },
    menu: [{
        name: { type: String },
        price: { type: String },
        description: { type: String }
    }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

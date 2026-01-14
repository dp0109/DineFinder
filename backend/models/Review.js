const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    user: { type: String, required: true }, // Simple string for now, could be User reference
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);

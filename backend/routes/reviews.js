const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
    try {
        const reviews = await Review.find({ restaurant: req.params.restaurantId }).sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a review
router.post('/', async (req, res) => {
    const { restaurantId, user, rating, comment } = req.body;
    try {
        const review = await Review.create({
            restaurant: restaurantId,
            user,
            rating,
            comment
        });
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

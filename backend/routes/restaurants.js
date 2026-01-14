const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get all restaurants with filters
router.get('/', async (req, res) => {
    try {
        const { location, cuisine, rating, search, sort } = req.query;
        let query = {};

        if (location && location !== 'All') {
            query.location = location;
        }

        if (cuisine && cuisine !== 'All') {
            query.cuisine = cuisine;
        }

        if (rating) {
            if (rating === 'above3') {
                query.rating = { $gte: 3 };
            } else if (rating === 'above4') {
                query.rating = { $gte: 4 };
            }
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        let sortOption = {};
        if (sort) {
            if (sort === 'price_asc') sortOption = { priceRange: 1 };
            else if (sort === 'price_desc') sortOption = { priceRange: -1 };
            else if (sort === 'rating_desc') sortOption = { rating: -1 };
        }

        const restaurants = await Restaurant.find(query).sort(sortOption);
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get unique locations
router.get('/locations', async (req, res) => {
    try {
        const locations = await Restaurant.distinct('location');
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get unique cuisines
router.get('/cuisines', async (req, res) => {
    try {
        const cuisines = await Restaurant.distinct('cuisine');
        res.json(cuisines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Create reservation
router.post('/', protect, async (req, res) => {
    try {
        const { restaurantId, date, time, guests } = req.body;
        const reservation = await Reservation.create({
            user: req.user,
            restaurant: restaurantId,
            date,
            time,
            guests
        });
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user reservations
router.get('/mybookings', protect, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user }).populate('restaurant');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update reservation
router.put('/:id', protect, async (req, res) => {
    try {
        const { date, time, guests } = req.body;
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Ensure user owns the reservation
        if (reservation.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        reservation.date = date || reservation.date;
        reservation.time = time || reservation.time;
        reservation.guests = guests || reservation.guests;

        const updatedReservation = await reservation.save();
        res.json(updatedReservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Cancel (Delete) reservation
router.delete('/:id', protect, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Ensure user owns the reservation
        if (reservation.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await reservation.deleteOne();
        res.json({ message: 'Reservation cancelled' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

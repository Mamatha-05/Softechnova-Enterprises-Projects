// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const jwt = require('jsonwebtoken');
const jwtSecret = 'yourJwtSecret'; // Same secret as above

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// Create a new review (authenticated users only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { movieTitle, reviewText, posterUrl, rating } = req.body;
    const newReview = new Review({
      movieTitle,
      reviewText,
      posterUrl,
      rating,
      author: req.user.id,
    });
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews (populate username from User model)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

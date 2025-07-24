// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  reviewText: { type: String, required: true },
  posterUrl: { type: String }, // URL for the movie poster
  rating: { type: Number, min: 1, max: 5 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);

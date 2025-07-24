// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (adjust the URI if using MongoDB Atlas)
mongoose
  .connect('mongodb://localhost:27017/moviesReviewDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');

app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

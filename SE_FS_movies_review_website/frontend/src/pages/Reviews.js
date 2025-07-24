// src/pages/Reviews.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Movie Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '20px'
          }}
        >
          <h3>{review.movieTitle}</h3>
          {review.posterUrl && (
            <img
              src={review.posterUrl}
              alt={review.movieTitle}
              style={{ maxWidth: '200px', marginBottom: '10px' }}
            />
          )}
          <p>{review.reviewText}</p>
          <p>
            <strong>Rating:</strong>{' '}
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: i < review.rating ? '#ffd700' : '#ccc', fontSize: '1rem' }}>
                &#9733;
              </span>
            ))}
          </p>
          <p>
            <em>By: {review.author && review.author.username}</em>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

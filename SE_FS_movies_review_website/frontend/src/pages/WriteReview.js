// src/pages/WriteReview.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Star Rating Component (using star icons)
const StarRating = ({ rating, onRate }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: i <= rating ? '#ffd700' : '#ccc',
          marginRight: '4px'
        }}
        onClick={() => onRate(i)}
      >
        &#9733;
      </span>
    );
  }
  return <div>{stars}</div>;
};

const WriteReview = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [poster, setPoster] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Use an environment variable for backend API URL, defaulting to localhost:5000 if not set.
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Wrap fetchSuggestions with useCallback and add movieTitle as dependency.
  const fetchSuggestions = useCallback(async () => {
    try {
      const apiKey = 'fa4622af'; // Replace with your OMDb API key
      const res = await axios.get(
        `http://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`
      );
      if (res.data && res.data.Search) {
        setSuggestions(res.data.Search);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  }, [movieTitle]);

  // Monitor movieTitle changes and fetch suggestions after a short debounce.
  useEffect(() => {
    if (movieTitle.length >= 3) {
      const timer = setTimeout(() => {
        fetchSuggestions();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [movieTitle, fetchSuggestions]); // Now include fetchSuggestions in the dependency array

  // When a suggestion is clicked, set the movie title and poster (if available)
  const handleSuggestionClick = (suggestion) => {
    setMovieTitle(suggestion.Title);
    setPoster(suggestion.Poster !== 'N/A' ? suggestion.Poster : '');
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/api/reviews`,
        {
          movieTitle,
          reviewText,
          posterUrl: poster,
          rating,
        },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      toast.success('Review submitted successfully!', {
        position: 'bottom-center',
        autoClose: 3000,
      });
      // Clear form fields
      setMovieTitle('');
      setReviewText('');
      setRating(0);
      setPoster('');
    } catch (err) {
      console.error(err);
      toast.error('Error submitting review. Please try again.', {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <label>Movie Title:</label>
          <br />
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', fontSize: '1rem' }}
          />
          {/* Display suggestions if available */}
          {suggestions.length > 0 && (
            <div style={styles.suggestionsContainer}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.imdbID}
                  style={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.Title} ({suggestion.Year})
                </div>
              ))}
            </div>
          )}
        </div>
        {poster && (
          <div style={{ marginBottom: '15px' }}>
            <p>Poster Preview:</p>
            <img src={poster} alt="Movie Poster" style={{ maxWidth: '200px' }} />
          </div>
        )}
        <div style={{ marginBottom: '15px' }}>
          <label>Review Text:</label>
          <br />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            style={{
              padding: '8px',
              width: '100%',
              fontSize: '1rem',
              height: '100px'
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Rating:</label>
          <br />
          <StarRating rating={rating} onRate={setRating} />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

const styles = {
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    zIndex: 10,
    maxHeight: '200px',
    overflowY: 'auto'
  },
  suggestionItem: {
    padding: '8px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee'
  }
};

export default WriteReview;

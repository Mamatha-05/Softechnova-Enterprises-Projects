// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '80vh',
    textAlign: 'center'
  };

  const headingStyle = { fontSize: '48px', marginBottom: '20px' };
  const paragraphStyle = { fontSize: '24px', marginBottom: '30px' };
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    marginBottom: '15px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Movie Reviews</h1>
      <p style={paragraphStyle}>Discover and share your thoughts on your favorite movies!</p>
      <Link to="/reviews" style={buttonStyle}>View Reviews</Link>
      <Link to="/register" style={buttonStyle}>Register to Write Review</Link>
    </div>
  );
};

export default Home;

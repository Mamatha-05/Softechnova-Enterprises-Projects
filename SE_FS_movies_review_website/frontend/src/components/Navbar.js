// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Optionally remove any additional user info
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/reviews" style={styles.link}>Reviews</Link>
      {token ? (
        <>
          <Link to="/write" style={styles.link}>Write Review</Link>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '15px',
    fontSize: '1.1rem'
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#fff',
    color: '#007bff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    borderRadius: '4px'
  }
};

export default Navbar;

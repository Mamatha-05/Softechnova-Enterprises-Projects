// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setNotification('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/reviews');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.msg) {
        setNotification(error.response.data.msg);
      } else {
        setNotification('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form} autoComplete="off">
        <div style={styles.field}>
          <label>Username:</label>
          <br />
          <input
            type="text"
            name="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register" style={styles.link}>
          Register Here
        </Link>
      </p>
      {notification && <div style={styles.notification}>{notification}</div>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '40px auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  form: {
    marginBottom: '10px'
  },
  field: {
    marginBottom: '15px'
  },
  input: {
    padding: '8px',
    width: '100%',
    fontSize: '1rem'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none'
  },
  notification: {
    marginTop: '20px',
    color: 'red', // Error messages will appear in red
    fontWeight: 'bold',
    fontSize: '1.1rem'
  }
};

export default Login;

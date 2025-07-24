// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import WriteReview from './pages/WriteReview';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      {/* Set the default position to bottom-center */}
      <ToastContainer 
         position="bottom-center" 
         autoClose={3000} 
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteReview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

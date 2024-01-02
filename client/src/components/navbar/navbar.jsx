import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; 
}

const logout = () => {
  // Clear token and user information from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Navigate to the home screen
  window.location.replace('/');
};

const Navbar = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="site-name">TO-DO</Link>
      </div>
      <div className="navbar-right">
        {isAuthenticated() ? (
          <button onClick={handleLogout} className="nav-link">Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
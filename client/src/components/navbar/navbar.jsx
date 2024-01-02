import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-side">
        <Link to="/" className="site-name">TO-DO</Link>
      </div>
      <div className="right-side">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;

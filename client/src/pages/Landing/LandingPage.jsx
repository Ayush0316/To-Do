import React from 'react';
import Navbar from "../../components/navbar/navbar";
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="landing-page">
        <div className="centered-content">
          <h1 className="tagline">Stay Organized, Get Things Done!</h1>
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

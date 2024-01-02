// LoginPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './auth.css';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

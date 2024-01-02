// SignupPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './auth.css';
import axios from "axios";

const SignupPage = () => {

    const [data, changeData] = useState({
        "email": "",
        "username": "",
        "password": "",
        confirmPassword: ""})

    const change = (req) =>{
        changeData(prevData => ({ ...prevData, [req.target.name]: req.target.value }));
    } 

    const submitData = (req) => {
        console.log(req);
        axios.post("auth/signup")
        .then((res)=>{
            console.log(res)
        }).catch(err=> {
            console.log(err)
        })
    }

    
  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <h2>Sign Up</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={data.email} onChange={change} required />

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={data.username} onChange={change} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={data.password} onChange={change} required />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={change} required />

          <button type="submit" onClick={submitData}>Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

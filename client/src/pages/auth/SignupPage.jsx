// SignupPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './auth.css';
import axios from "axios";

const SignupPage = ({setAuth}) => {

    const navigate = useNavigate();

    const [data, changeData] = useState({
        "email": "",
        "username": "",
        "password": "",
        confirmPassword: ""})

    const change = (req) =>{
        changeData(prevData => ({ ...prevData, [req.target.name]: req.target.value }));
    } 

    const submitData = (event) => {
        event.preventDefault();
        console.log(event);
        axios.post("http://localhost:8000/api/auth/signup",data)
        .then((res)=>{
            console.log("got res")
            console.log(res.data.msg)
            console.log(res.data.token)
            console.log(res.data.user)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setAuth(true)
            navigate('/user')
        }).catch(err=> {
            console.log("got error")
            console.log("trying to get data")
            console.log(err.response.data.msg)
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

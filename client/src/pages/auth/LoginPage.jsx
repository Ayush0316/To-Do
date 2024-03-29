// LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './auth.css';
import axios from 'axios';

const LoginPage = ({setAuth}) => {
    const navigate = useNavigate();
    const [data, changeData] = useState({
        "username": "",
        "password": ""})

    const change = (req) =>{
        changeData(prevData => ({ ...prevData, [req.target.name]: req.target.value }));
    } 

    const submitData = (event) => {
        event.preventDefault();
        console.log(event);
        axios.post("http://localhost:8000/api/auth/signin",data)
        .then((res)=>{
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            setAuth(true)
            navigate("/user")
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
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={data.username} onChange={change}required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={data.password} onChange={change}required />

          <button type="submit" onClick={submitData}>Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

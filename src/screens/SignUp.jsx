/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link } from "react-router-dom";
import './styles/SignUp.css'
import React from 'react'

export default function SignUp() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) { // success response from backend
      alert("Enter valid Credentials");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>

      <div className="container">
      <div className="bg-img" >
        <img src="/src/screens/images/salad.jpg" alt="img" />
      </div>
      <div className="content">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">Name</label>
            <input
              name="name"
              value={credentials.name}
              type="text"
              className="input-field"
              id="name"
              onChange={onChange}
            />
            <div className="helper-text">Enter your name</div>
          </div>

          <div className="input-group">
            <label htmlFor="location" className="input-label">Location</label>
            <input
              name="geolocation"
              value={credentials.geolocation}
              type="text"
              className="input-field"
              id="location"
              onChange={onChange}
            />
            <div className="helper-text">Enter your location</div>
          </div>

          <div className="input-group">
            <label htmlFor="exampleInputEmail1" className="input-label">Email address</label>
            <input
              name="email"
              value={credentials.email}
              type="email"
              className="input-field"
              id="exampleInputEmail1"
              onChange={onChange}
            />
            <div className="helper-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="input-group">
            <label htmlFor="exampleInputPassword1" className="input-label">Password</label>
            <input
              name="password"
              value={credentials.password}
              type="password"
              className="input-field"
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <Link to='/login' className="create-user-link">Already a user</Link>
        </form>
      </div>
      </div>
    </>
  );
}



import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signup } from "../api/auth.js";
import { login } from "../api/auth.js";

function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      console.log("User registered:", res.data);
      alert("Signup successful!");

      // Save token if returned
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name); // ✅ used for avatar
      }

      navigate("/dashboard"); // Redirect after successful signup
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signin-div">
      <div className="signin-form">
        <div className="left">
          <h1>Welcome!</h1>
          <p>Enter your personal details to use all of site features</p>
          <Link to="/login" className="btn-4">Log In</Link>
        </div>

        <form className="right" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="input-div">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="signin-input"
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              className="signin-input"
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              className="signin-input"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-3">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log("User logged in:", res.data);
      alert("Login successful!");

      // Save token if returned
       localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
       
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signin-div">
      <div className="signin-form">
        <div className="left">
          <h1>Welcome!</h1>
          <p>Enter your personal details to use all of site features</p>
          <Link to="/signup" className="btn-4">Sign Up</Link>
        </div>

        <form className="right" onSubmit={handleSubmit}>
          <h1>Log In to Your Account</h1>
          <div className="input-div">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="signin-input"
            />
          </div>
          <div className="input-div">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signin-input"
            />
          </div>
          <button type="submit" className="btn-3">Login</button>
        </form>
      </div>
    </div>
  );
}
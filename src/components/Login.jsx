"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";

export const LoginForm = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    axios
      .post("http://localhost:8080/api/auth/login", user)
      .then((response) => {
        console.log("Success:", response.data);
        setEmail("");
        setPassword("");
        setError("");

      
        setIsAuthenticated(true);

        
        navigate("/app"); 
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);

         
          if (error.response.status === 401) {
            setError("Invalid email or password. Please try again.");
          } else {
            
            setError(error.response.data?.message || "An error occurred. Please try again.");
          }
        } else if (error.request) {
          console.error("Request made but no response received:", error.request);
          setError("Unable to connect to the server. Please check your network.");
        } else {
          console.error("Error setting up the request:", error.message);
          setError("An unexpected error occurred.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{String(error)}</p>}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="doctor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        value="Login"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </form>
  );
};

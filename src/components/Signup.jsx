
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 


export const SignUpForm = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {name, password , email};
    axios.post("http://localhost:8080/api/doctor/SignUp", user)
       .then((response) => {
      console.log("Success:", response.data);
      setName("");
      setEmail("");
      setPassword("");
      setError("");

      
      setIsAuthenticated(true);

      
      navigate("../app"); 
    })
    .catch((error) => {
      console.error("There was an error saving the task!", error);
      setError("Incorrect email or password");
    });
  };

  return (
    <form className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-gray-600">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Dr. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
      </div>
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
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

"use client";

import React, { useState } from "react";
import { LoginForm } from "./Login";
import { SignUpForm } from "./Signup";
import { Stethoscope } from "lucide-react";

const AuthPage = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6 ">
        <div className="flex flex-col items-center">
          <Stethoscope className="h-12 w-12 text-indigo-600" />
          <h1 className="text-2xl font-bold text-center mt-2">DocTask</h1>
          <p className="text-gray-600 text-center">
            Manage your tasks efficiently
          </p>
        </div>
        <div>
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-2 text-center ${
                activeTab === "login"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`w-1/2 py-2 text-center ${
                activeTab === "signup"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4">
            {activeTab === "login" && <LoginForm setIsAuthenticated={setIsAuthenticated} />}
            {activeTab === "signup" && <SignUpForm setIsAuthenticated={setIsAuthenticated} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

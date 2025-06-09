import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">STAB</div>

        <div className="space-x-6 hidden md:flex">
          <a href="#home" className="text-gray-600 hover:text-blue-600">
            Home
          </a>
          <a href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </div>

        <div className="space-x-4 hidden md:flex">
            <Link to="/login">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            Login
          </button>
          </Link>
          <Link to="/register">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Register
          </button>
          </Link>
        </div>

        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

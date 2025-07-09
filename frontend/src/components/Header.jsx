import React, { useState } from "react";
import { Search, Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-2 sm:ml-4 flex-shrink-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  EduHub
                </h1>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Right: Sign In */}
            <div className="flex items-center">
              <Link
                to="/signin"
                className="inline-flex items-center px-2 py-2 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide-In Menu and Overlay */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMenu}
          ></div>

          {/* Slide-in Menu */}
          <div
            className={`absolute top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-1 text-gray-600 hover:text-red-500 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-4">
              <Link to="/products" className="block text-gray-700 hover:text-blue-600 transition">Products</Link>
              <Link to="/solutions" className="block text-gray-700 hover:text-blue-600 transition">Solutions</Link>
              <Link to="/services" className="block text-gray-700 hover:text-blue-600 transition">Services</Link>
              <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition">About</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
    </div>
  );
}

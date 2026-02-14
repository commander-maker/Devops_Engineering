import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🔨</span>
          <span className="logo-text">Find It Local</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#find">Find</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
        <div className="navbar-language">
          <select>
            <option value="en">🌐 English</option>
            <option value="si">සිංහල</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

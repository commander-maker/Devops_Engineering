import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import languageIcon from '../assets/language.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img className="logo-img" src={logo} alt="Find It Local" />
          
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#workers">Find</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
        <div className="navbar-language">
          <img className="language-icon" src={languageIcon} alt="Language" />
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

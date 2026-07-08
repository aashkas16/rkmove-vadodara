import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Menu, X, PhoneCall } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Cost Calculator', path: '/calculator' },
    { name: 'Track Parcel', path: '/track' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <div className="logo-icon-bg">
            <Truck className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="logo-brand">RK CARGO</span>
            <span className="logo-sub">Movers - Vadodara</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu-desktop">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={`nav-item-link ${isActive(link.path)}`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right-actions">
          <a href="tel:+919876543210" className="nav-phone">
            <PhoneCall size={18} />
            <span>+91 98765 43210</span>
          </a>
          <Link to="/calculator" className="btn btn-primary nav-cta">
            Get Quote
          </Link>
          <button className="nav-mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`mobile-link ${isActive(link.path)}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="mobile-cta-li">
            <Link 
              to="/calculator" 
              className="btn btn-primary w-full mobile-cta-btn"
              onClick={() => setIsOpen(false)}
            >
              Get Free Quote
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

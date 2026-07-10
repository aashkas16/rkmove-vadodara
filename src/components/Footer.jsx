import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col animate-fade">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <Truck size={22} />
            </div>
            <span>RK Cargo Movers</span>
          </Link>
          <p className="footer-desc">
            Your trusted and certified relocation partner in Vadodara. We specialize in household shifting, office relocation, and safe vehicle transportation with 100% security guarantees.
          </p>
          <div className="footer-contact-info">
            <div className="contact-item">
              <MapPin size={22} className="footer-icon" />
              <span>Shop 4, Royal Plaza, Near Gotri Lake, Gotri, Vadodara, Gujarat - 390021</span>
            </div>
            <div className="contact-item">
              <Phone size={18} className="footer-icon" />
              <a href="tel:+916359225925">+91 63592 25925</a>
            </div>
            <div className="contact-item">
              <Mail size={18} className="footer-icon" />
              <a href="mailto:vadodara@rkmove.com">vadodara@rkmove.com</a>
            </div>
          </div>
        </div>

        <div className="footer-col links-col">
          <h3>Our Services</h3>
          <ul>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Household Shifting</Link>
            </li>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Office Relocation</Link>
            </li>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Car Shifting</Link>
            </li>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Bike Transportation</Link>
            </li>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Warehousing & Storage</Link>
            </li>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Loading & Unloading</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col links-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/"><ArrowRight size={14} /> Home</Link>
            </li>
            <li>
              <Link to="/calculator"><ArrowRight size={14} /> Cost Calculator</Link>
            </li>
            <li>
              <Link to="/track"><ArrowRight size={14} /> Track Consignment</Link>
            </li>
            <li>
              <Link to="/about"><ArrowRight size={14} /> About Our Company</Link>
            </li>
            <li>
              <Link to="/gallery"><ArrowRight size={14} /> Shifting Showcase</Link>
            </li>
            <li>
              <Link to="/contact"><ArrowRight size={14} /> Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col hours-col">
          <h3>Working Hours</h3>
          <div className="hours-list">
            <div className="hours-row">
              <Clock size={16} />
              <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
            <div className="hours-row text-muted">
              <Clock size={16} />
              <span>Sunday: 10:00 AM - 4:00 PM</span>
            </div>
          </div>
          <div className="footer-badge">
            <h4>100% Safe & Insured Shifting</h4>
            <p>Certified IBA Approved Packers and Movers</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; {new Date().getFullYear()} RK Cargo Packers and Movers (Vadodara Branch). All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

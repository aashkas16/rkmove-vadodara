import React from 'react';
import { Award, ShieldCheck, Heart, Users, Check } from 'lucide-react';
import './About.css';

export default function About() {
  const stats = [
    { num: '10+', label: 'Years Experience' },
    { num: '150+', label: 'Cities Covered' },
    { num: '15,000+', label: 'Happy Families Moved' },
    { num: '50+', label: 'Professional Staff' }
  ];

  return (
    <div className="about-page-container container section animate-fade">
      <div className="about-header">
        <h1 className="section-title">About Our Company</h1>
        <p className="section-subtitle">
          Discover our values, certifications, and our journey as a leading relocation service provider in Gujarat.
        </p>
      </div>

      {/* Main Info Block */}
      <div className="about-intro-grid">
        <div className="about-intro-text">
          <h2>Serving Vadodara with Safety, Honesty, and Commitment</h2>
          <p>
            Founded with a vision to simplify relocation, <strong>RK Cargo Packers and Movers</strong> has grown from a local transport company in Gujarat into a full-service domestic relocation network. Our local branch in Gotri, Vadodara has successfully served residential neighborhoods, student campuses, corporate offices, and heavy industrial hubs.
          </p>
          <p>
            We recognize that moving is not just about transporting boxes—it is about shifting memories and business operations. That is why we hire and train our own loaders, invest in high-grade bubble wrap and heavy corrugated boxes, and provide transparent tracking updates with every single delivery receipt.
          </p>
          
          <div className="about-check-list">
            <div className="check-item">
              <Check className="about-check-icon" size={18} />
              <span>Certified IBA Approved Packers & Movers</span>
            </div>
            <div className="check-item">
              <Check className="about-check-icon" size={18} />
              <span>Transparent Pricing without hidden charges</span>
            </div>
            <div className="check-item">
              <Check className="about-check-icon" size={18} />
              <span>Full Transit Insurance and safety coverage</span>
            </div>
          </div>
        </div>

        {/* Stats Column */}
        <div className="about-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="about-stat-card card glass">
              <h3>{stat.num}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="values-header">
          <h2>Our Core Pillars</h2>
          <p>What guides our operations on national cargo routes day in and day out.</p>
        </div>

        <div className="values-grid">
          <div className="value-card card">
            <ShieldCheck size={36} className="value-icon" />
            <h3>Complete Safety</h3>
            <p>We treat your inventory as if it were our own. From wrapping fragile dinner plates to heavy steel cabinets, protection is our priority.</p>
          </div>
          <div className="value-card card">
            <Award size={36} className="value-icon" />
            <h3>Quality Standards</h3>
            <p>We use top-grade bubble cushioning, 5-ply cartons, and waterproof stretch wraps to safeguard items against moisture and scratches.</p>
          </div>
          <div className="value-card card">
            <Heart size={36} className="value-icon" />
            <h3>Customer Care</h3>
            <p>Our helpdesk and branch managers are always available to answer your call, resolve tracking queries, and address complaints.</p>
          </div>
        </div>
      </section>

      {/* IBA Approved Certification Box */}
      <div className="iba-certification-box card glass">
        <div className="iba-badge-icon">
          <Users size={32} />
        </div>
        <div>
          <h3>Government Registered & IBA Approved</h3>
          <p>
            RK Cargo Packers and Movers is an IBA (Indian Banks Association) approved relocation provider. This certification guarantees that our logistics practices, drivers licenses, container truck standards, and transit insurances align with government guidelines. We are standard vendors for bank employees and public sector relocations.
          </p>
        </div>
      </div>
    </div>
  );
}

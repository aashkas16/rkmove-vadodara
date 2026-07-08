import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Sparkles, Box, Compass, Clock, Check } from 'lucide-react';
import './Services.css';

export default function Services() {
  const serviceList = [
    {
      title: 'Household Relocation',
      icon: '🏠',
      desc: 'Complete household shifting including dismantling, packing, loading, transport, unloading, and reassembly. We handle everything with absolute care.',
      bullets: [
        'Premium bubble wrapping for fragile glassware & crockery',
        'Heavy-duty carton boxes for garments, books & utensils',
        'Specialized wooden crates for TVs, LED panels & refrigerators',
        'Safe dismantling & assembly of double beds & wardrobes'
      ]
    },
    {
      title: 'Office Shifting & IT Cargo',
      icon: '🏢',
      desc: 'Relocate your commercial spaces, offices, or warehouse with dedicated project managers. We ensure minimum business downtime and complete data security.',
      bullets: [
        'Dedicated anti-static packing for servers and computers',
        'Labelled packing for files, files archives, and documents',
        'Move planning to execute shifting during weekends/nights',
        'Heavy machinery and locker lifting using specialized cranes'
      ]
    },
    {
      title: 'Car & Bike Shifting',
      icon: '🚗',
      desc: 'Transport your motor vehicles safely inside specialized, closed car carriers. We load and unload using special ramps and tie down vehicles to prevent shifting.',
      bullets: [
        'Closed carrier transit to shield from dust and weather',
        'Precise wheel-locking and belt harness tie-down safety',
        'Scratch-resistant padding wraps around bumper & mirrors',
        'Full vehicle transit insurance coverage included'
      ]
    },
    {
      title: 'Warehousing & Storage Space',
      icon: '📦',
      desc: 'Secure, CCTV-monitored warehouse space to store your household goods or business cargo in Vadodara for weekly, monthly, or annual durations.',
      bullets: [
        'Clean, moisture-controlled, pest-free storage environment',
        '24/7 CCTV surveillance security and physical security guards',
        'Detailed inventory logs created upon goods receipt',
        'Easy goods retrieval with partial-delivery options'
      ]
    },
    {
      title: 'High-Grade Packing & Unpacking',
      icon: '🎁',
      desc: 'Don\'t need transport? Hire our team of trained packing professionals to wrap your home inventory in high-grade materials for storage or self-move.',
      bullets: [
        'Multi-layer packing (Bubble wrap + foam sheets + shrink wrap)',
        'Durable corner protections for wooden/glass tables',
        'Systematic labelling of boxes by bedroom, kitchen, utility',
        'Optional unpacking and placement support'
      ]
    },
    {
      title: 'Loading & Unloading Services',
      icon: '🏋️‍♂️',
      desc: 'Trained heavy-lifters to load and unload cargo trucks. Our loaders utilize safety harnesses, ramps, sliders, and dollies to prevent floor damage.',
      bullets: [
        'Skilled loading to ensure cargo balance during transport',
        'Experienced handling of tight staircases and elevators',
        'Use of hydraulic lifts for high-tier loading bays',
        'Floor-protective rubber runners used inside apartments'
      ]
    }
  ];

  return (
    <div className="services-page-container container section animate-fade">
      <div className="services-header">
        <h1 className="section-title">Our Relocation Services</h1>
        <p className="section-subtitle">
          RK Cargo Packers and Movers Vadodara provides certified, end-to-end relocation solutions for local, domestic, and long-distance moving requirements.
        </p>
      </div>

      <div className="services-list-grid">
        {serviceList.map((service, idx) => (
          <div key={idx} className="services-full-card card glass">
            <div className="service-card-header">
              <span className="service-card-emoji">{service.icon}</span>
              <h3>{service.title}</h3>
            </div>
            <p className="service-card-desc">{service.desc}</p>
            <ul className="service-bullets-list">
              {service.bullets.map((bullet, bIdx) => (
                <li key={bIdx}>
                  <Check size={16} className="bullet-check-icon" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Packaging Materials Section */}
      <section className="packing-materials-section">
        <div className="materials-header">
          <h2>Our Premium Packaging Materials</h2>
          <p>We use industry-leading multi-layered packaging materials to guarantee zero damage transit.</p>
        </div>

        <div className="materials-grid">
          <div className="material-card card">
            <Box className="mat-icon" size={32} />
            <h3>Corrugated Carton Sheets</h3>
            <p>Thick 5-ply cartons designed to absorb shock impacts and prevent scratches on delicate furniture.</p>
          </div>
          <div className="material-card card">
            <Sparkles className="mat-icon" size={32} />
            <h3>Air Bubble Wrapping</h3>
            <p>Double-layered cushion wrap applied on fragile kitchenware, chinaware, items of glass, and electronics.</p>
          </div>
          <div className="material-card card">
            <ShieldCheck className="mat-icon" size={32} />
            <h3>HDPE Stretch Film</h3>
            <p>Heavy-duty elastic plastic wrapping to shield goods from moisture, rainfall, dust, and transit shifting.</p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="services-cta-box card glass">
        <h2>Ready to Relocate?</h2>
        <p>Get a precise estimation from our experts for local Gotri shifts or national domestic relocation.</p>
        <div className="cta-buttons">
          <Link to="/calculator" className="btn btn-primary">
            Shifting Cost Calculator
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Local Agent
          </Link>
        </div>
      </div>
    </div>
  );
}

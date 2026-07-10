import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Search, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Award,
  Users,
  Compass,
  Sparkles,
  Zap,
  CheckCircle,
  FileText,
  Phone,
  Truck,
  Building2,
  Warehouse,
  Quote,
  ArrowUpRight,
  Home as HomeIcon
} from 'lucide-react';
import { dbService } from '../dbService';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  
  // Reviews State
  const [reviews, setReviews] = useState([]);
  
  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    document.title = "RK Cargo Packers & Movers Vadodara | Shifting Relocation Services";
    
    // Load approved reviews
    const fetchReviews = async () => {
      try {
        const approved = await dbService.getApprovedReviews();
        setReviews(approved || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const services = [
    { title: 'Household Relocation', icon: <HomeIcon size={26} />, tag: 'Safe Wrap', desc: 'Packing glassware, woodworks, and electronics in multi-layer bubble wrap.' },
    { title: 'Office Shifting', icon: <Building2 size={26} />, tag: 'Fast Setup', desc: 'Secure transit for servers, workstations, archives, and corporate fixtures.' },
    { title: 'Vehicle Transportation', icon: <Truck size={26} />, tag: 'Safe Carrier', desc: 'Closed wheel-locked car and bike carriers covering domestic routes.' },
    { title: 'Warehouse Storage', icon: <Warehouse size={26} />, tag: 'Insured Space', desc: 'Clean, CCTV-secure, damp-free warehouse vaults in Gotri, Vadodara.' }
  ];

  const features = [
    { icon: <ShieldCheck size={24} />, title: 'Premium Packing', desc: 'Multi-layer bubble wrap, foam guards, and custom carton crates protect fragile goods.' },
    { icon: <Compass size={24} />, title: 'Live Cargo Tracking', desc: 'Enter your Lorry Receipt (LR) code to check dispatch milestones.' },
    { icon: <Award size={24} />, title: 'IBA Approved Vendor', desc: 'Fully licensed and certified to issue IBA bills for bank and corporate officers.' },
    { icon: <Users size={24} />, title: 'Expert Local Crews', desc: 'Our trained in-house loaders safely carry heavy furniture via stairs and elevators.' }
  ];

  const faqs = [
    { q: 'How do you calculate moving costs in Vadodara?', a: 'Relocation estimates are based on shifting distance, volume of goods (1 BHK, 2 BHK, etc.), packing materials (Standard vs. Premium), floor levels, and elevator access. Use our Cost Calculator for an instant quote.' },
    { q: 'What is a Lorry Receipt (LR) number?', a: 'A Lorry Receipt (LR) number is a unique tracking ID assigned when your cargo is loaded. Enter it on our Track page to see active highway checkpoints.' },
    { q: 'Are my household items insured during shifting?', a: 'Yes! We provide complete transit insurance at 2% of the declared goods value, covering all risks from packing and loading to road transit and unloading.' },
    { q: 'Do you dismantle and reassemble furniture?', a: 'Yes. Our crew handles dismantling and reassembling of beds, wardrobes, dining tables, and TVs as part of our domestic relocation services.' },
    { q: 'Is RK Cargo Packers and Movers IBA Approved?', a: 'Yes, RK Cargo is an IBA Approved logistics vendor in Vadodara. We issue verified invoice bills, lorry receipts, and loading summaries for employee claims.' },
    { q: 'How early should I book my relocation?', a: 'We recommend booking 3 to 7 days before your shifting date to secure your desired slot and ensure coordination, especially during weekend shifts.' }
  ];

  return (
    <div className="home-container animate-fade">
      {/* Glowing Decorative Orbs */}
      <div className="glowing-bg-orb orb-1"></div>
      <div className="glowing-bg-orb orb-2"></div>
      <div className="glowing-bg-orb orb-3"></div>

      {/* Clean Branding Hero - Replicating rkmove.com exactly */}
      <section className="rk-exact-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(9, 15, 34, 0.92) 40%, rgba(9, 15, 34, 0.4)), url('/hero_moving_service.png')` }}>
        <div className="container hero-exact-content">
          
          {/* Pill Tag */}
          <div className="exact-pill-badge animate-fade">
            <Truck size={14} className="exact-pill-icon" />
            <span>Trusted Packers & Movers Since 2009</span>
          </div>

          {/* Heading */}
          <h1 className="exact-hero-title">
            RK Cargo <br />
            <span>Packers & Movers</span>
          </h1>

          {/* Description */}
          <p className="exact-hero-desc">
            India's most trusted household shifting, office relocation, vehicle transport & warehousing company. Serving 200+ cities with 15+ years of experience.
          </p>

          {/* Bullets Row */}
          <div className="exact-hero-badges-row">
            <div className="badge-item">
              <CheckCircle size={16} className="badge-icon-check" />
              <span>Fully Insured</span>
            </div>
            <div className="badge-item">
              <CheckCircle size={16} className="badge-icon-check" />
              <span>On-Time Delivery</span>
            </div>
            <div className="badge-item">
              <CheckCircle size={16} className="badge-icon-check" />
              <span>No Hidden Charges</span>
            </div>
            <div className="badge-item">
              <CheckCircle size={16} className="badge-icon-check" />
              <span>PAN India</span>
            </div>
          </div>

          {/* Actions Row */}
          <div className="exact-hero-actions-row">
            <button onClick={() => navigate('/track')} className="btn btn-primary btn-exact-track">
              <Search size={18} />
              <span>Track Parcel</span>
            </button>
            <button onClick={() => navigate('/calculator')} className="btn btn-outline btn-exact-quote">
              <FileText size={18} />
              <span>Get Free Quote</span>
            </button>
            <a href="tel:+919876543210" className="btn btn-exact-call">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

        </div>
      </section>

      {/* Trust Badges & Shifting Stats Counters (V3.0) */}
      <section className="home-stats-counter-bar">
        <div className="container stats-counter-grid">
          <div className="stat-counter-card card glass animate-fade">
            <h3>15K+</h3>
            <p>Relocations Completed</p>
          </div>
          <div className="stat-counter-card card glass animate-fade">
            <h3>98.6%</h3>
            <p>On-Time Shifting Rate</p>
          </div>
          <div className="stat-counter-card card glass animate-fade">
            <h3>120+</h3>
            <p>Fleet Carrier Vehicles</p>
          </div>
          <div className="stat-counter-card card glass animate-fade">
            <h3>IBA Approved</h3>
            <p>Authorized Cargo Partner</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-morphic-section">
        <div className="container">
          <h2 className="section-title">Our <span>Shifting Services</span></h2>
          <p className="section-subtitle">IBA approved packers and movers in Vadodara gotri branch for household shifting.</p>
          
          <div className="services-morphic-grid">
            {services.map((ser, idx) => (
              <div key={idx} className="card services-morphic-card">
                <div className="service-morphic-badge">{ser.tag}</div>
                <div className="service-morphic-icon">{ser.icon}</div>
                <h3>{ser.title}</h3>
                <p>{ser.desc}</p>
                <Link to="/services" className="service-morphic-link">
                  <span>Explore Service details</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-choose-us-morphic">
        <div className="container">
          <h2 className="section-title">Why Choose <span>RK Cargo?</span></h2>
          <p className="section-subtitle">We deliver verified transit insurance, IBA billing assurances, and zero damage shifting guarantees.</p>
          
          <div className="features-morphic-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-morphic-card card glass">
                <div className="feature-morphic-icon-wrapper">
                  {feat.icon}
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shifting Steps */}
      <section className="section steps-morphic-section">
        <div className="container">
          <h2 className="section-title"><span>Relocation Process</span></h2>
          <p className="section-subtitle">5 steps to transition to your new home.</p>
          
          <div className="steps-morphic-timeline">
            {[
              { num: '01', title: 'Get Quote', desc: 'Estimate charges online.' },
              { num: '02', title: 'Safe Packing', desc: 'Multi-layer bubble protection.' },
              { num: '03', title: 'Load Cargo', desc: 'Secure loading into containers.' },
              { num: '04', title: 'Road Transit', desc: 'GPS timeline tracking logs.' },
              { num: '05', title: 'Setup Home', desc: 'Unpacking and furniture assembly.' }
            ].map((step, idx) => (
              <div key={idx} className="step-morphic-node">
                <div className="step-morphic-header">
                  <span className="step-morphic-number">{step.num}</span>
                  <CheckCircle size={16} className="step-node-check" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shifting Portfolio Gallery Preview (V3.0 Dynamic) */}
      <section className="section gallery-preview-morphic" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h2 className="section-title">Shifting <span>Showcase</span> Portfolio</h2>
          <p className="section-subtitle">Browse photo logs of our packing, loading, and transit activities in Vadodara.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="card" style={{ padding: 0, height: '200px', overflow: 'hidden', position: 'relative', borderRadius: '12px' }}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" alt="Home Shifting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '12px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>Bubble wrapped furniture transit packing.</div>
            </div>
            <div className="card" style={{ padding: 0, height: '200px', overflow: 'hidden', position: 'relative', borderRadius: '12px' }}>
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" alt="Packaging Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '12px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>Taped cardboard cargo cartons.</div>
            </div>
            <div className="card" style={{ padding: 0, height: '200px', overflow: 'hidden', position: 'relative', borderRadius: '12px' }}>
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600" alt="Fleet Carrier" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '12px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>Closed container vehicle loading in Gotri.</div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link to="/gallery" className="btn btn-primary">
              <span>View Full Shifting Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="section testimonials-morphic-section">
        <div className="container">
          <h2 className="section-title"><span>Client Feedbacks</span></h2>
          <p className="section-subtitle">What families say about their packers and movers experiences.</p>
          
          <div className="testimonials-morphic-grid">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="card testimonial-morphic-card">
                <div className="testimonial-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < rev.rating ? "star-morphic-filled" : "star-morphic-empty"} 
                    />
                  ))}
                </div>
                <p className="testimonial-morphic-comment">"{rev.comment}"</p>
                <div className="testimonial-morphic-user">
                  <div className="user-avatar-initial">{rev.name.charAt(0)}</div>
                  <div>
                    <h4>{rev.name}</h4>
                    <span>{rev.service_type || 'Relocation Client'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonials-morphic-action">
            <Link to="/contact" className="btn btn-outline">
              Write Shifting Feedback
            </Link>
          </div>
        </div>
      </section>

      {/* Accordion FAQ */}
      <section className="section faq-morphic-section">
        <div className="container">
          <h2 className="section-title"><span>Frequently Answered FAQ</span></h2>
          <p className="section-subtitle">Quick answers regarding packing details, tolls, and shifting timelines.</p>
          
          <div className="faq-morphic-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-morphic-item ${activeFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-morphic-question">
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {activeFaq === idx && (
                  <div className="faq-morphic-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

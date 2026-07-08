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
  Truck
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
    { title: 'Household Relocation', icon: '🏠', tag: 'Safe Wrap', desc: 'Packing glassware, woodworks, and electronics in multi-layer bubble wrap.' },
    { title: 'Office Shifting', icon: '🏢', tag: 'Fast Setup', desc: 'Secure transit for servers, workstations, archives, and corporate fixtures.' },
    { title: 'Vehicle Transportation', icon: '🚚', tag: 'Safe Carrier', desc: 'Closed wheel-locked car and bike carriers covering domestic routes.' },
    { title: 'Warehouse Storage', icon: '📦', tag: 'Insured Space', desc: 'Clean, CCTV-secure, damp-free warehouse vaults in Gotri, Vadodara.' }
  ];

  const features = [
    { icon: <ShieldCheck size={24} />, title: 'Premium Packing', desc: 'Multi-layer packing sheets, corners, and carton boxes protect items.' },
    { icon: <Compass size={24} />, title: 'Live Timeline Logs', desc: 'Track lorry receipts and updates from dispatch to drop-off.' },
    { icon: <Award size={24} />, title: 'Certified IBA Approved', desc: 'Official vendor status for bank officers and public relocations.' },
    { icon: <Users size={24} />, title: 'In-House Handling', desc: 'Trained loaders carry goods securely via staircases and lifts.' }
  ];

  const faqs = [
    { q: 'How do you calculate moving costs?', a: 'Costs are calculated based on shifting distance, volume of inventory, floor levels, elevator availability, and packing materials (Standard vs. Premium).' },
    { q: 'What is a Lorry Receipt (LR) number?', a: 'A Lorry Receipt (LR) number is a unique tracking code assigned when cargo is loaded. Enter it on our tracking page to check transit stops and locations.' },
    { q: 'Are my goods insured?', a: 'Yes! We provide transit insurance at 2% of declared goods value, covering unforeseen damages or road accidents during packing, loading, and transit.' },
    { q: 'Do you dismantle and reassemble furniture?', a: 'Yes. Our loaders handle dismantling and reassembling of beds, wardrobes, dining tables, and TVs.' }
  ];

  return (
    <div className="home-container animate-fade">
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

      {/* Services Section */}
      <section className="section services-morphic-section">
        <div className="container">
          <h2 className="section-title"><span>Our Services</span></h2>
          <p className="section-subtitle">Certified wrapping, logistics, and warehousing customized for Vadodara families.</p>
          
          <div className="services-morphic-grid">
            {services.map((ser, idx) => (
              <div key={idx} className="card services-morphic-card">
                <div className="service-morphic-badge">{ser.tag}</div>
                <div className="service-morphic-icon">{ser.icon}</div>
                <h3>{ser.title}</h3>
                <p>{ser.desc}</p>
                <Link to="/services" className="service-morphic-link">
                  <span>Explore Service details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-choose-us-morphic">
        <div className="container">
          <h2 className="section-title"><span>Why Shreya Shifting?</span></h2>
          <p className="section-subtitle">We deliver transit insurances, IBA assurances, and damage guarantees.</p>
          
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

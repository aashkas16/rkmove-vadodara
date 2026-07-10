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
  Home as HomeIcon,
  Headphones,
  DollarSign,
  Clock,
  Map
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
    { title: 'Household Relocation', icon: <HomeIcon size={26} />, tag: 'Safe Wrap', desc: 'Packing glassware, woodworks, and electronics in multi-layer bubble wrap.', pills: ['household shifting', 'home relocation', 'furniture moving'] },
    { title: 'Office Shifting', icon: <Building2 size={26} />, tag: 'Fast Setup', desc: 'Secure transit for servers, workstations, archives, and corporate fixtures.', pills: ['office relocation', 'corporate moving', 'commercial shifting'] },
    { title: 'Vehicle Transportation', icon: <Truck size={26} />, tag: 'Safe Carrier', desc: 'Closed wheel-locked car and bike carriers covering domestic routes.', pills: ['car transport', 'bike shifting', 'vehicle relocation'] },
    { title: 'Warehouse Storage', icon: <Warehouse size={26} />, tag: 'Insured Space', desc: 'Clean, CCTV-secure, damp-free warehouse vaults in Gotri, Vadodara.', pills: ['warehousing', 'storage services', 'goods storage'] }
  ];

  const features = [
    { icon: <ShieldCheck size={24} />, title: 'Fully Insured', desc: '100% transit insurance coverage for all your goods. Zero risk, complete peace of mind.' },
    { icon: <Clock size={24} />, title: 'On-Time Delivery', desc: 'Guaranteed delivery schedules. We respect your time and commitments.' },
    { icon: <Map size={24} />, title: 'PAN India Network', desc: '200+ cities covered. Wherever you move, we\'re already there.' },
    { icon: <Users size={24} />, title: 'Expert Team', desc: 'Trained, background-verified professionals handling your valuables.' },
    { icon: <Award size={24} />, title: '15+ Years Experience', desc: 'Trusted since 2009. Thousands of successful relocations across India.' },
    { icon: <DollarSign size={24} />, title: 'Transparent Pricing', desc: 'No hidden charges. Get accurate quotes upfront before we begin.' },
    { icon: <Headphones size={24} />, title: 'Dedicated Support', desc: '24/7 customer support throughout your move. We\'re always reachable.' },
    { icon: <Zap size={24} />, title: 'Fast Processing', desc: 'Quick booking, swift packing, and express delivery options available.' }
  ];

  const faqs = [
    { q: 'How do you calculate moving costs in Vadodara?', a: 'Relocation estimates are based on shifting distance, volume of goods (1 BHK, 2 BHK, etc.), packing materials (Standard vs. Premium), floor levels, and elevator access. Use our Cost Calculator for an instant quote.' },
    { q: 'What is a Lorry Receipt (LR) number?', a: 'A Lorry Receipt (LR) number is a unique tracking ID assigned when your cargo is loaded. Enter it on our Track page to see active highway checkpoints.' },
    { q: 'Are my household items insured during shifting?', a: 'Yes! We provide complete transit insurance at 2% of the declared goods value, covering all risks from packing and loading to road transit and unloading.' },
    { q: 'Do you dismantle and reassemble furniture?', a: 'Yes. Our crew handles dismantling and reassembling of beds, wardrobes, dining tables, and TVs as part of our domestic relocation services.' },
    { q: 'Is RK Cargo Packers and Movers IBA Approved?', a: 'Yes, RK Cargo is an IBA Approved logistics vendor in Vadodara. We issue verified invoice bills, lorry receipts, and loading summaries for employee claims.' },
    { q: 'How early should I book my relocation?', a: 'We recommend booking 3 to 7 days before your shifting date to secure your desired slot and ensure coordination, especially during weekend shifts.' }
  ];

  const steps = [
    { num: '01', title: 'Get Free Quote', desc: 'Contact us or fill the form. We\'ll provide a transparent, no-obligation quote within minutes.', badge: 'Takes 2 mins' },
    { num: '02', title: 'Schedule Your Move', desc: 'Pick a date that works for you. Our team plans and confirms every detail of your relocation.', badge: 'Flexible dates' },
    { num: '03', title: 'Expert Packing', desc: 'Our trained packers arrive on time with quality materials to safely pack all your belongings.', badge: 'Zero damage' },
    { num: '04', title: 'Safe Delivery', desc: 'Your goods are transported and delivered safely. Track your shipment in real-time.', badge: 'On-time guaranteed' }
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
            <a href="tel:+916359225925" className="btn btn-exact-call">
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

      {/* Infinite Trust Partners Marquee Ticker (V3.5 Premium) */}
      <section className="trust-marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {[
              'IBA Approved Packers & Movers',
              'ISO 9001:2015 Certified Logistics',
              'GST Registered Tax Compliant Invoice',
              'GPS Tracked Cargo Fleet Carriers',
              '100% Fully Insured Shifting',
              'Background Verified Crew Loaders',
              'IBA Approved Packers & Movers',
              'ISO 9001:2015 Certified Logistics',
              'GST Registered Tax Compliant Invoice',
              'GPS Tracked Cargo Fleet Carriers',
              '100% Fully Insured Shifting',
              'Background Verified Crew Loaders'
            ].map((text, index) => (
              <div key={index} className="marquee-item">
                <span className="marquee-dot"></span>
                <span>{text}</span>
              </div>
            ))}
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
                
                {/* Tag Pills matching rkmove.com style */}
                {ser.pills && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {ser.pills.map((pill, pIdx) => (
                      <span key={pIdx} style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '4px', textTransform: 'capitalize' }}>
                        {pill}
                      </span>
                    ))}
                  </div>
                )}

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
          <p className="section-subtitle">Moving made simple in 4 easy steps. From booking to delivery, we handle everything.</p>
          
          <div className="steps-morphic-timeline">
            {steps.map((step, idx) => (
              <div key={idx} className="step-morphic-node">
                <div className="step-morphic-header">
                  <span className="step-morphic-number">{step.num}</span>
                  <CheckCircle size={16} className="step-node-check" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {step.badge && (
                  <div style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 700, color: '#15803d', background: '#dcfce7', padding: '4px 10px', borderRadius: '4px' }}>
                    <Sparkles size={10} style={{ color: '#16a34a' }} />
                    <span>{step.badge}</span>
                  </div>
                )}
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

      {/* Service Areas Section matching rkmove.com style */}
      <section className="section service-areas-section" style={{ borderTop: '1px solid var(--border)', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Service Areas</span>
          <h2 className="section-title" style={{ marginTop: '8px' }}>Packers & Movers <span>Across India</span></h2>
          <p className="section-subtitle">RK Cargo provides professional packers and movers services in 200+ cities. Whether you're moving locally or relocating across India, we've got you covered.</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '900px', margin: '36px auto 20px auto' }}>
            {['Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Surat', 'Jaipur', 'Rajkot', 'Vadodara', 'Indore', 'Bhopal', 'Nagpur', 'Nasik'].map((city) => (
              <Link 
                key={city} 
                to="/contact" 
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50px', padding: '10px 22px', fontSize: '0.86rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none', transition: 'var(--transition)' }}
                className="city-tab-btn"
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--accent-blue)';
                  e.target.style.color = 'var(--accent-blue)';
                  e.target.style.background = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = 'var(--primary)';
                  e.target.style.background = '#f8fafc';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {city}
              </Link>
            ))}
          </div>
          
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', fontWeight: 600, marginTop: '24px' }}>
            + 180 more cities across India. <Link to="/contact" style={{ color: 'var(--secondary)', fontWeight: 700, textDecoration: 'underline' }}>Contact us</Link> to check availability in your city.
          </p>
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

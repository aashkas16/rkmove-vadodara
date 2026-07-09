import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Star, CheckCircle } from 'lucide-react';
import { dbService } from '../dbService';
import './Contact.css';

export default function Contact() {
  // Contact Form State
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Review Form State
  const [reviewData, setReviewData] = useState({ name: '', rating: 5, comment: '', serviceType: 'Household Shifting' });
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryData.name.trim() || !inquiryData.phone.trim() || !inquiryData.subject.trim() || !inquiryData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      await dbService.submitContact(inquiryData);
      setInquirySubmitted(true);
      setInquiryData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting inquiry. Please try again.');
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.name.trim() || !reviewData.comment.trim()) {
      alert('Please fill out your name and review comment.');
      return;
    }

    setSubmittingReview(true);
    try {
      await dbService.submitReview({
        name: reviewData.name,
        rating: reviewData.rating,
        comment: reviewData.comment,
        service_type: reviewData.serviceType
      });
      setReviewSubmitted(true);
      setReviewData({ name: '', rating: 5, comment: '', serviceType: 'Household Shifting' });
    } catch (err) {
      console.error(err);
      alert('Error submitting review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="contact-page-container container section animate-fade">
      <div className="contact-header">
        <h1 className="section-title">Contact Vadodara Branch</h1>
        <p className="section-subtitle">
          Get in touch with our local logistics agents, request a home visit survey, or leave your feedback.
        </p>
      </div>

      <div className="contact-split-grid">
        {/* Contact Info Card */}
        <div className="contact-info-col">
          <div className="contact-details-card card glass">
            <h2>RK Cargo Packers & Movers</h2>
            <p className="branch-label">Gotri, Vadodara Branch Office</p>
            
            <div className="info-items-list">
              <div className="info-item-row">
                <MapPin className="info-icon" size={24} />
                <div>
                  <h4>Office Address</h4>
                  <p>Shop 4, Ground Floor, Royal Plaza, Near Gotri Lake, Gotri, Vadodara, Gujarat - 390021</p>
                </div>
              </div>

              <div className="info-item-row">
                <Phone className="info-icon" size={20} />
                <div>
                  <h4>Call Customer Support</h4>
                  <p>
                    <a href="tel:+919876543210">+91 98765 43210</a> <br />
                    <a href="tel:+919998877766">+91 99988 77766</a>
                  </p>
                </div>
              </div>

              <div className="info-item-row">
                <Mail className="info-icon" size={20} />
                <div>
                  <h4>Support Email</h4>
                  <p><a href="mailto:vadodara@rkmove.com">vadodara@rkmove.com</a></p>
                </div>
              </div>

              <div className="info-item-row">
                <Clock className="info-icon" size={20} />
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 9:00 AM - 8:00 PM <br /> Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Map Placeholder */}
          <div className="map-placeholder-card card glass">
            <h3>Gotri Office Location Map</h3>
            <div className="map-dummy-box">
              <MapPin size={36} className="map-pin-pulse" />
              <div>
                <h4>Royal Plaza, Gotri</h4>
                <p>Near Gotri Lake & Gotri Police Station</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="map-link-btn"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Forms Column */}
        <div className="contact-forms-col">
          {/* Inquiry Form */}
          <div className="card form-container-card">
            {inquirySubmitted ? (
              <div className="form-success-wrapper animate-fade">
                <CheckCircle size={48} className="success-icon" />
                <h3>Inquiry Submitted!</h3>
                <p>Thank you for contacting us. Our Vadodara branch manager will get in touch with you shortly.</p>
                <button onClick={() => setInquirySubmitted(false)} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="contact-inquiry-form">
                <h2>Send an Inquiry</h2>
                <p>Need support or custom quotes? Leave a message.</p>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    value={inquiryData.name} 
                    onChange={handleInquiryChange}
                    placeholder="e.g. Jeet Patel"
                    required 
                  />
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="form-control" 
                      value={inquiryData.phone} 
                      onChange={handleInquiryChange}
                      placeholder="e.g. 9876543210"
                      pattern="[0-9]{10}"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email (Optional)</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control" 
                      value={inquiryData.email} 
                      onChange={handleInquiryChange}
                      placeholder="e.g. email@domain.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    className="form-control" 
                    value={inquiryData.subject} 
                    onChange={handleInquiryChange}
                    placeholder="e.g. Household Shifting to Mumbai query"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    className="form-control" 
                    value={inquiryData.message} 
                    onChange={handleInquiryChange}
                    placeholder="Describe your requirements or questions in detail..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full submit-btn">
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Write a Review Form */}
          <div className="card form-container-card review-form-card">
            {reviewSubmitted ? (
              <div className="form-success-wrapper animate-fade">
                <CheckCircle size={48} className="success-icon" />
                <h3>Review Submitted!</h3>
                <p>Thank you for sharing your feedback. Your review will display on our home page after admin approval.</p>
                <button onClick={() => setReviewSubmitted(false)} className="btn btn-outline">
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="contact-review-form">
                <h2>Share Your Shifting Feedback</h2>
                <p>Help other Vadodara families choose the best packers and movers.</p>

                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    value={reviewData.name} 
                    onChange={handleReviewChange}
                    placeholder="e.g. Amit Shah"
                    required 
                  />
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Relocation Service Used</label>
                    <select 
                      name="serviceType" 
                      className="form-control" 
                      value={reviewData.serviceType} 
                      onChange={handleReviewChange}
                    >
                      <option value="Household Shifting">Household Shifting</option>
                      <option value="Office Relocation">Office Relocation</option>
                      <option value="Car Transportation">Car Transportation</option>
                      <option value="Bike Transportation">Bike Transportation</option>
                      <option value="Warehousing Services">Warehousing Services</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <div className="rating-stars-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={28}
                          className={`star-input-icon ${
                            (hoverRating || reviewData.rating) >= star ? 'star-filled' : 'star-empty'
                          }`}
                          onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Review Comment</label>
                  <textarea 
                    name="comment" 
                    rows="3" 
                    className="form-control" 
                    value={reviewData.comment} 
                    onChange={handleReviewChange}
                    placeholder="Tell us about the packing quality, loading speed, and driver behavior..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-secondary w-full submit-btn" disabled={submittingReview}>
                  {submittingReview ? 'Submitting Review...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

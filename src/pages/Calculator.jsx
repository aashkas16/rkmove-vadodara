import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, ArrowLeft, CheckCircle2, Calculator as CalcIcon, ShieldAlert } from 'lucide-react';
import { dbService } from '../dbService';
import './Calculator.css';

export default function Calculator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Steps: 1 = Route/Date, 2 = Inventory/Options, 3 = Contact, 4 = Result
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: 'Vadodara',
    destination: '',
    moveSize: '1 BHK',
    movingDate: '',
    packingQuality: 'standard', // standard, premium
    floorOrigin: '0', // 0 = Ground Floor
    floorDest: '0',
    hasElevatorOrigin: 'yes',
    hasElevatorDest: 'yes',
    declaredValue: '50000',
    notes: ''
  });

  // Calculation Results
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);

  // Populate search params if redirecting from Home quick inquiry
  useEffect(() => {
    const originParam = searchParams.get('origin');
    const destParam = searchParams.get('destination');
    const sizeParam = searchParams.get('size');
    
    if (originParam || destParam || sizeParam) {
      setFormData(prev => ({
        ...prev,
        origin: originParam || prev.origin,
        destination: destParam || prev.destination,
        moveSize: sizeParam || prev.moveSize
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.origin.trim() || !formData.destination.trim() || !formData.movingDate) {
        alert('Please fill out origins, destinations, and moving dates.');
        return;
      }
    }
    if (step === 2) {
      // Step 2 is always valid since it uses selections
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  // Pricing Logic
  const calculatePrice = () => {
    // 1. Base fare by apartment size
    let base = 3000;
    switch (formData.moveSize) {
      case 'Few Items': base = 2000; break;
      case '1 BHK': base = 4000; break;
      case '2 BHK': base = 6500; break;
      case '3 BHK': base = 9500; break;
      case '4+ BHK': base = 13500; break;
      case 'Office': base = 12000; break;
      default: base = 4000;
    }

    // 2. Distance fare
    const originLower = formData.origin.toLowerCase().trim();
    const destLower = formData.destination.toLowerCase().trim();
    
    let distanceCharge = 0;
    
    if (originLower === destLower || destLower === 'local' || destLower.includes('vadodara')) {
      distanceCharge = 1200; // local shift charge
    } else {
      // Outstation charges based on distance from Vadodara (approximate routes)
      if (destLower.includes('ahmedabad')) {
        distanceCharge = 3500;
      } else if (destLower.includes('surat')) {
        distanceCharge = 4500;
      } else if (destLower.includes('mumbai')) {
        distanceCharge = 11000;
      } else if (destLower.includes('pune')) {
        distanceCharge = 14500;
      } else if (destLower.includes('bangalore') || destLower.includes('bengaluru')) {
        distanceCharge = 29000;
      } else if (destLower.includes('delhi')) {
        distanceCharge = 24000;
      } else if (destLower.includes('rajkot')) {
        distanceCharge = 6500;
      } else {
        // Fallback distance calculation
        distanceCharge = 8000; 
      }
    }

    // 3. Packaging quality charge
    let packingCharge = 0;
    if (formData.packingQuality === 'premium') {
      switch (formData.moveSize) {
        case 'Few Items': packingCharge = 1000; break;
        case '1 BHK': packingCharge = 1800; break;
        case '2 BHK': packingCharge = 2800; break;
        case '3 BHK': packingCharge = 4000; break;
        case '4+ BHK': packingCharge = 5500; break;
        case 'Office': packingCharge = 5000; break;
        default: packingCharge = 2000;
      }
    }

    // 4. Labor / Floor surcharge
    let floorSurcharge = 0;
    const originFloor = parseInt(formData.floorOrigin) || 0;
    const destFloor = parseInt(formData.floorDest) || 0;

    if (originFloor > 0 && formData.hasElevatorOrigin === 'no') {
      floorSurcharge += originFloor * 400;
    }
    if (destFloor > 0 && formData.hasElevatorDest === 'no') {
      floorSurcharge += destFloor * 400;
    }

    const totalBase = base + distanceCharge + packingCharge + floorSurcharge;
    
    // Output a range (e.g. totalBase to totalBase + 15%)
    return {
      min: Math.round(totalBase),
      max: Math.round(totalBase * 1.15)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const calculated = calculatePrice();
    const midPrice = Math.round((calculated.min + calculated.max) / 2);

    const quotePayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      origin_city: formData.origin,
      destination_city: formData.destination,
      move_size: formData.moveSize,
      moving_date: formData.movingDate,
      estimated_cost: midPrice,
      notes: `${formData.notes} | Packing: ${formData.packingQuality} | Floor Origin: ${formData.floorOrigin} (Elevator: ${formData.hasElevatorOrigin}) | Floor Dest: ${formData.floorDest} (Elevator: ${formData.hasElevatorDest})`
    };

    try {
      const savedQuote = await dbService.submitQuote(quotePayload);
      setPriceRange(calculated);
      setSubmittedQuote(savedQuote);
      setStep(4); // Move to results step
    } catch (error) {
      console.error('Error submitting quote lead:', error);
      alert('There was an issue submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="calculator-page-container container section animate-fade">
      <div className="calculator-header">
        <div className="calc-logo-icon">
          <CalcIcon size={32} />
        </div>
        <h1 className="section-title">Shifting Cost Calculator</h1>
        <p className="section-subtitle">
          Calculate domestic shifting costs from Vadodara instantly. Our algorithms estimate rates based on current fuel and packaging material indices.
        </p>
      </div>

      <div className="calculator-wizard-card card glass">
        {/* Step Tracker Indicator */}
        <div className="wizard-progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-num">{step > 1 ? '✓' : '1'}</span>
            <span className="step-label">Route & Date</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-num">{step > 2 ? '✓' : '2'}</span>
            <span className="step-label">Inventory Details</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <span className="step-num">{step > 3 ? '✓' : '3'}</span>
            <span className="step-label">Contact Details</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
            <span className="step-num">4</span>
            <span className="step-label">Quote Estimate</span>
          </div>
        </div>

        {/* STEP 1: Locations and Date */}
        {step === 1 && (
          <div className="wizard-step-content animate-fade">
            <h2>Step 1: Set Relocation Route & Date</h2>
            <div className="grid-2-col">
              <div className="form-group">
                <label className="form-label"><MapPin size={16} /> Moving From (Origin)</label>
                <input 
                  type="text" 
                  name="origin"
                  className="form-control"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g. Vadodara"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label"><MapPin size={16} /> Moving To (Destination)</label>
                <input 
                  type="text" 
                  name="destination"
                  className="form-control"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Ahmedabad, Surat, Mumbai"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label"><Calendar size={16} /> Expected Shifting Date</label>
              <input 
                type="date" 
                name="movingDate"
                className="form-control"
                value={formData.movingDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="wizard-actions">
              <div></div> {/* Empty for align */}
              <button onClick={nextStep} className="btn btn-primary">
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Inventory and Options */}
        {step === 2 && (
          <div className="wizard-step-content animate-fade">
            <h2>Step 2: Inventory & Packing Options</h2>
            
            <div className="grid-2-col">
              <div className="form-group">
                <label className="form-label">Move Size / Volume</label>
                <select name="moveSize" className="form-control" value={formData.moveSize} onChange={handleChange}>
                  <option value="Few Items">Few Items / Luggage Only</option>
                  <option value="1 BHK">1 BHK Apartment Shifting</option>
                  <option value="2 BHK">2 BHK Apartment Shifting</option>
                  <option value="3 BHK">3 BHK Apartment Shifting</option>
                  <option value="4+ BHK">4+ BHK / Villa Shifting</option>
                  <option value="Office">Office Shifting / Commercial</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Packing Material Quality</label>
                <select name="packingQuality" className="form-control" value={formData.packingQuality} onChange={handleChange}>
                  <option value="standard">Standard Packing (Boxes + Tape)</option>
                  <option value="premium">Premium Packing (Bubble Wrap + Corrugated Rolls + Foam Sheets)</option>
                </select>
              </div>
            </div>

            <div className="floor-details-box">
              <h3>Handling and Stairs Surcharges</h3>
              <div className="grid-2-col">
                <div>
                  <h4>Origin (Current Home)</h4>
                  <div className="form-group">
                    <label className="form-label">Floor Level</label>
                    <select name="floorOrigin" className="form-control" value={formData.floorOrigin} onChange={handleChange}>
                      <option value="0">Ground Floor</option>
                      <option value="1">1st Floor</option>
                      <option value="2">2nd Floor</option>
                      <option value="3">3rd Floor</option>
                      <option value="4">4th Floor or Higher</option>
                    </select>
                  </div>
                  {formData.floorOrigin !== '0' && (
                    <div className="form-group">
                      <label className="form-label">Elevator Available?</label>
                      <select name="hasElevatorOrigin" className="form-control" value={formData.hasElevatorOrigin} onChange={handleChange}>
                        <option value="yes">Yes, elevator works</option>
                        <option value="no">No, need to carry via stairs</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <h4>Destination (New Home)</h4>
                  <div className="form-group">
                    <label className="form-label">Floor Level</label>
                    <select name="floorDest" className="form-control" value={formData.floorDest} onChange={handleChange}>
                      <option value="0">Ground Floor</option>
                      <option value="1">1st Floor</option>
                      <option value="2">2nd Floor</option>
                      <option value="3">3rd Floor</option>
                      <option value="4">4th Floor or Higher</option>
                    </select>
                  </div>
                  {formData.floorDest !== '0' && (
                    <div className="form-group">
                      <label className="form-label">Elevator Available?</label>
                      <select name="hasElevatorDest" className="form-control" value={formData.hasElevatorDest} onChange={handleChange}>
                        <option value="yes">Yes, elevator works</option>
                        <option value="no">No, need to carry via stairs</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="wizard-actions">
              <button onClick={prevStep} className="btn btn-outline">
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button onClick={nextStep} className="btn btn-primary">
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact details & Submit */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="wizard-step-content animate-fade">
            <h2>Step 3: Contact & Cargo Information</h2>
            
            <div className="form-group">
              <label className="form-label">Your Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control"
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Bhavik Pargar"
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
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="e.g. 6359225925"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address (Optional)</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e.g. name@domain.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Shifting Notes / Inventory List (Optional)</label>
              <textarea 
                name="notes" 
                rows="3" 
                className="form-control"
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="List fragile electronics, heavy sofas, or specific packing instruction..."
              ></textarea>
            </div>

            <div className="wizard-actions">
              <button type="button" onClick={prevStep} className="btn btn-outline" disabled={submitting}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting Quote...' : 'Calculate and Save Quote'}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Results Display */}
        {step === 4 && (
          <div className="wizard-step-content results-step animate-fade">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={64} className="success-icon" />
            </div>
            
            <h2>Relocation Estimate Generated!</h2>
            <p className="success-msg">
              Thank you, <strong>{formData.name}</strong>. Your shifting lead has been registered. An agent from our Gotri, Vadodara office will call you within 15 minutes to finalize loading details.
            </p>

            <div className="quote-result-card">
              <div className="quote-cities">
                <div className="city-box">
                  <span className="city-label">FROM</span>
                  <h3>{formData.origin}</h3>
                </div>
                <div className="route-arrow">➔</div>
                <div className="city-box">
                  <span className="city-label">TO</span>
                  <h3>{formData.destination}</h3>
                </div>
              </div>

              <div className="quote-details-list">
                <div className="detail-row">
                  <span>Move Size:</span>
                  <strong>{formData.moveSize}</strong>
                </div>
                <div className="detail-row">
                  <span>Expected Date:</span>
                  <strong>{formData.movingDate}</strong>
                </div>
                <div className="detail-row">
                  <span>Packing Level:</span>
                  <strong>{formData.packingQuality.toUpperCase()}</strong>
                </div>
              </div>

              <div className="price-estimation-box">
                <p>Estimated Budget Range</p>
                <h2>₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}</h2>
                <span className="tax-notice">*Excludes GST & Toll Tollway taxes if applicable.</span>
              </div>
            </div>

            <div className="insurance-info-box">
              <ShieldAlert size={24} className="insurance-icon" />
              <div>
                <h4>Secure Your Transit</h4>
                <p>We recommend adding transit insurance at 2% declared cargo value. This guarantees full refund coverage against any transit damages.</p>
              </div>
            </div>

            <div className="result-actions">
              <button 
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    origin: 'Vadodara',
                    destination: '',
                    moveSize: '1 BHK',
                    movingDate: '',
                    packingQuality: 'standard',
                    floorOrigin: '0',
                    floorDest: '0',
                    hasElevatorOrigin: 'yes',
                    hasElevatorDest: 'yes',
                    declaredValue: '50000',
                    notes: ''
                  });
                  setStep(1);
                }} 
                className="btn btn-outline"
              >
                Calculate New Shifting
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

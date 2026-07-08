import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, CheckCircle, ChevronRight, Truck, User, ArrowRight, FileText, Image } from 'lucide-react';
import { dbService } from '../dbService';
import './Track.css';

export default function Track() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lrInput, setLrInput] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lrParam = searchParams.get('lr');

  useEffect(() => {
    if (lrParam) {
      setLrInput(lrParam);
      fetchShipment(lrParam);
    }
  }, [lrParam]);

  const fetchShipment = async (lrNumber) => {
    setLoading(true);
    setError('');
    setShipment(null);
    try {
      const data = await dbService.getShipmentByLR(lrNumber);
      if (data) {
        setShipment(data);
      } else {
        setError('No shipment found with this Lorry Receipt (LR) number. Try searching "RK-VDRA-101" for a live demo.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while tracking the shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!lrInput.trim()) return;
    setSearchParams({ lr: lrInput.trim().toUpperCase() });
  };

  const statusMilestones = [
    { key: 'booked', label: 'Booked' },
    { key: 'packing', label: 'Packed' },
    { key: 'loading', label: 'Loaded' },
    { key: 'in_transit', label: 'In Transit' },
    { key: 'reached_hub', label: 'Hub Arrival' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getMilestoneIndex = (statusKey) => {
    return statusMilestones.findIndex(m => m.key === statusKey);
  };

  const currentMilestoneIndex = shipment ? getMilestoneIndex(shipment.current_status) : -1;

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="track-page-container container section animate-fade">
      <div className="track-header">
        <h1 className="section-title"><span>Track Consignment</span></h1>
        <p className="section-subtitle">
          Monitor your shipment's live status, transit stops, and estimated delivery dates.
        </p>
      </div>

      {/* Tracking Search Form */}
      <div className="track-search-card card glass">
        <form onSubmit={handleSearch} className="track-search-form">
          <div className="track-input-field">
            <Search className="search-field-icon" size={22} />
            <input 
              type="text" 
              placeholder="Enter Lorry Receipt (LR) Number (e.g. RK-VDRA-101)" 
              value={lrInput}
              onChange={(e) => setLrInput(e.target.value)}
              className="track-search-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Track Cargo'}
          </button>
        </form>
        <p className="demo-hint-text">
          💡 Demo Hint: Enter <strong>RK-VDRA-101</strong> (in-transit) or <strong>RK-VDRA-102</strong> (delivered) to view active trackers.
        </p>
      </div>

      {/* Error Display */}
      {error && <div className="track-error-box card">{error}</div>}

      {/* Shipment Results */}
      {shipment && (
        <div className="shipment-result-wrapper">
          {/* Summary Card */}
          <div className="shipment-summary-card card glass">
            <div className="summary-main-header">
              <div>
                <span className="summary-lr">Lorry Receipt: {shipment.lr_number}</span>
                <h2 className="summary-status-title">
                  Current Status: <span className={`status-text-${shipment.current_status}`}>{shipment.current_status.replace('_', ' ').toUpperCase()}</span>
                </h2>
              </div>
              <div className="summary-eta-badge">
                <Calendar size={18} />
                <div>
                  <span className="eta-label">ESTIMATED DELIVERY</span>
                  <strong className="eta-value">{formatDate(shipment.eta)}</strong>
                </div>
              </div>
            </div>

            <div className="summary-details-grid">
              <div className="sum-detail-item">
                <User size={18} className="sum-icon" />
                <div>
                  <span>Client Name</span>
                  <strong>{shipment.customer_name}</strong>
                </div>
              </div>
              <div className="sum-detail-item">
                <MapPin size={18} className="sum-icon" />
                <div>
                  <span>Origin Location</span>
                  <strong>{shipment.origin}</strong>
                </div>
              </div>
              <div className="sum-detail-item">
                <ArrowRight size={18} className="sum-icon" />
                <div>
                  <span>Destination</span>
                  <strong>{shipment.destination}</strong>
                </div>
              </div>
              <div className="sum-detail-item">
                <MapPin size={18} className="sum-icon" />
                <div>
                  <span>Transit Location</span>
                  <strong>{shipment.current_location}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Timeline Visualizer */}
          <div className="shipment-stepper-card card">
            <h3>Transit Milestones</h3>
            <div className="stepper-track-wrapper">
              <div className="stepper-track">
                {statusMilestones.map((milestone, idx) => {
                  const isCompleted = idx < currentMilestoneIndex;
                  const isActive = idx === currentMilestoneIndex;
                  
                  return (
                    <div 
                      key={milestone.key} 
                      className={`step-node-container ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    >
                      <div className="step-node">
                        {isCompleted ? <CheckCircle size={20} className="step-check" /> : <div className="step-dot"></div>}
                      </div>
                      <span className="step-node-label">{milestone.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Image / Doc Preview Section */}
          {shipment.image_source && (
            <div className="shipment-doc-preview-card card glass">
              <div className="doc-preview-header">
                {shipment.document_type === 'lorry_receipt' || shipment.document_type === 'invoice' ? (
                  <FileText className="doc-preview-icon" size={22} />
                ) : (
                  <Image className="doc-preview-icon" size={22} />
                )}
                <h3>Attached Shifting Document ({shipment.document_type.replace('_', ' ').toUpperCase()})</h3>
              </div>
              <div className="doc-image-frame">
                <img 
                  src={shipment.image_source} 
                  alt={`Shifting Document - ${shipment.document_type}`}
                  className="doc-preview-img" 
                />
              </div>
            </div>
          )}

          {/* Detailed History Log */}
          <div className="shipment-history-card card">
            <h3>Shipment Logs</h3>
            <div className="history-timeline">
              {shipment.status_history.map((log, index) => (
                <div key={index} className="history-log-item">
                  <div className="log-marker-wrapper">
                    <div className="log-marker-circle">
                      <Truck size={14} />
                    </div>
                    <div className="log-marker-line"></div>
                  </div>
                  <div className="log-content">
                    <div className="log-meta">
                      <span className="log-status-badge">{log.status.replace('_', ' ').toUpperCase()}</span>
                      <span className="log-time">
                        <Calendar size={14} /> {formatDate(log.timestamp)}
                        <Clock size={14} style={{ marginLeft: '12px' }} /> {formatTime(log.timestamp)}
                      </span>
                    </div>
                    <h4 className="log-location">Location: {log.location}</h4>
                    <p className="log-comment">{log.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

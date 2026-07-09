import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../dbService';
import { Camera, Eye, X, ArrowRight, Truck } from 'lucide-react';
import './Gallery.css';

export default function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await dbService.getGalleryImages();
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter(img => img.category === activeFilter);

  return (
    <div className="gallery-page-container container section animate-fade">
      {/* SEO Headline Stack */}
      <header className="gallery-page-header">
        <div className="gallery-logo-icon">
          <Camera size={32} />
        </div>
        <h1 className="section-title">
          Our Shifting <span>Showcase</span>
        </h1>
        <p className="section-subtitle">
          Real-time photo logs of our packing, loading, and logistics operations in Gotri, Vadodara. See how we protect your valuable assets.
        </p>
      </header>

      {/* Modern Spaced Filter Bar */}
      <nav className="gallery-filters-row">
        {[
          { key: 'all', label: 'All Operations' },
          { key: 'shifting', label: 'Home Shifting' },
          { key: 'packaging', label: 'Premium Packing' },
          { key: 'fleet', label: 'Relocation Fleet' },
          { key: 'warehouse', label: 'Gotri Storage' }
        ].map(filter => (
          <button
            key={filter.key}
            className={`gallery-filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </nav>

      {/* Masonry Portfolio Grid */}
      {loading ? (
        <div className="gallery-loader-box">
          <div className="loader-ring"></div>
          <p>Loading shifting portfolio...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="card no-images-card animate-fade">
          <Truck size={48} className="no-img-icon" />
          <h3>No showcase photos found in this category.</h3>
          <p>Admin is currently uploading logistics operations details.</p>
        </div>
      ) : (
        <div className="gallery-portfolio-grid animate-fade">
          {filteredImages.map((img) => (
            <figure 
              key={img.id} 
              className="gallery-portfolio-card card glass"
              onClick={() => setActiveLightboxImage(img)}
            >
              <div className="gallery-card-img-wrapper">
                <img src={img.image_url} alt={img.caption} loading="lazy" />
                <div className="gallery-card-hover-overlay">
                  <span className="overlay-badge">
                    {img.category}
                  </span>
                  <div className="overlay-action-circle">
                    <Eye size={20} />
                  </div>
                </div>
              </div>
              <figcaption className="gallery-card-caption">
                <span className="caption-tag">{img.category}</span>
                <p>"{img.caption}"</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* Lower CTA Panel to bypass plain look */}
      <section className="gallery-cta-card card glass animate-fade">
        <div className="cta-left">
          <h3>Planning a Shifting in Vadodara?</h3>
          <p>Get a precise estimation from Gotri packers and movers based on your exact inventory and packing choices.</p>
        </div>
        <button onClick={() => navigate('/calculator')} className="btn btn-secondary">
          <span>Calculate Shifting Cost</span>
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Lightbox Modal Module */}
      {activeLightboxImage && (
        <div className="gallery-lightbox-overlay animate-fade" onClick={() => setActiveLightboxImage(null)}>
          <button className="btn-close-lightbox" onClick={() => setActiveLightboxImage(null)}>
            <X size={24} />
          </button>
          
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-img-wrapper">
              <img src={activeLightboxImage.image_url} alt={activeLightboxImage.caption} />
            </div>
            <div className="lightbox-details-panel">
              <span className="lightbox-category-tag">{activeLightboxImage.category}</span>
              <p className="lightbox-caption-txt">"{activeLightboxImage.caption}"</p>
              <span className="lightbox-date-txt">
                Captured: {new Date(activeLightboxImage.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

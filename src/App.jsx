import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Services from './pages/Services';
import Calculator from './pages/Calculator';
import Track from './pages/Track';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Gallery from './pages/Gallery';

// ScrollToTop helper component to reset scroll position on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Subcomponent to access router hooks like useLocation
function AppContent() {
  const location = useLocation();
  
  // Check if current route is the admin workspace page
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hide public header navbar on the admin page */}
      {!isAdminPage && <Navbar />}
      
      <main className="app-main-content" style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/track" element={<Track />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Hide public chat helper & footer on the admin page */}
      {!isAdminPage && <Chatbot />}
      
      {/* Floating WhatsApp Button */}
      {!isAdminPage && (
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-float-btn"
          title="WhatsApp Us"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-11.916c-.15-.246-.554-.393-1.157-.694-.602-.302-3.559-1.758-4.11-1.959-.552-.202-.954-.302-1.356.302-.402.603-1.558 1.96-1.91 2.363-.351.402-.703.452-1.305.151-.603-.3-2.543-1.018-4.843-3.072-1.79-1.597-2.998-3.57-3.35-4.173-.352-.603-.038-.93.264-1.23.272-.271.603-.704.904-1.056.302-.352.402-.603.603-1.006.201-.403.101-.754-.05-1.056-.151-.302-1.357-3.268-1.86-4.474-.49-1.182-.99-1.022-1.357-1.04-.352-.018-.755-.02-1.158-.02-.402 0-1.055.15-1.608.755-.553.603-2.11 2.06-2.11 5.027 0 2.968 2.159 5.834 2.46 6.237.302.402 4.251 6.494 10.3 9.102 1.439.621 2.562.99 3.439 1.267 1.445.46 2.76.395 3.799.24 1.158-.172 3.559-1.458 4.061-2.866.502-1.408.502-2.616.352-2.867z"/>
          </svg>
        </a>
      )}

      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;

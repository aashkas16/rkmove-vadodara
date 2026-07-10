import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../dbService';
import { 
  Users, 
  Truck, 
  Star, 
  LogOut, 
  Plus, 
  ClipboardList, 
  MapPin, 
  TrendingUp, 
  RefreshCw, 
  Lock,
  PlusCircle,
  FileText,
  DollarSign,
  TrendingDown,
  Percent,
  Cpu,
  CheckSquare,
  AlertTriangle,
  Lightbulb,
  Upload,
  Check,
  ChevronRight,
  Home as HomeIcon,
  Briefcase,
  Archive,
  Car,
  LayoutDashboard,
  Box,
  CreditCard,
  AlertCircle,
  Clock,
  CheckCircle,
  Mail,
  ExternalLink,
  Shield,
  Key,
  Trash2,
  MessageSquare,
  Search,
  Image
} from 'lucide-react';
import { isSupabaseConfigured } from '../supabaseClient';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('rkmove84@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Sidebar Tab Navigation: 'dashboard', 'shipments', 'quotes', 'finance', 'ai_insights', 'reviews'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Database States
  const [quotes, setQuotes] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  // V2.5 Workspace States
  const [admins, setAdmins] = useState([
    { id: '1', name: 'Bhavik Pargar (Jeet)', role: 'Super Admin', userId: 'super_jeet_2026', email: 'rkmove84@gmail.com', added: '5/7/2026' },
    { id: '2', name: 'Rajesh Kumar', role: 'Staff', userId: 'staff_rajesh_99', email: 'rajesh@rkmove.com', added: '6/23/2026' }
  ]);
  const [searchAdminQuery, setSearchAdminQuery] = useState('');
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({ name: '', email: '', password: '', role: 'Staff' });

  // Additional tables from screenshot
  const [contacts, setContacts] = useState([
    { id: 'c-1', name: 'Aashka Shah', email: 'aashka@gmail.com', phone: '6359225925', subject: 'Quote Enquiry', message: 'Need shifting from Vadodara to Ahmedabad next week. Call me.', date: '7/2/2026' },
    { id: 'c-2', name: 'Mehul Mehta', email: 'mehul@outlook.com', phone: '6359225925', subject: 'Corporate Shifting', message: 'Moving 20 workstations from Alkapuri to Gotri. Need IBA approved quotation.', date: '7/5/2026' }
  ]);
  const [vehicles, setVehicles] = useState([
    { id: 'v-1', plate: 'GJ-06-ZZ-1234', type: 'Tata Ace', status: 'available', driver: 'Ramesh Solanki', currentRoute: 'Local Vadodara' },
    { id: 'v-2', plate: 'GJ-06-YY-5678', type: 'Tata 407 (14-ft)', status: 'in_transit', driver: 'Kalu Singh', currentRoute: 'Vadodara Hub ➔ Ahmedabad' },
    { id: 'v-3', plate: 'GJ-06-XX-9012', type: '17-ft Closed Container', status: 'in_transit', driver: 'Vijay Rabari', currentRoute: 'Vadodara ➔ Surat' },
    { id: 'v-4', plate: 'GJ-06-WW-3456', type: '20-ft Container Truck', status: 'maintenance', driver: 'N/A', currentRoute: 'Depot Gotri' }
  ]);
  
  // Gallery showcase states
  const [gallery, setGallery] = useState([]);
  const [newGalleryItem, setNewGalleryItem] = useState({ image_url: '', caption: '', category: 'shifting' });
  const [galleryFileLabel, setGalleryFileLabel] = useState('No file chosen');
  
  // Loading indicators
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Form State: Add Shipment
  const [showAddShipment, setShowAddShipment] = useState(false);
  const [newShipment, setNewShipment] = useState({
    lr_number: '',
    customer_name: '',
    customer_phone: '',
    origin: '',
    destination: '',
    current_status: 'booked',
    current_location: 'Vadodara Hub',
    eta: '',
    image_source: '',
    document_type: 'lorry_receipt',
    comment: 'Consignment booked successfully.'
  });

  // Base64 file helper state
  const [fileLabel, setFileLabel] = useState('No file chosen');

  // Form State: Edit Shipment Status
  const [editingShipment, setEditingShipment] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({
    current_status: 'booked',
    current_location: '',
    comment: '',
    eta: '',
    image_source: '',
    document_type: 'lorry_receipt'
  });
  const [editFileLabel, setEditFileLabel] = useState('No file chosen');

  // Form State: Edit Quote Finance
  const [editingFinanceQuote, setEditingFinanceQuote] = useState(null);
  const [financeForm, setFinanceForm] = useState({
    estimated_cost: 0,
    labor_cost: 0,
    fuel_cost: 0,
    toll_cost: 0,
    materials_cost: 0,
    payment_status: 'unpaid'
  });

  // AI Active Insight Selector
  const [selectedAIQuote, setSelectedAIQuote] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('rk_admin_session');
    if (adminToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const allQuotes = await dbService.getQuotes();
      const allShipments = await dbService.getAllShipments();
      const allReviews = await dbService.getAllReviews();
      const allContacts = await dbService.getContacts();
      const allGallery = await dbService.getGalleryImages();

      setQuotes(allQuotes || []);
      setShipments(allShipments || []);
      setReviews(allReviews || []);
      setContacts(allContacts || []);
      setGallery(allGallery || []);

      if (allQuotes && allQuotes.length > 0 && !selectedAIQuote) {
        setSelectedAIQuote(allQuotes[0]);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === 'rkmove84@gmail.com' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('rk_admin_session', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try rkmove84@gmail.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('rk_admin_session');
  };

  // Quotes Operations
  const handleUpdateQuote = async (id, newStatus, estimatedCost) => {
    setUpdating(true);
    try {
      await dbService.updateQuoteStatus(id, newStatus, estimatedCost);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('Error updating quote status.');
    } finally {
      setUpdating(false);
    }
  };

  // Finance Operations
  const handleEditFinanceClick = (quote) => {
    setEditingFinanceQuote(quote);
    setFinanceForm({
      estimated_cost: quote.estimated_cost || 0,
      labor_cost: quote.labor_cost || 0,
      fuel_cost: quote.fuel_cost || 0,
      toll_cost: quote.toll_cost || 0,
      materials_cost: quote.materials_cost || 0,
      payment_status: quote.payment_status || 'unpaid'
    });
  };

  const handleUpdateFinance = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await dbService.updateQuoteFinance(editingFinanceQuote.id, financeForm);
      setEditingFinanceQuote(null);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('Error updating shifting finances.');
    } finally {
      setUpdating(false);
    }
  };

  // Reviews Operations
  const handleApproveReview = async (id, isApproved) => {
    setUpdating(true);
    try {
      await dbService.approveReview(id, isApproved);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('Error changing review status.');
    } finally {
      setUpdating(false);
    }
  };

  // FileReader Helper for File Uploads
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    if (isEdit) {
      setEditFileLabel(file.name);
    } else {
      setFileLabel(file.name);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setStatusUpdate(prev => ({ ...prev, image_source: reader.result }));
      } else {
        setNewShipment(prev => ({ ...prev, image_source: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Shipments Operations
  const handleCreateShipment = async (e) => {
    e.preventDefault();
    if (!newShipment.lr_number || !newShipment.customer_name || !newShipment.origin || !newShipment.destination) {
      alert('Please fill out all required shipment fields.');
      return;
    }

    setUpdating(true);
    try {
      const initialLog = {
        status: newShipment.current_status,
        timestamp: new Date().toISOString(),
        location: newShipment.current_location || newShipment.origin,
        comment: newShipment.comment || 'Consignment loaded.'
      };

      await dbService.createShipment({
        lr_number: newShipment.lr_number.trim().toUpperCase(),
        customer_name: newShipment.customer_name,
        customer_phone: newShipment.customer_phone,
        origin: newShipment.origin,
        destination: newShipment.destination,
        current_status: newShipment.current_status,
        current_location: newShipment.current_location || newShipment.origin,
        eta: newShipment.eta || null,
        image_source: newShipment.image_source || null,
        document_type: newShipment.document_type || 'lorry_receipt',
        status_history: [initialLog]
      });

      setShowAddShipment(false);
      setFileLabel('No file chosen');
      setNewShipment({
        lr_number: '',
        customer_name: '',
        customer_phone: '',
        origin: '',
        destination: '',
        current_status: 'booked',
        current_location: 'Vadodara Hub',
        eta: '',
        image_source: '',
        document_type: 'lorry_receipt',
        comment: 'Consignment booked successfully.'
      });
      await fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error creating shipment.');
    } finally {
      setUpdating(false);
    }
  };

  const handleEditShipmentClick = (shipment) => {
    setEditingShipment(shipment);
    setEditFileLabel(shipment.image_source ? 'Has attachment (Replace)' : 'No file chosen');
    setStatusUpdate({
      current_status: shipment.current_status,
      current_location: shipment.current_location,
      comment: '',
      eta: shipment.eta || '',
      image_source: shipment.image_source || '',
      document_type: shipment.document_type || 'lorry_receipt'
    });
  };

  const handleUpdateShipmentStatus = async (e) => {
    e.preventDefault();
    if (!statusUpdate.current_location || !statusUpdate.comment) {
      alert('Please specify current location and transit log comments.');
      return;
    }

    setUpdating(true);
    try {
      const newLog = {
        status: statusUpdate.current_status,
        timestamp: new Date().toISOString(),
        location: statusUpdate.current_location,
        comment: statusUpdate.comment
      };

      const updatedHistory = [...editingShipment.status_history, newLog];

      await dbService.updateShipmentStatus(
        editingShipment.id,
        statusUpdate.current_status,
        statusUpdate.current_location,
        statusUpdate.eta,
        updatedHistory,
        statusUpdate.image_source || null,
        statusUpdate.document_type
      );

      setEditingShipment(null);
      setEditFileLabel('No file chosen');
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('Error updating shipment status log.');
    } finally {
      setUpdating(false);
    }
  };

  // Financial calculations
  const totalRevenue = quotes
    .filter(q => q.status === 'booked' || q.status === 'completed')
    .reduce((acc, q) => acc + (Number(q.estimated_cost) || 0), 0);

  const totalExpenses = quotes
    .filter(q => q.status === 'booked' || q.status === 'completed')
    .reduce((acc, q) => acc + (
      (Number(q.labor_cost) || 0) + 
      (Number(q.fuel_cost) || 0) + 
      (Number(q.toll_cost) || 0) + 
      (Number(q.materials_cost) || 0)
    ), 0);

  const netProfit = totalRevenue - totalExpenses;
  const profitMarginPercent = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

  // Dashboard Stats Row 1
  const countParcels = shipments.length;
  const countActiveShipments = shipments.filter(s => s.current_status !== 'delivered').length;
  const countDelivered = shipments.filter(s => s.current_status === 'delivered').length;
  const countPendingPayments = quotes.filter(q => 
    (q.status === 'booked' || q.status === 'completed') && 
    q.payment_status !== 'paid'
  ).length;

  // Dashboard Stats Row 2
  const countDueAlerts = quotes.filter(q => q.status === 'pending').length;

  // AI resource recommender calculator
  const getAIRecommendations = (moveSize) => {
    switch (moveSize) {
      case 'Few Items':
        return {
          truck: 'Tata Ace (Small Open Pickup)',
          boxes: '10 Standard Cardboards',
          bubble: 'None (bubble wrap not needed)',
          staff: '1 Loader',
          time: '1 - 2 Hours'
        };
      case '1 BHK':
        return {
          truck: 'Tata 407 (14-ft Container Truck)',
          boxes: '25 Standard Cartons, 3 wardrobes cartons',
          bubble: '1 Roll (Fragile Crockery/Kitchen)',
          staff: '2 Packers, 1 Driver',
          time: '3 - 4 Hours'
        };
      case '2 BHK':
        return {
          truck: '17-ft Closed Container Truck',
          boxes: '40 Standard Cartons, 5 wardrobe cartons',
          bubble: '2 Rolls (TV, Glassware, Sofa corner covers)',
          staff: '3 Packers, 1 Driver',
          time: '4 - 6 Hours'
        };
      case '3 BHK':
        return {
          truck: '20-ft Closed Container Cargo Truck',
          boxes: '60 Standard Cartons, 8 wardrobe cartons',
          bubble: '3 Rolls (Fragile, appliances, wooden tables)',
          staff: '4 Packers, 1 Driver, 1 Supervisor',
          time: '6 - 8 Hours'
        };
      case '4+ BHK':
        return {
          truck: '2x 17-ft Containers OR 24-ft Double Axle Truck',
          boxes: '80+ Cardboard Cartons, 12 wardrobe cartons',
          bubble: '5 Rolls (Full wraps, double padding)',
          staff: '6 Packers, 2 Drivers, 1 Supervisor',
          time: '8 - 12 Hours'
        };
      default:
        return {
          truck: '17-ft Container Truck',
          boxes: '35 Standard Cartons',
          bubble: '2 Rolls',
          staff: '3 Packers',
          time: '4 Hours'
        };
    }
  };

  const getAIConversionProbability = (quote) => {
    let prob = 50;
    const dest = (quote.destination_city || '').toLowerCase();
    if (dest.includes('ahmedabad') || dest.includes('surat') || dest.includes('local') || dest.includes('vadodara')) {
      prob += 25;
    } else {
      prob += 10;
    }
    if (quote.move_size === '2 BHK' || quote.move_size === '3 BHK') {
      prob += 10;
    }
    if (quote.estimated_cost) {
      prob += 10;
    }
    return Math.min(prob, 95);
  };

  // COMPARTMENT DIVISION FOR CUSTOMERS
  const householdCompartment = quotes.filter(q => 
    q.move_size !== 'Office' && 
    !q.notes?.toLowerCase().includes('storage') && 
    !q.notes?.toLowerCase().includes('warehouse') &&
    !q.notes?.toLowerCase().includes('car') &&
    !q.notes?.toLowerCase().includes('bike') &&
    !q.notes?.toLowerCase().includes('vehicle')
  );

  const officeCompartment = quotes.filter(q => q.move_size === 'Office');

  const warehousingCompartment = quotes.filter(q => 
    q.notes?.toLowerCase().includes('storage') || 
    q.notes?.toLowerCase().includes('warehouse') ||
    q.destination_city?.toLowerCase().includes('storage') ||
    q.destination_city?.toLowerCase().includes('warehouse')
  );

  const vehicleCompartment = quotes.filter(q => 
    q.notes?.toLowerCase().includes('car') || 
    q.notes?.toLowerCase().includes('bike') || 
    q.notes?.toLowerCase().includes('vehicle') ||
    q.move_size?.toLowerCase().includes('car') ||
    q.move_size?.toLowerCase().includes('bike')
  );

  // Helper to render Customer Card in Compartments
  const renderCustomerMorphicCard = (quote) => {
    return (
      <div key={quote.id} className="compartment-customer-card">
        <div className="comp-card-header">
          <div>
            <h4>{quote.name}</h4>
            <span className="comp-card-phone">{quote.phone}</span>
          </div>
          <span className={`badge badge-${quote.status}`}>{quote.status}</span>
        </div>

        <div className="comp-card-route">
          <span>{quote.origin_city}</span>
          <span className="comp-route-arrow">➔</span>
          <span>{quote.destination_city}</span>
        </div>

        <div className="comp-card-meta">
          <div>
            <span className="meta-lbl">Size:</span>
            <span className="meta-val">{quote.move_size}</span>
          </div>
          <div>
            <span className="meta-lbl">Date:</span>
            <span className="meta-val">{quote.moving_date}</span>
          </div>
        </div>

        {quote.notes && (
          <p className="comp-card-notes">"{quote.notes.substring(0, 75)}"</p>
        )}

        <div className="comp-card-footer">
          <div className="comp-card-price">
            <span className="meta-lbl">Quote:</span>
            <strong>{quote.estimated_cost ? `₹${quote.estimated_cost.toLocaleString('en-IN')}` : '₹0'}</strong>
          </div>

          <div className="comp-card-actions">
            {quote.status === 'pending' && (
              <>
                <button 
                  onClick={() => handleUpdateQuote(quote.id, 'quoted', quote.estimated_cost || 4500)} 
                  className="btn-comp-action confirm"
                  disabled={updating}
                >
                  Quote
                </button>
                <button 
                  onClick={() => handleUpdateQuote(quote.id, 'cancelled')} 
                  className="btn-comp-action reject"
                  disabled={updating}
                >
                  Cancel
                </button>
              </>
            )}
            {quote.status === 'quoted' && (
              <button 
                onClick={() => handleUpdateQuote(quote.id, 'booked')} 
                className="btn-comp-action confirm"
                disabled={updating}
              >
                Confirm
              </button>
            )}
            {quote.status === 'booked' && (
              <button 
                onClick={() => handleUpdateQuote(quote.id, 'completed')} 
                className="btn-comp-action confirm"
                disabled={updating}
              >
                Complete
              </button>
            )}
            {quote.status === 'completed' && <span className="comp-card-done">✓ Completed</span>}
            {quote.status === 'cancelled' && <span className="comp-card-cancelled">Cancelled</span>}
          </div>
        </div>
      </div>
    );
  };

  // Compile recent activity log based on shipment checkpoints
  const recentActivities = shipments
    ? shipments.flatMap(s => 
        (s.status_history || []).map(h => ({
          lr: s.lr_number || '',
          customer: s.customer_name || '',
          status: h.status || 'unknown',
          timestamp: h.timestamp || new Date().toISOString(),
          location: h.location || 'unknown',
          comment: h.comment || ''
        }))
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 4)
    : [];

  if (!isLoggedIn) {
    return (
      <div className="admin-login-fullscreen-bg">
        <div className="admin-login-glass-card animate-fade">
          
          {/* Top Brand Icon */}
          <div className="login-brand-icon-orange">
            <Truck size={32} />
          </div>

          {/* Titles */}
          <h2 className="login-card-title">Admin Panel</h2>
          <p className="login-card-subtitle">RK Cargo Packers & Movers</p>

          <form onSubmit={handleLogin} className="login-form-width">
            
            {/* Email Field */}
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="login-input-field"
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input-field"
                required
              />
            </div>

            {loginError && <p className="login-error-message">{loginError}</p>}

            <button type="submit" className="btn-login-submit">
              Sign In
            </button>
          </form>
          
        </div>
      </div>
    );
  }

  return (
    <div className="admin-morphic-outer animate-fade">
      {/* Sidebar Control Column (Clean Dark Theme V2.3) */}
      <aside className="admin-morphic-sidebar">
        <div className="sidebar-brand-box">
          <div className="sidebar-logo-icon-orange">
            <Truck size={18} />
          </div>
          <div>
            <h3>RK Cargo</h3>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        <nav className="sidebar-nav-links">
          <button 
            className={`sidebar-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'shipments' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipments')}
          >
            <Box size={18} />
            <span>Parcels</span>
          </button>
          
          <button 
            className={`sidebar-nav-btn ${activeTab === 'quotes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            <Users size={18} />
            <span>Customers</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            <FileText size={18} />
            <span>Invoices</span>
          </button>
          
          <button 
            className={`sidebar-nav-btn ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
          >
            <DollarSign size={18} />
            <span>Finance</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'ai_insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai_insights')}
          >
            <Cpu size={18} />
            <span>Reports</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <Car size={18} />
            <span>Vehicles</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <MessageSquare size={18} />
            <span>Contacts</span>
          </button>
          
          <button 
            className={`sidebar-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star size={18} />
            <span>Reviews</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'admin_management' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin_management')}
          >
            <Shield size={18} />
            <span>Admin Management</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'gallery_manager' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery_manager')}
          >
            <Image size={18} />
            <span>Gallery Showcase</span>
          </button>
        </nav>

        <div className="sidebar-footer-box">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="admin-morphic-main-panel">
        
        {/* Top bar display */}
        <header className="admin-morphic-topbar">
          <div>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('_', ' ')}</h2>
          </div>
          <div className="topbar-actions-row">
            <button onClick={() => navigate('/')} className="btn-view-website">
              <ExternalLink size={14} />
              <span>View Website</span>
            </button>
            <button onClick={fetchData} className="btn-morphic-refresh" title="Refresh Feed">
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        {/* Tab Content: Dashboard (NEW REPLICA V2.3) */}
        {activeTab === 'dashboard' && (
          <div className="admin-tab-section animate-fade">
            {/* Stats Row 1 */}
            <div className="dashboard-stats-grid">
              
              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Total Parcels</span>
                  <h3>{countParcels}</h3>
                </div>
                <div className="dash-icon-box bg-blue">
                  <Box size={18} />
                </div>
              </div>

              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Active Shipments</span>
                  <h3>{countActiveShipments}</h3>
                </div>
                <div className="dash-icon-box bg-orange">
                  <Truck size={18} />
                </div>
              </div>

              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Delivered</span>
                  <h3>{countDelivered}</h3>
                </div>
                <div className="dash-icon-box bg-green">
                  <CheckCircle size={18} />
                </div>
              </div>

              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Pending Payments</span>
                  <h3>{countPendingPayments}</h3>
                </div>
                <div className="dash-icon-box bg-red">
                  <CreditCard size={18} />
                </div>
              </div>

            </div>

            {/* Stats Row 2 */}
            <div className="dashboard-stats-grid">
              
              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Total Income</span>
                  <h3>₹{totalRevenue.toLocaleString('en-IN')}</h3>
                </div>
                <div className="dash-icon-indicator text-green">
                  <TrendingUp size={18} />
                </div>
              </div>

              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Total Expense</span>
                  <h3>₹{totalExpenses.toLocaleString('en-IN')}</h3>
                </div>
                <div className="dash-icon-indicator text-red">
                  <TrendingDown size={18} />
                </div>
              </div>

              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Net Profit</span>
                  <h3>₹{netProfit.toLocaleString('en-IN')}</h3>
                </div>
                <div className="dash-icon-indicator text-green">
                  <DollarSign size={18} />
                </div>
              </div>

              <div className="card dashboard-stat-card">
                <div>
                  <span className="dash-stat-lbl">Due Alerts</span>
                  <h3>{countDueAlerts}</h3>
                </div>
                <div className="dash-icon-indicator text-red">
                  <AlertCircle size={18} />
                </div>
              </div>

            </div>

            {/* Visual Grid: Charts & Activity */}
            <div className="dashboard-charts-grid">
              {/* Revenue vs Expense Chart Panel */}
              <div className="card chart-panel-card">
                <h3>Revenue vs Expense</h3>
                {totalRevenue === 0 ? (
                  <div className="no-data-placeholder">
                    <span>No data yet. Add income & expenses to see charts.</span>
                  </div>
                ) : (
                  <div className="css-bar-chart-container">
                    <div className="chart-bar-row">
                      <span className="chart-bar-label">Total Revenue</span>
                      <div className="chart-bar-track">
                        <div className="chart-bar-fill fill-revenue" style={{ width: '100%' }}></div>
                      </div>
                      <span className="chart-bar-value">₹{totalRevenue.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="chart-bar-row">
                      <span className="chart-bar-label">Total Expenses</span>
                      <div className="chart-bar-track">
                        <div 
                          className="chart-bar-fill fill-expenses" 
                          style={{ width: `${Math.min((totalExpenses / totalRevenue) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="chart-bar-value">₹{totalExpenses.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="chart-bar-row">
                      <span className="chart-bar-label">Net Profit</span>
                      <div className="chart-bar-track">
                        <div 
                          className="chart-bar-fill fill-profit" 
                          style={{ width: `${Math.min((netProfit / totalRevenue) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="chart-bar-value">₹{netProfit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Activity Panel */}
              <div className="card activity-panel-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {recentActivities.length === 0 ? (
                    <div className="no-data-placeholder">
                      <span>No activity logged yet.</span>
                    </div>
                  ) : (
                    recentActivities.map((act, idx) => (
                      <div key={idx} className="activity-item">
                        <div className="activity-icon-bullet">
                          <Clock size={12} />
                        </div>
                        <div className="activity-desc">
                          <p>
                            <strong>{act.lr}</strong> ({act.customer}) updated to <strong>{act.status.toUpperCase()}</strong> at {act.location}.
                          </p>
                          <span>{new Date(act.timestamp).toLocaleTimeString('en-IN')} - {new Date(act.timestamp).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab Content: Customer Inquiries (COMPARTMENTS) */}
        {activeTab === 'quotes' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Customer Compartment Leads</h3>
              <p>Relocation requests sorted automatically into operational divisions for simple dispatch.</p>
            </div>

            {/* Compartment Grid */}
            <div className="compartments-grid-container">
              
              {/* 1. Household Compartment */}
              <div className="compartment-lane">
                <div className="compartment-lane-header household-border">
                  <HomeIcon size={18} className="lane-icon-house" />
                  <h4>Household Compartment</h4>
                  <span className="lane-count">{householdCompartment.length}</span>
                </div>
                <div className="compartment-lane-cards-list">
                  {householdCompartment.length === 0 ? (
                    <p className="no-leads-notice">No residential shifting leads.</p>
                  ) : (
                    householdCompartment.map(renderCustomerMorphicCard)
                  )}
                </div>
              </div>

              {/* 2. Office Compartment */}
              <div className="compartment-lane">
                <div className="compartment-lane-header office-border">
                  <Briefcase size={18} className="lane-icon-office" />
                  <h4>Office Shifting</h4>
                  <span className="lane-count">{officeCompartment.length}</span>
                </div>
                <div className="compartment-lane-cards-list">
                  {officeCompartment.length === 0 ? (
                    <p className="no-leads-notice">No commercial shifting leads.</p>
                  ) : (
                    officeCompartment.map(renderCustomerMorphicCard)
                  )}
                </div>
              </div>

              {/* 3. Warehousing Compartment */}
              <div className="compartment-lane">
                <div className="compartment-lane-header storage-border">
                  <Archive size={18} className="lane-icon-storage" />
                  <h4>Warehouse Compartment</h4>
                  <span className="lane-count">{warehousingCompartment.length}</span>
                </div>
                <div className="compartment-lane-cards-list">
                  {warehousingCompartment.length === 0 ? (
                    <p className="no-leads-notice">No vault storage inquiries.</p>
                  ) : (
                    warehousingCompartment.map(renderCustomerMorphicCard)
                  )}
                </div>
              </div>

              {/* 4. Vehicle Compartment */}
              <div className="compartment-lane">
                <div className="compartment-lane-header vehicle-border">
                  <Car size={18} className="lane-icon-vehicle" />
                  <h4>Vehicle Compartment</h4>
                  <span className="lane-count">{vehicleCompartment.length}</span>
                </div>
                <div className="compartment-lane-cards-list">
                  {vehicleCompartment.length === 0 ? (
                    <p className="no-leads-notice">No vehicle carriage logistics requests.</p>
                  ) : (
                    vehicleCompartment.map(renderCustomerMorphicCard)
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab Content: Shipments and Logistics (Parcels) */}
        {activeTab === 'shipments' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header flex-space-between">
              <div>
                <h3>Cargo Tracking & Lorry Receipts</h3>
                <p>Register new cargo, update vehicle highway location checkpoints, and attach receipts.</p>
              </div>
              <button 
                onClick={() => setShowAddShipment(!showAddShipment)} 
                className="btn btn-primary"
              >
                <PlusCircle size={16} />
                <span>Add Shipment</span>
              </button>
            </div>

            {/* Add Shipment Form Card */}
            {showAddShipment && (
              <form onSubmit={handleCreateShipment} className="add-shipment-form card glass">
                <h3>Register Shipment Cargo</h3>
                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Lorry Receipt (LR) Number *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. RK-VDRA-103" 
                      value={newShipment.lr_number}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, lr_number: e.target.value }))}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Customer Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Kiran Shah" 
                      value={newShipment.customer_name}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, customer_name: e.target.value }))}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9898011223" 
                      value={newShipment.customer_phone}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, customer_phone: e.target.value }))}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expected Delivery Date (ETA)</label>
                    <input 
                      type="date" 
                      value={newShipment.eta}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, eta: e.target.value }))}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Origin City *</label>
                    <input 
                      type="text" 
                      placeholder="Gotri, Vadodara" 
                      value={newShipment.origin}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, origin: e.target.value }))}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination City *</label>
                    <input 
                      type="text" 
                      placeholder="Satellite, Ahmedabad" 
                      value={newShipment.destination}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, destination: e.target.value }))}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* DUAL IMAGE UPLOAD */}
                <div className="image-upload-row">
                  <div className="form-group">
                    <label className="form-label">Paste Document Image URL (Option A)</label>
                    <input 
                      type="text" 
                      placeholder="https://example.com/invoice.jpg" 
                      value={newShipment.image_source}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, image_source: e.target.value }))}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Or Upload File Scan (Option B)</label>
                    <div className="morphic-file-upload">
                      <Upload className="upload-input-icon" size={18} />
                      <span>{fileLabel}</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, false)}
                        className="file-actual-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attachment Type</label>
                    <select 
                      value={newShipment.document_type}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, document_type: e.target.value }))}
                      className="form-control"
                    >
                      <option value="lorry_receipt">Lorry Receipt scan</option>
                      <option value="invoice">Invoice Shifting slip</option>
                      <option value="cargo_photo">Cargo condition photograph</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Current Transit Location</label>
                    <input 
                      type="text" 
                      placeholder="Vadodara Gotri Depot" 
                      value={newShipment.current_location}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, current_location: e.target.value }))}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Initial Log Note</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Shifting cargo booked." 
                      value={newShipment.comment}
                      onChange={(e) => setNewShipment(prev => ({ ...prev, comment: e.target.value }))}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setShowAddShipment(false)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary" disabled={updating}>
                    Register Shipment Tracker
                  </button>
                </div>
              </form>
            )}

            {/* Edit Shipment Checkpoint Log */}
            {editingShipment && (
              <div className="admin-modal-overlay">
                <form onSubmit={handleUpdateShipmentStatus} className="admin-status-modal card glass animate-fade">
                  <h3>Log Shifting Status: {editingShipment.lr_number}</h3>
                  <p>Client: {editingShipment.customer_name} | Route: {editingShipment.origin} ➔ {editingShipment.destination}</p>
                  
                  <div className="grid-2-col">
                    <div className="form-group">
                      <label className="form-label">Milestone Status</label>
                      <select 
                        value={statusUpdate.current_status} 
                        onChange={(e) => setStatusUpdate(prev => ({ ...prev, current_status: e.target.value }))}
                        className="form-control"
                      >
                        <option value="booked">Booked</option>
                        <option value="packing">Packing</option>
                        <option value="loading">Loading</option>
                        <option value="in_transit">In Transit</option>
                        <option value="reached_hub">Hub Arrival</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Current Location (City/Highway) *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. NH-48 near Bharuch" 
                        value={statusUpdate.current_location}
                        onChange={(e) => setStatusUpdate(prev => ({ ...prev, current_location: e.target.value }))}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  {/* DUAL IMAGE UPLOAD IN STATUS UPDATE */}
                  <div className="image-upload-row">
                    <div className="form-group">
                      <label className="form-label">Attach Document URL (Option A)</label>
                      <input 
                        type="text" 
                        placeholder="https://example.com/invoice.jpg" 
                        value={statusUpdate.image_source}
                        onChange={(e) => setStatusUpdate(prev => ({ ...prev, image_source: e.target.value }))}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Or Upload File Scan (Option B)</label>
                      <div className="morphic-file-upload">
                        <Upload className="upload-input-icon" size={18} />
                        <span>{editFileLabel}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, true)}
                          className="file-actual-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Doc Type</label>
                      <select 
                        value={statusUpdate.document_type}
                        onChange={(e) => setStatusUpdate(prev => ({ ...prev, document_type: e.target.value }))}
                        className="form-control"
                      >
                        <option value="lorry_receipt">Lorry Receipt scan</option>
                        <option value="invoice">Invoice Shifting slip</option>
                        <option value="cargo_photo">Cargo condition photograph</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-2-col">
                    <div className="form-group">
                      <label className="form-label">Expected Date of Delivery (ETA)</label>
                      <input 
                        type="date" 
                        value={statusUpdate.eta}
                        onChange={(e) => setStatusUpdate(prev => ({ ...prev, eta: e.target.value }))}
                        className="form-control"
                      />
                    </div>
                    <div></div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status History Update Log Note *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Passed Bharuch Toll. Shifting proceeds safely." 
                      value={statusUpdate.comment}
                      onChange={(e) => setStatusUpdate(prev => ({ ...prev, comment: e.target.value }))}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={() => setEditingShipment(null)} className="btn btn-outline">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-secondary" disabled={updating}>
                      Log New Checkpoint
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>LR Code</th>
                    <th>Customer Name</th>
                    <th>Shifting Route</th>
                    <th>Current Station</th>
                    <th>Transit Milestone</th>
                    <th>Attached Scan</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>No active shipment trackers registered.</td>
                    </tr>
                  ) : (
                    shipments.map((ship) => (
                      <tr key={ship.id}>
                        <td><strong>{ship.lr_number}</strong></td>
                        <td>
                          <strong>{ship.customer_name}</strong> <br />
                          <span className="text-muted">{ship.customer_phone}</span>
                        </td>
                        <td>{ship.origin} ➔ {ship.destination}</td>
                        <td>
                          <MapPin size={14} style={{ marginRight: '4px', color: 'var(--secondary)', verticalAlign: 'middle' }} />
                          <span>{ship.current_location}</span>
                        </td>
                        <td>
                          <span className={`badge badge-${ship.current_status}`}>{ship.current_status.replace('_', ' ')}</span>
                        </td>
                        <td>
                          {ship.image_source ? (
                            <span className="badge badge-completed">📎 {ship.document_type.replace('_', ' ')}</span>
                          ) : (
                            <span className="text-muted">None</span>
                          )}
                        </td>
                        <td>
                          <button 
                            onClick={() => handleEditShipmentClick(ship)} 
                            className="btn-small btn-confirm"
                          >
                            Update Status
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Finance Dashboard */}
        {activeTab === 'finance' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Finance Dashboard & Cost Ledger</h3>
              <p>Analyze gross relocation revenues, track paid invoices, and audit shifting expense items.</p>
            </div>

            {/* Financial Stats Display */}
            <div className="finance-morphic-stats-row">
              <div className="card finance-stat-card glass">
                <div className="finance-card-icon revenue-icon">
                  <DollarSign size={22} />
                </div>
                <div>
                  <span>Total Shifting Revenue</span>
                  <h3>₹{totalRevenue.toLocaleString('en-IN')}</h3>
                </div>
              </div>

              <div className="card finance-stat-card glass">
                <div className="finance-card-icon expenses-icon">
                  <TrendingDown size={22} />
                </div>
                <div>
                  <span>Total Relocation Expenses</span>
                  <h3>₹{totalExpenses.toLocaleString('en-IN')}</h3>
                </div>
              </div>

              <div className="card finance-stat-card glass">
                <div className="finance-card-icon net-icon">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <span>Net Shifting Profits</span>
                  <h3>₹{netProfit.toLocaleString('en-IN')}</h3>
                </div>
              </div>

              <div className="card finance-stat-card glass">
                <div className="finance-card-icon margin-icon">
                  <Percent size={22} />
                </div>
                <div>
                  <span>Average Profit Margin</span>
                  <h3>{profitMarginPercent}%</h3>
                </div>
              </div>
            </div>

            {/* Finance ledger modification card */}
            {editingFinanceQuote && (
              <form onSubmit={handleUpdateFinance} className="finance-edit-card card glass animate-fade">
                <h3>Set Expenses & Payments: {editingFinanceQuote.name}</h3>
                <p>Route: {editingFinanceQuote.origin_city} ➔ {editingFinanceQuote.destination_city} ({editingFinanceQuote.move_size})</p>
                
                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Total Shifting Quote Cost (₹) *</label>
                    <input 
                      type="number" 
                      value={financeForm.estimated_cost}
                      onChange={(e) => setFinanceForm(prev => ({ ...prev, estimated_cost: Number(e.target.value) }))}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Payment Status</label>
                    <select 
                      value={financeForm.payment_status}
                      onChange={(e) => setFinanceForm(prev => ({ ...prev, payment_status: e.target.value }))}
                      className="form-control"
                    >
                      <option value="unpaid">Unpaid Invoice</option>
                      <option value="partial">Partially Paid</option>
                      <option value="paid">Fully Settled / Paid</option>
                    </select>
                  </div>
                </div>

                <h4 style={{ margin: '12px 0 16px', color: 'var(--primary)' }}>Audit Shifting Expenses</h4>
                
                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Labor & Loading Surcharges (₹)</label>
                    <input 
                      type="number" 
                      value={financeForm.labor_cost}
                      onChange={(e) => setFinanceForm(prev => ({ ...prev, labor_cost: Number(e.target.value) }))}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fuel & Carrier Diesel (₹)</label>
                    <input 
                      type="number" 
                      value={financeForm.fuel_cost}
                      onChange={(e) => setFinanceForm(prev => ({ ...prev, fuel_cost: Number(e.target.value) }))}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">National Highway Tolls & State Taxes (₹)</label>
                    <input 
                      type="number" 
                      value={financeForm.toll_cost}
                      onChange={(e) => setFinanceForm(prev => ({ ...prev, toll_cost: Number(e.target.value) }))}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Packing Materials Purchases (₹)</label>
                    <input 
                      type="number" 
                      value={financeForm.materials_cost}
                      onChange={(e) => setFinanceForm(prev => ({ ...prev, materials_cost: Number(e.target.value) }))}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setEditingFinanceQuote(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary" disabled={updating}>
                    Audit Finance Record
                  </button>
                </div>
              </form>
            )}

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Shifting Cost (Quote)</th>
                    <th>Labor/Fuel Costs</th>
                    <th>Tolls/Materials</th>
                    <th>Total Expenses</th>
                    <th>Net Profit</th>
                    <th>Payment Ledger</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.filter(q => q.status === 'booked' || q.status === 'completed').length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center' }}>No confirmed bookings to show in cost ledger.</td>
                    </tr>
                  ) : (
                    quotes
                      .filter(q => q.status === 'booked' || q.status === 'completed')
                      .map((quote) => {
                        const labor = Number(quote.labor_cost) || 0;
                        const fuel = Number(quote.fuel_cost) || 0;
                        const toll = Number(quote.toll_cost) || 0;
                        const mats = Number(quote.materials_cost) || 0;
                        const exp = labor + fuel + toll + mats;
                        const profit = (Number(quote.estimated_cost) || 0) - exp;
                        
                        return (
                          <tr key={quote.id}>
                            <td>
                              <strong>{quote.name}</strong> <br />
                              <span className="badge badge-booked">{quote.move_size}</span>
                            </td>
                            <td><strong>₹{(quote.estimated_cost || 0).toLocaleString('en-IN')}</strong></td>
                            <td>
                              <span>Labor: ₹{labor.toLocaleString('en-IN')}</span> <br />
                              <span className="text-muted">Fuel: ₹{fuel.toLocaleString('en-IN')}</span>
                            </td>
                            <td>
                              <span>Tolls: ₹{toll.toLocaleString('en-IN')}</span> <br />
                              <span className="text-muted">mats: ₹{mats.toLocaleString('en-IN')}</span>
                            </td>
                            <td>₹{exp.toLocaleString('en-IN')}</td>
                            <td>
                              <strong style={{ color: profit >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                                ₹{profit.toLocaleString('en-IN')}
                              </strong>
                            </td>
                            <td>
                              <span className={`badge badge-${quote.payment_status}`}>
                                {quote.payment_status}
                              </span>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleEditFinanceClick(quote)} 
                                className="btn-small btn-confirm"
                              >
                                Edit Finance
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: AI Shifting Optimizer / Insights */}
        {activeTab === 'ai_insights' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>AI Shifting Optimizer & Resource Planner</h3>
              <p>Predict lead booking rates, evaluate resource requirements, and check smart packaging lists.</p>
            </div>

            <div className="ai-morphic-insights-grid">
              
              {/* Left Column: Leads selector & Conversion weights */}
              <div className="ai-lead-analysis-card card glass">
                <div className="ai-card-title-row">
                  <Cpu className="ai-title-icon" size={20} />
                  <h3>AI Lead Conversion Analyzer</h3>
                </div>
                
                <p className="ai-card-desc">Select an inquiry to analyze its conversion probability based on geographic and date routes.</p>
                
                <div className="ai-lead-list">
                  {quotes.map((q) => {
                    const prob = getAIConversionProbability(q);
                    return (
                      <div 
                        key={q.id} 
                        className={`ai-lead-item-row ${selectedAIQuote?.id === q.id ? 'active' : ''}`}
                        onClick={() => setSelectedAIQuote(q)}
                      >
                        <div>
                          <strong>{q.name}</strong> <br />
                          <span>{q.origin_city} ➔ {q.destination_city} ({q.move_size})</span>
                        </div>
                        <div className="ai-prob-badge-col">
                          <span className={`ai-prob-number ${prob > 70 ? 'high' : 'medium'}`}>{prob}%</span>
                          <span className="ai-prob-sub">Probability</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedAIQuote && (
                  <div className="ai-lead-analysis-details">
                    <h4>Conversion weights: "{selectedAIQuote.name}"</h4>
                    <div className="ai-factors-checklist">
                      <div className="factor-check-item">
                        <Check size={14} className="factor-check" />
                        <span>Route check: Vadodara to {selectedAIQuote.destination_city} is active highway (NH-48) (+25% weight)</span>
                      </div>
                      <div className="factor-check-item">
                        <Check size={14} className="factor-check" />
                        <span>Volume: {selectedAIQuote.move_size} household relocation fits standard logistics container (+10% weight)</span>
                      </div>
                      {selectedAIQuote.estimated_cost ? (
                        <div className="factor-check-item">
                          <Check size={14} className="factor-check" />
                          <span>Pricing estimate: Quote already submitted at ₹{selectedAIQuote.estimated_cost} (+10% weight)</span>
                        </div>
                      ) : (
                        <div className="factor-check-item alert-factor">
                          <AlertTriangle size={14} className="factor-warn" />
                          <span>Needs price estimation to improve conversion rates</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: AI Resource Estimator Checklist */}
              {selectedAIQuote && (
                <div className="ai-resource-estimator-card card glass">
                  <div className="ai-card-title-row">
                    <CheckSquare className="ai-title-icon" size={20} />
                    <h3>AI Dispatch Resource Planner</h3>
                  </div>

                  <p className="ai-card-desc">
                    AI recommendation for shifting size: <strong>{selectedAIQuote.move_size}</strong> (Client: {selectedAIQuote.name})
                  </p>

                  <div className="ai-recommended-resources-box">
                    <div className="ai-resource-item">
                      <span>RECOMMENDED CARGO VEHICLE</span>
                      <h4>{getAIRecommendations(selectedAIQuote.move_size).truck}</h4>
                    </div>
                    <div className="ai-resource-item">
                      <span>ESTIMATED PACKING BOXES</span>
                      <h4>{getAIRecommendations(selectedAIQuote.move_size).boxes}</h4>
                    </div>
                    <div className="ai-resource-item">
                      <span>BUBBLE WRAPS REQUIRED</span>
                      <h4>{getAIRecommendations(selectedAIQuote.move_size).bubble}</h4>
                    </div>
                    <div className="ai-resource-item">
                      <span>LOADERS & CREW ASSIGNED</span>
                      <h4>{getAIRecommendations(selectedAIQuote.move_size).staff}</h4>
                    </div>
                    <div className="ai-resource-item">
                      <span>ESTIMATED PACK & LOADING TIME</span>
                      <h4>{getAIRecommendations(selectedAIQuote.move_size).time}</h4>
                    </div>
                  </div>

                  {/* Interactive Dispatch Check List */}
                  <div className="ai-dispatch-checklist">
                    <h4>Pre-Dispatch Packing Checklist</h4>
                    <label className="morphic-checkbox-row">
                      <input type="checkbox" defaultChecked />
                      <span>Wrap fragile table corners and glass in double bubble padding</span>
                    </label>
                    <label className="morphic-checkbox-row">
                      <input type="checkbox" />
                      <span>Apply waterproof HDPE stretch film around wood furniture (Expected rain on highway)</span>
                    </label>
                    <label className="morphic-checkbox-row">
                      <input type="checkbox" />
                      <span>Generate Lorry Receipt (LR) number and share tracking link with client</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Smart Pricing optimization box */}
            <div className="ai-pricing-suggestions-card card glass">
              <div className="ai-card-title-row">
                <Lightbulb className="ai-title-icon" size={22} />
                <h3>Smart Shifting Warnings & Suggestions</h3>
              </div>
              <ul className="ai-suggestions-list">
                <li>
                  <ChevronRight size={16} className="sug-arrow" />
                  <span><strong>Gotri to Ahmedabad Price Index:</strong> We recommend adding an 8% surcharge on quotes due to tollway index rate updates on NH-48 this week.</span>
                </li>
                <li>
                  <ChevronRight size={16} className="sug-arrow" />
                  <span><strong>Safety Warning:</strong> Weather logs show heavy rain warning near Surat Bypass. Recommend dispatching closed containers only for Mumbai routes.</span>
                </li>
                <li>
                  <ChevronRight size={16} className="sug-arrow" />
                  <span><strong>Warehouse capacity:</strong> Gotri storage vault is at 82% capacity. Short-term storage rates should be temporarily increased by 12% to manage space.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Customer Testimonials</h3>
              <p>Moderate shifting feedback. Approved reviews display in the client page testimonials slider.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Shifting Service Used</th>
                    <th>Rating Stars</th>
                    <th>Feedback Review Comment</th>
                    <th>Verification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>No customer reviews submitted yet.</td>
                    </tr>
                  ) : (
                    reviews.map((rev) => (
                      <tr key={rev.id}>
                        <td><strong>{rev.name}</strong></td>
                        <td>{rev.service_type || 'Relocation Client'}</td>
                        <td>
                          <div className="rating-stars-cell">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < rev.rating ? "star-morphic-filled" : "star-morphic-empty"}
                              />
                            ))}
                          </div>
                        </td>
                        <td style={{ maxWidth: '300px', whiteSpace: 'normal' }}>
                          "{rev.comment}"
                        </td>
                        <td>
                          {rev.is_approved ? (
                            <span className="badge badge-completed">Approved & Live</span>
                          ) : (
                            <span className="badge badge-pending">Pending Approval</span>
                          )}
                        </td>
                        <td>
                          {rev.is_approved ? (
                            <button 
                              onClick={() => handleApproveReview(rev.id, false)} 
                              className="btn-small btn-reject"
                              disabled={updating}
                            >
                              Hide Testimonial
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleApproveReview(rev.id, true)} 
                              className="btn-small btn-confirm"
                              disabled={updating}
                            >
                              Approve & Show
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Invoices Ledger (V2.5) */}
        {activeTab === 'invoices' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Invoices Ledger</h3>
              <p>Verify invoicing records, billing values, and due schedules for booked shifting shipments.</p>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Customer Name</th>
                    <th>Relocation Details</th>
                    <th>Invoice Date</th>
                    <th>Billing Total</th>
                    <th>Invoice Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.filter(q => q.status === 'booked' || q.status === 'completed').length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>No invoice entries recorded.</td>
                    </tr>
                  ) : (
                    quotes.filter(q => q.status === 'booked' || q.status === 'completed').map((quote) => (
                      <tr key={quote.id}>
                        <td><strong>INV-{quote.id.substring(0, 8).toUpperCase()}</strong></td>
                        <td>{quote.name}</td>
                        <td>{quote.move_size} ({quote.origin_city} ➔ {quote.destination_city})</td>
                        <td>{quote.moving_date}</td>
                        <td><strong>₹{(quote.estimated_cost || 0).toLocaleString('en-IN')}</strong></td>
                        <td>
                          <span className={`badge badge-${quote.payment_status}`}>
                            {quote.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Shifting Vehicles Fleet (V2.5) */}
        {activeTab === 'vehicles' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Shifting Vehicles Fleet</h3>
              <p>Monitor container trucks, transport statuses, and assigned highway routes.</p>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Registration Plate</th>
                    <th>Vehicle Type</th>
                    <th>Assigned Driver</th>
                    <th>Current Station Route</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.id}>
                      <td><strong>{v.plate}</strong></td>
                      <td>{v.type}</td>
                      <td>{v.driver}</td>
                      <td>{v.currentRoute}</td>
                      <td>
                        <span className={`badge ${v.status === 'available' ? 'badge-completed' : v.status === 'in_transit' ? 'badge-active' : 'badge-cancelled'}`}>
                          {v.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Customer Queries (V2.5) */}
        {activeTab === 'contacts' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Customer Contacts Inquiries</h3>
              <p>Review contact requests and support messages sent via the contact page.</p>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email & Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Received Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td>
                        <span>{c.email}</span> <br />
                        <span className="text-muted">{c.phone}</span>
                      </td>
                      <td>{c.subject}</td>
                      <td style={{ maxWidth: '300px', whiteSpace: 'normal' }}>"{c.message}"</td>
                      <td>{c.date || (c.created_at ? new Date(c.created_at).toLocaleDateString('en-US') : 'N/A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Admin Management (V2.5 Exact Screenshot Match) */}
        {activeTab === 'admin_management' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header flex-space-between">
              <div>
                <h3>Admin Management</h3>
                <p>Register administrative users and manage role access credentials.</p>
              </div>
              <button 
                onClick={() => setShowAddAdminModal(true)} 
                className="btn btn-primary"
                style={{ backgroundColor: '#ea580c', borderColor: '#ea580c', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus size={16} />
                <span>Add Admin</span>
              </button>
            </div>

            {/* Custom Search bar */}
            <div className="admin-search-row-box" style={{ marginBottom: '20px' }}>
              <div className="login-input-wrapper" style={{ maxWidth: '380px', margin: 0 }}>
                <Search className="login-input-icon" size={16} />
                <input 
                  type="text" 
                  placeholder="Search admins..."
                  value={searchAdminQuery}
                  onChange={(e) => setSearchAdminQuery(e.target.value)}
                  className="login-input-field"
                  style={{ padding: '10px 14px 10px 40px', fontSize: '0.85rem', backgroundColor: 'white', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>User ID</th>
                    <th>Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins
                    .filter(a => 
                      a.name.toLowerCase().includes(searchAdminQuery.toLowerCase()) || 
                      a.email.toLowerCase().includes(searchAdminQuery.toLowerCase()) ||
                      a.userId.toLowerCase().includes(searchAdminQuery.toLowerCase())
                    )
                    .map((admin) => (
                      <tr key={admin.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Shield size={16} style={{ color: '#2563eb' }} />
                            <strong>{admin.name}</strong>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${admin.role === 'Super Admin' ? 'badge-unpaid' : 'badge-active'}`} style={{ borderRadius: '50px' }}>
                            {admin.role}
                          </span>
                        </td>
                        <td><span className="text-muted">{admin.userId}</span></td>
                        <td>{admin.added}</td>
                        <td>
                          <div className="action-buttons-cell" style={{ display: 'flex', gap: '12px' }}>
                            <button 
                              onClick={() => alert(`Temporary reset key generated: rk_rst_${admin.userId}`)}
                              className="btn-small" 
                              style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer', padding: 0 }}
                              title="Reset Password"
                            >
                              <Key size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (admin.id === '1') {
                                  alert('Cannot delete primary Super Admin.');
                                  return;
                                }
                                if (confirm(`Are you sure you want to delete admin ${admin.name}?`)) {
                                  setAdmins(admins.filter(a => a.id !== admin.id));
                                }
                              }}
                              className="btn-small" 
                              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                              title="Delete Admin"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Gallery Showcase Manager (V3.0) */}
        {activeTab === 'gallery_manager' && (
          <div className="admin-tab-section animate-fade">
            <div className="section-panel-header">
              <h3>Gallery Portfolio Manager</h3>
              <p>Upload high-definition cargo relocation showcase photos. Images display live in the public Shifting Gallery.</p>
            </div>

            <div className="ai-morphic-insights-grid" style={{ gridTemplateColumns: '1.1fr 1.5fr', alignItems: 'start' }}>
              {/* Form Card */}
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px', color: 'var(--primary)' }}>Add Showcase Photo</h4>
                
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newGalleryItem.caption.trim()) {
                    alert('Please enter a caption.');
                    return;
                  }
                  if (!newGalleryItem.image_url) {
                    alert('Please select an image file or enter an image URL.');
                    return;
                  }
                  setUpdating(true);
                  try {
                    const saved = await dbService.submitGalleryImage(newGalleryItem);
                    setGallery(prev => [saved, ...prev]);
                    setNewGalleryItem({ image_url: '', caption: '', category: 'shifting' });
                    setGalleryFileLabel('No file chosen');
                  } catch (err) {
                    console.error(err);
                    alert('Failed to upload image.');
                  } finally {
                    setUpdating(false);
                  }
                }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      value={newGalleryItem.category} 
                      onChange={(e) => setNewGalleryItem(prev => ({ ...prev, category: e.target.value }))}
                      className="form-control"
                    >
                      <option value="shifting">Shifting Relocations</option>
                      <option value="packaging">Packaging Materials</option>
                      <option value="fleet">Transportation Fleet</option>
                      <option value="warehouse">Gotri Warehousing</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Showcase Image</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="morphic-file-upload" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', padding: '10px 14px', background: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-light)' }}>
                        <Upload size={16} />
                        <span>Choose Local File</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setGalleryFileLabel(file.name);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewGalleryItem(prev => ({ ...prev, image_url: reader.result }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: 'none' }} 
                        />
                      </label>
                      <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{galleryFileLabel}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', margin: '8px 0', fontSize: '0.74rem', fontWeight: 700, color: 'var(--muted)' }}>— OR —</div>

                  <div className="form-group">
                    <label className="form-label">Paste Image URL</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://images.unsplash.com/..." 
                      value={newGalleryItem.image_url.startsWith('data:') ? '' : newGalleryItem.image_url}
                      onChange={(e) => {
                        setNewGalleryItem(prev => ({ ...prev, image_url: e.target.value }));
                        setGalleryFileLabel('No file chosen');
                      }}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Image Caption</label>
                    <textarea 
                      rows="2"
                      placeholder="Describe the operation (e.g. Packing household items safely in Gotri)..."
                      value={newGalleryItem.caption}
                      onChange={(e) => setNewGalleryItem(prev => ({ ...prev, caption: e.target.value }))}
                      className="form-control"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-secondary w-full" style={{ backgroundColor: '#ea580c', borderColor: '#ea580c', width: '100%', marginTop: '10px' }} disabled={updating}>
                    {updating ? 'Uploading...' : 'Publish to Showcase'}
                  </button>
                </form>
              </div>

              {/* Grid List Card */}
              <div className="card" style={{ minHeight: '520px', padding: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px', color: 'var(--primary)' }}>Showcase Gallery Grid</h4>
                {gallery.length === 0 ? (
                  <div className="no-data-placeholder">No showcase photos uploaded yet.</div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
                    {gallery.map((img) => (
                      <div key={img.id} style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: '100px', overflow: 'hidden', position: 'relative' }}>
                          <img src={img.image_url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', top: '4px', left: '4px', fontSize: '0.62rem', fontWeight: 700, backgroundColor: 'rgba(15, 23, 42, 0.72)', color: 'white', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            {img.category}
                          </span>
                        </div>
                        <div style={{ padding: '6px', fontSize: '0.7rem', color: 'var(--primary)', flexGrow: 1, lineBreak: 'anywhere' }}>
                          {img.caption.length > 40 ? img.caption.substring(0, 37) + '...' : img.caption}
                        </div>
                        <button 
                          onClick={async () => {
                            if (confirm('Delete this showcase photo?')) {
                              try {
                                await dbService.deleteGalleryImage(img.id);
                                setGallery(prev => prev.filter(item => item.id !== img.id));
                              } catch (err) {
                                console.error(err);
                                alert('Failed to delete image.');
                              }
                            }
                          }}
                          style={{ position: 'absolute', top: '4px', right: '4px', border: 'none', background: 'rgba(239, 68, 68, 0.9)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', cursor: 'pointer', padding: 0 }}
                          title="Delete image"
                        >
                          <Trash2 size={12} style={{ margin: 'auto' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Admin Modal Form Overlay */}
      {showAddAdminModal && (
        <div className="admin-modal-overlay">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const name = newAdminForm.name;
              const email = newAdminForm.email;
              const role = newAdminForm.role;
              if (!name || !email) {
                alert('Please fill name and email.');
                return;
              }
              const newAdmin = {
                id: (admins.length + 1).toString(),
                name,
                role,
                userId: `usr_${Math.floor(Math.random()*90000) + 10000}`,
                email,
                added: new Date().toLocaleDateString('en-US')
              };
              setAdmins([...admins, newAdmin]);
              setShowAddAdminModal(false);
              setNewAdminForm({ name: '', email: '', password: '', role: 'Staff' });
            }} 
            className="admin-status-modal card glass animate-fade"
          >
            <h3>Add New Administrator</h3>
            <p>Assign administrative access privileges to Gotri Vadodara staff.</p>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Bhavik Patel" 
                value={newAdminForm.name}
                onChange={(e) => setNewAdminForm(prev => ({ ...prev, name: e.target.value }))}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. bhavik@rkmove.com" 
                value={newAdminForm.email}
                onChange={(e) => setNewAdminForm(prev => ({ ...prev, email: e.target.value }))}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                value={newAdminForm.password}
                onChange={(e) => setNewAdminForm(prev => ({ ...prev, password: e.target.value }))}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Operational Role</label>
              <select 
                value={newAdminForm.role}
                onChange={(e) => setNewAdminForm(prev => ({ ...prev, role: e.target.value }))}
                className="form-control"
              >
                <option value="Staff">Staff (Logistics Auditor)</option>
                <option value="Super Admin">Super Admin (Full Access)</option>
              </select>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setShowAddAdminModal(false)} 
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-secondary" style={{ backgroundColor: '#ea580c', borderColor: '#ea580c' }}>
                Create Admin Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import { supabase, isSupabaseConfigured } from './supabaseClient';

// Helper to seed localStorage with default mock data
const seedMockData = () => {
  if (!localStorage.getItem('rk_mock_seeded_v2')) {
    // 1. Initial Mock Shipments
    const mockShipments = [
      {
        id: 'mock-shipment-1',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        lr_number: 'RK-VDRA-101',
        customer_name: 'Bhavik Pargar',
        customer_phone: '9876543210',
        origin: 'Alkapuri, Vadodara',
        destination: 'Andheri West, Mumbai',
        current_status: 'in_transit',
        current_location: 'Enroute near Surat Bypass',
        eta: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        image_source: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600', // cargo boxes image
        document_type: 'cargo_photo',
        status_history: [
          { status: 'booked', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), location: 'Vadodara Hub', comment: 'Booking confirmed and scheduled.' },
          { status: 'packing', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), location: 'Alkapuri Office/Residence', comment: 'High-grade bubble packing and carton boxing completed.' },
          { status: 'loading', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), location: 'Alkapuri Residence', comment: 'Goods carefully loaded onto carrier truck MH-02-XY-4321.' },
          { status: 'in_transit', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), location: 'Bharuch Toll Plaza', comment: 'Transit underway. Vehicle tracking normal.' }
        ],
        last_updated: new Date().toISOString()
      },
      {
        id: 'mock-shipment-2',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        lr_number: 'RK-VDRA-102',
        customer_name: 'Jeet Patel',
        customer_phone: '9998887776',
        origin: 'Gotri, Vadodara',
        destination: 'Satellite, Ahmedabad',
        current_status: 'delivered',
        current_location: 'Client Location, Ahmedabad',
        eta: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        image_source: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=600', // document receipt
        document_type: 'lorry_receipt',
        status_history: [
          { status: 'booked', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), location: 'Vadodara Hub', comment: 'Consignment booked for Ahmedabad Shifting.' },
          { status: 'packing', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), location: 'Gotri Residence', comment: 'Packed using multi-layer protection sheets.' },
          { status: 'loading', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), location: 'Gotri Residence', comment: 'Loaded safely into transport container.' },
          { status: 'in_transit', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), location: 'Nadiad Highway', comment: 'Smooth highway transit.' },
          { status: 'reached_hub', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), location: 'Ahmedabad Hub', comment: 'Unloaded and verified at Ahmedabad branch hub.' },
          { status: 'out_for_delivery', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), location: 'Satellite Area', comment: 'Loaded to local delivery van for destination unloading.' },
          { status: 'delivered', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), location: 'Client Residence, Ahmedabad', comment: 'Goods unloaded, unpacked, and placed as requested. Satisfactory completion.' }
        ],
        last_updated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // 2. Initial Mock Quotes (Leads with Finance)
    const mockQuotes = [
      {
        id: 'mock-quote-1',
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        name: 'Kiran Patel',
        email: 'kiran@gmail.com',
        phone: '9825000000',
        origin_city: 'Vadodara',
        destination_city: 'Surat',
        move_size: '2 BHK',
        moving_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'booked',
        estimated_cost: 8500,
        labor_cost: 2000,
        fuel_cost: 1500,
        toll_cost: 500,
        materials_cost: 800,
        payment_status: 'paid',
        declared_value: 65000,
        notes: 'Needs premium multi-layered packing for kitchen crockery.'
      },
      {
        id: 'mock-quote-2',
        created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        name: 'Amit Shah',
        email: 'amit@shah.com',
        phone: '9426011223',
        origin_city: 'Vadodara',
        destination_city: 'Mumbai',
        move_size: '3 BHK',
        moving_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'completed',
        estimated_cost: 24000,
        labor_cost: 4500,
        fuel_cost: 6500,
        toll_cost: 1200,
        materials_cost: 2500,
        payment_status: 'paid',
        declared_value: 120000,
        notes: 'Dismantle bed and wardrobe. Car shifting also needed.'
      },
      {
        id: 'mock-quote-3',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        name: 'Rajesh Patel',
        email: 'rajesh@patel.com',
        phone: '9909012345',
        origin_city: 'Vadodara',
        destination_city: 'Ahmedabad',
        move_size: '1 BHK',
        moving_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        estimated_cost: null,
        labor_cost: 0,
        fuel_cost: 0,
        toll_cost: 0,
        materials_cost: 0,
        payment_status: 'unpaid',
        declared_value: 40000,
        notes: 'Few electrical items to dismantle.'
      },
      {
        id: 'mock-quote-4',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        name: 'Neha Mehta',
        email: 'neha@mehta.com',
        phone: '9898011222',
        origin_city: 'Vadodara',
        destination_city: 'Pune',
        move_size: '2 BHK',
        moving_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'quoted',
        estimated_cost: 18500,
        labor_cost: 3000,
        fuel_cost: 5000,
        toll_cost: 900,
        materials_cost: 1500,
        payment_status: 'partial',
        declared_value: 90000,
        notes: 'Needs safe transportation and bubble wrap.'
      }
    ];

    // 3. Initial Mock Reviews
    const mockReviews = [
      {
        id: 'mock-review-1',
        created_at: new Date().toISOString(),
        name: 'Amit Shah',
        rating: 5,
        comment: 'Best packers and movers in Vadodara! Relocated my home from Vadodara to Pune. Packing was top quality, and all glassware arrived scratch-free.',
        service_type: 'Household Shifting',
        is_approved: true
      },
      {
        id: 'mock-review-2',
        created_at: new Date().toISOString(),
        name: 'Neha Mehta',
        rating: 5,
        comment: 'Very professional staff. They arrived on time, wrapped everything in bubble sheet and corrugated boards, and unloaded it extremely carefully.',
        service_type: 'Office Relocation',
        is_approved: true
      },
      {
        id: 'mock-review-3',
        created_at: new Date().toISOString(),
        name: 'Rajesh Patel',
        rating: 4,
        comment: 'Excellent vehicle transportation service. Shifting my Honda City from Gotri, Vadodara to Bangalore. Received my car in 4 days in perfect shape.',
        service_type: 'Car Transportation',
        is_approved: true
      }
    ];

    localStorage.setItem('rk_shipments', JSON.stringify(mockShipments));
    localStorage.setItem('rk_reviews', JSON.stringify(mockReviews));
    localStorage.setItem('rk_quotes', JSON.stringify(mockQuotes));
    localStorage.setItem('rk_mock_seeded_v2', 'true');
    localStorage.setItem('rk_mock_seeded', 'true');
  }
};

// Seed storage immediately
seedMockData();

// Wrapper DB functions
export const dbService = {
  // === QUOTES / LEADS ===
  async submitQuote(quoteData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const quotes = JSON.parse(localStorage.getItem('rk_quotes') || '[]');
      const newQuote = {
        id: 'quote-' + Date.now(),
        created_at: new Date().toISOString(),
        status: 'pending',
        labor_cost: 0,
        fuel_cost: 0,
        toll_cost: 0,
        materials_cost: 0,
        payment_status: 'unpaid',
        declared_value: quoteData.declared_value || 50000,
        ...quoteData
      };
      quotes.unshift(newQuote);
      localStorage.setItem('rk_quotes', JSON.stringify(quotes));
      return newQuote;
    }
  },

  async getQuotes() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      return JSON.parse(localStorage.getItem('rk_quotes') || '[]');
    }
  },

  async updateQuoteStatus(id, status, estimatedCost = null) {
    if (isSupabaseConfigured()) {
      const updates = { status };
      if (estimatedCost !== null) {
        updates.estimated_cost = estimatedCost;
      }
      const { data, error } = await supabase
        .from('quotes')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const quotes = JSON.parse(localStorage.getItem('rk_quotes') || '[]');
      const index = quotes.findIndex(q => q.id === id);
      if (index !== -1) {
        quotes[index].status = status;
        if (estimatedCost !== null) {
          quotes[index].estimated_cost = Number(estimatedCost);
        }
        localStorage.setItem('rk_quotes', JSON.stringify(quotes));
        return quotes[index];
      }
      throw new Error('Quote not found');
    }
  },

  // Finance Cost Updates
  async updateQuoteFinance(id, financeData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('quotes')
        .update(financeData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const quotes = JSON.parse(localStorage.getItem('rk_quotes') || '[]');
      const index = quotes.findIndex(q => q.id === id);
      if (index !== -1) {
        quotes[index] = {
          ...quotes[index],
          labor_cost: Number(financeData.labor_cost),
          fuel_cost: Number(financeData.fuel_cost),
          toll_cost: Number(financeData.toll_cost),
          materials_cost: Number(financeData.materials_cost),
          payment_status: financeData.payment_status,
          estimated_cost: Number(financeData.estimated_cost)
        };
        localStorage.setItem('rk_quotes', JSON.stringify(quotes));
        return quotes[index];
      }
      throw new Error('Quote not found');
    }
  },

  // === SHIPMENT TRACKING ===
  async getShipmentByLR(lrNumber) {
    const formattedLR = lrNumber.trim().toUpperCase();
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('lr_number', formattedLR)
        .maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const shipments = JSON.parse(localStorage.getItem('rk_shipments') || '[]');
      return shipments.find(s => s.lr_number === formattedLR) || null;
    }
  },

  async getAllShipments() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      return JSON.parse(localStorage.getItem('rk_shipments') || '[]');
    }
  },

  async createShipment(shipmentData) {
    const formattedLR = shipmentData.lr_number.trim().toUpperCase();
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shipments')
        .insert([{
          ...shipmentData,
          lr_number: formattedLR,
          status_history: shipmentData.status_history || [
            { status: 'booked', timestamp: new Date().toISOString(), location: shipmentData.origin, comment: 'Shipment booking confirmed.' }
          ]
        }])
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const shipments = JSON.parse(localStorage.getItem('rk_shipments') || '[]');
      if (shipments.some(s => s.lr_number === formattedLR)) {
        throw new Error('Lorry Receipt (LR) number already exists');
      }
      const newShipment = {
        id: 'shipment-' + Date.now(),
        created_at: new Date().toISOString(),
        ...shipmentData,
        lr_number: formattedLR,
        status_history: shipmentData.status_history || [
          { status: 'booked', timestamp: new Date().toISOString(), location: shipmentData.origin, comment: 'Shipment booking confirmed.' }
        ],
        last_updated: new Date().toISOString()
      };
      shipments.unshift(newShipment);
      localStorage.setItem('rk_shipments', JSON.stringify(shipments));
      return newShipment;
    }
  },

  async updateShipmentStatus(id, currentStatus, currentLocation, eta, statusHistory, imageSource = null, documentType = 'lorry_receipt') {
    if (isSupabaseConfigured()) {
      const updates = {
        current_status: currentStatus,
        current_location: currentLocation,
        eta: eta || null,
        status_history: statusHistory,
        last_updated: new Date().toISOString()
      };
      if (imageSource !== null) {
        updates.image_source = imageSource;
        updates.document_type = documentType;
      }
      const { data, error } = await supabase
        .from('shipments')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const shipments = JSON.parse(localStorage.getItem('rk_shipments') || '[]');
      const index = shipments.findIndex(s => s.id === id);
      if (index !== -1) {
        shipments[index].current_status = currentStatus;
        shipments[index].current_location = currentLocation;
        shipments[index].eta = eta;
        shipments[index].status_history = statusHistory;
        shipments[index].last_updated = new Date().toISOString();
        if (imageSource !== null) {
          shipments[index].image_source = imageSource;
          shipments[index].document_type = documentType;
        }
        localStorage.setItem('rk_shipments', JSON.stringify(shipments));
        return shipments[index];
      }
      throw new Error('Shipment not found');
    }
  },

  // === REVIEWS ===
  async submitReview(reviewData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const reviews = JSON.parse(localStorage.getItem('rk_reviews') || '[]');
      const newReview = {
        id: 'review-' + Date.now(),
        created_at: new Date().toISOString(),
        is_approved: false, // Default false, needs admin approval
        ...reviewData
      };
      reviews.unshift(newReview);
      localStorage.setItem('rk_reviews', JSON.stringify(reviews));
      return newReview;
    }
  },

  async getApprovedReviews() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const reviews = JSON.parse(localStorage.getItem('rk_reviews') || '[]');
      return reviews.filter(r => r.is_approved === true);
    }
  },

  async getAllReviews() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      return JSON.parse(localStorage.getItem('rk_reviews') || '[]');
    }
  },

  async approveReview(id, approveStatus) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('reviews')
        .update({ is_approved: approveStatus })
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const reviews = JSON.parse(localStorage.getItem('rk_reviews') || '[]');
      const index = reviews.findIndex(r => r.id === id);
      if (index !== -1) {
        reviews[index].is_approved = approveStatus;
        localStorage.setItem('rk_reviews', JSON.stringify(reviews));
        return reviews[index];
      }
      throw new Error('Review not found');
    }
  },

  // === CONTACTS / INQUIRIES ===
  async submitContact(contactData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message
        }])
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const contacts = JSON.parse(localStorage.getItem('rk_contacts') || '[]');
      const newContact = {
        id: 'contact-' + Date.now(),
        created_at: new Date().toISOString(),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message
      };
      contacts.unshift(newContact);
      localStorage.setItem('rk_contacts', JSON.stringify(contacts));
      return newContact;
    }
  },

  async getContacts() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const initialContacts = [
        { id: 'c-1', name: 'Aashka Shah', email: 'aashka@gmail.com', phone: '9876543211', subject: 'Quote Enquiry', message: 'Need shifting from Vadodara to Ahmedabad next week. Call me.', created_at: new Date('2026-07-02').toISOString() },
        { id: 'c-2', name: 'Mehul Mehta', email: 'mehul@outlook.com', phone: '9822334455', subject: 'Corporate Shifting', message: 'Moving 20 workstations from Alkapuri to Gotri. Need IBA approved quotation.', created_at: new Date('2026-07-05').toISOString() }
      ];
      if (!localStorage.getItem('rk_contacts')) {
        localStorage.setItem('rk_contacts', JSON.stringify(initialContacts));
      }
      return JSON.parse(localStorage.getItem('rk_contacts'));
    }
  },

  // === GALLERY IMAGES (V3.0) ===
  async submitGalleryImage(imgData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('gallery')
        .insert([{
          image_url: imgData.image_url,
          caption: imgData.caption,
          category: imgData.category || 'shifting'
        }])
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const images = JSON.parse(localStorage.getItem('rk_gallery') || '[]');
      const newImg = {
        id: 'img-' + Date.now(),
        created_at: new Date().toISOString(),
        image_url: imgData.image_url,
        caption: imgData.caption,
        category: imgData.category || 'shifting'
      };
      images.unshift(newImg);
      localStorage.setItem('rk_gallery', JSON.stringify(images));
      return newImg;
    }
  },

  async getGalleryImages() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const initialGallery = [
        { id: 'g-1', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', caption: 'Premium packing for domestic home relocation items in Gotri.', category: 'shifting', created_at: new Date('2026-06-01').toISOString() },
        { id: 'g-2', image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600', caption: 'Heavy duty cardboard boxes ready for transit load.', category: 'packaging', created_at: new Date('2026-06-05').toISOString() },
        { id: 'g-3', image_url: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=600', caption: 'Loading operation inside our Vadodara Hub terminal.', category: 'shifting', created_at: new Date('2026-06-10').toISOString() },
        { id: 'g-4', image_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600', caption: 'Gotri branch relocation fleet trucks ready for highway transit.', category: 'fleet', created_at: new Date('2026-06-15').toISOString() },
        { id: 'g-5', image_url: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600', caption: 'Secure warehousing vaults for commercial storage.', category: 'warehouse', created_at: new Date('2026-06-20').toISOString() }
      ];
      if (!localStorage.getItem('rk_gallery')) {
        localStorage.setItem('rk_gallery', JSON.stringify(initialGallery));
      }
      return JSON.parse(localStorage.getItem('rk_gallery'));
    }
  },

  async deleteGalleryImage(id) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const images = JSON.parse(localStorage.getItem('rk_gallery') || '[]');
      const filtered = images.filter(img => img.id !== id);
      localStorage.setItem('rk_gallery', JSON.stringify(filtered));
      return { id };
    }
  },

  async deleteQuote(id) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const quotes = JSON.parse(localStorage.getItem('rk_quotes') || '[]');
      const filtered = quotes.filter(q => q.id !== id);
      localStorage.setItem('rk_quotes', JSON.stringify(filtered));
      return { id };
    }
  },

  async updateQuote(id, quoteData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('quotes')
        .update(quoteData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const quotes = JSON.parse(localStorage.getItem('rk_quotes') || '[]');
      const index = quotes.findIndex(q => q.id === id);
      if (index !== -1) {
        quotes[index] = { ...quotes[index], ...quoteData };
        localStorage.setItem('rk_quotes', JSON.stringify(quotes));
        return quotes[index];
      }
      throw new Error('Quote not found');
    }
  },

  async deleteShipment(id) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shipments')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const shipments = JSON.parse(localStorage.getItem('rk_shipments') || '[]');
      const filtered = shipments.filter(s => s.id !== id);
      localStorage.setItem('rk_shipments', JSON.stringify(filtered));
      return { id };
    }
  },

  async updateShipmentDetails(id, shipmentData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shipments')
        .update(shipmentData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const shipments = JSON.parse(localStorage.getItem('rk_shipments') || '[]');
      const index = shipments.findIndex(s => s.id === id);
      if (index !== -1) {
        shipments[index] = { ...shipments[index], ...shipmentData };
        localStorage.setItem('rk_shipments', JSON.stringify(shipments));
        return shipments[index];
      }
      throw new Error('Shipment not found');
    }
  },

  async deleteReview(id) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const reviews = JSON.parse(localStorage.getItem('rk_reviews') || '[]');
      const filtered = reviews.filter(r => r.id !== id);
      localStorage.setItem('rk_reviews', JSON.stringify(filtered));
      return { id };
    }
  },

  async updateReviewDetails(id, reviewData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('reviews')
        .update(reviewData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const reviews = JSON.parse(localStorage.getItem('rk_reviews') || '[]');
      const index = reviews.findIndex(r => r.id === id);
      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...reviewData };
        localStorage.setItem('rk_reviews', JSON.stringify(reviews));
        return reviews[index];
      }
      throw new Error('Review not found');
    }
  },

  async deleteContact(id) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const contacts = JSON.parse(localStorage.getItem('rk_contacts') || '[]');
      const filtered = contacts.filter(c => c.id !== id);
      localStorage.setItem('rk_contacts', JSON.stringify(filtered));
      return { id };
    }
  },

  async updateContactDetails(id, contactData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('contacts')
        .update(contactData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const contacts = JSON.parse(localStorage.getItem('rk_contacts') || '[]');
      const index = contacts.findIndex(c => c.id === id);
      if (index !== -1) {
        contacts[index] = { ...contacts[index], ...contactData };
        localStorage.setItem('rk_contacts', JSON.stringify(contacts));
        return contacts[index];
      }
      throw new Error('Contact not found');
    }
  }
};

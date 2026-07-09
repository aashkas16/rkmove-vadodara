-- SQL Schema Setup (V2 - Redesign & AI Additions)
-- Copy and run this script in your Supabase SQL Editor.

-- 1. Create Quotes Table (Lead Generation / Cost Calculator)
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    origin_city TEXT NOT NULL DEFAULT 'Vadodara',
    destination_city TEXT NOT NULL,
    move_size TEXT NOT NULL,
    moving_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, quoted, booked, completed, cancelled
    estimated_cost NUMERIC,
    notes TEXT,
    
    -- V2 Shifting Finance Additions
    labor_cost NUMERIC DEFAULT 0,
    fuel_cost NUMERIC DEFAULT 0,
    toll_cost NUMERIC DEFAULT 0,
    materials_cost NUMERIC DEFAULT 0,
    payment_status TEXT NOT NULL DEFAULT 'unpaid', -- unpaid, partial, paid
    declared_value NUMERIC DEFAULT 50000
);

-- 2. Create Shipments Table (Real-time Tracking)
CREATE TABLE IF NOT EXISTS public.shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    lr_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    current_status TEXT NOT NULL DEFAULT 'booked', -- booked, packing, loading, in_transit, reached_hub, out_for_delivery, delivered
    current_location TEXT NOT NULL DEFAULT 'Vadodara Hub',
    eta DATE,
    status_history JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of timeline events: [{"status": "booked", "timestamp": "...", "location": "Vadodara"}]
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- V2 Document Attachment Additions
    image_source TEXT, -- URL or Base64 URI
    document_type TEXT DEFAULT 'lorry_receipt' -- lorry_receipt, cargo_photo, invoice
);

-- 3. Create Reviews Table (Customer Testimonials)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    service_type TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. Policies for Quotes Table
CREATE POLICY "Enable insert for everyone" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users only" ON public.quotes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" ON public.quotes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON public.quotes FOR DELETE TO authenticated USING (true);

-- 5. Policies for Shipments Table
CREATE POLICY "Enable read access for all users by LR number" ON public.shipments FOR SELECT USING (true);
CREATE POLICY "Enable all actions for authenticated users" ON public.shipments FOR ALL TO authenticated USING (true);

-- 6. Policies for Reviews Table
CREATE POLICY "Enable read for approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Enable insert for all reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable admin modifications on reviews" ON public.reviews FOR ALL TO authenticated USING (true);

-- 7. Create Contacts Table (Customer inquiries query log)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Enable RLS for Contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policies for Contacts Table
CREATE POLICY "Enable insert for everyone on contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users on contacts" ON public.contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable all modifications for admin on contacts" ON public.contacts FOR ALL TO authenticated USING (true);

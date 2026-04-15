-- =====================================================
-- VSNEXAR Complete Database Setup
-- Run this in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. USERS TABLE  
-- Stores user details (email, name, role) clearly
-- =====================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'user',  -- 'user' or 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. SERVICES TABLE (if not already created)
-- Stores all services offered by VSNEXAR
-- =====================================================
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    projects INTEGER DEFAULT 0,
    clients INTEGER DEFAULT 0,
    workers INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. SERVICE REQUESTS TABLE
-- Stores customer requirement submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    requirements TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. SITE SETTINGS TABLE
-- Admin-controlled global website content
-- =====================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- USERS table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to users"
ON public.users FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow authenticated read users"
ON public.users FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update users"
ON public.users FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- SERVICES table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read services"
ON public.services FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated full access services"
ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SERVICE REQUESTS table
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts to service_requests" 
ON public.service_requests FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow authenticated full access to service_requests" 
ON public.service_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SITE SETTINGS table
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of site_settings" 
ON public.site_settings FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated full access to site_settings" 
ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================
-- 6. DEFAULT DATA
-- =====================================================

-- Default services
INSERT INTO public.services (id, title, description, projects, clients, workers) VALUES 
('web-design', 'Web Design', 'Creating stunning, responsive, and dynamic web applications.', 150, 85, 12),
('logo-design', 'Logo Design', 'Crafting unique and memorable brand identities.', 200, 120, 8),
('video-editing', 'Video Editing', 'Professional video editing for social media, YouTube, and corporate.', 95, 60, 6),
('photo-editing', 'Photo Editing', 'High-end photo retouching and manipulation.', 180, 95, 10),
('ui-ux-design', 'UI/UX Design', 'Designing intuitive, accessible, and beautiful digital experiences.', 130, 75, 9),
('content-creation', 'Content Creation', 'Crafting attention-grabbing digital content for brands and campaigns.', 110, 70, 7)
ON CONFLICT (id) DO NOTHING;

-- Default site settings
INSERT INTO public.site_settings (key, value) VALUES 
('hero_title', 'India''s No. 1 Premium Software Solutions'),
('hero_subtitle', 'We craft digital experiences that redefine excellence.'),
('contact_email', 'contact@vsnexar.com'),
('contact_phone', '+91 9876543210')
ON CONFLICT (key) DO NOTHING;

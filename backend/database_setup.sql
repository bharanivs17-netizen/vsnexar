-- Run this script in your Supabase SQL Editor to initialize the new functionality

-- Table for Contact/Service Requests
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    requirements TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Admin Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Basic RLS Policies (Security)
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert requests
CREATE POLICY "Allow public inserts to service_requests" 
ON public.service_requests FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated admins to view/update requests
CREATE POLICY "Allow authenticated full access to service_requests" 
ON public.service_requests FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Allow anyone to read site settings
CREATE POLICY "Allow public read of site_settings" 
ON public.site_settings FOR SELECT 
TO public 
USING (true);

-- Allow authenticated admins to full access on settings
CREATE POLICY "Allow authenticated full access to site_settings" 
ON public.site_settings FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Mock Data for site_settings
INSERT INTO public.site_settings (key, value) VALUES 
('hero_title', 'India''s No. 1 Premium Software Solutions'),
('hero_subtitle', 'We craft digital experiences that redefine excellence. Let’s build your future, today.'),
('contact_email', 'contact@vsnexar.com'),
('contact_phone', '+91 9876543210')
ON CONFLICT (key) DO NOTHING;

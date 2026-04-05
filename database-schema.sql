-- VSNEXAR Supabase Schema (Debugged Version)
-- Run this in your Supabase SQL Editor

-- 1. Create Services Table (with existence check)
CREATE TABLE IF NOT EXISTS public.services (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  projects integer DEFAULT 0,
  clients integer DEFAULT 0,
  workers integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Workers Table (with existence check)
CREATE TABLE IF NOT EXISTS public.workers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id text REFERENCES public.services(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text,
  rating numeric(3,1) DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Insert Default Data (using ON CONFLICT to avoid errors)
INSERT INTO public.services (id, title, description, projects, clients, workers) VALUES 
('web-design', 'Web Design', 'Creating stunning, responsive, and dynamic web applications.', 145, 120, 15),
('logo-design', 'Logo Design', 'Crafting unique and memorable brand identities.', 320, 290, 10),
('video-editing', 'Video Editing', 'Professional video editing for social media, YouTube, and corporate.', 85, 60, 12),
('photo-editing', 'Photo Editing', 'High-end photo retouching and manipulation.', 400, 350, 20),
('ui-ux-design', 'UI/UX Design', 'Designing intuitive and user-friendly interfaces.', 180, 160, 18),
('content-creation', 'Content Creation', 'Creating engaging content for digital marketing.', 250, 220, 14)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  projects = EXCLUDED.projects,
  clients = EXCLUDED.clients,
  workers = EXCLUDED.workers;

-- Note: We skip workers insert on conflict to avoid unique constraint issues if id isn't known
-- To refresh workers, run: DELETE FROM workers; and then paste the insert again.

-- 4. Turn on Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;

-- 5. Policies (with drop/create logic to avoid "exists" errors)
DROP POLICY IF EXISTS "Allow public read access on services" ON public.services;
CREATE POLICY "Allow public read access on services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on workers" ON public.workers;
CREATE POLICY "Allow public read access on workers" ON public.workers FOR SELECT USING (true);

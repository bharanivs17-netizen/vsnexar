"""
VSNEXAR Database Setup - Uses direct REST API calls
Run: python setup_database.py
"""
import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env")
    exit(1)

print(f"Connecting to: {SUPABASE_URL}")

def api_call(method, table, data=None, params=""):
    url = f"{SUPABASE_URL}/rest/v1/{table}{params}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status in [200, 201]:
                try:
                    return json.loads(resp.read().decode())
                except:
                    return True
            return True
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        return {"error": error_body, "status": e.code}

def check_table(name):
    url = f"{SUPABASE_URL}/rest/v1/{name}?select=*&limit=1"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            return True, data
    except urllib.error.HTTPError as e:
        return False, str(e)

# Check each table
tables = ["users", "services", "service_requests", "site_settings"]
missing = []

for table in tables:
    exists, data = check_table(table)
    if exists:
        count = len(data) if isinstance(data, list) else 0
        print(f"  ✓ {table} — EXISTS ({count} rows)")
    else:
        print(f"  ✗ {table} — MISSING")
        missing.append(table)

if missing:
    print(f"\n{'='*55}")
    print(f"  MISSING TABLES: {', '.join(missing)}")
    print(f"{'='*55}")
    print(f"""
You need to create these tables in Supabase. Follow these steps:

1. Open your browser and go to:
   https://supabase.com/dashboard

2. Log in and select your project

3. Click "SQL Editor" in the left sidebar

4. Click "New Query"

5. Copy and paste THIS SQL, then click "Run":
""")
    
    # Print the SQL they need
    sql_parts = []
    
    if "users" in missing:
        sql_parts.append("""
-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_insert" ON public.users FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "users_select" ON public.users FOR SELECT TO public USING (true);
CREATE POLICY "users_update" ON public.users FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
""")
    
    if "services" in missing:
        sql_parts.append("""
-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    projects INTEGER DEFAULT 0,
    clients INTEGER DEFAULT 0,
    workers INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_read" ON public.services FOR SELECT TO public USING (true);
CREATE POLICY "services_admin" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Default services data
INSERT INTO public.services (id, title, description, projects, clients, workers) VALUES 
('web-design', 'Web Design', 'Creating stunning, responsive, and dynamic web applications.', 150, 85, 12),
('logo-design', 'Logo Design', 'Crafting unique and memorable brand identities.', 200, 120, 8),
('video-editing', 'Video Editing', 'Professional video editing for social media, YouTube, and corporate.', 95, 60, 6),
('photo-editing', 'Photo Editing', 'High-end photo retouching and manipulation.', 180, 95, 10),
('ui-ux-design', 'UI/UX Design', 'Designing intuitive and beautiful digital experiences.', 130, 75, 9),
('content-creation', 'Content Creation', 'Crafting attention-grabbing digital content for brands.', 110, 70, 7)
ON CONFLICT (id) DO NOTHING;
""")
    
    if "service_requests" in missing:
        sql_parts.append("""
-- SERVICE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    requirements TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "requests_insert" ON public.service_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "requests_admin" ON public.service_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
""")
    
    if "site_settings" in missing:
        sql_parts.append("""
-- SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_read" ON public.site_settings FOR SELECT TO public USING (true);
CREATE POLICY "settings_admin" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.site_settings (key, value) VALUES 
('hero_title', 'Indias No. 1 Premium Software Solutions'),
('hero_subtitle', 'We craft digital experiences that redefine excellence.'),
('contact_email', 'contact@vsnexar.com'),
('contact_phone', '+91 9876543210')
ON CONFLICT (key) DO NOTHING;
""")
    
    full_sql = "\n".join(sql_parts)
    print(full_sql)
    print(f"{'='*55}")
    print("After running the SQL, run this script again to verify!")
    
else:
    print(f"\n{'='*55}")
    print("  ALL TABLES EXIST! Database is ready.")
    print(f"{'='*55}")
    
    # Try to insert default services if the table is empty
    exists, data = check_table("services")
    if exists and isinstance(data, list) and len(data) == 0:
        print("\nInserting default services...")
        services = [
            {"id": "web-design", "title": "Web Design", "description": "Creating stunning web apps.", "projects": 150, "clients": 85, "workers": 12},
            {"id": "logo-design", "title": "Logo Design", "description": "Crafting brand identities.", "projects": 200, "clients": 120, "workers": 8},
            {"id": "video-editing", "title": "Video Editing", "description": "Professional video editing.", "projects": 95, "clients": 60, "workers": 6},
            {"id": "photo-editing", "title": "Photo Editing", "description": "High-end photo retouching.", "projects": 180, "clients": 95, "workers": 10},
            {"id": "ui-ux-design", "title": "UI/UX Design", "description": "Beautiful digital experiences.", "projects": 130, "clients": 75, "workers": 9},
            {"id": "content-creation", "title": "Content Creation", "description": "Digital content for brands.", "projects": 110, "clients": 70, "workers": 7},
        ]
        for svc in services:
            result = api_call("POST", "services", svc)
            print(f"  Added: {svc['title']}")

print("\nDone!")

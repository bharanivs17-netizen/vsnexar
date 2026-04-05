# VSNEXAR Software Solutions Website

This is the official React frontend repository for VSNEXAR, crafted with a highly performant and animated interface, prepared for scalability with Supabase.

## 🚀 Local Setup Instructions

1. **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Open Terminal** in the `frontend` folder:
   ```bash
   cd frontend
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   *Your site will be available at `http://localhost:5173/`*


---

## ☁️ Deployment Instructions (Netlify / Vercel)

Deploying a Vite React app to Vercel or Netlify is incredibly fast.

### Option 1: Vercel (Recommended)
1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect that you are using Vite. Ensure the following settings match:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option 2: Netlify
1. Go to [Netlify](https://www.netlify.com/) and click **Add new site > Import an existing project**.
2. Connect your GitHub account and select your repository.
3. Configure the Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

---

## 🗄️ Supabase Integration

We prepared the frontend for **Supabase**. To connect real database metrics and handle Authentication:

1. **Create a project** at [Supabase.com](https://supabase.com).
2. Inside your Supabase dashboard, get your **Project URL** and **Anon Key** from the Settings > API section.
3. In this `frontend` folder, create a new file named `.env.local` and add your keys:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-long-anon-key-here
   ```
4. Create a `supabaseClient.js` file inside `src/` folder and setup your auth instance:
   ```javascript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```
5. You can now use the `supabase` client in `LoginPage.jsx` and `AdminDashboard.jsx` to fetch real users and stats!

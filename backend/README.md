# VSNEXAR Python Backend (FastAPI)

This is the backend API for the VSNEXAR Software Solutions website. It interfaces closely with your React Client and the Supabase database.

## Prerequisites
- **Python 3.9+** must be installed on your system. If you try to run commands and get "Python was not found", download it from [python.org](https://www.python.org/downloads/) and ensure you check "Add Python to PATH" during installation.

## Local Setup Instructions

1. **Open a terminal in this `backend` folder**
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment** 
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**
   - On Windows: `.\venv\Scripts\activate`
   - On Mac/Linux: `source venv/bin/activate`

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Environment Setup**
   Create a `.env` file in this folder and add your Supabase connection strings:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-client-anon-key
   SUPABASE_JWT_SECRET=your-jwt-secret-from-supabase-settings
   ```

6. **Run the Server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The API will be available at `http://localhost:8000`*

## Features included
- **CORS** Enabled for React frontend connection.
- **Supabase SDK** implementation for python logic handling.
- **JWT Verification middleware** (`verify_token`) ensuring that only authenticated users from your React login page can access secure admin endpoints.

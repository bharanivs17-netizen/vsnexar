from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI(title="VSNEXAR API", description="Backend for VSNEXAR Software Solutions")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client Setup
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://placeholder.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY", "placeholder")
JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET", "placeholder-secret-from-supabase")

supabase: Client = None
try:
    if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL != "https://placeholder.supabase.co" and SUPABASE_KEY != "placeholder":
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Failed to create Supabase client: {e}")
    supabase = None
auth_scheme = HTTPBearer()

# Middleware for auth
def verify_token(token: HTTPAuthorizationCredentials = Security(auth_scheme)):
    try:
        payload = jwt.decode(
            token.credentials,
            JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid token")

@app.get("/")
def read_root():
    return {"message": "Welcome to VSNEXAR Backend API"}

@app.get("/api/services")
def get_services():
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    # Direct fetch from Supabase
    response = supabase.table("services").select("*").execute()
    return {"data": response.data}

@app.get("/api/admin/dashboard", dependencies=[Depends(verify_token)])
def get_admin_dashboard():
    # This route is protected. Only users with a valid Supabase JWT can access.
    return {"message": "Welcome to the secure admin area", "status": "success"}

# Example of how to start the server:
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

from fastapi import FastAPI, Depends, HTTPException, Security, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="VSNEXAR API", description="Backend for VSNEXAR Software Solutions")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY", "")
JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET", "")

auth_scheme = HTTPBearer()

# Helper for Supabase HTTP requests
async def supabase_request(method: str, path: str, json_data: dict = None, params: dict = None, token: str = None):
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {token if token else SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            if method.upper() == "GET":
                response = await client.get(url, headers=headers, params=params)
            elif method.upper() == "POST":
                response = await client.post(url, headers=headers, json=json_data)
            else:
                raise HTTPException(status_code=405, detail="Method not allowed")
            
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            detail = e.response.json().get("message", e.response.text) if e.response.content else str(e)
            raise HTTPException(status_code=e.response.status_code, detail=detail)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

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
async def get_services():
    data = await supabase_request("GET", "services", params={"select": "*"})
    return {"data": data}

@app.get("/api/search")
async def search_services(q: str = ""):
    if not q:
        return {"data": []}
    # ilike in PostgREST is column=ilike.*term*
    params = {
        "select": "*",
        "title": f"ilike.*{q}*"
    }
    data = await supabase_request("GET", "services", params=params)
    return {"data": data}

@app.post("/api/requests")
async def create_service_request(request_data: dict = Body(...)):
    service_id = request_data.get("service_id")
    name = request_data.get("customer_name")
    email = request_data.get("customer_email")
    reqs = request_data.get("requirements")

    if not all([service_id, name, email, reqs]):
        raise HTTPException(status_code=400, detail="Missing required fields")

    data = await supabase_request("POST", "service_requests", json_data={
        "service_id": service_id,
        "customer_name": name,
        "customer_email": email,
        "requirements": reqs
    })

    return {"message": "Request successfully saved. We will share the information with the team.", "data": data}

@app.get("/api/admin/dashboard", dependencies=[Depends(verify_token)])
def get_admin_dashboard():
    return {"message": "Welcome to the secure admin area", "status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

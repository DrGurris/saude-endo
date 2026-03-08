from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timezone
import uuid

from models.schemas import (
    UserCreate, UserLogin, UserResponse, TokenResponse
)
from utils.auth import hash_password, verify_password, create_access_token, get_current_user
from utils.database import get_users_collection

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    """Register a new user"""
    users = get_users_collection()
    
    # Check if email already exists (optimized projection)
    existing_user = await users.find_one({"email": user_data.email}, {"_id": 1})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este correo ya está registrado"
        )
    
    # Create user document
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    user_doc = {
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "birth_date": user_data.birth_date,
        "password_hash": hash_password(user_data.password),
        "created_at": now,
        "phenotype_result": None
    }
    
    await users.insert_one(user_doc)
    
    # Create token
    token = create_access_token(user_id, user_data.email)
    
    user_response = UserResponse(
        id=user_id,
        name=user_data.name,
        email=user_data.email,
        birth_date=user_data.birth_date,
        created_at=now.isoformat(),
        phenotype_result=None
    )
    
    return TokenResponse(token=token, user=user_response)

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login with email and password"""
    users = get_users_collection()
    
    # Find user by email (optimized projection)
    user_doc = await users.find_one(
        {"email": credentials.email}, 
        {"id": 1, "password_hash": 1, "name": 1, "email": 1, "birth_date": 1, "created_at": 1, "phenotype_result": 1}
    )
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
    
    # Verify password
    if not verify_password(credentials.password, user_doc.get("password_hash", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
    
    # Create token
    token = create_access_token(user_doc["id"], user_doc["email"])
    
    user_response = UserResponse(
        id=user_doc["id"],
        name=user_doc["name"],
        email=user_doc["email"],
        birth_date=user_doc.get("birth_date"),
        created_at=user_doc["created_at"].isoformat() if isinstance(user_doc["created_at"], datetime) else user_doc["created_at"],
        phenotype_result=user_doc.get("phenotype_result")
    )
    
    return TokenResponse(token=token, user=user_response)

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    users = get_users_collection()
    
    user_doc = await users.find_one(
        {"id": current_user["user_id"]},
        {"id": 1, "name": 1, "email": 1, "birth_date": 1, "created_at": 1, "phenotype_result": 1}
    )
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    return UserResponse(
        id=user_doc["id"],
        name=user_doc["name"],
        email=user_doc["email"],
        birth_date=user_doc.get("birth_date"),
        created_at=user_doc["created_at"].isoformat() if isinstance(user_doc["created_at"], datetime) else user_doc["created_at"],
        phenotype_result=user_doc.get("phenotype_result")
    )

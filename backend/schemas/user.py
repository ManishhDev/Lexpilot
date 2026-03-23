from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from models.user import UserRole

class UserBase(BaseModel):
    email: str
    full_name: str
    role: UserRole = UserRole.USER

class UserCreate(BaseModel):
    email: str
    full_name: str

class UserLogin(BaseModel):
    email: str

class UserUpdate(BaseModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None

class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    email: str
    full_name: str
    role: UserRole
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None 
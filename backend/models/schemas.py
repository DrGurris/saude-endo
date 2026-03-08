from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Literal
from datetime import datetime

# ============ USER MODELS ============

class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    birth_date: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(UserBase):
    id: str
    created_at: datetime
    phenotype_result: Optional[dict] = None

class UserResponse(UserBase):
    id: str
    created_at: str
    phenotype_result: Optional[dict] = None

class TokenResponse(BaseModel):
    token: str
    user: UserResponse

# ============ QUESTIONNAIRE MODELS ============

class QuestionnaireAnswers(BaseModel):
    pain_locations: List[str] = []
    pain_characteristics: List[str] = []
    severity_scores: dict = {}
    goal: Optional[str] = None
    commitment: Optional[str] = None
    completed_at: Optional[str] = None

class QuestionnaireCreate(BaseModel):
    answers: QuestionnaireAnswers
    phenotype_result: dict

class QuestionnaireResponse(BaseModel):
    id: str
    user_id: str
    answers: QuestionnaireAnswers
    phenotype_result: dict
    created_at: str

# ============ SYMPTOM LOG MODELS ============

MoodType = Literal['good', 'neutral', 'bad']

class SymptomLogCreate(BaseModel):
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    pain: int = Field(..., ge=0, le=10)
    energy: int = Field(..., ge=0, le=10)
    mood: MoodType
    notes: Optional[str] = ""

class SymptomLogResponse(BaseModel):
    id: str
    user_id: str
    date: str
    pain: int
    energy: int
    mood: MoodType
    notes: str
    created_at: str

class SymptomLogList(BaseModel):
    symptoms: List[SymptomLogResponse]
    count: int

from fastapi import APIRouter, HTTPException, status, Depends, Query
from datetime import datetime, timezone
import uuid

from models.schemas import SymptomLogCreate, SymptomLogResponse, SymptomLogList
from utils.auth import get_current_user
from utils.database import get_symptoms_collection

router = APIRouter(prefix="/api/symptoms", tags=["Symptoms"])

@router.post("", response_model=SymptomLogResponse)
async def create_symptom_log(
    data: SymptomLogCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create or update a symptom log entry for a specific date"""
    symptoms = get_symptoms_collection()
    
    # Check if entry exists for this date
    existing = await symptoms.find_one({
        "user_id": current_user["user_id"],
        "date": data.date
    })
    
    now = datetime.now(timezone.utc)
    
    if existing:
        # Update existing entry
        await symptoms.update_one(
            {"id": existing["id"]},
            {"$set": {
                "pain": data.pain,
                "energy": data.energy,
                "mood": data.mood,
                "notes": data.notes or "",
                "updated_at": now
            }}
        )
        
        return SymptomLogResponse(
            id=existing["id"],
            user_id=current_user["user_id"],
            date=data.date,
            pain=data.pain,
            energy=data.energy,
            mood=data.mood,
            notes=data.notes or "",
            created_at=existing["created_at"].isoformat() if isinstance(existing["created_at"], datetime) else existing["created_at"]
        )
    
    # Create new entry
    symptom_id = str(uuid.uuid4())
    
    symptom_doc = {
        "id": symptom_id,
        "user_id": current_user["user_id"],
        "date": data.date,
        "pain": data.pain,
        "energy": data.energy,
        "mood": data.mood,
        "notes": data.notes or "",
        "created_at": now
    }
    
    await symptoms.insert_one(symptom_doc)
    
    return SymptomLogResponse(
        id=symptom_id,
        user_id=current_user["user_id"],
        date=data.date,
        pain=data.pain,
        energy=data.energy,
        mood=data.mood,
        notes=data.notes or "",
        created_at=now.isoformat()
    )

@router.get("", response_model=SymptomLogList)
async def get_symptom_logs(
    days: int = Query(default=7, ge=1, le=365, description="Number of days to retrieve"),
    current_user: dict = Depends(get_current_user)
):
    """Get symptom logs for the user (last N days)"""
    symptoms = get_symptoms_collection()
    
    # Get logs sorted by date descending
    cursor = symptoms.find(
        {"user_id": current_user["user_id"]}
    ).sort("date", -1).limit(days)
    
    results = await cursor.to_list(length=days)
    
    symptom_list = [
        SymptomLogResponse(
            id=doc["id"],
            user_id=doc["user_id"],
            date=doc["date"],
            pain=doc["pain"],
            energy=doc["energy"],
            mood=doc["mood"],
            notes=doc.get("notes", ""),
            created_at=doc["created_at"].isoformat() if isinstance(doc["created_at"], datetime) else doc["created_at"]
        )
        for doc in results
    ]
    
    return SymptomLogList(symptoms=symptom_list, count=len(symptom_list))

@router.get("/{date}", response_model=SymptomLogResponse)
async def get_symptom_by_date(
    date: str,
    current_user: dict = Depends(get_current_user)
):
    """Get symptom log for a specific date"""
    symptoms = get_symptoms_collection()
    
    doc = await symptoms.find_one({
        "user_id": current_user["user_id"],
        "date": date
    })
    
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró registro para esta fecha"
        )
    
    return SymptomLogResponse(
        id=doc["id"],
        user_id=doc["user_id"],
        date=doc["date"],
        pain=doc["pain"],
        energy=doc["energy"],
        mood=doc["mood"],
        notes=doc.get("notes", ""),
        created_at=doc["created_at"].isoformat() if isinstance(doc["created_at"], datetime) else doc["created_at"]
    )

@router.delete("/{date}")
async def delete_symptom_log(
    date: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete symptom log for a specific date"""
    symptoms = get_symptoms_collection()
    
    result = await symptoms.delete_one({
        "user_id": current_user["user_id"],
        "date": date
    })
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró registro para eliminar"
        )
    
    return {"message": "Registro eliminado correctamente"}

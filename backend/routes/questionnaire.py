from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timezone
import uuid

from models.schemas import QuestionnaireCreate, QuestionnaireResponse
from utils.auth import get_current_user
from utils.database import get_questionnaires_collection, get_users_collection

router = APIRouter(prefix="/api/questionnaire", tags=["Questionnaire"])

@router.post("", response_model=QuestionnaireResponse)
async def save_questionnaire(
    data: QuestionnaireCreate,
    current_user: dict = Depends(get_current_user)
):
    """Save questionnaire answers and phenotype result"""
    questionnaires = get_questionnaires_collection()
    users = get_users_collection()
    
    # Create questionnaire document
    questionnaire_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    questionnaire_doc = {
        "id": questionnaire_id,
        "user_id": current_user["user_id"],
        "answers": data.answers.model_dump(),
        "phenotype_result": data.phenotype_result,
        "created_at": now
    }
    
    await questionnaires.insert_one(questionnaire_doc)
    
    # Update user's phenotype result
    await users.update_one(
        {"id": current_user["user_id"]},
        {"$set": {"phenotype_result": data.phenotype_result}}
    )
    
    return QuestionnaireResponse(
        id=questionnaire_id,
        user_id=current_user["user_id"],
        answers=data.answers,
        phenotype_result=data.phenotype_result,
        created_at=now.isoformat()
    )

@router.get("/results")
async def get_questionnaire_results(current_user: dict = Depends(get_current_user)):
    """Get the user's latest questionnaire results"""
    questionnaires = get_questionnaires_collection()
    
    # Find latest questionnaire for user
    cursor = questionnaires.find(
        {"user_id": current_user["user_id"]}
    ).sort("created_at", -1).limit(1)
    
    results = await cursor.to_list(length=1)
    
    if not results:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontraron resultados de cuestionario"
        )
    
    doc = results[0]
    return QuestionnaireResponse(
        id=doc["id"],
        user_id=doc["user_id"],
        answers=doc["answers"],
        phenotype_result=doc["phenotype_result"],
        created_at=doc["created_at"].isoformat() if isinstance(doc["created_at"], datetime) else doc["created_at"]
    )

@router.get("/history")
async def get_questionnaire_history(current_user: dict = Depends(get_current_user)):
    """Get all questionnaire submissions for the user"""
    questionnaires = get_questionnaires_collection()
    
    cursor = questionnaires.find(
        {"user_id": current_user["user_id"]}
    ).sort("created_at", -1).limit(100)
    
    results = await cursor.to_list(length=100)
    
    return {
        "questionnaires": [
            QuestionnaireResponse(
                id=doc["id"],
                user_id=doc["user_id"],
                answers=doc["answers"],
                phenotype_result=doc["phenotype_result"],
                created_at=doc["created_at"].isoformat() if isinstance(doc["created_at"], datetime) else doc["created_at"]
            )
            for doc in results
        ],
        "count": len(results)
    }

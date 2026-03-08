import os
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'saude_db')

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    @classmethod
    async def connect(cls):
        cls.client = AsyncIOMotorClient(MONGO_URL)
        # Verify connection
        await cls.client.admin.command('ping')
        print(f"Connected to MongoDB: {DB_NAME}")
    
    @classmethod
    async def disconnect(cls):
        if cls.client:
            cls.client.close()
            print("Disconnected from MongoDB")
    
    @classmethod
    def get_db(cls):
        if cls.client is None:
            raise RuntimeError("Database not connected")
        return cls.client[DB_NAME]
    
    @classmethod
    def get_collection(cls, name: str):
        return cls.get_db()[name]

# Collection names
USERS_COLLECTION = "users"
QUESTIONNAIRES_COLLECTION = "questionnaires"
SYMPTOMS_COLLECTION = "symptoms"

def get_users_collection():
    return Database.get_collection(USERS_COLLECTION)

def get_questionnaires_collection():
    return Database.get_collection(QUESTIONNAIRES_COLLECTION)

def get_symptoms_collection():
    return Database.get_collection(SYMPTOMS_COLLECTION)

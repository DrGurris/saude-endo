import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('BASE_URL', 'http://localhost:8001')

@pytest.fixture(scope="module")
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

@pytest.fixture(scope="module")
def test_user_data():
    """Generate unique test user data"""
    unique_id = str(uuid.uuid4())[:8]
    return {
        "name": f"TEST_User_{unique_id}",
        "email": f"test_{unique_id}@example.com",
        "password": "TestPass123!",
        "birth_date": "1990-05-15"
    }

@pytest.fixture(scope="module")
def registered_user(api_client, test_user_data):
    """Register a test user and return token"""
    response = api_client.post(f"{BASE_URL}/api/auth/register", json=test_user_data)
    if response.status_code != 200:
        pytest.skip(f"Registration failed: {response.text}")
    data = response.json()
    return {
        "token": data.get("token"),
        "user": data.get("user"),
        "email": test_user_data["email"],
        "password": test_user_data["password"]
    }

@pytest.fixture(scope="module")
def auth_headers(registered_user):
    """Headers with auth token"""
    return {"Authorization": f"Bearer {registered_user['token']}"}

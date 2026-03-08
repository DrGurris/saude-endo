import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('BASE_URL', 'http://localhost:8001')


class TestHealthEndpoint:
    """Test the health check endpoint"""
    
    def test_health_endpoint_returns_200(self, api_client):
        """GET /api/health should return 200 with healthy status"""
        response = api_client.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        assert data.get("service") == "Saude API"


class TestAuthRegister:
    """Test user registration endpoint"""
    
    def test_register_new_user_success(self, api_client):
        """POST /api/auth/register should create a new user and return token"""
        unique_id = str(uuid.uuid4())[:8]
        user_data = {
            "name": f"TEST_NewUser_{unique_id}",
            "email": f"test_new_{unique_id}@example.com",
            "password": "SecurePass123!",
            "birth_date": "1995-03-20"
        }
        
        response = api_client.post(f"{BASE_URL}/api/auth/register", json=user_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "token" in data
        assert "user" in data
        assert data["user"]["name"] == user_data["name"]
        assert data["user"]["email"] == user_data["email"]
        assert "id" in data["user"]
        assert "created_at" in data["user"]
    
    def test_register_duplicate_email_fails(self, api_client):
        """POST /api/auth/register should fail with duplicate email"""
        unique_id = str(uuid.uuid4())[:8]
        user_data = {
            "name": f"TEST_Duplicate_{unique_id}",
            "email": f"test_dup_{unique_id}@example.com",
            "password": "SecurePass123!",
            "birth_date": "1990-01-01"
        }
        
        # First registration should succeed
        response1 = api_client.post(f"{BASE_URL}/api/auth/register", json=user_data)
        assert response1.status_code == 200
        
        # Second registration with same email should fail
        response2 = api_client.post(f"{BASE_URL}/api/auth/register", json=user_data)
        assert response2.status_code == 400
        assert "ya está registrado" in response2.json().get("detail", "").lower() or "correo" in response2.json().get("detail", "").lower()
    
    def test_register_missing_fields_fails(self, api_client):
        """POST /api/auth/register should fail with missing required fields"""
        response = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "email": "incomplete@test.com"
        })
        assert response.status_code == 422  # Validation error
    
    def test_register_invalid_email_format_fails(self, api_client):
        """POST /api/auth/register should fail with invalid email format"""
        response = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "name": "Test User",
            "email": "not-an-email",
            "password": "SecurePass123!"
        })
        assert response.status_code == 422  # Validation error


class TestAuthLogin:
    """Test user login endpoint"""
    
    def test_login_valid_credentials(self, api_client, registered_user):
        """POST /api/auth/login should return token for valid credentials"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": registered_user["email"],
            "password": registered_user["password"]
        })
        assert response.status_code == 200
        
        data = response.json()
        assert "token" in data
        assert "user" in data
        assert data["user"]["email"] == registered_user["email"]
    
    def test_login_invalid_password(self, api_client, registered_user):
        """POST /api/auth/login should fail with wrong password"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": registered_user["email"],
            "password": "WrongPassword123!"
        })
        assert response.status_code == 401
        assert "incorrectas" in response.json().get("detail", "").lower()
    
    def test_login_nonexistent_email(self, api_client):
        """POST /api/auth/login should fail with non-existent email"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": "nonexistent@example.com",
            "password": "SomePass123!"
        })
        assert response.status_code == 401


class TestAuthMe:
    """Test current user endpoint"""
    
    def test_get_me_authenticated(self, api_client, registered_user, auth_headers):
        """GET /api/auth/me should return current user info"""
        response = api_client.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["email"] == registered_user["email"]
        assert "id" in data
        assert "name" in data
    
    def test_get_me_without_token(self, api_client):
        """GET /api/auth/me should fail without token"""
        response = api_client.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code in [401, 403]
    
    def test_get_me_invalid_token(self, api_client):
        """GET /api/auth/me should fail with invalid token"""
        response = api_client.get(f"{BASE_URL}/api/auth/me", headers={
            "Authorization": "Bearer invalid_token_here"
        })
        assert response.status_code == 401

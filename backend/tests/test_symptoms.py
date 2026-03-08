import pytest
import requests
import os
import uuid
from datetime import datetime, timedelta

BASE_URL = os.environ.get('BASE_URL', 'http://localhost:8001')


class TestSymptomsCreate:
    """Test symptom log creation endpoint"""
    
    def test_create_symptom_log_success(self, api_client, auth_headers):
        """POST /api/symptoms should create a new symptom log entry"""
        today = datetime.now().strftime("%Y-%m-%d")
        symptom_data = {
            "date": today,
            "pain": 5,
            "energy": 7,
            "mood": "good",
            "notes": "TEST note - feeling okay"
        }
        
        response = api_client.post(f"{BASE_URL}/api/symptoms", json=symptom_data, headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["date"] == today
        assert data["pain"] == 5
        assert data["energy"] == 7
        assert data["mood"] == "good"
        assert "id" in data
        assert "user_id" in data
        assert "created_at" in data
    
    def test_create_symptom_log_update_existing(self, api_client, auth_headers):
        """POST /api/symptoms should update existing entry for same date"""
        test_date = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
        
        # First entry
        symptom_data1 = {
            "date": test_date,
            "pain": 3,
            "energy": 8,
            "mood": "good",
            "notes": "TEST first entry"
        }
        response1 = api_client.post(f"{BASE_URL}/api/symptoms", json=symptom_data1, headers=auth_headers)
        assert response1.status_code == 200
        
        # Update same date
        symptom_data2 = {
            "date": test_date,
            "pain": 7,
            "energy": 4,
            "mood": "bad",
            "notes": "TEST updated entry"
        }
        response2 = api_client.post(f"{BASE_URL}/api/symptoms", json=symptom_data2, headers=auth_headers)
        assert response2.status_code == 200
        
        data = response2.json()
        assert data["pain"] == 7
        assert data["energy"] == 4
        assert data["mood"] == "bad"
    
    def test_create_symptom_log_without_auth_fails(self, api_client):
        """POST /api/symptoms should fail without authentication"""
        response = api_client.post(f"{BASE_URL}/api/symptoms", json={
            "date": "2024-01-01",
            "pain": 5,
            "energy": 5,
            "mood": "neutral",
            "notes": ""
        })
        assert response.status_code in [401, 403]
    
    def test_create_symptom_log_invalid_mood_fails(self, api_client, auth_headers):
        """POST /api/symptoms should fail with invalid mood value"""
        response = api_client.post(f"{BASE_URL}/api/symptoms", json={
            "date": "2024-01-01",
            "pain": 5,
            "energy": 5,
            "mood": "invalid_mood",
            "notes": ""
        }, headers=auth_headers)
        assert response.status_code == 422
    
    def test_create_symptom_log_pain_out_of_range_fails(self, api_client, auth_headers):
        """POST /api/symptoms should fail with pain value out of range"""
        response = api_client.post(f"{BASE_URL}/api/symptoms", json={
            "date": "2024-01-01",
            "pain": 15,
            "energy": 5,
            "mood": "neutral",
            "notes": ""
        }, headers=auth_headers)
        assert response.status_code == 422


class TestSymptomsGet:
    """Test symptom log retrieval endpoints"""
    
    def test_get_symptoms_list_success(self, api_client, auth_headers):
        """GET /api/symptoms should return list of symptom logs"""
        response = api_client.get(f"{BASE_URL}/api/symptoms", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "symptoms" in data
        assert "count" in data
        assert isinstance(data["symptoms"], list)
    
    def test_get_symptoms_with_days_param(self, api_client, auth_headers):
        """GET /api/symptoms?days=N should limit results"""
        response = api_client.get(f"{BASE_URL}/api/symptoms?days=3", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["symptoms"]) <= 3
    
    def test_get_symptoms_without_auth_fails(self, api_client):
        """GET /api/symptoms should fail without authentication"""
        response = api_client.get(f"{BASE_URL}/api/symptoms")
        assert response.status_code in [401, 403]
    
    def test_get_symptom_by_date_success(self, api_client, auth_headers):
        """GET /api/symptoms/{date} should return specific date entry"""
        # First create an entry
        test_date = (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d")
        api_client.post(f"{BASE_URL}/api/symptoms", json={
            "date": test_date,
            "pain": 6,
            "energy": 5,
            "mood": "neutral",
            "notes": "TEST entry for get by date"
        }, headers=auth_headers)
        
        # Then fetch it
        response = api_client.get(f"{BASE_URL}/api/symptoms/{test_date}", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["date"] == test_date
        assert data["pain"] == 6
    
    def test_get_symptom_by_date_not_found(self, api_client, auth_headers):
        """GET /api/symptoms/{date} should return 404 for non-existent date"""
        response = api_client.get(f"{BASE_URL}/api/symptoms/1999-01-01", headers=auth_headers)
        assert response.status_code == 404


class TestSymptomsDelete:
    """Test symptom log deletion endpoint"""
    
    def test_delete_symptom_success(self, api_client, auth_headers):
        """DELETE /api/symptoms/{date} should remove the entry"""
        # Create entry to delete
        test_date = (datetime.now() - timedelta(days=10)).strftime("%Y-%m-%d")
        api_client.post(f"{BASE_URL}/api/symptoms", json={
            "date": test_date,
            "pain": 4,
            "energy": 6,
            "mood": "good",
            "notes": "TEST to be deleted"
        }, headers=auth_headers)
        
        # Delete it
        response = api_client.delete(f"{BASE_URL}/api/symptoms/{test_date}", headers=auth_headers)
        assert response.status_code == 200
        
        # Verify it's gone
        get_response = api_client.get(f"{BASE_URL}/api/symptoms/{test_date}", headers=auth_headers)
        assert get_response.status_code == 404
    
    def test_delete_symptom_not_found(self, api_client, auth_headers):
        """DELETE /api/symptoms/{date} should return 404 for non-existent date"""
        response = api_client.delete(f"{BASE_URL}/api/symptoms/1999-12-31", headers=auth_headers)
        assert response.status_code == 404

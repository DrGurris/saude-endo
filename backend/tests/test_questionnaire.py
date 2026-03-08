import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('BASE_URL', 'http://localhost:8001')


class TestQuestionnaireCreate:
    """Test questionnaire save endpoint"""
    
    def test_save_questionnaire_success(self, api_client, auth_headers):
        """POST /api/questionnaire should save questionnaire answers"""
        questionnaire_data = {
            "answers": {
                "pain_locations": ["abdomen", "pelvis"],
                "pain_characteristics": ["cramping", "sharp"],
                "severity_scores": {"daily_impact": 7, "sleep_quality": 5},
                "goal": "pain_management",
                "commitment": "daily_tracking",
                "completed_at": "2024-01-15T10:00:00Z"
            },
            "phenotype_result": {
                "type": "inflammatory",
                "severity": "moderate",
                "recommendations": ["anti-inflammatory diet", "stress management"]
            }
        }
        
        response = api_client.post(f"{BASE_URL}/api/questionnaire", json=questionnaire_data, headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert "user_id" in data
        assert "answers" in data
        assert "phenotype_result" in data
        assert data["phenotype_result"]["type"] == "inflammatory"
    
    def test_save_questionnaire_without_auth_fails(self, api_client):
        """POST /api/questionnaire should fail without authentication"""
        response = api_client.post(f"{BASE_URL}/api/questionnaire", json={
            "answers": {},
            "phenotype_result": {}
        })
        assert response.status_code in [401, 403]
    
    def test_save_questionnaire_missing_fields_fails(self, api_client, auth_headers):
        """POST /api/questionnaire should fail with missing required fields"""
        response = api_client.post(f"{BASE_URL}/api/questionnaire", json={
            "answers": {}
        }, headers=auth_headers)
        assert response.status_code == 422


class TestQuestionnaireResults:
    """Test questionnaire results retrieval"""
    
    def test_get_results_success(self, api_client, auth_headers):
        """GET /api/questionnaire/results should return latest results"""
        # First save a questionnaire
        api_client.post(f"{BASE_URL}/api/questionnaire", json={
            "answers": {
                "pain_locations": ["lower_back"],
                "pain_characteristics": ["aching"],
                "severity_scores": {"daily_impact": 5},
                "goal": "understanding",
                "commitment": "weekly_tracking",
                "completed_at": "2024-02-01T12:00:00Z"
            },
            "phenotype_result": {
                "type": "neuropathic",
                "severity": "mild",
                "recommendations": ["gentle exercise"]
            }
        }, headers=auth_headers)
        
        # Then fetch results
        response = api_client.get(f"{BASE_URL}/api/questionnaire/results", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "phenotype_result" in data
        assert "answers" in data
    
    def test_get_results_without_auth_fails(self, api_client):
        """GET /api/questionnaire/results should fail without authentication"""
        response = api_client.get(f"{BASE_URL}/api/questionnaire/results")
        assert response.status_code in [401, 403]


class TestQuestionnaireHistory:
    """Test questionnaire history retrieval"""
    
    def test_get_history_success(self, api_client, auth_headers):
        """GET /api/questionnaire/history should return all questionnaires"""
        response = api_client.get(f"{BASE_URL}/api/questionnaire/history", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "questionnaires" in data
        assert "count" in data
        assert isinstance(data["questionnaires"], list)
    
    def test_get_history_without_auth_fails(self, api_client):
        """GET /api/questionnaire/history should fail without authentication"""
        response = api_client.get(f"{BASE_URL}/api/questionnaire/history")
        assert response.status_code in [401, 403]

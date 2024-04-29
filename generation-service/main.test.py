import pytest
from fastapi.testclient import TestClient
from main import app  # Import your FastAPI app instance

@pytest.fixture
def client():
    return TestClient(app)

def test_generate_strategies(client):
    request_body = {
        "company": "Sample Company",
        "category": "Sample Category",
        "productData": [
            {
                "productName": "Product 1",
                "reviews": ["Sample positive review", "Sample negative review"]
            },
            {
                "productName": "Product 2",
                "reviews": ["Another positive review", "Another negative review"]
            }
        ]
    }

    response = client.post("/strategies", json=request_body)

    assert response.status_code == 200

    assert "sentiments" in response.json()
    assert "response" in response.json()

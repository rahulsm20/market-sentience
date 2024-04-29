import requests
import subprocess
import time
import json
import os
import pytest

@pytest.fixture(scope="module")
def start_servers():
    # Start the FastAPI server
    fastapi_process = subprocess.Popen(["uvicorn", "fastapi_server:app"])
    # Start the Express.js server
    express_process = subprocess.Popen(["node", "server.js"])

    # Wait for servers to start
    time.sleep(5)  # Adjust the wait time as needed

    yield  # This is the teardown part of the fixture

    # Shutdown servers
    fastapi_process.kill()
    express_process.kill()

def test_integration(start_servers):
    # Define test data
    data = {
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

    # Make request to FastAPI server
    fastapi_url = "http://localhost:8000/strategies"
    fastapi_response = requests.post(fastapi_url, json=data)
    assert fastapi_response.status_code == 200
    fastapi_data = fastapi_response.json()

    # Make request to Express.js server
    express_url = "http://localhost:5000/scrape"
    express_response = requests.get(express_url)
    assert express_response.status_code == 200
    express_data = express_response.json()

    # Assert responses from both servers
    assert "sentiments" in fastapi_data
    assert "response" in fastapi_data

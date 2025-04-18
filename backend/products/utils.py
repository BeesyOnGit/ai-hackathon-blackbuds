import json
import os

import requests
from django.conf import settings


def call_agent_service(url, data):
    """
    Make an API call to an external agent service.

    Args:
        url (str): The URL of the external service
        data (dict): The data to send to the service

    Returns:
        dict: The JSON response from the service, or an error message if the call failed
    """
    try:
        response = requests.post(
            url, json=data, headers={"Content-Type": "application/json"}, timeout=10  # 10 second timeout
        )
        response.raise_for_status()  # Raise an exception for 4XX/5XX responses
        return response.json()
    except requests.exceptions.RequestException as e:
        # Log the error and return a fallback response
        print(f"Error calling external service: {e}")
        return {"error": str(e), "status": "failed"}


def get_agent1_report(product_data):
    """
    Get a report from Agent 1 service for a product.

    Args:
        product_data (dict): The product data

    Returns:
        dict: The report from Agent 1
    """
    agent1_url = os.environ.get("AGENT1_SERVICE_URL", "")
    if not agent1_url:
        return {"error": "AGENT1_SERVICE_URL not configured", "status": "failed"}

    # Prepare data for Agent 1
    request_data = {"product": product_data}

    # Call the Agent 1 service
    return call_agent_service(agent1_url, request_data)


def get_agent2_report(agent1_result, product_data):
    """
    Get a report from Agent 2 service based on the result from Agent 1.

    Args:
        agent1_result (dict): The result from Agent 1
        product_data (dict): The original product data

    Returns:
        dict: The report from Agent 2
    """
    agent2_url = os.environ.get("AGENT2_SERVICE_URL", "")
    if not agent2_url:
        return {"error": "AGENT2_SERVICE_URL not configured", "status": "failed"}

    # Prepare data for Agent 2 (includes both original product data and Agent 1 results)
    request_data = {"product": product_data, "agent1_report": agent1_result}

    # Call the Agent 2 service
    return call_agent_service(agent2_url, request_data)

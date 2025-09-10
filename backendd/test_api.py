"""
Test script for the Expense Tracker API.

This script demonstrates how to use the API endpoints and validates
that all functionality is working correctly.
"""

import requests
import json
from datetime import datetime, date

# API base URL
BASE_URL = "http://127.0.0.1:8001/api"

def test_api():
    """Test all API endpoints to ensure they're working correctly."""
    
    print("🚀 Testing Expense Tracker API")
    print("=" * 50)
    
    # Test 1: Create a project
    print("\n1. Creating a test project...")
    project_data = {
        "name": "Test Project",
        "description": "A test project for API validation"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/projects/", json=project_data)
        if response.status_code == 201:
            project = response.json()
            project_id = project['id']
            print(f"✅ Project created successfully! ID: {project_id}")
            print(f"   Name: {project['name']}")
            print(f"   Total Expenses: ${project['total_expenses']}")
        else:
            print(f"❌ Failed to create project: {response.status_code}")
            print(response.text)
            return
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure it's running on port 8001")
        return
    
    # Test 2: Add expenses
    print("\n2. Adding test expenses...")
    expenses = [
        {"project": project_id, "amount": 150.50, "description": "Software license", "date": "2025-09-08"},
        {"project": project_id, "amount": 75.25, "description": "Office supplies", "date": "2025-09-09"},
        {"project": project_id, "amount": 200.00, "description": "Consulting fees", "date": "2025-09-10"}
    ]
    
    expense_ids = []
    for expense_data in expenses:
        response = requests.post(f"{BASE_URL}/expenses/", json=expense_data)
        if response.status_code == 201:
            expense = response.json()
            expense_ids.append(expense['id'])
            print(f"✅ Expense added: ${expense['amount']} - {expense['description']}")
        else:
            print(f"❌ Failed to add expense: {response.status_code}")
    
    # Test 3: Get project with expenses
    print("\n3. Retrieving project with expenses...")
    response = requests.get(f"{BASE_URL}/projects/{project_id}/")
    if response.status_code == 200:
        project = response.json()
        print(f"✅ Project retrieved successfully!")
        print(f"   Name: {project['name']}")
        print(f"   Total Expenses: ${project['total_expenses']}")
        print(f"   Number of Expenses: {project['expense_count']}")
        print(f"   Expenses: {len(project['expenses'])} items")
    else:
        print(f"❌ Failed to retrieve project: {response.status_code}")
    
    # Test 4: List all projects
    print("\n4. Listing all projects...")
    response = requests.get(f"{BASE_URL}/projects/")
    if response.status_code == 200:
        projects = response.json()
        print(f"✅ Found {projects['count']} projects")
        for proj in projects['results']:
            print(f"   - {proj['name']}: ${proj['total_expenses']}")
    else:
        print(f"❌ Failed to list projects: {response.status_code}")
    
    # Test 5: Generate PDF statement
    print("\n5. Testing PDF statement generation...")
    response = requests.get(f"{BASE_URL}/projects/{project_id}/statement/")
    if response.status_code == 200:
        print(f"✅ PDF statement generated successfully!")
        print(f"   Content-Type: {response.headers.get('content-type')}")
        print(f"   Content-Length: {len(response.content)} bytes")
        
        # Save PDF for manual verification
        with open(f"test_statement_{project_id}.pdf", "wb") as f:
            f.write(response.content)
        print(f"   Saved as: test_statement_{project_id}.pdf")
    else:
        print(f"❌ Failed to generate PDF: {response.status_code}")
    
    # Test 6: Generate Excel statement
    print("\n6. Testing Excel statement generation...")
    response = requests.get(f"{BASE_URL}/projects/{project_id}/statement/?format=excel")
    if response.status_code == 200:
        print(f"✅ Excel statement generated successfully!")
        print(f"   Content-Type: {response.headers.get('content-type')}")
        print(f"   Content-Length: {len(response.content)} bytes")
        
        # Save Excel for manual verification
        with open(f"test_statement_{project_id}.xlsx", "wb") as f:
            f.write(response.content)
        print(f"   Saved as: test_statement_{project_id}.xlsx")
    else:
        print(f"❌ Failed to generate Excel: {response.status_code}")
    
    # Test 7: Filter expenses by project
    print("\n7. Testing expense filtering...")
    response = requests.get(f"{BASE_URL}/expenses/?project={project_id}")
    if response.status_code == 200:
        expenses = response.json()
        print(f"✅ Found {expenses['count']} expenses for project {project_id}")
        for exp in expenses['results']:
            print(f"   - {exp['date']}: ${exp['amount']} - {exp['description']}")
    else:
        print(f"❌ Failed to filter expenses: {response.status_code}")
    
    print("\n" + "=" * 50)
    print("🎉 API Testing Complete!")
    print("\nNext steps:")
    print("1. Open http://127.0.0.1:8001/admin/ to access the admin panel")
    print("2. Login with: admin / admin123")
    print("3. Check the generated PDF and Excel files")
    print("4. Test the API with your frontend application")

if __name__ == "__main__":
    test_api()

"""
URL configuration for the projects app.

This module defines the URL patterns for the expense tracker API endpoints.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ExpenseViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'expenses', ExpenseViewSet, basename='expense')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('api/', include(router.urls)),
]

# Available endpoints:
# GET /api/projects/ → list projects
# POST /api/projects/ → create project  
# GET /api/projects/<id>/ → project details with all expenses
# PUT /api/projects/<id>/ → update project
# DELETE /api/projects/<id>/ → delete project
# GET /api/projects/<id>/statement/ → generate statement (PDF/Excel)
# GET /api/projects/<id>/statement/?format=excel → generate Excel statement
# GET /api/projects/<id>/statement/?format=pdf → generate PDF statement
#
# GET /api/expenses/ → list expenses
# POST /api/expenses/ → add expense to project
# GET /api/expenses/<id>/ → expense details
# PUT /api/expenses/<id>/ → update expense
# DELETE /api/expenses/<id>/ → delete expense
# GET /api/expenses/?project=<project_id> → filter expenses by project

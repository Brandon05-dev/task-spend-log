"""
Serializers for the expense tracker API.

This module contains Django REST Framework serializers for converting
model instances to JSON and handling data validation.
"""

from rest_framework import serializers
from .models import Project, Expense


class ExpenseSerializer(serializers.ModelSerializer):
    """
    Serializer for Expense model.
    
    Handles creation and validation of expense data.
    """
    
    class Meta:
        model = Expense
        fields = ['id', 'project', 'amount', 'description', 'date', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_amount(self, value):
        """
        Validate that amount is greater than 0.
        """
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than 0.")
        return value
    
    def validate_description(self, value):
        """
        Validate that description is not empty.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Description cannot be empty.")
        return value.strip()


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for Project model with related expenses.
    
    Includes all expenses associated with the project and calculated totals.
    """
    expenses = ExpenseSerializer(many=True, read_only=True)
    total_expenses = serializers.ReadOnlyField()
    expense_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 
            'name', 
            'description', 
            'created_at', 
            'expenses', 
            'total_expenses', 
            'expense_count'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate_name(self, value):
        """
        Validate that project name is not empty.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Project name cannot be empty.")
        return value.strip()


class ProjectSummarySerializer(serializers.ModelSerializer):
    """
    Simplified serializer for Project model without expenses.
    
    Used for listing projects without the overhead of loading all expenses.
    """
    total_expenses = serializers.ReadOnlyField()
    expense_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 
            'name', 
            'description', 
            'created_at', 
            'total_expenses', 
            'expense_count'
        ]
        read_only_fields = ['id', 'created_at']

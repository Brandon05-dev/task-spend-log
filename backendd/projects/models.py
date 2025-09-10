"""
Models for the expense tracker application.

This module contains the core models for managing projects and their expenses.
"""

from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone


class Project(models.Model):
    """
    Project model to store project information.
    
    Each project can have multiple expenses associated with it.
    """
    name = models.CharField(
        max_length=200, 
        help_text="Name of the project"
    )
    description = models.TextField(
        blank=True, 
        help_text="Detailed description of the project"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the project was created"
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.name
    
    @property
    def total_expenses(self):
        """Calculate total expenses for this project."""
        return self.expenses.aggregate(
            total=models.Sum('amount')
        )['total'] or 0
    
    @property
    def expense_count(self):
        """Get the number of expenses for this project."""
        return self.expenses.count()


class Expense(models.Model):
    """
    Expense model to store individual expenses for projects.
    
    Each expense belongs to a specific project and contains amount,
    description, and date information.
    """
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='expenses',
        help_text="Project this expense belongs to"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)],
        help_text="Amount spent (must be greater than 0)"
    )
    description = models.CharField(
        max_length=500,
        help_text="Description of the expense"
    )
    date = models.DateField(
        default=timezone.now,
        help_text="Date when the expense occurred"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the expense was recorded"
    )
    
    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"
    
    def __str__(self):
        return f"{self.project.name} - ${self.amount} - {self.description[:50]}"

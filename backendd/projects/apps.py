"""
App configuration for the projects application.

This module contains the Django app configuration for the expense tracker.
"""

from django.apps import AppConfig


class ProjectsConfig(AppConfig):
    """
    Configuration class for the projects app.
    
    This class defines the configuration for the projects Django app,
    including the default auto field type and app name.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'projects'
    verbose_name = 'Project Expense Tracker'
    
    def ready(self):
        """
        Called when the app is ready.
        
        This method can be used to perform initialization
        tasks when the app starts up.
        """
        pass

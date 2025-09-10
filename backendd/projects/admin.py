"""
Admin configuration for the expense tracker.

This module configures the Django admin interface for managing
projects and expenses with enhanced functionality.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import Project, Expense


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin configuration for Project model.
    
    Provides enhanced admin interface with search, filtering,
    and custom display fields.
    """
    list_display = [
        'name', 
        'description_preview', 
        'total_expenses_display', 
        'expense_count', 
        'created_at'
    ]
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'total_expenses_display', 'expense_count']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description')
        }),
        ('Statistics', {
            'fields': ('total_expenses_display', 'expense_count', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def description_preview(self, obj):
        """
        Return a truncated version of the description for list display.
        """
        if obj.description:
            return obj.description[:50] + ('...' if len(obj.description) > 50 else '')
        return 'No description'
    description_preview.short_description = 'Description'
    
    def total_expenses_display(self, obj):
        """
        Display total expenses with currency formatting.
        """
        total = obj.total_expenses
        color = 'green' if total > 0 else 'gray'
        return format_html(
            '<span style="color: {};">${:.2f}</span>',
            color,
            total
        )
    total_expenses_display.short_description = 'Total Expenses'
    
    def get_queryset(self, request):
        """
        Optimize queryset to reduce database queries.
        """
        return super().get_queryset(request).prefetch_related('expenses')


class ExpenseInline(admin.TabularInline):
    """
    Inline admin for displaying expenses within project admin.
    """
    model = Expense
    extra = 0
    fields = ['date', 'description', 'amount']
    readonly_fields = ['created_at']


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    """
    Admin configuration for Expense model.
    
    Provides enhanced admin interface with search, filtering,
    and custom display fields.
    """
    list_display = [
        'project', 
        'description_preview', 
        'amount_display', 
        'date', 
        'created_at'
    ]
    list_filter = ['date', 'created_at', 'project']
    search_fields = ['description', 'project__name']
    readonly_fields = ['created_at']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Expense Information', {
            'fields': ('project', 'amount', 'description', 'date')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def description_preview(self, obj):
        """
        Return a truncated version of the description for list display.
        """
        return obj.description[:50] + ('...' if len(obj.description) > 50 else '')
    description_preview.short_description = 'Description'
    
    def amount_display(self, obj):
        """
        Display amount with currency formatting and color coding.
        """
        color = 'red' if obj.amount > 1000 else 'green'
        return format_html(
            '<span style="color: {}; font-weight: bold;">${:.2f}</span>',
            color,
            obj.amount
        )
    amount_display.short_description = 'Amount'
    
    def get_queryset(self, request):
        """
        Optimize queryset to reduce database queries.
        """
        return super().get_queryset(request).select_related('project')


# Enhance the Project admin with inline expenses
ProjectAdmin.inlines = [ExpenseInline]

# Customize admin site headers
admin.site.site_header = 'Expense Tracker Administration'
admin.site.site_title = 'Expense Tracker Admin'
admin.site.index_title = 'Welcome to Expense Tracker Administration'

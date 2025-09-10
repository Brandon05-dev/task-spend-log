import React, { useState } from 'react';
import { addExpense } from '../../services/api';

/**
 * AddExpense Component - Form to add a new expense to a project
 * Features: Form validation, date handling, amount formatting
 */
const AddExpense = ({ projectId, onExpenseAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for amount field
    if (name === 'amount') {
      // Allow only numbers and decimal point
      const numericValue = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const parts = numericValue.split('.');
      const formattedValue = parts.length > 2 
        ? parts[0] + '.' + parts.slice(1).join('')
        : numericValue;
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const errors = {};
    
    // Validate amount
    if (!formData.amount.trim()) {
      errors.amount = 'Amount is required';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        errors.amount = 'Amount must be a positive number';
      } else if (amount > 999999.99) {
        errors.amount = 'Amount must be less than $1,000,000';
      }
    }
    
    // Validate description
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length > 255) {
      errors.description = 'Description must be less than 255 characters';
    }
    
    // Validate date
    if (!formData.date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (selectedDate > today) {
        errors.date = 'Date cannot be in the future';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const expenseData = {
        project: projectId,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        date: formData.date,
      };
      
      const response = await addExpense(expenseData);
      
      // Reset form
      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      
      // Notify parent component
      if (onExpenseAdded) {
        onExpenseAdded(response);
      }
      
    } catch (err) {
      if (err.response?.data) {
        // Handle validation errors from backend
        const backendErrors = err.response.data;
        setValidationErrors(backendErrors);
        setError('Please fix the errors below');
      } else {
        setError('Failed to add expense. Please try again.');
      }
      console.error('Error creating expense:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    setFormData({
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setValidationErrors({});
    setError(null);
  };

  return (
    <div className="add-expense">
      <div className="form-header">
        <h3>Add New Expense</h3>
        {onCancel && (
          <button onClick={onCancel} className="close-btn">
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">
            Amount <span className="required">*</span>
          </label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={validationErrors.amount ? 'error' : ''}
              disabled={loading}
            />
          </div>
          {validationErrors.amount && (
            <span className="field-error">{validationErrors.amount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter expense description"
            className={validationErrors.description ? 'error' : ''}
            disabled={loading}
            maxLength="255"
          />
          {validationErrors.description && (
            <span className="field-error">{validationErrors.description}</span>
          )}
          <small className="char-count">
            {formData.description.length}/255 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="date">
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={validationErrors.date ? 'error' : ''}
            disabled={loading}
            max={new Date().toISOString().split('T')[0]}
          />
          {validationErrors.date && (
            <span className="field-error">{validationErrors.date}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="reset-btn"
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !formData.amount || !formData.description.trim()}
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;

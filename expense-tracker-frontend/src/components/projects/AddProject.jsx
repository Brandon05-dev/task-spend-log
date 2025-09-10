import React, { useState } from 'react';
import { createProject } from '../../services/api';

/**
 * AddProject Component - Form to create a new project
 * Features: Form validation, loading state, error handling
 */
const AddProject = ({ onProjectAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
    
    if (!formData.name.trim()) {
      errors.name = 'Project name is required';
    } else if (formData.name.length > 100) {
      errors.name = 'Project name must be less than 100 characters';
    }
    
    if (formData.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
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
      
      const response = await createProject(formData);
      
      // Reset form
      setFormData({ name: '', description: '' });
      
      // Notify parent component
      if (onProjectAdded) {
        onProjectAdded(response);
      }
      
      alert('Project created successfully!');
    } catch (err) {
      if (err.response?.data) {
        // Handle validation errors from backend
        const backendErrors = err.response.data;
        setValidationErrors(backendErrors);
        setError('Please fix the errors below');
      } else {
        setError('Failed to create project. Please try again.');
      }
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    setFormData({ name: '', description: '' });
    setValidationErrors({});
    setError(null);
  };

  return (
    <div className="add-project">
      <div className="form-header">
        <h3>Add New Project</h3>
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

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="name">
            Project Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter project name"
            className={validationErrors.name ? 'error' : ''}
            disabled={loading}
            maxLength="100"
          />
          {validationErrors.name && (
            <span className="field-error">{validationErrors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description (optional)"
            className={validationErrors.description ? 'error' : ''}
            disabled={loading}
            rows="4"
            maxLength="500"
          />
          {validationErrors.description && (
            <span className="field-error">{validationErrors.description}</span>
          )}
          <small className="char-count">
            {formData.description.length}/500 characters
          </small>
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
            disabled={loading || !formData.name.trim()}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;

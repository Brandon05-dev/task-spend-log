import React, { useState, useEffect } from 'react';
import { fetchProjectDetails } from '../../services/api';
import AddExpense from '../expenses/AddExpense';
import DownloadStatement from '../common/DownloadStatement';

/**
 * ProjectDetails Component - Shows project info, expenses, and download options
 * Features: Expense list, statement downloads, real-time updates
 */
const ProjectDetails = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  /**
   * Fetch project details with expenses
   */
  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProjectDetails(projectId);
      setProject(response);
    } catch (err) {
      setError('Failed to fetch project details. Please try again.');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle expense added
   */
  const handleExpenseAdded = (newExpense) => {
    // Refresh project data to get updated totals
    fetchProject();
    setShowAddExpense(false);
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="project-details loading">
        <div className="loading-spinner">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-details error">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchProject} className="retry-btn">
            Retry
          </button>
          {onBack && (
            <button onClick={onBack} className="back-btn">
              Back to Projects
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details error">
        <p>Project not found.</p>
        {onBack && (
          <button onClick={onBack} className="back-btn">
            Back to Projects
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="project-details">
      {/* Header */}
      <div className="project-header">
        {onBack && (
          <button onClick={onBack} className="back-btn">
            ← Back to Projects
          </button>
        )}
        <div className="project-info">
          <h2>{project.name}</h2>
          {project.description && (
            <p className="project-description">{project.description}</p>
          )}
        </div>
        <div className="project-summary">
          <div className="summary-item">
            <span className="label">Total Expenses:</span>
            <span className="value total">${parseFloat(project.total_expenses || 0).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="label">Number of Expenses:</span>
            <span className="value">{project.expense_count || 0}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="project-actions">
        <button
          onClick={() => setShowAddExpense(true)}
          className="add-expense-btn"
        >
          + Add Expense
        </button>
        
        <DownloadStatement projectId={projectId} projectName={project.name} />
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddExpense
              projectId={projectId}
              onExpenseAdded={handleExpenseAdded}
              onCancel={() => setShowAddExpense(false)}
            />
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="expenses-section">
        <h3>Expenses</h3>
        
        {project.expenses && project.expenses.length > 0 ? (
          <div className="expenses-list">
            {project.expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-info">
                  <div className="expense-description">{expense.description}</div>
                  <div className="expense-date">{formatDate(expense.date)}</div>
                </div>
                <div className="expense-amount">
                  ${parseFloat(expense.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-expenses">
            <p>No expenses added yet.</p>
            <button
              onClick={() => setShowAddExpense(true)}
              className="add-first-expense-btn"
            >
              Add First Expense
            </button>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="refresh-section">
        <button onClick={fetchProject} className="refresh-btn">
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;

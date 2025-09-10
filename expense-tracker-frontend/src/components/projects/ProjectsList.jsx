import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../../services/api';

/**
 * ProjectsList Component - Displays all projects with their total expenses
 * Features: Loading state, error handling, project selection
 */
const ProjectsList = ({ onProjectSelect, selectedProjectId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  /**
   * Fetch projects from API
   */
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjects();
      setProjects(data.results || []);
    } catch (err) {
      setError('Failed to fetch projects. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle project selection
   */
  const handleProjectClick = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  if (loading) {
    return (
      <div className="projects-list loading">
        <div className="loading-spinner">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-list error">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadProjects} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-list">
      <div className="projects-header">
        <h2>Projects ({projects.length})</h2>
        <button onClick={loadProjects} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects found. Create your first project to get started!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${selectedProjectId === project.id ? 'selected' : ''}`}
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-stats">
                  <span className="total-expenses">
                    Total: ${parseFloat(project.total_expenses || 0).toFixed(2)}
                  </span>
                  <span className="expense-count">
                    {project.expense_count || 0} expenses
                  </span>
                </div>
              </div>
              <div className="project-actions">
                <span className="view-details">Click to view details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;

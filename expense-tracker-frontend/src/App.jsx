import React, { useState } from 'react';
import ProjectsList from './components/projects/ProjectsList';
import AddProject from './components/projects/AddProject';
import ProjectDetails from './components/projects/ProjectDetails';
import './App.css';

/**
 * Main App Component - Manages the overall application state and navigation
 * Features: Project management, navigation between views, responsive layout
 */
function App() {
  const [currentView, setCurrentView] = useState('projects'); // 'projects', 'add-project', 'project-details'
  const [selectedProject, setSelectedProject] = useState(null);
  const [refreshProjects, setRefreshProjects] = useState(0);

  /**
   * Handle project selection from projects list
   */
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentView('project-details');
  };

  /**
   * Handle successful project creation
   */
  const handleProjectAdded = (newProject) => {
    setRefreshProjects(prev => prev + 1);
    setCurrentView('projects');
  };

  /**
   * Navigate back to projects list
   */
  const handleBackToProjects = () => {
    setSelectedProject(null);
    setCurrentView('projects');
    setRefreshProjects(prev => prev + 1); // Refresh projects list
  };

  /**
   * Show add project form
   */
  const handleShowAddProject = () => {
    setCurrentView('add-project');
  };

  /**
   * Get current page title
   */
  const getPageTitle = () => {
    switch (currentView) {
      case 'add-project':
        return 'Add New Project';
      case 'project-details':
        return selectedProject ? selectedProject.name : 'Project Details';
      default:
        return 'Expense Tracker';
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            {currentView !== 'projects' && (
              <button
                onClick={handleBackToProjects}
                className="back-to-home-btn"
                title="Back to Projects"
              >
                🏠
              </button>
            )}
            {getPageTitle()}
          </h1>
          
          {currentView === 'projects' && (
            <button
              onClick={handleShowAddProject}
              className="primary-btn"
            >
              + New Project
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="content-container">
          {currentView === 'projects' && (
            <ProjectsList
              onProjectSelect={handleProjectSelect}
              selectedProjectId={selectedProject?.id}
              key={refreshProjects} // Force re-render when refreshProjects changes
            />
          )}

          {currentView === 'add-project' && (
            <AddProject
              onProjectAdded={handleProjectAdded}
              onCancel={handleBackToProjects}
            />
          )}

          {currentView === 'project-details' && selectedProject && (
            <ProjectDetails
              projectId={selectedProject.id}
              onBack={handleBackToProjects}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>Expense Tracker - Manage your project expenses efficiently</p>
          <div className="footer-links">
            <span>API Status: </span>
            <span className="api-status online">🟢 Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
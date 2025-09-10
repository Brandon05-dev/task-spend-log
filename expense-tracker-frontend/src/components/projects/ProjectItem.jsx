import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project }) => {
    return (
        <div className="project-item">
            <h3>{project.name}</h3>
            <p>Total Expenses: ${project.total_expenses}</p>
            <Link to={`/projects/${project.id}`} className="btn">View Details</Link>
        </div>
    );
};

export default ProjectItem;
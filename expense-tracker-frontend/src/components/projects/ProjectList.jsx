import React, { useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import ProjectItem from './ProjectItem';
import LoadingSpinner from '../common/LoadingSpinner';

const ProjectList = () => {
    const { projects, loading, fetchProjects } = useProjects();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="project-list">
            <h2>Projects</h2>
            {projects.length === 0 ? (
                <p>No projects found. Please add a new project.</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <ProjectItem key={project.id} project={project} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;
import React, { useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Projects = () => {
    const { projects, loading, fetchProjects } = useProjects();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div>
            <h1>Projects</h1>
            {loading && <LoadingSpinner />}
            <ProjectForm />
            <ProjectList projects={projects} />
        </div>
    );
};

export default Projects;
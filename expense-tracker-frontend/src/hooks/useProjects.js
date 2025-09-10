import { useState, useEffect } from 'react';
import { getProjects, createProject } from '../services/projectService';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data.results);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const addProject = async (projectData) => {
        try {
            const newProject = await createProject(projectData);
            setProjects((prevProjects) => [...prevProjects, newProject]);
        } catch (err) {
            setError(err);
        }
    };

    return { projects, loading, error, addProject };
};

export default useProjects;
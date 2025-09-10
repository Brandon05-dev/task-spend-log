import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Projects Overview</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <Link to={`/projects/${project.id}`}>
                            {project.name}: ${project.total_expenses}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
import React, { useState } from 'react';
import { createProject } from '../../services/projectService';

const ProjectForm = ({ onProjectCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const newProject = { name, description };
            const createdProject = await createProject(newProject);
            onProjectCreated(createdProject);
            setName('');
            setDescription('');
        } catch (err) {
            setError('Failed to create project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Project</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="name">Project Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
            </button>
        </form>
    );
};

export default ProjectForm;
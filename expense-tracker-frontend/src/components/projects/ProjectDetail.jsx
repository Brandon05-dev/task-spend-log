import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, downloadPDF, downloadExcel } from '../../services/api';
import ExpenseList from '../expenses/ExpenseList';
import LoadingSpinner from '../common/LoadingSpinner';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const data = await getProjectDetails(projectId);
                setProject(data);
            } catch (error) {
                console.error("Failed to fetch project details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleDownloadPDF = async () => {
        await downloadPDF(projectId);
    };

    const handleDownloadExcel = async () => {
        await downloadExcel(projectId);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Total Expenses: ${project.total_expenses}</p>
            <p>Number of Expenses: {project.expense_count}</p>
            <button onClick={handleDownloadPDF}>Download PDF Statement</button>
            <button onClick={handleDownloadExcel}>Download Excel Statement</button>
            <ExpenseList expenses={project.expenses} />
        </div>
    );
};

export default ProjectDetail;
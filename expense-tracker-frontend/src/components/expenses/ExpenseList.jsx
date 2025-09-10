import React, { useEffect, useState } from 'react';
import { getExpenses } from '../../services/expenseService';
import ExpenseItem from './ExpenseItem';
import LoadingSpinner from '../common/LoadingSpinner';

const ExpenseList = ({ projectId }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpenses(projectId);
                setExpenses(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [projectId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>❌ Error fetching expenses: {error}</p>;
    }

    return (
        <div>
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses found for this project.</p>
            ) : (
                <ul>
                    {expenses.map(expense => (
                        <ExpenseItem key={expense.id} expense={expense} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
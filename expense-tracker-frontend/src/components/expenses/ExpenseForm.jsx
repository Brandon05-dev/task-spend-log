import React, { useState } from 'react';
import { addExpense } from '../../services/expenseService';

const ExpenseForm = ({ projectId, onExpenseAdded }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!amount || !description || !date) {
            setError('All fields are required.');
            return;
        }

        const expenseData = {
            project: projectId,
            amount: parseFloat(amount),
            description,
            date,
        };

        try {
            await addExpense(expenseData);
            onExpenseAdded();
            setAmount('');
            setDescription('');
            setDate('');
        } catch (err) {
            setError('Failed to add expense. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Expense</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
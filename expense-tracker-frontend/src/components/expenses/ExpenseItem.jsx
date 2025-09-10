import React from 'react';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(expense.id);
    };

    const handleDelete = () => {
        onDelete(expense.id);
    };

    return (
        <div className="expense-item">
            <div className="expense-details">
                <h3>{expense.description}</h3>
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p>Amount: ${expense.amount.toFixed(2)}</p>
            </div>
            <div className="expense-actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ExpenseItem;
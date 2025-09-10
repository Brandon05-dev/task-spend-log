import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title">Expense Tracker</h1>
            <nav className="header-nav">
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/expenses">Expenses</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
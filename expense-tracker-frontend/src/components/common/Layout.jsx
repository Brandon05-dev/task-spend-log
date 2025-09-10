import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header>
                <h1>Expense Tracker</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
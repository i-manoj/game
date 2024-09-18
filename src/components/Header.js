import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS for styling

function Header() {
    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/">GameZone</Link>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/help">Help</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

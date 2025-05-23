import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

export default function Header() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="site-header">
            <div className="container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="white">d</span>
                        <span className="purple">EST</span>
                    </Link>
                </div>

                <nav className="nav-links">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
                    <Link to="/trade" className={isActive('/trade') ? 'active' : ''}>Trade</Link>
                </nav>
                <div className="wallet-button">
                    <button>Connect Wallet</button>
                </div>
            </div>
        </header>
    );
}

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <header className="header">
            <NavLink to="/" className="logo">d<span>EST</span></NavLink>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/marketplace">Marketplace</NavLink></li>
                    <li><NavLink to="/how-it-works">How it works</NavLink></li>
                </ul>
            </nav>
            <button className="login-button" onClick={handleLoginClick}>
                Login
            </button>
        </header>
    );
};

export default Header;

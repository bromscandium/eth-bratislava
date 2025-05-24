import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(user));
        }
    }, []);

    const handleAuthClick = () => {
        if (isAuthenticated) {
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUserData(null);
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const getNavLinkClass = ({ isActive }) => isActive ? 'active' : '';

    return (
        <header className="header">
            <NavLink to="/" className="logo">d<span>EST</span></NavLink>
            <nav>
                <ul>
                    <li><NavLink to="/" className={getNavLinkClass} end>Home</NavLink></li>
                    <li><NavLink to="/marketplace" className={getNavLinkClass}>Marketplace</NavLink></li>
                    <li><NavLink to="/how-it-works" className={getNavLinkClass}>How it works</NavLink></li>
                </ul>
            </nav>

            {isAuthenticated ? (
                <div className="user-actions">
                    <NavLink to="/profile" className="profile-link">
                        {userData?.name || 'Profile'}
                    </NavLink>
                    <button className="logout-button" onClick={handleAuthClick}>
                        Logout
                    </button>
                </div>
            ) : (
                <button className="login-button" onClick={handleAuthClick}>
                    Login
                </button>
            )}
        </header>
    );
};

export default Header;
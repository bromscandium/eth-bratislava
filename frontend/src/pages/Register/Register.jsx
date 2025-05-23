import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.detail || 'Registration failed');

            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Create Account</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="first_name"
                            type="text"
                            required
                            placeholder="John"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="last_name"
                            type="text"
                            required
                            placeholder="Doe"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-form-group">
                        <label htmlFor="password">Password (min 8 characters)</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength="8"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="register-submit">Register</button>
                    {error && <div className="register-error">{error}</div>}
                </form>

                <p className="register-footer-text">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
}

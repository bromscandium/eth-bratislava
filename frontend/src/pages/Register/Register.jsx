import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formDataToSend = new URLSearchParams();
            formDataToSend.append('first_name', formData.first_name);
            formDataToSend.append('last_name', formData.last_name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formDataToSend,
                credentials: 'include' // Для работы с сессиями
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Registration failed');
            }

            const data = await response.json();

            if (data.status === 'success') {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                throw new Error(data.detail || 'Registration failed');
            }

        } catch (err) {
            setError(err.message || 'Registration error');
        } finally {
            setIsLoading(false);
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

                    <button
                        type="submit"
                        className="register-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Register'}
                    </button>

                    {error && <div className="register-error">{error}</div>}
                </form>

                <p className="register-footer-text">
                    Already have an account? <a href="/login">Login here</a>
                </p>

                <button
                    className="go-home-btn"
                    onClick={() => navigate('/')}
                    disabled={isLoading}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
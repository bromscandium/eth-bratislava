import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formDataToSend,
                credentials: 'include' // Для работы с сессиями
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();

            if (data.status === 'success') {
                // Сохраняем минимальные данные пользователя в localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                // Перенаправляем на защищенную страницу
                navigate(data.redirect || '/profile');
            } else {
                throw new Error(data.detail || 'Login failed');
            }

        } catch (err) {
            setError(err.message || 'Login error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    {error && <div className="login-error">{error}</div>}
                </form>

                <p className="login-footer-text">
                    Don't have an account? <a href="/register">Register</a>
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
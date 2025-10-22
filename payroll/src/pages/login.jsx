import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext.jsx';
import './login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const base = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${base}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                localStorage.setItem('token', data.token);
                
                // Trigger auth event
                try { 
                    window.dispatchEvent(new Event('auth:login')); 
                } catch (e) {}
                
                // Navigate based on role
                if (data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/employee/dashboard');
                }
            } else {
                setError(data.message || data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setError('Unable to reach the server. Please check if the backend is running.');
            } else {
                setError('Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="brand-section">
                    <div className="brand-logo"></div>
                    <h1 className="brand-title">Payroll System</h1>
                    <p className="brand-subtitle">Secure Employee Management Platform</p>
                </div>

                <div className="login-card">
                    <h2 className="card-title">Welcome Back</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <div className="input-container">
                                <span className="input-icon">📧</span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="Enter your email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <div className="input-container">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="checkbox-container">
                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="custom-checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="rememberMe" className="checkbox-label">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'login'}
                        </button>
                    </form>

                    <div className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
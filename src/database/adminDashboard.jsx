// src/components/adminDashboard.jsx
import { useState, useEffect } from 'react';
import DatabaseDashboard from './databaseDashboard';
import { mmv_logo_white } from '../assets';

const AdminDashboard = () => {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Check if already authenticated on mount
    useEffect(() => {
        if (localStorage.getItem('admin_auth') === 'true') {
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        
        // Change 'admin123' to your preferred password
        if (password === 'progress@2025') {
            setAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('admin_auth');
            setAuthenticated(false);
            setPassword('');
        }
    };

    if (!authenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--background-dark, #0a0b0f)',
                fontFamily: 'Poppins, sans-serif',
                padding: '20px'
            }}>
                <div style={{
                    background: 'var(--bg-dark, #15161c)',
                    padding: '40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(75, 90, 228, 0.2)',
                    textAlign: 'center',
                    minWidth: '400px',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
                }}>
                    {/* Logo/Icon */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 20px',
                        background: 'linear-gradient(135deg, var(--primary-color, #4b5ae4), var(--primary-color-2, #6d7aff))',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem'
                    }}>
                        🔐
                    </div>

                    <h2 style={{ 
                        color: 'var(--text-light, #ffffff)', 
                        marginBottom: '10px',
                        fontSize: '1.8rem',
                        fontWeight: '600'
                    }}>
                        Admin Access
                    </h2>
                    <p style={{
                        color: 'var(--text-light-3, #a0a0a0)',
                        marginBottom: '30px',
                        fontSize: '0.95rem'
                    }}>
                        Enter your password to access the database dashboard
                    </p>

                    <form onSubmit={handleLogin}>
                        <div style={{ position: 'relative', marginBottom: '20px' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                style={{
                                    width: '100%',
                                    padding: '15px 45px 15px 15px',
                                    fontSize: '1rem',
                                    background: 'var(--bg-card, rgb(38, 38, 46))',
                                    border: error ? '1px solid #ff4444' : '1px solid rgba(75, 90, 228, 0.3)',
                                    borderRadius: '8px',
                                    color: 'var(--text-light, #ffffff)',
                                    fontFamily: 'Poppins, sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color, #4b5ae4)'}
                                onBlur={(e) => e.target.style.borderColor = error ? '#ff4444' : 'rgba(75, 90, 228, 0.3)'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-light-3, #a0a0a0)',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    padding: '5px'
                                }}>
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(228, 75, 75, 0.1)',
                                border: '1px solid rgba(228, 75, 75, 0.3)',
                                borderRadius: '6px',
                                padding: '10px',
                                marginBottom: '20px',
                                color: '#ff6666',
                                fontSize: '0.9rem'
                            }}>
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '15px',
                                fontSize: '1rem',
                                background: 'linear-gradient(90deg, var(--primary-color, #4b5ae4), var(--primary-color-2, #6d7aff))',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'var(--text-light, #ffffff)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontFamily: 'Poppins, sans-serif',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(75, 90, 228, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}>
                            🔓 Login to Dashboard
                        </button>
                    </form>

                    <p style={{
                        marginTop: '20px',
                        color: 'var(--text-light-3, #a0a0a0)',
                        fontSize: '0.85rem'
                    }}>
                        Protected by password authentication
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Top Navigation Bar */}
            <nav style={{
                position: 'sticky',
                top: 0,
                left: 0,
                right: 0,
                background: 'var(--bg-dark, #15161c)',
                padding: '15px 30px',
                borderBottom: '1px solid rgba(75, 90, 228, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, var(--primary-color, #4b5ae4), var(--primary-color-2, #6d7aff))',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}>
                        <img src={mmv_logo_white} width="40px" alt="" />
                    </div>
                    <div>
                        <h2 style={{ 
                            color: 'var(--text-light, #ffffff)', 
                            margin: 0,
                            fontSize: '1.2rem',
                            fontWeight: '600'
                        }}>
                            MMV Admin Dashboard
                        </h2>
                        <p style={{
                            color: 'var(--text-light-3, #a0a0a0)',
                            margin: 0,
                            fontSize: '0.8rem'
                        }}>
                            Database Management
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                        background: 'rgba(75, 228, 117, 0.2)',
                        color: '#4be475',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                    }}>
                        ✓ Authenticated
                    </span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            background: 'transparent',
                            border: '1px solid rgba(228, 75, 75, 0.3)',
                            borderRadius: '8px',
                            color: '#ff6666',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            fontFamily: 'Poppins, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(228, 75, 75, 0.1)';
                            e.target.style.borderColor = '#ff4444';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(228, 75, 75, 0.3)';
                            e.target.style.transform = 'translateY(0)';
                        }}>
                        <span> 📤  </span>
                        Logout
                    </button>
                </div>
            </nav>

            <DatabaseDashboard />
        </div>
    );
};

export default AdminDashboard;
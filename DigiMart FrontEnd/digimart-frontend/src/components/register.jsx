import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData.username, formData.email, formData.password);
      alert("Registered Successfully! Redirecting to Login")
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '3rem auto', padding: '2rem 2.5rem', boxShadow: '0 2px 16px rgba(60,72,88,0.08)' }}>
      <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '1.5rem' }}>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label htmlFor="email" style={{ fontWeight: 500, color: '#475569' }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '0.6em', borderRadius: 4, border: '1px solid #cbd5e1', fontSize: '1em' }}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label htmlFor="username" style={{ fontWeight: 500, color: '#475569' }}>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ padding: '0.6em', borderRadius: 4, border: '1px solid #cbd5e1', fontSize: '1em' }}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label htmlFor="password" style={{ fontWeight: 500, color: '#475569' }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: '0.6em', borderRadius: 4, border: '1px solid #cbd5e1', fontSize: '1em' }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.7em 1.8em',
            fontSize: '1.1em',
            cursor: 'pointer',
            marginTop: '0.5em',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s'
          }}
        >
          Register
        </button>
        {error && <p className="error" style={{ color: '#e11d48', textAlign: 'center', marginTop: '0.5em' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;

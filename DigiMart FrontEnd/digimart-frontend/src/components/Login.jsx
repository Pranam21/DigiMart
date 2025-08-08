import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // make sure to install this: npm install jwt-decode

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const token = await login(formData.email, formData.password);

      // Decode JWT to extract role
      const decoded = jwtDecode(token);
      const role = Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles;

      // Store role for later use
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }

    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: '400px',
        margin: '3rem auto',
        padding: '2rem 2.5rem',
        boxShadow: '0 2px 16px rgba(60,72,88,0.08)',
        border: 'none',
        borderRadius: '18px',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)'
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '1.5rem', fontWeight: 800 }}>Login</h2>
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
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s'
          }}
        >
          Login
        </button>
        {error && <p className="error" style={{ color: '#e11d48', textAlign: 'center', marginTop: '0.5em' }}>{error}</p>}
      </form>
      <div style={{ textAlign: 'center', marginTop: '1.5em', color: '#475569', fontSize: '0.98em' }}>
        Don't have an account?{' '}
        <span
          style={{ color: '#6366f1', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => navigate('/register')}
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default Login;

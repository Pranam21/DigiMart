import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{
        maxWidth: 650,
        margin: '3em auto',
        textAlign: 'center',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
        border: 'none',
        borderRadius: '18px',
        padding: '2.5em 2em'
      }}
    >
      <h1
        style={{
          marginBottom: '0.5em',
          color: '#6366f1',
          fontWeight: 800,
          fontSize: '2.5em',
          letterSpacing: '-1px'
        }}
      >
        Welcome to <span style={{ color: '#22223b' }}>DigiMart</span>
      </h1>
      <p
        style={{
          fontSize: '1.2em',
          color: '#475569',
          marginBottom: '2em',
          marginTop: '0.5em'
        }}
      >
        The digital marketplace for creators and buyers.<br />
        Buy, sell, and manage digital products with ease.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2em',
          marginBottom: '2em'
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
            padding: '1.5em 1.2em',
            minWidth: 180,
            transition: 'transform 0.15s',
            fontSize: '1.08em'
          }}
        >
          <span role="img" aria-label="secure" style={{ fontSize: '1.5em' }}>🔒</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Secure</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>Safe transactions</div>
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
            padding: '1.5em 1.2em',
            minWidth: 180,
            transition: 'transform 0.15s',
            fontSize: '1.08em'
          }}
        >
          <span role="img" aria-label="fast" style={{ fontSize: '1.5em' }}>⚡</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Fast</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>Instant downloads</div>
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
            padding: '1.5em 1.2em',
            minWidth: 180,
            transition: 'transform 0.15s',
            fontSize: '1.08em'
          }}
        >
          <span role="img" aria-label="support" style={{ fontSize: '1.5em' }}>💬</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Support</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>24/7 help</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5em', marginTop: '2em' }}>
        <button
          className="upload-btn"
          onClick={() => navigate('/register')}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.9em 2.2em',
            fontSize: '1.15em',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
            transition: 'background 0.2s'
          }}
        >
          <span role="img" aria-label="signup">🚀</span> Get Started
        </button>
        <button
          className="logout-btn"
          onClick={() => navigate('/login')}
          style={{
            background: 'linear-gradient(90deg, #e11d48 0%, #f472b6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.9em 2.2em',
            fontSize: '1.15em',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(225,29,72,0.10)',
            transition: 'background 0.2s'
          }}
        >
          <span role="img" aria-label="login">🔑</span> Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

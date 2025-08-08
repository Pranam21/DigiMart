import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract username from token (if needed)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = JSON.parse(atob(token.split('.')[1]));
    const email = decoded.sub;
    setUsername(email.split('@')[0]); // extract name from email
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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
        Welcome to <span style={{ color: '#22223b' }}>DigiMart</span>, {username}!
      </h1>
      <p
        style={{
          fontSize: '1.2em',
          color: '#475569',
          marginBottom: '2em',
          marginTop: '0.5em'
        }}
      >
        Your digital marketplace dashboard
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
          <span role="img" aria-label="upload" style={{ fontSize: '1.5em' }}>📤</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Upload & Sell</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>Your digital products</div>
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
          <span role="img" aria-label="browse" style={{ fontSize: '1.5em' }}>🛒</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Browse & Download</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>Purchased items</div>
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
          <span role="img" aria-label="settings" style={{ fontSize: '1.5em' }}>⚙️</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Account Settings</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>Manage your profile</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5em', marginTop: '2em' }}>
        <button
          className="upload-btn"
          onClick={() => navigate('/upload')}
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
          <span role="img" aria-label="upload">📤</span> Upload New File
        </button>
        <button
          className="logout-btn"
          onClick={handleLogout}
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
          <span role="img" aria-label="logout">🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;

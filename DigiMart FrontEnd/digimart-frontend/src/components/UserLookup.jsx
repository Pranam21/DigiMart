import React, { useState } from 'react';
import { getUserByEmail } from '../api/user';

const UserLookup = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setUser(null);
    setLoading(true);
    try {
      const userDto = await getUserByEmail(email);
      setUser(userDto);
    } catch (err) {
      setError(err.response?.data?.message || 'User not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 20%, #3b4d61 40%, #455a75 60%, #4f6989 80%, #5a789d 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(44,62,80,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(52,73,94,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <style>
        {`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>

      <div
        className="card"
        style={{
          maxWidth: '500px',
          width: '90%',
          padding: '3rem 2.5rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
          fontWeight: 900,
          color: '#2c3e50',
          margin: '0 0 2rem 0',
          letterSpacing: '-0.02em',
          fontFamily: "'Inter', 'Segoe UI', sans-serif"
        }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🔍</span>
          Lookup User
        </h2>

        <form onSubmit={submit} style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                color: '#374151',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(203, 213, 225, 0.8)',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                  fontWeight: 500,
                  outline: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading 
                  ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '16px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.25)';
                }
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>
                {loading ? '⏳' : '🔍'}
              </span>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div
            style={{
              marginBottom: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(254, 242, 242, 0.9)',
              color: '#991b1b',
              padding: '1.5rem 2rem',
              fontWeight: 600,
              textAlign: 'center',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.1)',
              fontSize: '1rem'
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>❌</div>
            {error}
          </div>
        )}

        {user && (
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '2rem',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 10px 30px rgba(34, 197, 94, 0.1)'
            }}
          >
            <h3 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#065f46',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              User Found
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '1rem',
              fontSize: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <strong style={{ color: '#065f46' }}>ID:</strong>
                <span style={{ color: '#374151' }}>{user.id}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <strong style={{ color: '#065f46' }}>Username:</strong>
                <span style={{ color: '#374151' }}>{user.username}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <strong style={{ color: '#065f46' }}>Email:</strong>
                <span style={{ color: '#374151' }}>{user.email}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <strong style={{ color: '#065f46' }}>Role:</strong>
                <span style={{
                  color: '#374151',
                  background: user.role === 'ADMIN' ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  border: user.role === 'ADMIN' ? '1px solid rgba(146, 64, 14, 0.2)' : '1px solid rgba(30, 64, 175, 0.2)'
                }}>
                  {user.role}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <strong style={{ color: '#065f46' }}>Registered:</strong>
                <span style={{ color: '#374151' }}>{user.registrationDate || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLookup;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 20%, #3b4d61 40%, #455a75 60%, #4f6989 80%, #5a789d 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative',
      overflow: 'hidden'
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
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '30%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(69,90,117,0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite'
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
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2.5rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          position: 'relative',
          zIndex: 1,
          minHeight: 'calc(100vh - 6rem)',
          marginTop: '3rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#2c3e50',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.03em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
          }}
        >
          Welcome to <span style={{ color: '#6366f1' }}>DigiMart</span>
        </h1>
        <p
          style={{
            fontSize: '1.3rem',
            color: '#64748b',
            marginBottom: '3rem',
            fontWeight: 500,
            lineHeight: 1.6
          }}
        >
          The digital marketplace for creators and buyers.<br />
          Buy, sell, and manage digital products with ease.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            padding: '1rem'
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '2rem 1.5rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Secure</div>
            <div style={{ color: '#64748b', fontSize: '1rem' }}>Safe and encrypted transactions</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '2rem 1.5rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Fast</div>
            <div style={{ color: '#64748b', fontSize: '1rem' }}>Instant downloads</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '2rem 1.5rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Support</div>
            <div style={{ color: '#64748b', fontSize: '1rem' }}>24/7 help available</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>🚀</span> Register
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>🔑</span> Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

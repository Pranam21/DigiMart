import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
          maxWidth: '1000px',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🏠</span> Home
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🚪</span> Logout
          </button>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#2c3e50',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.03em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>👤</span>
            User Dashboard
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#64748b',
            marginBottom: '0',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            Welcome to your personal control center
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          padding: '1rem'
        }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '2rem 1.5rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/profile')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚙️</div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Profile Settings
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              lineHeight: 1.5
            }}>
              Manage your account information and preferences
            </div>
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
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/upload')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📤</div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Upload Products
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              lineHeight: 1.5
            }}>
              Share your digital products with the community
            </div>
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
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/home')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Browse Store
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              lineHeight: 1.5
            }}>
              Discover and purchase amazing digital products
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: '#1e40af',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          <span>Explore all the features available to authenticated users</span>
        </div>
      </div>
    </div>
  );
}

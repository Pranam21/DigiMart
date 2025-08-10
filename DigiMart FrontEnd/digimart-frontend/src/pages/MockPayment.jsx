// src/pages/MockPayment.jsx
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export default function MockPayment() {
  const { fileId } = useParams();
  const nav = useNavigate();
  const { state } = useLocation(); // { id, title, price } (optional)
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const token = localStorage.getItem('token');
  const file = state || { id: fileId, title: `Item #${fileId}`, price: '—' };

  const payNow = async () => {
    try {
      setErr('');
      setLoading(true);
      await axios.post(`${API}/purchase/${fileId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Redirect back home with a flag so UserHome shows the success message
      nav('/home?paid=1', { replace: true });
    } catch (e) {
      setErr(e.response?.data || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => nav(-1);

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
        top: '15%',
        left: '15%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(44,62,80,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '65%',
        right: '20%',
        width: '150px',
        height: '150px',
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
          maxWidth: '600px',
          margin: '0 auto',
          padding: '3rem 2.5rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          position: 'relative',
          zIndex: 1,
          marginTop: '10vh'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#2c3e50',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
          }}>
            Secure Payment
          </h2>
          <button
            onClick={cancel}
            style={{
              background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.7rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(100, 116, 139, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(100, 116, 139, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(100, 116, 139, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>⬅️</span> Back
          </button>
        </div>

        {err && (
          <div style={{
            marginBottom: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(254, 242, 242, 0.9)',
            color: '#991b1b',
            padding: '1rem 1.5rem',
            fontWeight: 600,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.1)'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            {err}
          </div>
        )}

        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.08)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💳</div>
            <h3 style={{
              margin: 0,
              color: '#1e293b',
              fontWeight: 700,
              fontSize: '1.5rem'
            }}>
              Payment Summary
            </h3>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Product:</span>
              <span style={{ color: '#1e293b', fontWeight: 600 }}>{file.title}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Amount:</span>
              <span style={{
                color: '#3b82f6',
                fontWeight: 800,
                fontSize: '1.3rem'
              }}>
                ₹{file.price}
              </span>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '0.9rem',
            marginTop: '1rem'
          }}>
            🔒 This is a simulated payment for demonstration purposes
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={cancel}
            disabled={loading}
            style={{
              background: 'rgba(100, 116, 139, 0.1)',
              color: '#64748b',
              border: '1px solid rgba(100, 116, 139, 0.2)',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = 'rgba(100, 116, 139, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'rgba(100, 116, 139, 0.1)';
              }
            }}
          >
            Cancel Payment
          </button>
          <button
            onClick={payNow}
            disabled={loading}
            style={{
              background: loading 
                ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading 
                ? '0 4px 15px rgba(148, 163, 184, 0.25)'
                : '0 8px 25px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.35)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
              }
            }}
          >
            {loading ? (
              <>
                <span style={{ fontSize: '1.2rem' }}>⏳</span> Processing...
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.2rem' }}>💳</span> Pay ₹{file.price ?? '—'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

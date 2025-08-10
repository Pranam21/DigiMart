import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`${API}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProduct(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load product');
      if ([401, 403].includes(e.response?.status)) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    navigate(`/payment/${id}`);
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(`${API}/files/download/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const dispo = res.headers['content-disposition'] || '';
      const match = dispo.match(/filename="?([^"]+)"?/);
      const filename = match?.[1] || 'file';

      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      setError('Download failed or unauthorized');
    }
  };

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
          marginBottom: '3rem'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
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
            <span style={{ fontSize: '1.1rem' }}>⬅️</span> Back to Store
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

        {/* Error Alert */}
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
              fontSize: '1.1rem'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={{ 
            color: '#64748b', 
            textAlign: 'center', 
            fontSize: '1.3rem',
            padding: '3rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            Loading product details…
          </div>
        ) : product ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Product Image/Icon */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '3rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '200px',
                height: '200px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                border: '1px solid rgba(226,232,240,0.5)'
              }}>
                <div style={{ fontSize: '5rem' }}>📄</div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                margin: 0
              }}>
                Product Preview
              </h3>
            </div>

            {/* Product Details */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '3rem'
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 900,
                color: '#2c3e50',
                margin: '0 0 1rem 0',
                letterSpacing: '-0.02em',
                fontFamily: "'Inter', 'Segoe UI', sans-serif"
              }}>
                {product.title || `Product #${id}`}
              </h1>

              <div style={{
                fontSize: '1.1rem',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>📁</span>
                  <strong>Type:</strong> {product.fileType || 'Digital File'}
                </p>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>💾</span>
                  <strong>Size:</strong> {product.size ? `${(product.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'}
                </p>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>👤</span>
                  <strong>Creator:</strong> {product.uploadedBy || 'Unknown'}
                </p>
                {product.description && (
                  <p style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    {product.description}
                  </p>
                )}
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#1e40af',
                  margin: 0
                }}>
                  💰 ₹{product.price || '0'}
                </div>
              </div>

              {product.owned ? (
                <button
                  onClick={handleDownload}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '1.2rem 2rem',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.25)';
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>⬇️</span> Download Now
                </button>
              ) : (
                <button
                  onClick={handlePurchase}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '1.2rem 2rem',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.25)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    e.target.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.25)';
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>🛒</span> Purchase Now
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ 
            color: '#64748b', 
            textAlign: 'center', 
            fontSize: '1.3rem',
            padding: '3rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
            Product not found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

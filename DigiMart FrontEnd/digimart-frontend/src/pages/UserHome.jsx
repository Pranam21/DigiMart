import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const readableSize = (bytes = 0) => {
  if (!bytes || bytes <= 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Pick an icon by MIME type or filename extension (served from /public/icons)
const iconFor = (mimeOrName = '') => {
  const s = mimeOrName.toLowerCase();
  if (s.includes('pdf') || s.endsWith('.pdf')) return '/icons/pdf.svg';
  if (s.includes('image') || /\.(png|jpg|jpeg|gif|webp|svg)$/.test(s)) return '/icons/image.svg';
  if (s.includes('audio') || /\.(mp3|wav|flac|aac|ogg)$/.test(s)) return '/icons/audio.svg';
  if (s.includes('video') || /\.(mp4|mkv|mov|webm|avi)$/.test(s)) return '/icons/video.svg';
  if (s.includes('zip') || s.includes('compressed') || /\.(zip|rar|7z|tar|gz)$/.test(s)) return '/icons/zip.svg';
  return '/icons/file.svg';
};

const UserHome = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Extract username from token
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const email = decoded.sub;
      setUsername(email.split('@')[0]); // extract name from email
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    
    fetchFiles();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setErr('');
      const res = await axios.get(`${API}/files/show`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('files fetched');
      setFiles(res.data || []);
    } catch (e) {
      setErr(e.response?.data || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ CHANGED: redirect to mock payment page instead of purchasing immediately
  const handlePurchase = (file) => {
    setMsg('');
    setErr('');
    navigate(`/payment/${file.id}`,  { state: { id: file.id, title: file.title, price: file.price }});
  };

  const handleDownload = async (downloadUrl, id) => {
    try {
      setErr('');
      const res = await axios.get(`${API}/files/download/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      // Optional: use filename from Content-Disposition
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
      setErr('Download failed or unauthorized');
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
          @keyframes cardHover {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-10px) scale(1.02); }
          }
        `}
      </style>

      <div
        className="card"
        style={{
          maxWidth: '1400px',
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
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#2c3e50',
                margin: 0,
                letterSpacing: '-0.03em',
                fontFamily: "'Inter', 'Segoe UI', sans-serif"
              }}>
                Welcome, {username}!
              </h1>
              <p style={{ 
                color: '#64748b', 
                margin: '0.5rem 0 0 0',
                fontSize: '1.2rem',
                fontWeight: 500
              }}>
                Discover, purchase, and download premium digital products
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/me')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>👤</span> Profile
              </button>
              <button
                onClick={() => navigate('/upload')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
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
                <span style={{ fontSize: '1.3rem' }}>📤</span> Upload Product
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                style={{
                  background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(100, 116, 139, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 35px rgba(100, 116, 139, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(100, 116, 139, 0.25)';
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {msg && (
          <div
            style={{
              marginBottom: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              background: 'rgba(240, 253, 244, 0.9)',
              color: '#065f46',
              padding: '1.5rem 2rem',
              fontWeight: 600,
              textAlign: 'center',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 10px 30px rgba(34, 197, 94, 0.1)',
              fontSize: '1.1rem'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            {msg}
          </div>
        )}
        {err && (
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
            {err}
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
            Loading amazing products…
          </div>
        ) : files.length === 0 ? (
          <div style={{ 
            color: '#64748b', 
            textAlign: 'center', 
            fontSize: '1.3rem',
            padding: '3rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            No products available yet. Be the first to upload!
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              padding: '1rem'
            }}
          >
            {files.map((file) => (
              <div
                key={file.id}
                className="card"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '420px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';
                }}
              >
                {/* Decorative corner element */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 100%)',
                  borderRadius: '50%'
                }}></div>

                {/* Thumbnail */}
                <div
                  style={{
                    width: '100%',
                    height: '160px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(226,232,240,0.5)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
                    borderRadius: '50%'
                  }}></div>
                  <img
                    src={iconFor(file.fileType || file.title)}
                    alt="thumbnail"
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.1))',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    marginBottom: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.01em'
                  }}>
                    {file.title}
                  </h3>
                  <div style={{ fontSize: '1rem', color: '#64748b', margin: 0 }}>
                    <p style={{ margin: '0.3rem 0' }}>
                      📁 {file.fileType || '—'}
                    </p>
                    <p style={{ margin: '0.3rem 0' }}>
                      💾 {readableSize(file.size)}
                    </p>
                    <p style={{
                      fontSize: '1.3rem',
                      color: '#3b82f6',
                      fontWeight: 800,
                      margin: '1rem 0',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '12px',
                      padding: '0.5rem 1rem',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      💰 ₹{file.price}
                    </p>
                    {file.uploadedBy && (
                      <p style={{ 
                        fontSize: '0.9rem', 
                        color: '#64748b', 
                        margin: '0.5rem 0'
                      }}>
                        👤 {file.uploadedBy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ marginTop: 'auto', width: '100%', paddingTop: '1.5rem' }}>
                  {file.owned ? (
                    <button
                      onClick={() => handleDownload(null, file.id)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '1rem 0',
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
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.25)';
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>⬇️</span> Download Now
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(file)}
                      style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '1rem 0',
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
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.25)';
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>🛒</span> Purchase Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
                      

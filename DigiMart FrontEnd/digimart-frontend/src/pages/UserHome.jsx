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
  const navigate = useNavigate();
  const { logout } = useAuth();

  const API = import.meta.env.VITE_API_BASE_URL; // e.g. http://localhost:8080/api
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePurchase = async (fileId) => {
    try {
      setMsg('');
      setErr('');
      await axios.post(`${API}/purchase/${fileId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg('Purchase successful! You can download it now.');
      await fetchFiles(); // refresh ownership flags
    } catch (e) {
      setErr(e.response?.data || 'Purchase failed');
    }
  };

  const handleDownload = async (downloadUrl, fallbackId) => {
    try {
      setErr('');
      // Prefer downloadUrl from API; fallback to standard route if not provided
      const urlPath = downloadUrl || `/files/download/${fallbackId}`;
      const res = await axios.get(`${API}${urlPath}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'file'; // you can set from header filename if backend sends it
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      setErr('Download failed or unauthorized');
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: '1200px',
        margin: '3em auto',
        padding: '2.5em 2em',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
        border: 'none',
        borderRadius: '18px'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
        marginBottom: '2em'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.2em',
              fontWeight: 800,
              color: '#6366f1',
              margin: 0,
              letterSpacing: '-1px'
            }}>
              DigiMart
            </h1>
            <p style={{ color: '#475569', margin: 0 }}>
              Browse, purchase, and download digital products.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1em' }}>
            <button
              onClick={() => navigate('/upload')}
              style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7em 2em',
                fontSize: '1.08em',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
                transition: 'background 0.2s'
              }}
            >
              <span role="img" aria-label="upload">📤</span> Upload Product
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              style={{
                background: 'linear-gradient(90deg, #e11d48 0%, #f472b6 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7em 2em',
                fontSize: '1.08em',
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
      </div>

      {/* Alerts */}
      {msg && (
        <div
          style={{
            marginBottom: '1.2em',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
            background: '#f0fdf4',
            color: '#22c55e',
            padding: '0.8em 1em',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          {msg}
        </div>
      )}
      {err && (
        <div
          style={{
            marginBottom: '1.2em',
            borderRadius: '8px',
            border: '1px solid #fecdd3',
            background: '#fef2f2',
            color: '#e11d48',
            padding: '0.8em 1em',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          {err}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div style={{ color: '#64748b', textAlign: 'center', fontSize: '1.1em' }}>Loading files…</div>
      ) : files.length === 0 ? (
        <div style={{ color: '#64748b', textAlign: 'center', fontSize: '1.1em' }}>No files available yet.</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2em'
          }}
        >
          {files.map((file) => (
            <div
              key={file.id}
              className="card"
              style={{
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
                padding: '1.5em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.15s',
                minHeight: 370
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: '100%',
                  height: 140,
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18
                }}
              >
                <img
                  src={iconFor(file.fileType || file.title)}
                  alt="thumbnail"
                  style={{ width: 64, height: 64, objectFit: 'contain' }}
                />
              </div>

              {/* Details */}
              <div style={{ width: '100%' }}>
                <h3 style={{
                  fontSize: '1.18em',
                  fontWeight: 700,
                  color: '#22223b',
                  marginBottom: 6,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.title}
                </h3>
                <div style={{ fontSize: '0.98em', color: '#64748b', margin: 0 }}>
                  <p style={{ margin: 0 }}>Type: {file.fileType || '—'}</p>
                  <p style={{ margin: 0 }}>Size: {readableSize(file.size)}</p>
                  <p style={{
                    fontSize: '1.05em',
                    color: '#6366f1',
                    fontWeight: 600,
                    margin: '0.5em 0 0 0'
                  }}>
                    Price: ₹{file.price}
                  </p>
                  {file.uploadedBy && (
                    <p style={{ fontSize: '0.92em', color: '#64748b', margin: '0.2em 0 0 0' }}>
                      Uploader: {file.uploadedBy}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: '1.2em', width: '100%' }}>
                {file.owned ? (
                  <button
                    onClick={() => handleDownload(file.downloadUrl, file.id)}
                    style={{
                      background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.7em 0',
                      fontSize: '1.08em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 2px 8px rgba(34,197,94,0.08)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <span role="img" aria-label="download">⬇️</span> Download
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(file.id)}
                    style={{
                      background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.7em 0',
                      fontSize: '1.08em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <span role="img" aria-label="purchase">🛒</span> Purchase
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHome;